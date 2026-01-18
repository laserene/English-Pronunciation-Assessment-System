import { JSX, useRef, useState } from "react";
import MicVisualizer from "./MicVisualizer.tsx";
import ChatInput from "./ChatInput.tsx";
import axiosInstance from "../../../utils/axios.ts";
import "./index.css";

interface InputModePanelProps {
	scenarioId: number;
	currentTurn: number;
	setCurrentTurn: React.Dispatch<React.SetStateAction<number>>;
	expectedText: string | null;
	defaultMode?: "voice" | "typing" | null;
	onEvalReceived?: (data: EvalLine) => void;
}

interface EvalLine {
	transcription: string;
	expected_text: string;
	transcription_phoneme: string;
	expected_phoneme: string;
	wer: number;
	cer: number;
}

export default function InputModePanel({
	currentTurn,
	setCurrentTurn,
	expectedText,
	defaultMode = null,
	onEvalReceived
}: InputModePanelProps): JSX.Element {
	const [inputMode, onModeChange] = useState<"voice" | "typing" | null>(defaultMode);
	const expandedHeight = "auto";

	// Audio functions
	const streamRef = useRef(null);
	const canvasRef = useRef(null);
	const audioContextRef = useRef(null);
	const analyserRef = useRef(null);
	const animationRef = useRef(null);

	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const audioChunksRef = useRef<Blob[]>([]);

	// Start recording
	const startRecording = async () => {
		const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
		streamRef.current = stream;

		// Audio Recorder
		const mediaRecorder = new MediaRecorder(stream);
		mediaRecorderRef.current = mediaRecorder;
		audioChunksRef.current = [];
		mediaRecorder.start();

		mediaRecorder.ondataavailable = (event) => {
			if (event.data && event.data.size > 0) {
				audioChunksRef.current.push(event.data);
			}
		};

		mediaRecorder.onstop = async () => {
			const audioBlob = new Blob(audioChunksRef.current, {
				type: mediaRecorder.mimeType,
			});

			sendAudioToBackend(audioBlob);
			setCurrentTurn((prev) => prev + 1);
		};

		// Audio Visualizer
		const audioContext = new AudioContext();
		audioContextRef.current = audioContext;

		const source = audioContext.createMediaStreamSource(stream);

		const analyser = audioContext.createAnalyser();
		analyserRef.current = analyser;

		analyser.fftSize = 1024;
		analyser.smoothingTimeConstant = 0.85;
		analyser.minDecibels = -70;
		analyser.maxDecibels = -10;

		source.connect(analyser);

		const dataArray = new Uint8Array(analyser.frequencyBinCount);

		const draw = () => {
			animationRef.current = requestAnimationFrame(draw);

			analyser.getByteFrequencyData(dataArray);

			const canvas = canvasRef.current;
			if (!canvas) return;

			const ctx = canvas.getContext("2d");
			if (!ctx) return;

			const width = canvas.width;
			const height = canvas.height;


			ctx.fillStyle = "rgba(255, 255, 255, 1)";
			ctx.fillRect(0, 0, width, height);

			const barWidth = 2;
			const spacing = 4;

			ctx.fillStyle = "rgba(254, 80, 0, 1)";

			for (let i = 0; i < dataArray.length; i++) {
				const normalized = dataArray[i] / 255;
				const barHeight = normalized * (height * 1.6) + 2;

				const x = i * spacing;
				const y = height / 2 - barHeight / 2;

				// Draw rounded bar
				ctx.beginPath();
				ctx.roundRect(x, y, barWidth, barHeight, barWidth / 2);
				ctx.fill();
			}
		};

		draw();
	};

	const stopRecording = () => {
		if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
			mediaRecorderRef.current.stop();
		}

		if (streamRef.current) {
			streamRef.current.getTracks().forEach((track: any) => track.stop());
			streamRef.current = null;
		}

		if (animationRef.current) {
			cancelAnimationFrame(animationRef.current);
		}

		if (
			audioContextRef.current &&
			audioContextRef.current.state !== "closed"
		) {
			audioContextRef.current.close();
			audioContextRef.current = null;
		}
	};

	const sendAudioToBackend = async (audioBlob: Blob) => {
		const formData = new FormData();

		formData.append("audio", audioBlob, "speech.webm");
		formData.append("expected_text", expectedText);

		if (expectedText !== null) {
			const response = await axiosInstance.post(
				"/scenarios/speech/submit",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			const result = await response;
			onEvalReceived?.(result.data);
		};
	};

	return (
		<div
			className="interaction-block-content expanded"
			style={{ "--expanded-height": expandedHeight } as React.CSSProperties}
		>
			<div
				id="input-mode-container"
				className="interaction-block-content-inner"
			>
				{inputMode === "voice" && (
					<MicVisualizer canvasRef={canvasRef} />
				)}
				{inputMode === null && (
					<div className="input-mode-placeholder">
						Let's start...
					</div>
				)}
				{inputMode === "typing" && <ChatInput />}
				<div className="mode-btn-container">
					<button
						className={`conversation-btn mode-btn ${inputMode === "voice" ? "active" : ""
							}`}
						onClick={() => {
							if (inputMode === "voice") {
								onModeChange(null);
								stopRecording();
							} else {
								onModeChange("voice");
								startRecording();
							}
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="-12 -12 48 48"
							strokeWidth={1.5}
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
}