import { JSX } from "react";
import { useNavigate } from "react-router-dom";
import CarouselPanel from "./carousel_panel.tsx";
import FrierenImage from "../../assets/images/1344002.jpeg"
import PlaceholerImage from "../../assets/images/17a5f1b042267ce046b552527c248b94.jpg"
import "./index.css";

export default function RolePlayPanel(): JSX.Element {
    const items = [
        { id: 1, topic: "Sousou no Frieren", background_url: FrierenImage },
        { id: 2, topic: "Freestyle", background_url: null },
    ]
    const navigate = useNavigate();
    const handleClick = (topic: string) => {
        navigate("/role_play", { state: { topic } });
    };

    return (
        <div>
            <CarouselPanel title="Role-Play" scrollAmount={360}>
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="carousel-item large-carousel-item"
                        style={{
                            backgroundImage: `url(${item.background_url || PlaceholerImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                        onClick={() => handleClick(item.topic)}
                    >
                        {item.topic}
                    </div>
                ))}
                {/* Add space after the last carousel item */}
                <div className="space-item"></div>
            </CarouselPanel>
        </div>
    )
}