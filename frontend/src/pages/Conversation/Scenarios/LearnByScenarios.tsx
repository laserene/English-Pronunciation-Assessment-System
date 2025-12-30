import { JSX, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../HomePage/header.tsx";
import Live2DPanel from "../Live2DPanel.tsx";
import InteractionPanel from "../Components/InteractionPanel.tsx";
import SuggestionPanel from "../Components/SuggestionPanel.tsx";
import MessagePanel from "../Components/MessagePanel.tsx";
import InputModePanel from "../Components/InputModePanel.tsx";
import { ScenarioProvider } from "../../../contexts/ScenarioContext.tsx";
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

    let scenarioId = Number(scenario_id);
    if (Number.isNaN(scenarioId)) {
        // handle invalid or missing param
        scenarioId = 0;
    }
    useEffect(() => {
        const fetchScenario = async () => {
            if (!scenarioId) return;

            const res = await axiosInstance.get(
                `/scenarios/${scenarioId}/scripts`
            );

            setScriptLines(res.data.script_lines);
            setVocabulary(res.data.vocabulary);
        };

        fetchScenario();
    }, [scenarioId]);

    return (
        <ScenarioProvider
            scenario_id={scenarioId}
            currentTurn={currentTurn}
            setCurrentTurn={setCurrentTurn}
        >
            <Header />
            <div className="flex-layout">
                <Live2DPanel />
                <InteractionPanel>
                    <SuggestionPanel title="Vocabulary" elements={vocabulary} />
                    <MessagePanel title="Dialogue Script" height={312} scripts={scriptLines.slice(0, currentTurn)}>
                        <InputModePanel showVoiceButton={true} showTypingButton={false} />
                    </MessagePanel>
                </InteractionPanel>
            </div>
        </ScenarioProvider>
    );
}