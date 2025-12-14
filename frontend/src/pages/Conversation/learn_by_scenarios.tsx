import { JSX } from "react";
import { useLocation } from "react-router-dom";
import { ScenarioContext } from "./scenario_context.tsx";
import Live2DPanel from "./Live2DPanel.tsx";
import InteractionPanel from "./Components/InteractionPanel.tsx";
import SuggestionPanel from "./Components/SuggestionPanel.tsx";
import MessagePanel from "./Components/MessagePanel.tsx";
import InputModePanel from "./Components/InputModePanel.tsx";

export default function LearnByScenarios(): JSX.Element {
    const { state } = useLocation() as {
        state: { topic: string; vocabulary: string[] };
    };

    return (
        <ScenarioContext.Provider value={state}>
            <div className="flex">
                <Live2DPanel />
                <InteractionPanel>
                    <SuggestionPanel />
                    <MessagePanel>
                        <InputModePanel showVoiceButton={true} showTypingButton={false} />
                    </MessagePanel>
                </InteractionPanel>
            </div>
        </ScenarioContext.Provider>
    );
}