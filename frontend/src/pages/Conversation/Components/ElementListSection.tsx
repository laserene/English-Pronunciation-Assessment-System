import { JSX } from "react";
import "./index.css";

export default function ElementListSection({ title, children }: { title?: string, children?: React.ReactNode }): JSX.Element {
    return (
        <div>
            <div className="element-list-section-title">{title}</div>
            <div className="element-list-section">
                {children}
            </div>
        </div>
    )
}
