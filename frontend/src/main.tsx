import { createRoot } from "react-dom/client";
import "./index.css";
import Live2DCanvas from "./live2d/src/live2dcanvas.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <Live2DCanvas />
  </>
);
