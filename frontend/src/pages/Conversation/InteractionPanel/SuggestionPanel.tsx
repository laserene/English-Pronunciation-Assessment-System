import { JSX, useState } from "react";
import "../index.css";

export default function SuggestionPanel(): JSX.Element {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  const expandedHeight = "80px";
  return (
    <div className="interaction-block">
      <div className="interaction-block-title-wrapper">
        <div>Đề xuất</div>
        <button className="toggle-btn" onClick={toggleExpanded}>
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
          Đây là đề xuất cho bạn.
        </div>
      </div>
    </div>
  );
}
