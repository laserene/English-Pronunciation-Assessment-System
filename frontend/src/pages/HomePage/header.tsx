import { JSX } from "react";
import "./index.css";

interface User {
    id: number;
    username: string;
    email: string;
}

export default function Header({ user }: { user: User }): JSX.Element {
    return (
        <>
            <div id="header">
                <div className="welcome-text">
                    {user && <span>Welcome back, {user.username}!</span>}
                </div>
                <div className="avatar"></div>
            </div>
        </>
    );
}
