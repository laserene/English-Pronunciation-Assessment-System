import { JSX, useEffect, useState } from "react";
import axiosInstance from "../../../utils/axios";
import "./index.css";

interface ScriptLine {
	speaker: "user" | "ai";
	emotion?: string | null; // neutral, angry, happy, surprised, rejoice, shy, sad
	turn_index: number;
	expected_text: string;
}

interface EvalLine {
	transcription: string;
	expected_text: string;
	transcription_phoneme: string;
	expected_phoneme: string;
	wer: number;
	cer: number;
}

interface MessagePanelProps {
	title: string;
	height: number;
	scripts: ScriptLine[];
	evalData: EvalLine[];
	currentTurn: number;
	setCurrentTurn: React.Dispatch<React.SetStateAction<number>>;
	onShowEval?: (index: number) => void;  // NEW
	children: React.ReactNode
}

export default function MessagePanel({
	title,
	height,
	scripts = [],
	evalData = [],
	currentTurn,
	setCurrentTurn,
	onShowEval,
	children
}: MessagePanelProps): JSX.Element {
	const expandedHeight = `${height}px`;
	const [audioPath, setAudioPath] = useState<string[]>([]);

	const playUserSample = (text: string) => {
		const utterance = new SpeechSynthesisUtterance(text);
		utterance.lang = "en-US";
		utterance.rate = 1;
		utterance.pitch = 1;
		speechSynthesis.speak(utterance);
	};

	const playAISample = async (index: number) => {
		if (audioPath[index]) {
			const audio = new Audio(audioPath[index]);
			audio.preload = "auto";
			audio.play();
		}
	};

	useEffect(() => {
		const fetchAIAudioPaths = async () => {
			if (scripts[currentTurn - 1]?.speaker !== "ai") return;

			const audioUrl = await axiosInstance.post("/ai/tts", {
				text: scripts[currentTurn - 1].expected_text,
			});
			setAudioPath(prev => [...prev, audioUrl.data.audio_path]);

			const audio = new Audio(audioUrl.data.audio_path);
			audio.preload = "auto";

			// const emotion = scripts[currentTurn - 1]?.emotion || "neutral";

			audio.play();
			audio.onended = () => {
				setCurrentTurn(prev => prev + 1);
			};
		}
		fetchAIAudioPaths();
	}, [currentTurn])

	return (
		<div className="interaction-block">
			<div className="interaction-block-title-wrapper">
				<div>{title}</div>
			</div>
			<div
				className="interaction-block-content expanded"
				style={{ "--expanded-height": expandedHeight } as React.CSSProperties}
			>
				<div
					id="message-history-container"
					className="interaction-block-content-inner"
				>
					{scripts.map((script, index: number) => (
						<div
							key={index}
							className={`message-item-wrapper ${script.speaker === "ai" ? "ai-message" : "user-message"}`}
						>
							{script.speaker === "user" && (
								<button
									className="play-sample-button"
									onClick={() => {
										onShowEval?.(Math.trunc((index + 1) / 2));  // Call parent callback
									}}
									disabled={(Math.trunc(index / 2) >= evalData.length) || (evalData.length === 0)}
								>🔎</button>
							)}
							{script.speaker === "user" && (
								<button
									className="play-sample-button"
									onClick={() => {
										playUserSample(script.expected_text)
									}}
								>🔊</button>
							)}

							<div
								className="message-item"
							>
								{script.expected_text}
							</div>

							{script.speaker === "ai" && (
								<button
									className="play-sample-button"
									onClick={() => playAISample(Math.trunc(index / 2))}
								>🔊</button>
							)}
						</div>
					))}
				</div>
			</div>
			{children}
		</div >
	);
}
