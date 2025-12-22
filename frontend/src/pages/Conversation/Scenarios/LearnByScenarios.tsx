import { JSX, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../HomePage/header.tsx";
import Live2DPanel from "../Live2DPanel.tsx";
import InteractionPanel from "../Components/InteractionPanel.tsx";
import SuggestionPanel from "../Components/SuggestionPanel.tsx";
import MessagePanel from "../Components/MessagePanel.tsx";
import InputModePanel from "../Components/InputModePanel.tsx";
import axiosInstance from "../../../utils/axios.ts";
import "./index.css";

interface ScriptLine {
    speaker: "user" | "ai";
    turn_index: number;
    expected_text: string;
}

export default function LearnByScenarios(): JSX.Element {
    const { scenario_id } = useParams<{ scenario_id: string }>();
    const [scriptLines, setScriptLines] = useState<ScriptLine[]>([]);
    const [vocabulary, setVocabulary] = useState<string[]>([]);
    const [currentTurn, setCurrentTurn] = useState(1);

    useEffect(() => {
        const fetchScenario = async () => {
            if (!scenario_id) return;

            const res = await axiosInstance.get(
                `/scenarios/${scenario_id}/scripts`
            );

            setScriptLines(res.data.script_lines);
            setVocabulary(res.data.vocabulary);
        };

        fetchScenario();
    }, [scenario_id]);

    return (
        <>
            <Header></Header>
            <div className="flex-layout">
                <Live2DPanel />
                <InteractionPanel>
                    <SuggestionPanel title="Vocabulary" elements={vocabulary} />
                    <MessagePanel height={312} scripts={scriptLines.slice(0, currentTurn)}>
                        <InputModePanel showVoiceButton={true} showTypingButton={false} />
                    </MessagePanel>
                </InteractionPanel>
            </div>
        </>
    );
}