"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { ProductImage } from "@/lib/products";

type ProductGalleryProps = {
  images: ProductImage[];
  productName: string;
  productId: string;
};

export default function ProductGallery({ images, productName, productId }: ProductGalleryProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lens, setLens] = useState({ visible: false, x: 0, y: 0 });
  const [naturalSize, setNaturalSize] = useState({ width: 9, height: 16 });
  const [mobileZoom, setMobileZoom] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const activeImage = images[activeIndex] ?? images[0];
  const stageWidth = Math.max(1, stageRef.current?.clientWidth ?? 1);
  const stageHeight = Math.max(1, stageRef.current?.clientHeight ?? 1);
  const imageRatio = naturalSize.width / Math.max(1, naturalSize.height);
  const displayedWidth = Math.min(stageWidth, stageHeight * imageRatio);
  const displayedHeight = displayedWidth / imageRatio;
  const imageOffsetX = (stageWidth - displayedWidth) / 2;
  const zoom = 2.5;
  const lensDiameter = 160;

  function moveLens(event: React.MouseEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    setLens({ visible: true, x: event.clientX - bounds.left, y: event.clientY - bounds.top });
  }

  function setTouchZoomOrigin(clientX: number, clientY: number, reverse = false) {
    const bounds = stageRef.current?.getBoundingClientRect();
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
    if ((event.target as HTMLElement).closest("button")) return;
    setTouchZoomOrigin(event.clientX, event.clientY);
    setMobileZoom(true);
  }

  if (!activeImage) return null;

  return (
    <div className="product-detail-image product-gallery">
      <div
        ref={stageRef}
        className={`product-gallery-stage${mobileZoom ? " is-mobile-zoom" : ""}`}
        onMouseEnter={moveLens}
        onMouseMove={moveLens}
        onMouseLeave={() => setLens((current) => ({ ...current, visible: false }))}
        onClick={tapToZoom}
        onPointerDown={(event) => { if (mobileZoom && event.pointerType !== "mouse" && !(event.target as HTMLElement).closest("button")) event.currentTarget.setPointerCapture(event.pointerId); }}
        onPointerMove={moveTouchZoom}
        style={{ touchAction: mobileZoom ? "none" : "pan-y" }}
        aria-label={`${productName} image viewer. Use the zoom control on touch screens or hover to magnify.`}
      >
        <Image
          className="product-gallery-main-image"
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          priority
          sizes="(max-width:700px) 100vw,55vw"
          onLoad={(event) => setNaturalSize({ width: event.currentTarget.naturalWidth, height: event.currentTarget.naturalHeight })}
          style={mobileZoom ? { transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%` } : undefined}
        />
        <span className="image-index">ONVI / {productId}</span>
        <span className="product-gallery-zoom-label" aria-hidden="true">Move to magnify</span>
        <button
          className="product-gallery-mobile-zoom"
          type="button"
          aria-label={mobileZoom ? "Return to the full image" : "Zoom into the image"}
          aria-pressed={mobileZoom}
          onClick={(event) => { event.stopPropagation(); setMobileZoom((current) => !current); setZoomOrigin({ x: 50, y: 50 }); }}
        >{mobileZoom ? "−" : "+"} <span>{mobileZoom ? "Reset" : "Zoom"}</span></button>
        <span
          className={`product-gallery-lens${lens.visible ? " is-visible" : ""}`}
          aria-hidden="true"
          style={{
            left: lens.x,
            top: lens.y,
            backgroundImage: `url("${activeImage.src}")`,
            backgroundSize: `${displayedWidth * zoom}px ${displayedHeight * zoom}px`,
            backgroundPosition: `${lensDiameter / 2 - (lens.x - imageOffsetX) * zoom}px ${lensDiameter / 2 - lens.y * zoom}px`,
          }}
        />
      </div>
      {images.length > 1 && (
        <div className="product-gallery-thumbnails" role="group" aria-label={`More images of ${productName}`}>
          {images.map((image, index) => (
            <button
              className={`product-gallery-thumb${index === activeIndex ? " is-active" : ""}`}
              type="button"
              key={image.src}
              onClick={() => { setActiveIndex(index); setNaturalSize({ width: 9, height: 16 }); setMobileZoom(false); setZoomOrigin({ x: 50, y: 50 }); setLens((current) => ({ ...current, visible: false })); }}
              aria-label={`Show ${image.label.toLowerCase()} image`}
              aria-pressed={index === activeIndex}
            >
              <Image src={image.src} alt="" fill sizes="100px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
