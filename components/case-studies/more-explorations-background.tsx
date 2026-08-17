"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BackgroundLabel } from "@/components/visual-backgrounds/background-label";

/** More Explorations' backdrop — "System Archive": deep graphite/navy,
 * tiny technical indexing, a giant cropped "ARCHIVE" ghost word, and one
 * thin horizontal scan line drifting very slowly top to bottom — reads
 * as "browsing deeper into the archive," distinct from the Gallery
 * above it and the Hero's Project Archive framing. */
export function MoreExplorationsBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" style={{ backgroundColor: "#08090f" }}>
      <span
        className="absolute top-1/2 right-[-1%] leading-none font-bold text-white select-none"
        style={{ fontSize: "clamp(120px, 13vw, 220px)", letterSpacing: "-0.06em", opacity: 0.02, transform: "translateY(-50%)" }}
      >
        ARCHIVE
      </span>
      <BackgroundLabel text="MORE / 02" top="10%" left="4%" opacity={0.08} />

      {!reduceMotion ? (
        <motion.div
          aria-hidden
          className="absolute inset-x-0 h-px"
          style={{ backgroundImage: "linear-gradient(90deg, transparent, rgba(140,160,255,0.35), transparent)" }}
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        />
      ) : null}
    </div>
  );
}
