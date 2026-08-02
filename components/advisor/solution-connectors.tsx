"use client";

import { motion, useReducedMotion } from "framer-motion";
import { getNeedAccent, hexToRgba } from "@/lib/advisor-accent";
import type { AdvisorOption } from "@/content/solution-advisor";

interface SideConnectorsProps {
  options: AdvisorOption[];
  side: "left" | "right";
  hoveredId?: string | null;
  selectedId?: string;
}

/** One line per card, drawn with plain CSS rather than a measured SVG
 * layer: this gutter sits beside the card column inside the same stretched
 * grid row and uses the identical row template/gap, so its four row-cells
 * line up with the four cards for free — no ResizeObserver, no pixel math.
 * At rest every line sits low and even; the hovered or selected card's line
 * brightens with a small traveling pulse toward the orb, and every other
 * line fades further so the active relationship reads clearly. */
export function SideConnectors({ options, side, hoveredId, selectedId }: SideConnectorsProps) {
  const reduceMotion = useReducedMotion();
  const anyActive = Boolean(hoveredId || selectedId);

  return (
    <div className="grid h-full grid-rows-[repeat(4,minmax(0,1fr))] gap-4" aria-hidden>
      {options.map((option) => {
        const accent = getNeedAccent(option.id);
        const isActive = option.id === hoveredId || option.id === selectedId;
        const restOpacity = anyActive && !isActive ? 0.08 : 0.14;

        return (
          <div key={option.id} className="relative flex items-center">
            <motion.span
              className="w-full origin-center rounded-full"
              style={{
                backgroundImage:
                  side === "left"
                    ? `linear-gradient(to right, transparent, ${accent.base})`
                    : `linear-gradient(to left, transparent, ${accent.base})`,
              }}
              animate={{ opacity: isActive ? 0.9 : restOpacity, height: isActive ? 2 : 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            {isActive && !reduceMotion ? (
              <motion.span
                className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full"
                style={{ backgroundColor: accent.base, boxShadow: `0 0 8px 2px ${hexToRgba(accent.base, 0.8)}` }}
                animate={{ left: side === "left" ? ["0%", "100%"] : ["100%", "0%"] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
