import { JSX } from "react";
import CharacterPanel from "./CharacterPanel.tsx";
import SuggestionPanel from "./SuggestionPanel.tsx";
import ChatHistoryPanel from "./ChatHistoryPanel.tsx";
import InputModePanel from "./InputModePanel.tsx";
import "../index.css";

export default function InteractionPanel(): JSX.Element {
  return (
    <div className="interaction-panel">
      <CharacterPanel />
      <SuggestionPanel />
      <ChatHistoryPanel />
      <InputModePanel />
    </div>
  );
}
