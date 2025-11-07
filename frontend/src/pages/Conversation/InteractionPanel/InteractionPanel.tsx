import { useState, JSX } from "react";
import SuggestionPanel from "./SuggestionPanel.tsx";
import InputModePanel from "./InputModePanel.tsx";
import MicVisualizer from "./MicVisualizer.tsx";
import TypingInput from "./TypingInput.tsx";

export default function InteractionPanel(): JSX.Element {
  const [inputMode, setInputMode] = useState<"voice" | "keyboard">("voice");
  return (
    <div className="interaction-panel">
      <SuggestionPanel />
      <>
        {inputMode === "voice" && <MicVisualizer />}
        <InputModePanel currentMode={inputMode} onModeChange={setInputMode} />
        {inputMode === "keyboard" && <TypingInput />}
      </>
    </div>
  );
}
