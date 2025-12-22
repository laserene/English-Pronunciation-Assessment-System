import { JSX } from "react";
import "./index.css";

export default function ElementListPanel({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <div className="element-list-panel">
            {children}
        </div>
    );
}
