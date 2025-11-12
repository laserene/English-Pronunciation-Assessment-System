import { JSX, useEffect, useRef } from "react";
import "../index.css";
import InputModePanel from "./InputModePanel.tsx";

export default function SuggestionPanel(): JSX.Element {
  const expandedHeight = "320px";
  const messageContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
          <div className="message-item receiver">Hi</div>
          <div className="message-item sender">
            HelloHow about your seizing the words?How about your seizing the
            words?How about your seizing the words?How about your seizing the
            words?How about your seizing the words?How about your seizing the
            words?How about your seizing the words?How about your seizing the
            words?How about your seizing the words?How about your seizing the
            words?How about your seizing the words?How about your seizing the
            words?How about your seizing the words?How about your seizing the
            words?
          </div>
          <div className="message-item receiver">
            HelloHow about your seizing the words?How about your seizing the
            words?How about your seizing the words?How about your seizing the
            words?How about your seizing the words?How about your seizing the
            words?How about your seizing the words?How about your seizing the
            words?How about your seizing the words?How about your seizing the
            words?How about your seizing the words?How about your seizing the
            words?How about your seizing the words?How about your seizing the
            words?
          </div>
        </div>
      </div>
      <InputModePanel />
    </div>
  );
}
