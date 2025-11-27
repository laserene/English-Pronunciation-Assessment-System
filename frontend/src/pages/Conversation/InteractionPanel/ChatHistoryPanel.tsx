import { JSX, useState, useEffect, useRef } from "react";
import axios from "axios";
import InputModePanel from "./InputModePanel.tsx";
import "../index.css";

export default function SuggestionPanel(): JSX.Element {
  const [messages, setMessages] = useState([]);

  const expandedHeight = "320px";
  const messageContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response : any = await axios.get("http://127.0.0.1:8000/conversations/1/messages");
        setMessages(response.data.messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }

    fetchMessages();

    setTimeout(() => {
      if (messageContainer.current) {
        messageContainer.current.scrollTop =
          messageContainer.current.scrollHeight;
      }
    }, 0.001);
  }, []);

  return (
    <div className="interaction-block">
      <div className="interaction-block-title-wrapper">
        <div>Cuộc trò chuyện</div>
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
          {messages.map((msg: any, index: number) => (
            <div
              key={index}
              className={`message-item ${
                msg.user_id === null ? "receiver" : "sender"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
      </div>
      <InputModePanel />
    </div>
  );
}
