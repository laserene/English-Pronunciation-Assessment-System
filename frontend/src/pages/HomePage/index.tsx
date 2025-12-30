import { JSX } from "react";
import Header from "./header.tsx";
import Banner from "./banner.tsx";
import ScenariosPanel from "./ScenariosPanel.tsx";
import RolePlayPanel from "./RolePlayPanel.tsx"
import "./index.css";

export default function HomePage(): JSX.Element {
  return (
    <div id="homepage">
      <Header />
      <Banner />
      {/* <OpenConversationPanel /> */}
      <ScenariosPanel />
      <RolePlayPanel />
    </div >
  );
}
