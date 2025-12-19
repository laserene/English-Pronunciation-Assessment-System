import { JSX, useState, useRef, useEffect } from "react";
import "./index.css";

interface ScriptTurn {
  turn_index: number;
  speaker: "AI" | "USER";
  expected_text: string;
}

export default function MessagePanel(
  { height, script, children }:
    { height: number, script: ScriptTurn[], children?: React.ReactNode }
): JSX.Element {

  const [messages, setMessages] = useState([]);
  const expandedHeight = `${height}px`;
  const messageContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(script);
  }, [script]);

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
          {messages.map((msg, index: number) => (
            <div
              key={index}
              className={`message-item ${msg.user_id === null ? "receiver" : "sender"
                }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}
