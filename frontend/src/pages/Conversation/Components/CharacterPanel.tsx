import { JSX, useState } from "react";
import "./index.css";

export default function SuggestionPanel(): JSX.Element {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  const expandedHeight = "100px";
  return (
    <div className="interaction-block">
      <div className="interaction-block-title-wrapper">
        <div>Nhân vật</div>
        <button
          className="conversation-btn toggle-btn"
          onClick={toggleExpanded}
        >
          {isExpanded ? "Thu gọn ▲" : "Mở rộng ▼"}
        </button>
      </div>
      <div
        className={`interaction-block-content ${isExpanded ? "expanded" : "collapsed"
          }`}
        style={{ "--expanded-height": expandedHeight } as React.CSSProperties}
      >
        <div
          id="character-container"
          className="interaction-block-content-inner"
        >
          <button className="conversation-btn character-item avatar-haru"></button>
          <button className="conversation-btn character-item add-character-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
