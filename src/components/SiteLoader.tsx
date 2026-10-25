"use client";

import { useEffect, useState } from "react";

type LoaderPhase = "visible" | "leaving" | "hidden";

export default function SiteLoader() {
  const [phase, setPhase] = useState<LoaderPhase>("visible");

  useEffect(() => {
    const startedAt = performance.now();
    let fallbackTimer: number | undefined;
    let exitTimer: number | undefined;
    let removeTimer: number | undefined;
    let exiting = false;

    const beginExit = () => {
      if (exiting) return;
      exiting = true;
      if (fallbackTimer !== undefined) window.clearTimeout(fallbackTimer);

      const remaining = Math.max(0, 760 - (performance.now() - startedAt));
      exitTimer = window.setTimeout(() => {
        setPhase("leaving");
        removeTimer = window.setTimeout(() => setPhase("hidden"), 620);
      }, remaining);
    };

    const criticalImages = Array.from(document.querySelectorAll<HTMLImageElement>('img[fetchpriority="high"]'));
    const imagesReady = Promise.all(criticalImages.map((image) => image.decode().catch(() => undefined)));
    const fontsReady = document.fonts?.ready ?? Promise.resolve();

    Promise.all([imagesReady, fontsReady]).then(beginExit, beginExit);
    fallbackTimer = window.setTimeout(beginExit, 2600);

    return () => {
      if (fallbackTimer !== undefined) window.clearTimeout(fallbackTimer);
      if (exitTimer !== undefined) window.clearTimeout(exitTimer);
      if (removeTimer !== undefined) window.clearTimeout(removeTimer);
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      className={`site-loader${phase === "leaving" ? " is-leaving" : ""}`}
      role="status"
      aria-label="Loading ONVI"
      aria-hidden={phase === "leaving"}
    >
      <div className="site-loader-mark" aria-hidden="true">ONVI<span>.</span></div>
      <div className="site-loader-caption" aria-hidden="true">Made to be seen</div>
      <div className="site-loader-track" aria-hidden="true"><span /></div>
    </div>
  );
}
