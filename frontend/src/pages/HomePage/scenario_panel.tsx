import { JSX } from "react";
import { useNavigate } from "react-router-dom";

import CarouselPanel from "./carousel_panel.tsx";

import WeatherImage from "../../assets/images/HD-wallpaper-landscape-cloudy-field-nature-sky-storm-weather.jpg";
import EconomyImage from "../../assets/images/premium_photo-1670176446562-5c9712c12d74.jpg";
import EnvironmentImage from "../../assets/images/7329c391ef63545d275a94b0c2d3f40a.jpg";
import SocialNetworkImage from "../../assets/images/346e367abed9d42893fe2a50eb305e0d.jpg";
import FoodImage from "../../assets/images/772f414e5f29bd8b205a668d28ffc92b.jpg";
import PlaceholderImage from "../../assets/images/9a06011eb18bc859474dd22d003cd57c.jpg"
import "./index.css";

export default function ScenarioPanel(): JSX.Element {
  const items = [
    { id: 1, topic: "Weather", background_url: WeatherImage, vocabulary: ["sunny", "cloudy", "windy", "humid", "forecast", "precipitation", "thunderstorm", "lightning", "drizzle", "heatwave", "hail", "breeze", "overcast", "temperature", "climate", "atmosphere", "meteorology", "barometric pressure", "visibility", "UV index",], },
    { id: 2, topic: "Economy", background_url: EconomyImage, vocabulary: ["budget", "inflation", "recession", "GDP", "interest rate", "tax", "investment", "profit", "loss", "market", "supply", "demand", "import", "export", "monopoly", "stock", "currency", "unemployment", "consumer spending", "economic growth",], },
    { id: 3, topic: "Environment", background_url: EnvironmentImage, vocabulary: ["pollution", "recycle", "ecosystem", "biodiversity", "habitat", "endangered species", "climate change", "global warming", "carbon footprint", "renewable energy", "conservation", "deforestation", "emissions", "sustainability", "greenhouse gas", "waste management", "natural resources", "water scarcity", "ecosystem restoration", "environmental protection",], },
    { id: 4, topic: "Social Network", background_url: SocialNetworkImage, vocabulary: ["post", "comment", "share", "follow", "notification", "hashtag", "algorithm", "engagement", "profile", "viral", "feed", "timeline", "direct message", "influencer", "privacy settings", "community guidelines", "content creator", "user-generated content", "trend", "interaction",], },
    { id: 5, topic: "Food", background_url: FoodImage, vocabulary: ["ingredient", "recipe", "flavor", "spicy", "savory", "sweet", "bitter", "aroma", "cuisine", "gourmet", "appetizer", "main course", "dessert", "nutrition", "calories", "organic", "seasoning", "fermentation", "balanced diet", "culinary",], },
  ];

  const navigate = useNavigate();
  const handleClick = (topic: string, vocabulary: Array<string>) => {
    navigate(`/scenario/${topic.toLocaleLowerCase()}`, { state: { topic, vocabulary } });
  };

  return (
    <div>
      <CarouselPanel title="Learn by Scenarios.">
        {/* Scenario items would go here */}
        {items.map((item) => (
          <div
            key={item.id}
            className="carousel-item"
            style={{
              backgroundImage: `url(${item.background_url || PlaceholderImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={() => handleClick(item.topic, item.vocabulary)}
          >
            {item.topic}
          </div>
        ))}
        <div className="space-item"></div>
      </CarouselPanel>
    </div>
  );
}
