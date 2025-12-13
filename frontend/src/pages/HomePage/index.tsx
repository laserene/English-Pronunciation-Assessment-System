import { JSX } from "react";
import Header from "./header.tsx";
import Banner from "./banner.tsx";
import ScenarioPanel from "./scenario_panel.tsx";
import OpenConversationPanel from "./open_conversation_panel.tsx";
import RolePlayPanel from "./role_play.tsx"
import "./index.css";

export default function HomePage(): JSX.Element {
  return (
    <div id="homepage">
      <Header />
      <Banner />
      <OpenConversationPanel />
      <ScenarioPanel />
      <RolePlayPanel />
    </div >
  );
}
