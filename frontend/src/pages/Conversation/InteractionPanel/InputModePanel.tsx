import { JSX, use, useState } from "react";
import MicVisualizer from "./MicVisualizer.tsx";
import TypingInput from "./TypingInput.tsx";
import "../index.css";

export default function InputModePanel(): JSX.Element {
  const [inputMode, onModeChange] = useState<"voice" | "keyboard">("voice");
  return (
    <>
      {inputMode === "voice" && <MicVisualizer />}
      {inputMode === "keyboard" && <TypingInput />}
      <div className="interaction-block">
        <button
          onClick={() => onModeChange("voice")}
          disabled={inputMode === "voice"}
        >
          🎤 Mic Mode
        </button>
        <button
          onClick={() => onModeChange("keyboard")}
          disabled={inputMode === "keyboard"}
        >
          ⌨️ Keyboard Mode
        </button>
      </div>
    </>
  );
}
