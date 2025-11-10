import { JSX, use, useState } from "react";
import MicVisualizer from "./MicVisualizer.tsx";
import TypingInput from "./TypingInput.tsx";
import "../index.css";

export default function InputModePanel(): JSX.Element {
  const [inputMode, onModeChange] = useState<"voice" | "keyboard">("voice");
  const expandedHeight = "200px";
  return (
    <div className="interaction-block">
      <div className="interaction-block-title-wrapper">
        <div>Chế độ giao tiếp</div>
      </div>
      <div
        className="interaction-block-content expanded"
        style={{ "--expanded-height": expandedHeight } as React.CSSProperties}
      >
        <div className="interaction-block-content-inner">
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
        </div>
      </div>
    </div>
  );
}
