import { JSX, useState } from "react";
import "../index.css";

export default function SuggestionPanel(): JSX.Element {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="interaction-block">
      <div className={`interaction-block-title-wrapper`}>
        <div>Đề xuất</div>
        <button id="toggle-suggestion" onClick={toggleExpanded}>
          {isExpanded ? "Thu gọn ▲" : "Mở rộng ▼"}
        </button>
      </div>
      <div
        className={`interaction-block-content ${
          isExpanded ? "expanded" : "collapsed"
        }`}
      >
        <div className="interaction-block-content-inner">
          Đây là đề xuất cho bạn.
        </div>
      </div>
    </div>
  );
}
