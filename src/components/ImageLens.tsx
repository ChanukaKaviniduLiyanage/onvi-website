"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type ImageLensProps = {
  src: string;
  alt: string;
  sizes?: string;
};

/** Editorial product-image lens inspired by magnifier interactions in modern UI libraries. */
export default function ImageLens({ src, alt, sizes = "(max-width:700px) 46vw,25vw" }: ImageLensProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const [lens, setLens] = useState({ visible: false, x: 0, y: 0 });

  function moveLens(event: React.MouseEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    setLens({
      visible: true,
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    });
  }

  return (
    <div
      ref={imageRef}
      className="catalogue-lens-wrap"
      onMouseEnter={moveLens}
      onMouseMove={moveLens}
      onMouseLeave={() => setLens((current) => ({ ...current, visible: false }))}
      aria-label={alt}
    >
      <Image src={src} alt={alt} fill sizes={sizes} />
      <span className="catalogue-lens-hint" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="10.8" cy="10.8" r="6.2" stroke="currentColor" strokeWidth="1.5" />
          <path d="m15.4 15.4 4.1 4.1M10.8 8v5.6M8 10.8h5.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span>Explore detail</span>
      </span>
      <span
        className={`catalogue-lens ${lens.visible ? "is-visible" : ""}`}
        aria-hidden="true"
        style={{
          left: lens.x,
          top: lens.y,
          backgroundImage: `url("${src}")`,
          backgroundPosition: `${(lens.x / (imageRef.current?.clientWidth || 1)) * 100}% ${(lens.y / (imageRef.current?.clientHeight || 1)) * 100}%`,
        }}
      />
    </div>
  );
}
