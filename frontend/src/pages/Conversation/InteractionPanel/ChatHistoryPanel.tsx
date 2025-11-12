import { JSX, useState } from "react";
import "../index.css";

export default function SuggestionPanel(): JSX.Element {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  const expandedHeight = "200px";
  return (
    <div className="interaction-block">
      <div className="interaction-block-title-wrapper">
        <div>Cuộc trò chuyện</div>
        <button className="conversation-btn toggle-btn" onClick={toggleExpanded}>
          {isExpanded ? "Thu gọn ▲" : "Mở rộng ▼"}
        </button>
      </div>
      <div
        className={`interaction-block-content ${
          isExpanded ? "expanded" : "collapsed"
        }`}
        style={{ "--expanded-height": expandedHeight } as React.CSSProperties} 
      >
        <div className="interaction-block-content-inner">
          Đây là cuộc trò chuyện của bạn.
        </div>
      </div>
    </div>
  );
}
