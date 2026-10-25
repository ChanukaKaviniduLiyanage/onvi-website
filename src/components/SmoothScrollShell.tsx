"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function SmoothScrollShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  useIsomorphicLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    document.documentElement.classList.add("has-gsap-smoother");
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: prefersReducedMotion ? 0.9 : 1.25,
      speed: 1.06,
      smoothTouch: 0.14,
      effects: !prefersReducedMotion,
    });

    return () => {
      smoother.kill();
      document.documentElement.classList.remove("has-gsap-smoother");
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (document.documentElement.classList.contains("has-gsap-smoother")) ScrollTrigger.refresh();
  }, [pathname]);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
