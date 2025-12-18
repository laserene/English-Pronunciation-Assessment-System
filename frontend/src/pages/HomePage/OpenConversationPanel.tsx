import { JSX } from "react";
import { useNavigate } from "react-router-dom";
import CarouselPanel from "./CarouselPanel.tsx";
import IELTSSpeakingImage from "../../assets/images/4-li-do-khien-ban-mai-khong-tang-duoc-diem-speaking-ielts.jpg";
import FreeConversationImage from "../../assets/images/pexels-photo-6697000.jpeg";
import PlaceholderImage from "../../assets/images/9a06011eb18bc859474dd22d003cd57c.jpg"
import "./index.css";

export default function OpenConversationPanel(): JSX.Element {
    const items = [
        { id: 1, topic: "IELTS Speaking Simulation", path: "ielts", background_url: IELTSSpeakingImage },
        { id: 2, topic: "Free Conversation", path: "custom", background_url: FreeConversationImage },
    ]

    const navigate = useNavigate();
    const handleClick = (path: string) => {
        navigate(`/${path}`);
    };

    return (
        <div>
            <CarouselPanel title="Open Conversation.">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="carousel-item"
                        style={{
                            backgroundImage: `url(${item.background_url || PlaceholderImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                        onClick={() => handleClick(item.path)}
                    >
                        {item.topic}
                    </div>
                ))}
                <div className="space-item"></div>
            </CarouselPanel>
        </div>
    );
}
