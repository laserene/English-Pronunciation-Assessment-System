import { JSX, useState } from "react";
import "./index.css";

export default function SuggestionPanel(): JSX.Element {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  const expandedHeight = "120px";
  return (
    <div className="interaction-block">
      <div className="interaction-block-title-wrapper">
        <div>Suggestions</div>
        <button className="conversation-btn toggle-btn" onClick={toggleExpanded}>
          {isExpanded ? "Collapse ▲" : "Expand ▼"}
        </button>
      </div>
      <div
        className={`interaction-block-content ${isExpanded ? "expanded" : "collapsed"
          }`}
        style={{ "--expanded-height": expandedHeight } as React.CSSProperties}
      >
        <div className="interaction-block-content-inner">
          These are recommended words.
        </div>
      </div>
    </div>
  );
}
