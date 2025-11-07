import { JSX } from "react";
import "./index.css";
import Live2DPanel from "./Live2DPanel.tsx";
import InteractionPanel from "./InteractionPanel/InteractionPanel.tsx";

export default function ConversationPage(): JSX.Element {
  return (
    <>
      <Live2DPanel />
      <InteractionPanel />
    </>
  );
}
