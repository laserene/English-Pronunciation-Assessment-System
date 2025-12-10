import { JSX } from "react";

import CarouselPanel from "./carousel_panel.tsx";

import WeatherImage from "../../assets/images/HD-wallpaper-landscape-cloudy-field-nature-sky-storm-weather.jpg";
import EconomyImage from "../../assets/images/premium_photo-1670176446562-5c9712c12d74.jpg";
import EnvironmentImage from "../../assets/images/7329c391ef63545d275a94b0c2d3f40a.jpg";
import SocialNetworkImage from "../../assets/images/346e367abed9d42893fe2a50eb305e0d.jpg";
import FoodImage from "../../assets/images/772f414e5f29bd8b205a668d28ffc92b.jpg";
import "./index.css";

export default function ScenarioPanel(): JSX.Element {
  const items = [
    {
      id: 1,
      name: "Weather",
      background_url: WeatherImage,
    },
    { id: 2, name: "Economy", background_url: EconomyImage },
    { id: 3, name: "Environment", background_url: EnvironmentImage },
    { id: 4, name: "Social Network", background_url: SocialNetworkImage },
    { id: 5, name: "Food", background_url: FoodImage },
  ];
  return (
    <div>
      <CarouselPanel title="Learn by Scenarios.">
        {/* Scenario items would go here */}
        {items.map((item, i) => (
          <div
            key={item.id}
            className="scenario-item"
            style={{
              backgroundImage: `url(${
                item.background_url || "https://via.placeholder.com/150"
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {item.name}
          </div>
        ))}
        <div className="space-item"></div>
      </CarouselPanel>
    </div>
  );
}
