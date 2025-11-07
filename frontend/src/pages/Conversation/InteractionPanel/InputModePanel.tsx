import { JSX } from "react";

type InputModePanelProps = {
  currentMode: "voice" | "keyboard" | null;
  onModeChange: (mode: "voice" | "keyboard") => void;
};

export default function InputModePanel({
  currentMode,
  onModeChange,
}: InputModePanelProps): JSX.Element {
  return (
    <div>
      <button
        onClick={() => onModeChange("voice")}
        disabled={currentMode === "voice"}
      >
        🎤 Mic Mode
      </button>

      <button
        onClick={() => onModeChange("keyboard")}
        disabled={currentMode === "keyboard"}
      >
        ⌨️ Keyboard Mode
      </button>
    </div>
  );
}