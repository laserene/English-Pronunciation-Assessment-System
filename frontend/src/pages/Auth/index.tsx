import { JSX } from "react";
import "./index.css";

export default function AuthPage({ content }: { content: React.ReactNode }): JSX.Element {
  return (
    <div id="auth_page">
      {content}
    </div>
  );
}
