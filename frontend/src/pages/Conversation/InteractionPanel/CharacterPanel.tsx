import { JSX } from "react";
import "../index.css";

export default function SuggestionPanel(): JSX.Element {
  const expandedHeight = "80px";
  return (
    <div className="interaction-block">
      <div className="interaction-block-title-wrapper">
        <div>Nhân vật</div>
      </div>
      <div
        className="interaction-block-content expanded"
        style={{ "--expanded-height": expandedHeight } as React.CSSProperties} 
      >
        <div className="interaction-block-content-inner">
          Đây là nhân vật của bạn.
        </div>
      </div>
    </div>
  );
}
