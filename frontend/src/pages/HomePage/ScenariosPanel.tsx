import { JSX, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CarouselPanel from "./CarouselPanel.tsx";
import axiosInstance from "../../utils/axios.ts";
import PlaceholderImage from "../../assets/images/9a06011eb18bc859474dd22d003cd57c.jpg";
import "./index.css";

interface Scenario {
  id: number;
  scenario_name: string;
  image_path?: string | null;
}

export default function ScenariosPanel(): JSX.Element {
  const navigate = useNavigate();
  const handleClick = (scenario_id: number) => {
    navigate(`me/scenario/${scenario_id}/versions`);
  };

  const [scenarios, setScenarios] = useState<Scenario[]>([]);

  useEffect(() => {
    const fetchScenarios = async () => {
      const res = await axiosInstance.get("/me/scenarios");
      setScenarios(res.data);
    };

    fetchScenarios();
  }, [])

  return (
    <div>
      <CarouselPanel title="Learn by Scenarios.">
        {/* Scenario items would go here */}
        {scenarios.map((scenario) => (
          <div
            key={scenario.id}
            className="carousel-item"
            style={{
              backgroundImage: `url(${scenario.image_path || PlaceholderImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={() => handleClick(scenario.id)}
          >
            {scenario.scenario_name}
          </div>
        ))}
        <div className="space-item"></div>
      </CarouselPanel>
    </div>
  );
}
