import { JSX, useState } from "react";
import "./index.css";

export default function SuggestionPanel({ title, elements }: { title: string, elements: string[] }): JSX.Element {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  const expandedHeight = "112px";
  return (
    <div className="interaction-block">
      <div className="interaction-block-title-wrapper">
        <div>{title}</div>
        <button className="conversation-btn toggle-btn" onClick={toggleExpanded}>
          {isExpanded ? "Collapse ▲" : "Expand ▼"}
        </button>
      </div>
      <div
        className={`interaction-block-content ${isExpanded ? "expanded" : "collapsed"
          }`}
        style={{ "--expanded-height": expandedHeight } as React.CSSProperties}
      >
        <div className="interaction-block-content-inner suggestion-grid">
          {elements.map((element, index) => (
            <span key={index} className="suggestion-item">
              {element}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
