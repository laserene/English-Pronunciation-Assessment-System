import { JSX } from "react";
import "./index.css";


export default function FinishScenarioPanel({ onShowFinalResults }: { onShowFinalResults: () => void }): JSX.Element {
    const expandedHeight = "220px";

    return (
        <div
            className="interaction-block-content expanded"
            style={{
                "--expanded-height": expandedHeight,
                borderTop: "1px solid #d0d0d0",
                fontSize: "16px"
            } as React.CSSProperties}
        >
            <div className="input-mode-placeholder">
                Completed!
            </div>
            <div className="finish-scenario-btn-area">
                <button
                    className="conversation-btn finish-scenario-btn"
                    onClick={() => window.location.reload()}
                >New Session</button>
                <button
                    className="conversation-btn finish-scenario-btn"
                    onClick={onShowFinalResults}>Your results</button>
            </div>
        </div>
    );
}