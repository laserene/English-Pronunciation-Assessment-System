import { JSX } from "react";
import Live2DPanel from "./Live2DPanel.tsx";
import InteractionPanel from "./Components/InteractionPanel.tsx";
import SuggestionPanel from "./Components/SuggestionPanel.tsx";
import ChatHistoryPanel from "./Components/ChatHistoryPanel.tsx";
import InputModePanel from "./Components/InputModePanel.tsx";

export default function LearnByTopicConversation(): JSX.Element {
    return (
        <div className="flex">
            <Live2DPanel />
            <InteractionPanel>
                <SuggestionPanel />
                <ChatHistoryPanel>
                    <InputModePanel showVoiceButton={true} showTypingButton={false} />
                </ChatHistoryPanel>
            </InteractionPanel>
        </div>
    );
}