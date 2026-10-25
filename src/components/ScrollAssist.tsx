"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export default function ScrollAssist() {
  const [atEnd, setAtEnd] = useState(false);
  const [inPinnedStory, setInPinnedStory] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const story = document.querySelector<HTMLElement>(".order-story");
    const storyObserver = story && "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => setInPinnedStory(entry.intersectionRatio >= 0.25), { threshold: 0.25 })
      : undefined;

    const updatePosition = () => {
      const pageBottom = document.documentElement.scrollHeight - window.innerHeight;
      setAtEnd(pageBottom > 48 && window.scrollY >= pageBottom - 24);
      const storyBounds = story?.getBoundingClientRect();
      if (storyBounds) {
        const visibleHeight = Math.max(0, Math.min(storyBounds.bottom, window.innerHeight) - Math.max(storyBounds.top, 0));
        setInPinnedStory(visibleHeight / Math.max(1, storyBounds.height) >= 0.25);
      } else {
        setInPinnedStory(false);
      }
    };

    if (story && storyObserver) storyObserver.observe(story);
    updatePosition();
    window.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", updatePosition);
    return () => {
      storyObserver?.disconnect();
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [pathname]);

  const scrollPage = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const smoother = ScrollSmoother.get();
    const behavior = prefersReducedMotion ? "auto" : "smooth";
    if (atEnd) {
      if (smoother) smoother.scrollTo(0, true);
      else window.scrollTo({ top: 0, behavior });
      return;
    }

    const story = document.querySelector<HTMLElement>(".order-story.is-scroll-story");
    const storyTop = story?.getBoundingClientRect().top;
    if (storyTop !== undefined && storyTop >= -1 && storyTop <= 1) {
      if (smoother) smoother.scrollTo(smoother.scrollTop() + window.innerHeight * 0.82, true);
      else window.scrollBy({ top: window.innerHeight * 0.82, behavior });
      return;
    }

    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section, main footer"));
    const nextSection = sections.find((section) => section.getBoundingClientRect().top > 32);
    if (nextSection) {
      if (smoother) smoother.scrollTo(nextSection, true, "top top");
      else window.scrollTo({ top: nextSection.getBoundingClientRect().top + window.scrollY, behavior });
      return;
    }

    if (smoother) smoother.scrollTo(smoother.scrollTop() + Math.max(320, window.innerHeight * 0.82), true);
    else window.scrollBy({ top: Math.max(320, window.innerHeight * 0.82), behavior });
  };

  return (
    <button
      className={`scroll-assist${inPinnedStory ? " is-story-active" : ""}`}
      type="button"
      onClick={scrollPage}
      aria-label={atEnd ? "Scroll back to the top" : "Scroll down the page"}
      title={atEnd ? "Back to top" : "Scroll down"}
    >
      <span>{atEnd ? "Back to top" : "Scroll down"}</span>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d={atEnd ? "M12 19V5m-6.5 6.5L12 5l6.5 6.5" : "M12 5v14m6.5-6.5L12 19l-6.5-6.5"} />
      </svg>
    </button>
  );
}
