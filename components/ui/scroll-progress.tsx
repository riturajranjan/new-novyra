"use client";

import { motion, useScroll } from "framer-motion";

/** Thin glowing progress bar pinned to the very top of the viewport,
 * reflecting how far down the page the visitor has scrolled. Purely a
 * direct readout of scroll position — like a native scrollbar — so it
 * stays active even under `prefers-reduced-motion` rather than being
 * treated as decorative motion. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden
      className="bg-gradient-brand shadow-glow-purple pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
