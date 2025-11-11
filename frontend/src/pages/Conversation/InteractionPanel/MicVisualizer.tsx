import { JSX } from "react";
import "../index.css";

export default function MicVisualizer({
  canvasRef,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}): JSX.Element {
  return (
    <>
      <canvas ref={canvasRef} style={{ height: "100px", width: "100%" }} />
    </>
  );
}
