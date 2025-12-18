import { JSX } from "react";
import Live2DPanel from "./Live2DPanel.tsx";
import InteractionPanel from "./Components/InteractionPanel.tsx";
import SuggestionPanel from "./Components/SuggestionPanel.tsx";
import MessagePanel from "./Components/MessagePanel.tsx";
import InputModePanel from "./Components/InputModePanel.tsx";

export default function LearnByScenarios(): JSX.Element {
    return (
        <div className="flex">
            <Live2DPanel />
            <InteractionPanel>
                <SuggestionPanel />
                <MessagePanel height={350}>
                    <InputModePanel showVoiceButton={true} showTypingButton={false} />
                </MessagePanel>
            </InteractionPanel>
        </div>
    );
}