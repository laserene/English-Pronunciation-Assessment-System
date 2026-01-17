import { JSX } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";


export default function Header({ scenario_name }: { scenario_name: string }): JSX.Element {
    const navigate = useNavigate();
    return (
        <div id="learn-screen-header">
            <div className="leave-icon" onClick={() => {
                navigate("/");
            }}></div>
            <div className="scenario-name">
                {scenario_name}
            </div>
            <div></div>
        </div>
    );
}
