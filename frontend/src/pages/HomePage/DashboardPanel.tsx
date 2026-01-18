import { JSX } from "react";
import { useNavigate } from "react-router-dom";
import CarouselPanel from "./CarouselPanel.tsx";
import WERImage from "../../assets/images/words.jpg"
import CharacterImage from "../../assets/images/characters.jpg"
import PhonemeImage from "../../assets/images/istockphoto-1989957402-1024x1024.jpg"
import PlaceholderImage from "../../assets/images/17a5f1b042267ce046b552527c248b94.jpg"
import "./index.css";

export default function DashboardPanel(): JSX.Element {
    const items = [
        { id: 1, topic: "Word Error Rate", banner_color: "#f38384", background_url: WERImage },
        { id: 2, topic: "Character Error Rate", banner_color: "rgb(141 109 255)", background_url: CharacterImage },
        { id: 3, topic: "Phoneme Accuracy", banner_color: "rgb(196 136 31)", background_url: PhonemeImage },
    ]
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/dashboard");
    };

    return (
        <div>
            <CarouselPanel title="Your Learning Progress." scrollAmount={360}>
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
                        <div
                            className="carousel-item-banner"
                            style={{ backgroundColor: item.banner_color }}>
                            {item.topic}
                        </div>
                    </div>
                ))}
                <div className="space-item"></div>
            </CarouselPanel>
        </div>
    )
}