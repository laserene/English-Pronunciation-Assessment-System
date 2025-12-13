import { JSX } from "react";
import "./index.css";

export default function InteractionPanel(
  { children }: { children?: React.ReactNode }
): JSX.Element {
  return (
    <div className="interaction-panel">
      {children}
    </div>
  );
}
