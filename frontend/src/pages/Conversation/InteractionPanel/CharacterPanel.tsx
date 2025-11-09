import { JSX } from "react";
import "../index.css";

export default function CharacterPanel(): JSX.Element {
  return (
    <div className="interaction-block">
      <div className="interaction-block-title-wrapper">Nhân vật</div>
      <div className="interaction-block-content expanded">
        <div className="interaction-block-content-inner"></div>
      </div>
    </div>
  );
}
