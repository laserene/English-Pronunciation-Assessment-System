/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { useEffect, useRef, JSX } from "react";
import { LAppDelegate } from "./lappdelegate";
import * as LAppDefine from "./lappdefine";

export default function Live2DCanvas(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /**
     * ブラウザロード後の処理
     */
    window.addEventListener(
      "load",
      (): void => {
        // Initialize WebGL and create the application instance
        if (!LAppDelegate.getInstance().initialize(containerRef.current)) {
          return;
        }

        LAppDelegate.getInstance().run();
      },
      { passive: true }
    );

    /**
     * 終了時の処理
     */
    window.addEventListener(
      "beforeunload",
      (): void => LAppDelegate.releaseInstance(),
      { passive: true }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="live2d-container"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
      }}
    />
  );
}
