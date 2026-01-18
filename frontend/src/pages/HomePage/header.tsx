import { JSX } from "react";
import "./index.css";

interface User {
    id: number;
    username: string;
    email: string;
}

export default function Header({ user }: { user: User }): JSX.Element {
    const handleLogout = async () => {
        try {
            await fetch("http://localhost:8000/auth/logout", {
                method: "POST",
                credentials: "include", // IMPORTANT for cookies
            });
        } catch (err) {
            console.error("Logout failed", err);
        } finally {
            localStorage.removeItem("access_token");
            window.location.href = "/login";
        }
    };

    return (
        <>
            <div id="header">
                <div className="welcome-text">
                    {user && <span>Welcome back, {user.username}!</span>}
                </div>
                <div className="avatar"></div>
                <div className="logout" onClick={
                    () => { handleLogout(); }
                }></div>
            </div>
        </>
    );
}
