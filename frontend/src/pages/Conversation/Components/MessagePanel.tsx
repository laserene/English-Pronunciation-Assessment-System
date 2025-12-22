import { JSX, useRef } from "react";
import "./index.css";

interface ScriptLine {
  speaker: "user" | "ai";
  turn_index: number;
  expected_text: string;
}

export default function MessagePanel(
  { height, scripts = [], children }:
    { height: number, scripts?: ScriptLine[], children?: React.ReactNode }
): JSX.Element {

  const expandedHeight = `${height}px`;
  const messageContainer = useRef<HTMLDivElement>(null);

  const playSample = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="interaction-block">
      <div className="interaction-block-title-wrapper">
        <div>Dialogue Script</div>
      </div>
      <div
        className="interaction-block-content expanded"
        style={{ "--expanded-height": expandedHeight } as React.CSSProperties}
      >
        <div
          id="message-history-container"
          className="interaction-block-content-inner"
          ref={messageContainer}
        >
          {scripts.map((script, index: number) => (
            <div
              key={index}
              className={`message-item ${script.speaker === "ai" ? "ai-message" : "user-message"
                }`}
            >
              {script.expected_text}
            </div>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}
