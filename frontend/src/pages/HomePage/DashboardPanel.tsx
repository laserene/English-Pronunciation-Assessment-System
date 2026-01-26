import { JSX } from "react";
import { useNavigate } from "react-router-dom";
import CarouselPanel from "./CarouselPanel.tsx";
import WERImage from "../../assets/images/words.jpg"
import "./index.css";

export default function DashboardPanel(): JSX.Element {
    const items = [
        { id: 1, topic: "WER & CER", path: "/performance", banner_color: "#f38384", background_url: WERImage },
        // { id: 2, topic: "Phoneme Accuracy", path: "/phoneme", banner_color: "rgb(196 136 31)", background_url: PhonemeImage },
    ]
    const navigate = useNavigate();
    const handleClick = (path: string) => {
        navigate(path);
    };

    return (
        <div>
            <CarouselPanel title="Your Speaking Results." scrollAmount={360}>
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="carousel-item large-carousel-item"
                        style={{
                            backgroundImage: `url(${item.background_url})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                        onClick={() => handleClick(item.path)}
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