import { JSX, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Components/Header.tsx";
import Live2DPanel from "../Live2DPanel.tsx";
import InteractionPanel from "../Components/InteractionPanel.tsx";
import SuggestionPanel from "../Components/SuggestionPanel.tsx";
import MessagePanel from "../Components/MessagePanel.tsx";
import InputModePanel from "../Components/InputModePanel.tsx";
import FinishScenarioPanel from "../Components/FinishScenarioPanel.tsx";
import Overlay from "../Components/Overlay.tsx";
import axiosInstance from "../../../utils/axios.ts";
import "./index.css";

interface ScriptLine {
    speaker: "user" | "ai";
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

export default function LearnByScenario(): JSX.Element {
    const { scenario_id } = useParams<{ scenario_id: string }>();
    const [scriptLines, setScriptLines] = useState<ScriptLine[]>([]);
    const [scenarioName, setScenarioName] = useState<string>("");
    const [vocabulary, setVocabulary] = useState<string[]>([]);
    const [currentTurn, setCurrentTurn] = useState(1);
    const [evalData, setEvalData] = useState<EvalLine[]>([]);
    const [showPerformanceModal, setShowPerformanceModal] = useState(false);
    const [selectedEvalIndex, setSelectedEvalIndex] = useState<number>(0);
    const [showFinalResults, setShowFinalResults] = useState(false);

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

            setScenarioName(res.data.scenario_name);
            setScriptLines(res.data.script_lines);
            setVocabulary(res.data.vocabulary);
        };

        fetchScenarioWithScriptLines();
    }, [scenarioId]);

    console.log("Script Lines: ", scriptLines);

    const handleEvalReceived = (data: EvalLine) => {
        setEvalData(prev => [...prev, data]);
    };

    const handleShowEval = (index: number) => {
        setShowPerformanceModal(true);
        setSelectedEvalIndex(index);
    };

    const handleCloseModal = () => {
        setShowPerformanceModal(false);
    };

    const currentScriptLine = scriptLines.find(
        line => line.turn_index === currentTurn && line.speaker === "user"
    );
    const expectedText = currentScriptLine?.expected_text ?? null;

    const handleViewFinalResults = () => {
        setShowFinalResults(true);
    }

    const calculateAvg = (series: number[]): number => {
        const avg = series.length > 0
            ? series.reduce((sum, v) => sum + v, 0) / series.length
            : 0;
        return avg;
    }

    useEffect(() => {
        if ((evalData.length === scriptLines.length / 2) && evalData.length !== 0) {
            const werSeries = evalData.map(e => e.wer);
            const cerSeries = evalData.map(e => e.cer);

            const saveSpeakingResults = async () => {
                await axiosInstance.post(`/performances/`, {
                    wer: calculateAvg(werSeries),
                    cer: calculateAvg(cerSeries),
                });
            }

            saveSpeakingResults();
        }
    }, [evalData.length]);

    const handleCloseFinalResults = () => {
        setShowFinalResults(false);
    }

    return (
        <div style={{ overflowY: "auto" }}>
            <Header scenario_name={scenarioName} />
            <div className="flex-layout">
                <Live2DPanel />
                <InteractionPanel>
                    <SuggestionPanel title="Vocabulary" elements={vocabulary} />
                    <MessagePanel
                        title="Dialogue Script"
                        height={300}
                        scripts={scriptLines.slice(0, currentTurn)}
                        currentTurn={currentTurn}
                        setCurrentTurn={setCurrentTurn}
                        evalData={evalData}
                        onShowEval={handleShowEval}
                    >
                        {(evalData.length !== (scriptLines.length / 2) || (evalData.length === 0)) && <InputModePanel
                            scenarioId={scenarioId}
                            setCurrentTurn={setCurrentTurn}
                            expectedText={expectedText}
                            onEvalReceived={handleEvalReceived}
                        />}

                        {(evalData.length === (scriptLines.length / 2)) && (
                            <FinishScenarioPanel onShowFinalResults={handleViewFinalResults} />
                        )}
                    </MessagePanel>
                </InteractionPanel>
            </div>
            <Overlay isOpen={showPerformanceModal} onClose={() => { handleCloseModal() }}>
                <h2>Speech Evaluation</h2>
                <div>
                    - Transcription: {evalData[selectedEvalIndex]?.transcription} <br></br>
                    - Reference text: {evalData[selectedEvalIndex]?.expected_text} <br></br>
                    - Transcription phoneme: {evalData[selectedEvalIndex]?.transcription_phoneme} <br></br>
                    - Reference phoneme: {evalData[selectedEvalIndex]?.expected_phoneme} <br></br>
                    - WER: {evalData[selectedEvalIndex]?.wer} <br></br>
                    - CER: {evalData[selectedEvalIndex]?.cer}
                </div>
            </Overlay>
            <Overlay isOpen={showFinalResults} onClose={() => { handleCloseFinalResults() }}>
                <h2>Speech Evaluation</h2>
                <div>
                    - Transcription: {evalData[selectedEvalIndex]?.transcription} <br></br>
                    - Reference text: {evalData[selectedEvalIndex]?.expected_text} <br></br>
                    - Transcription phoneme: {evalData[selectedEvalIndex]?.transcription_phoneme} <br></br>
                    - Reference phoneme: {evalData[selectedEvalIndex]?.expected_phoneme} <br></br>
                    - WER: {evalData[selectedEvalIndex]?.wer} <br></br>
                    - CER: {evalData[selectedEvalIndex]?.cer}
                </div>
            </Overlay>
        </div>
    );
}