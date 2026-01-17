import { JSX } from "react";
import { useNavigate } from "react-router-dom";
import CarouselPanel from "./CarouselPanel.tsx";
import DashboardImage from "../../assets/images/ChatGPT Image Jan 12, 2026, 05_24_26 AM.png"
import PlaceholderImage from "../../assets/images/17a5f1b042267ce046b552527c248b94.jpg"
import "./index.css";

export default function DashboardPanel(): JSX.Element {
    const items = [
        { id: 1, topic: "Dashboard", background_url: DashboardImage },
    ]
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/dashboard");
    };

    return (
        <div>
            <CarouselPanel title="Learning Progress." scrollAmount={360}>
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="carousel-item large-carousel-item"
                        style={{
                            backgroundImage: `url(${item.background_url || PlaceholderImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                        onClick={() => handleClick()}
                    >
                        {item.topic}
                    </div>
                ))}
                <div className="space-item"></div>
            </CarouselPanel>
        </div>
    )
}