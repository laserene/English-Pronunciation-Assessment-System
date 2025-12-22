import { JSX } from "react";
import "./index.css";

export default function NavigationElement({ content, handleClick, children }: { content: string, handleClick?: () => void, children?: React.ReactNode }): JSX.Element {
    return (
        <div className="navigation-element element-list" onClick={handleClick}>
            <span>{children}</span>
            <div className="navigation-title">
                {content}
            </div>
        </div>
    );
}
