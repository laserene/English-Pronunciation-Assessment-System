import { JSX, useEffect, useRef, useState } from "react";
import "../index.css";

export default function ChatInput(): JSX.Element {
  const [userInput, setUserInput] = useState("");

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.innerText += e.clipboardData.getData("text/plain");
  };

  const inputRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <div
        ref={inputRef}
        className="user-input"
        contentEditable
        onInput={(e) => setUserInput(e.currentTarget.innerText)}
        onPaste={handlePaste}
        suppressContentEditableWarning
      ></div>
    </>
  );
}
