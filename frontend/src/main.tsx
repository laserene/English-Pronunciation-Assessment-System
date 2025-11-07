import { createRoot } from "react-dom/client";
import ConversationPage from "./pages/Conversation/index.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <>
    <ConversationPage />
  </>
);
