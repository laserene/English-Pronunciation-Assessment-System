import { JSX } from "react";
import { useNavigate } from "react-router-dom";
import CarouselPanel from "./carousel_panel.tsx";
import IELTSSpeakingImage from "../../assets/images/4-li-do-khien-ban-mai-khong-tang-duoc-diem-speaking-ielts.jpg";
import FreeConversationImage from "../../assets/images/pexels-photo-6697000.jpeg";
import "./index.css";

export default function OpenConversationPanel(): JSX.Element {
    const items = [
        { id: 1, topic: "IELTS Speaking Simulation", background_url: IELTSSpeakingImage },
        { id: 2, topic: "Free Conversation", background_url: FreeConversationImage }
    ]

    const navigate = useNavigate();
    const handleClick = (topic: string) => {
        navigate("/open_conversation", { state: { topic } });
    };

    return (
        <div>
            <CarouselPanel title="Open Conversation.">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="carousel-item"
                        style={{
                            backgroundImage: `url(${item.background_url || "https://i.pinimg.com/1200x/9a/06/01/9a06011eb18bc859474dd22d003cd57c.jpg"
                                })`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                        onClick={() => handleClick(item.topic)}
                    >
                        {item.topic}
                    </div>
                ))}
                <div className="space-item"></div>
            </CarouselPanel>
        </div>
    );
}
