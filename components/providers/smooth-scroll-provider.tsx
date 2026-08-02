"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Buttery inertia scrolling for wheel/trackpad/touch, mounted once at the
 * root. Renders nothing — Lenis hijacks the existing window scroll rather
 * than requiring a wrapped scroll container, so every existing layout,
 * IntersectionObserver-based reveal, and anchor link keeps working
 * unmodified. Fully skipped under `prefers-reduced-motion`, including if
 * the OS setting changes mid-session, so scroll physics never fight a
 * user's explicit accessibility preference. */
export function SmoothScrollProvider() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;

    function setup() {
      if (media.matches) return;
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
        wheelMultiplier: 0.9,
        touchMultiplier: 1.2,
        anchors: true,
        autoRaf: true,
      });
    }

    function teardown() {
      lenis?.destroy();
      lenis = null;
    }

    function handleChange() {
      teardown();
      setup();
    }

    setup();
    media.addEventListener("change", handleChange);

    return () => {
      media.removeEventListener("change", handleChange);
      teardown();
    };
  }, []);

  return null;
}
