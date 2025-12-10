import { JSX } from "react";
import Header from "./header.tsx";
import Banner from "./banner.tsx";
import ScenarioPanel from "./scenario_panel.tsx";
import CarouselPanel from "./carousel_panel.tsx";
import "./index.css";

export default function HomePage(): JSX.Element {
  return (
    <>
      <Header />
      <Banner />
      <ScenarioPanel />
      <CarouselPanel title="Your Conversations."/>
    </>
  );
}
