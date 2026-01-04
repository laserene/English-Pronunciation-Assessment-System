import { JSX, useState } from "react";
import { useNavigate } from "react-router-dom";
import CarouselPanel from "./CarouselPanel.tsx";
import FrierenImage from "../../assets/images/1344002.jpeg"
import PlaceholderImage from "../../assets/images/17a5f1b042267ce046b552527c248b94.jpg"
import "./index.css";

interface RolePlay {
    id: number;
    role_play_name: string;
    description: string;
    user_role: string;
    level: string;
    image_path?: string | null;
}

export default function RolePlayPanel({ createRolePlay }: { createRolePlay: (isOpen: boolean) => void }): JSX.Element {
    const items = [
        { id: 1, topic: "Sousou no Frieren", background_url: FrierenImage },
    ]
    const [rolePlays, setRolePlays] = useState<RolePlay[]>([]);
    const navigate = useNavigate();
    const handleClick = (topic: string) => {
        navigate("/role_play", { state: { topic } });
    };

    return (
        <div>
            <CarouselPanel title="Role-Play." scrollAmount={360}>
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="carousel-item large-carousel-item"
                        style={{
                            backgroundImage: `url(${item.background_url || PlaceholderImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                        onClick={() => handleClick(item.topic)}
                    >
                        {item.topic}
                    </div>
                ))}
                <div
                    className="carousel-item large-carousel-item"
                    style={{
                        backgroundImage: `url(${PlaceholderImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                    onClick={() => { createRolePlay(true) }}
                >
                    <div>
                        Create your own Play!
                    </div>
                </div>
                <div className="space-item"></div>
            </CarouselPanel>
        </div>
    )
}