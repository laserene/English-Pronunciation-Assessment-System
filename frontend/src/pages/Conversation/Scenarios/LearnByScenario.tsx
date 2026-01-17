import { JSX, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Components/Header.tsx";
import Live2DPanel from "../Live2DPanel.tsx";
import InteractionPanel from "../Components/InteractionPanel.tsx";
import SuggestionPanel from "../Components/SuggestionPanel.tsx";
import MessagePanel from "../Components/MessagePanel.tsx";
import InputModePanel from "../Components/InputModePanel.tsx";
import Overlay from "../Components/Overlay.tsx";
import axiosInstance from "../../../utils/axios.ts";
import "./index.css";

interface ScriptLine {
    speaker: "user" | "ai";
    turn_index: number;
    expected_text: string;
}

export default function LearnByScenario(): JSX.Element {
    const { scenario_id } = useParams<{ scenario_id: string }>();
    const [scriptLines, setScriptLines] = useState<ScriptLine[]>([]);
    const [scenarioName, setScenarioName] = useState<string>("");
    const [vocabulary, setVocabulary] = useState<string[]>([]);
    const [currentTurn, setCurrentTurn] = useState(1);
    const [evalData, setEvalData] = useState<any[]>([]);
    const [showPerformanceModal, setShowPerformanceModal] = useState(false);
    const [selectedEvalIndex, setSelectedEvalIndex] = useState<number>(0);

    let scenarioId = Number(scenario_id);
    if (Number.isNaN(scenarioId)) {
        // handle invalid or missing param
        scenarioId = 0;
    }
    useEffect(() => {
        const fetchScenarioWithScriptLines = async () => {
            if (!scenarioId) return;

            const res = await axiosInstance.get(
                `/scenarios/${scenarioId}/scripts`
            );

            console.log(res.data)

            setScenarioName(res.data.scenario_name);
            setScriptLines(res.data.script_lines);
            setVocabulary(res.data.vocabulary);
        };

        fetchScenarioWithScriptLines();
    }, [scenarioId]);

    const handleEvalReceived = (data: any) => {
        setEvalData(prev => [...prev, data]);
    };

    const handleShowEval = (index: number) => {
        setShowPerformanceModal(true);
        setSelectedEvalIndex(index);
    };

    const handleCloseModal = () => {
        setShowPerformanceModal(false);
    };

    return (
        <>
            <Header scenario_name={scenarioName} />
            <div className="flex-layout">
                <Live2DPanel />
                <InteractionPanel>
                    <SuggestionPanel title="Vocabulary" elements={vocabulary} />
                    <MessagePanel
                        title="Dialogue Script"
                        height={312}
                        scripts={scriptLines.slice(0, currentTurn)}
                        evalData={evalData}
                        onShowEval={handleShowEval}
                    >
                        <InputModePanel
                            scenarioId={scenarioId}
                            currentTurn={currentTurn}
                            onEvalReceived={handleEvalReceived}
                        />
                    </MessagePanel>
                </InteractionPanel>
            </div>
            {/* {showPerformanceModal && (

                <div className="perf-panel">
                    <button onClick={handleCloseModal}>Close ✕</button>
                    Evaluation
                    <div>
                        - Transcription: {evalData[selectedEvalIndex]?.transcription} <br></br>
                        - Reference text: {evalData[selectedEvalIndex]?.expected_text} <br></br>
                        - Transcription phoneme: {evalData[selectedEvalIndex]?.transcription_phoneme} <br></br>
                        - Reference phoneme: {evalData[selectedEvalIndex]?.expected_text_phoneme} <br></br>
                        - WER: {evalData[selectedEvalIndex]?.wer} <br></br>
                        - CER: {evalData[selectedEvalIndex]?.cer}
                    </div>
                </div>
            )} */}
            <Overlay isOpen={showPerformanceModal} onClose={() => { handleCloseModal() }}>
                <h2>Speech Evaluation</h2>
                <div>
                    - Transcription: {evalData[selectedEvalIndex]?.transcription} <br></br>
                    - Reference text: {evalData[selectedEvalIndex]?.expected_text} <br></br>
                    - Transcription phoneme: {evalData[selectedEvalIndex]?.transcription_phoneme} <br></br>
                    - Reference phoneme: {evalData[selectedEvalIndex]?.expected_text_phoneme} <br></br>
                    - WER: {evalData[selectedEvalIndex]?.wer} <br></br>
                    - CER: {evalData[selectedEvalIndex]?.cer}
                </div>
            </Overlay>
        </>
    );
}