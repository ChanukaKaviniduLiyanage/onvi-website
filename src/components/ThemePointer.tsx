"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ThemePointer() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const root = document.documentElement;
    root.classList.add("has-onvi-cursor");
    gsap.set(cursor, { x: -40, y: -40, xPercent: -50, yPercent: -50 });
    const moveX = gsap.quickTo(cursor, "x", { duration: 0.14, ease: "power3.out" });
    const moveY = gsap.quickTo(cursor, "y", { duration: 0.14, ease: "power3.out" });

    const hide = () => cursor.classList.remove("is-visible");
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const target = event.target instanceof Element ? event.target : null;
      const textField = target?.closest("input, textarea, select, [contenteditable='true']");

      cursor.classList.toggle("is-active", Boolean(target?.closest("a, button, [role='button']")));
      cursor.classList.toggle("is-hidden", Boolean(textField));
      cursor.classList.add("is-visible");
      moveX(event.clientX);
      moveY(event.clientY);
    };
    const onKeyDown = () => cursor.classList.remove("is-visible");

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("blur", hide);
    window.addEventListener("pointerleave", hide);

    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("blur", hide);
      window.removeEventListener("pointerleave", hide);
      root.classList.remove("has-onvi-cursor");
      gsap.killTweensOf(cursor);
    };
  }, []);

  return (
    <div className="theme-cursor" ref={cursorRef} aria-hidden="true">
      <span className="theme-cursor-ring" />
      <span className="theme-cursor-core" />
    </div>
  );
}
