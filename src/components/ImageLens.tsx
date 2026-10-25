"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type ImageLensProps = {
  src: string;
  alt: string;
  sizes?: string;
  enableTouchZoom?: boolean;
};

const ZOOM = 2.5;
const LENS_DIAMETER = 138;
const LENS_RADIUS = LENS_DIAMETER / 2;

/** Stable, pointer-following magnifier. Position updates are applied directly to avoid
 * React render/transition lag while the pointer moves. */
export default function ImageLens({ src, alt, sizes = "(max-width:700px) 46vw,25vw", enableTouchZoom = true }: ImageLensProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const lensRef = useRef<HTMLSpanElement>(null);
  const [mobileZoom, setMobileZoom] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

  function moveLens(event: React.MouseEvent<HTMLDivElement>) {
    const wrap = wrapRef.current;
    const image = imageRef.current;
    const lens = lensRef.current;
    if (!wrap || !image || !lens) return;

    const bounds = wrap.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const boxWidth = bounds.width;
    const boxHeight = bounds.height;
    const naturalWidth = image.naturalWidth || boxWidth;
    const naturalHeight = image.naturalHeight || boxHeight;

    // Match object-fit: cover so the magnified image uses the same crop as the visible image.
    const coverScale = Math.max(boxWidth / naturalWidth, boxHeight / naturalHeight);
    const renderedWidth = naturalWidth * coverScale;
    const renderedHeight = naturalHeight * coverScale;
    const cropX = (boxWidth - renderedWidth) / 2;
    const cropY = (boxHeight - renderedHeight) / 2;

    lens.style.left = `${x}px`;
    lens.style.top = `${y}px`;
    lens.style.backgroundSize = `${renderedWidth * ZOOM}px ${renderedHeight * ZOOM}px`;
    lens.style.backgroundPosition = `${LENS_RADIUS - (x - cropX) * ZOOM}px ${LENS_RADIUS - (y - cropY) * ZOOM}px`;
    lens.classList.add("is-visible");
  }

  function hideLens() {
    lensRef.current?.classList.remove("is-visible");
  }

  function setTouchZoomOrigin(clientX: number, clientY: number, reverse = false) {
    const bounds = wrapRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const x = Math.max(0, Math.min(100, ((clientX - bounds.left) / bounds.width) * 100));
    const y = Math.max(0, Math.min(100, ((clientY - bounds.top) / bounds.height) * 100));
    setZoomOrigin({ x: reverse ? 100 - x : x, y: reverse ? 100 - y : y });
  }

  function moveTouchZoom(event: React.PointerEvent<HTMLDivElement>) {
    if (mobileZoom && event.pointerType !== "mouse") setTouchZoomOrigin(event.clientX, event.clientY, true);
  }

  function tapToZoom(event: React.MouseEvent<HTMLDivElement>) {
    if (!window.matchMedia("(hover: none)").matches) return;
    if ((event.target as HTMLElement).closest("button, a")) return;
    setTouchZoomOrigin(event.clientX, event.clientY);
    setMobileZoom(true);
  }

  return (
    <div
      ref={wrapRef}
      className={`catalogue-lens-wrap${mobileZoom ? " is-mobile-zoom" : ""}`}
      onMouseEnter={moveLens}
      onMouseMove={moveLens}
      onMouseLeave={hideLens}
      onClick={enableTouchZoom ? tapToZoom : undefined}
      onPointerDown={enableTouchZoom ? (event) => { if (mobileZoom && event.pointerType !== "mouse" && !(event.target as HTMLElement).closest("button")) event.currentTarget.setPointerCapture(event.pointerId); } : undefined}
      onPointerMove={enableTouchZoom ? moveTouchZoom : undefined}
      style={enableTouchZoom ? { touchAction: mobileZoom ? "none" : "pan-y" } : undefined}
      aria-label={alt}
    >
      <Image
        ref={imageRef}
        className="catalogue-lens-image"
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        draggable={false}
        style={mobileZoom ? { transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%` } : undefined}
      />
      <span className="catalogue-lens-hint" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="10.8" cy="10.8" r="6.2" stroke="currentColor" strokeWidth="1.5" />
          <path d="m15.4 15.4 4.1 4.1M10.8 8v5.6M8 10.8h5.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span>Explore detail</span>
      </span>
      <span
        ref={lensRef}
        className="catalogue-lens"
        aria-hidden="true"
        style={{ backgroundImage: `url("${src}")` }}
      />
      {enableTouchZoom && <button
        className="catalogue-mobile-zoom"
        type="button"
        aria-label={mobileZoom ? "Reset image zoom" : "Zoom into image"}
        aria-pressed={mobileZoom}
        onClick={() => { setMobileZoom((current) => !current); setZoomOrigin({ x: 50, y: 50 }); }}
      >
        {mobileZoom ? "−" : "+"}
      </button>}
    </div>
  );
}
