import { JSX, useRef, useState } from "react";
import MicVisualizer from "./MicVisualizer.tsx";
import ChatInput from "./ChatInput.tsx";
import "../index.css";

export default function InputModePanel(): JSX.Element {
  const [inputMode, onModeChange] = useState<"voice" | "typing" | null>(null);
  const expandedHeight = "auto";

  // Audio functions
  const streamRef = useRef(null);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    streamRef.current = stream;

    const audioContext = new AudioContext();
    audioContextRef.current = audioContext;

    const source = audioContext.createMediaStreamSource(stream);

    const analyser = audioContext.createAnalyser();
    analyserRef.current = analyser;

    analyser.fftSize = 1024;
    analyser.smoothingTimeConstant = 0.85;
    analyser.minDecibels = -70;
    analyser.maxDecibels = -10;

    source.connect(analyser);

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const width = canvas.width;
      const height = canvas.height;

      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.fillRect(0, 0, width, height);

      const barWidth = 2;
      const spacing = 4;

      ctx.fillStyle = "rgba(151, 229, 255, 1)"; // Blue color

      for (let i = 0; i < dataArray.length; i++) {
        const normalized = dataArray[i] / 255;
        const barHeight = normalized * (height * 1.6) + 2;

        const x = i * spacing;
        const y = height / 2 - barHeight / 2;

        // Draw rounded bar
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, barWidth / 2);
        ctx.fill();
      }
    };

    draw();
  };

  const stopRecording = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track: any) => track.stop());
      streamRef.current = null;
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  };

  return (
    <div
      className="interaction-block-content expanded"
      style={{ "--expanded-height": expandedHeight } as React.CSSProperties}
    >
      <div
        id="input-mode-container"
        className="interaction-block-content-inner"
      >
        {(inputMode === "voice" || inputMode === null) && (
          <MicVisualizer canvasRef={canvasRef} />
        )}
        {inputMode === "typing" && <ChatInput />}
        <div className="mode-btn-container">
          <button
            className={`conversation-btn mode-btn ${
              inputMode === "voice" ? "active" : ""
            }`}
            onClick={() => {
              if (inputMode === "voice") {
                onModeChange(null);
                stopRecording();
              } else {
                onModeChange("voice");
                startRecording();
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="-12 -12 48 48"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
              />
            </svg>
          </button>
          <button
            className={`conversation-btn mode-btn ${
              inputMode === "typing" ? "active" : ""
            }`}
            onClick={() => {
              onModeChange("typing");
              stopRecording();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 -2 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <path d="M10 8h.01M12 12h.01M14 8h.01M16 12h.01M18 8h.01M6 8h.01M7 16h10m-9-4h.01"></path>
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
