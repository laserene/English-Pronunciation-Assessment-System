import { JSX, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CarouselPanel from "./CarouselPanel.tsx";
import axiosInstance from "../../utils/axios.ts";
import PlaceholderImage from "../../assets/images/9a06011eb18bc859474dd22d003cd57c.jpg";
import "./index.css";

interface Scenario {
	id: number;
	scenario_name: string;
	level: string;
	image_path?: string | null;
}

export default function ScenariosPanel({ createScenario }: { createScenario: (isOpen: boolean) => void }): JSX.Element {
	const navigate = useNavigate();
	const practiceScenario = (scenario_id: number) => {
		navigate(`scenario/${scenario_id}`);
	};

	const [scenarios, setScenarios] = useState<Scenario[]>([]);

	const getLevelColor = (level: string) => {
		switch (level.toLowerCase()) {
			case 'beginner':
				return '#22c55e';
			case 'intermediate':
				return '#eab308';
			case 'advanced':
				return '#ef4444';
			default:
				return '#6b7280';
		}
	};

	const capitalizeLevel = (level: string) => {
		return level.charAt(0).toUpperCase() + level.slice(1);
	};

	useEffect(() => {
		const fetchScenarios = async () => {
			const res = await axiosInstance.get("/scenarios");
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
						onClick={() => practiceScenario(scenario.id)}
					>
						{scenario.scenario_name}

						<div className="level-badge">
							<div
								className="level-circle"
								style={{ backgroundColor: getLevelColor(scenario.level) }}
							/>
							<span className="level-text">{capitalizeLevel(scenario.level)}</span>
						</div>
					</div>
				))}
				<div
					className="carousel-item"
					style={{
						backgroundImage: `url(${PlaceholderImage})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
					onClick={() => { createScenario(true) }}
				>
					<div className="carousel-item-title" >
						Create your own Scenario!
					</div>
				</div>
				<div className="space-item"></div>
			</CarouselPanel>
		</div>
	);
}
