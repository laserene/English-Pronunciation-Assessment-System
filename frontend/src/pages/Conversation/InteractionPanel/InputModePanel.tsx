import { JSX, useState } from "react";
import MicVisualizer from "./MicVisualizer.tsx";
import TypingInput from "./TypingInput.tsx";
import "../index.css";

export default function InputModePanel(): JSX.Element {
  const [inputMode, onModeChange] = useState<"voice" | "typing" | null>(null);
  const expandedHeight = "240px";
  return (
    <div className="interaction-block">
      <div className="interaction-block-title-wrapper">
        <div>Chế độ giao tiếp</div>
      </div>
      <div
        className="interaction-block-content expanded"
        style={{ "--expanded-height": expandedHeight } as React.CSSProperties}
      >
        <div id="input-mode-content" className="interaction-block-content-inner no-bottom-padding">
          {(inputMode === "voice" || inputMode === null) && <MicVisualizer />}
          {inputMode === "typing" && <TypingInput />}
          <div className="mode-btn-panel">
            <button
              className={`mode-btn ${inputMode === "voice" ? "active" : ""}`}
              onClick={() => {
                if (inputMode === "voice") onModeChange(null);
                else onModeChange("voice");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="-12 -12 48 48"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
                />
              </svg>
            </button>
            <button className="mode-btn" onClick={() => onModeChange("typing")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path d="M10 8h.01M12 12h.01M14 8h.01M16 12h.01M18 8h.01M6 8h.01M7 16h10m-9-4h.01"></path>
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
