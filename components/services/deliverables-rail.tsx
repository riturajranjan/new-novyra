"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { accentStroke } from "@/lib/accent";
import type { AccentColor } from "@/content/hero-screens";

interface DeliverablesRailProps {
  items: string[];
  accent: AccentColor;
  /** Optional per-row supporting sentence, revealed on hover/focus. Shorter
   * than `items` is fine — rows past the end of this array just get no
   * reveal, rather than forcing a 1:1 pairing that doesn't exist. */
  supporting?: string[];
}

/** A compact numbered rail — thin separators and an expanding accent line,
 * not a grid of small cards. Hovering (or focusing) a row reveals its
 * accent line growing to meet the text, and — where a matching supporting
 * sentence exists — a second line fading in beneath it. */
export function DeliverablesRail({ items, accent, supporting }: DeliverablesRailProps) {
  const [active, setActive] = useState<number | null>(null);
  const stroke = accentStroke[accent];

  return (
    <ol className="flex flex-col">
      {items.map((item, i) => {
        const isActive = active === i;
        const reveal = supporting?.[i];
        return (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "120px" }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            tabIndex={0}
            className="group border-t py-3 outline-none first:border-t-0 sm:py-3.5"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-center gap-4">
              <span className="text-[13px] font-semibold text-white/30 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span
                aria-hidden
                className="h-px w-6 shrink-0 transition-all duration-300"
                style={{ backgroundColor: isActive ? stroke : "rgba(255,255,255,0.18)", width: isActive ? 36 : 24 }}
              />
              <span className="text-body-sm sm:text-body font-medium text-white transition-colors duration-300 group-hover:text-white">
                {item}
              </span>
            </div>
            {reveal ? (
              <motion.p
                initial={false}
                animate={isActive ? { opacity: 1, height: "auto", marginTop: 6 } : { opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="text-caption overflow-hidden pl-[40px] text-white/50 sm:pl-[44px]"
              >
                {reveal}
              </motion.p>
            ) : null}
          </motion.li>
        );
      })}
    </ol>
  );
}
