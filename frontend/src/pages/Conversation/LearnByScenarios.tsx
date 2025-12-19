import { JSX } from "react";
import { useParams } from "react-router-dom";
import Live2DPanel from "./Live2DPanel.tsx";
import InteractionPanel from "./Components/InteractionPanel.tsx";
import SuggestionPanel from "./Components/SuggestionPanel.tsx";
import MessagePanel from "./Components/MessagePanel.tsx";
import InputModePanel from "./Components/InputModePanel.tsx";
import { useScenarioScript } from "../../hooks/useScenarioScript.tsx";

export default function LearnByScenarios(): JSX.Element {
    const { scenario_id } = useParams<{ scenario_id: string }>();
    const { script, loading, error } = useScenarioScript(scenario_id);
    return (
        <div className="flex">
            <Live2DPanel />
            <InteractionPanel>
                <SuggestionPanel />
                <MessagePanel height={350} script={script}>
                    <InputModePanel showVoiceButton={true} showTypingButton={false} />
                </MessagePanel>
            </InteractionPanel>
        </div>
    );
}