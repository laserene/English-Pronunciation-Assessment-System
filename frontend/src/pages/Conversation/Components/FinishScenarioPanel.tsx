import { JSX } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";


export default function FinishScenarioPanel({ onShowFinalResults }: { onShowFinalResults: () => void }): JSX.Element {
    const expandedHeight = "220px";
    const navigate = useNavigate();

    const handleNewSession = () => {
        navigate(0);
    };
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
                    onClick={() => handleNewSession()}
                >New Session</button>
                <button
                    className="conversation-btn finish-scenario-btn"
                    onClick={onShowFinalResults}>Your results</button>
            </div>
        </div>
    );
}