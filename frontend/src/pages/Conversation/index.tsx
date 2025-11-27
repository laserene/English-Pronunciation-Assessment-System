import { JSX } from "react";
import Live2DPanel from "./Live2DPanel.tsx";
import InteractionPanel from "./InteractionPanel/InteractionPanel.tsx";
import "./index.css";

export default function ConversationPage(): JSX.Element {
  return (
    <div className="flex">
      <Live2DPanel />
      <InteractionPanel />
    </div>
  );
}
