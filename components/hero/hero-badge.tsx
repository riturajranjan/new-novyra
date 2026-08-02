"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { heroBadgeItems } from "@/content/hero";
import { accentBg, accentStroke } from "@/lib/accent";
import { cn } from "@/lib/utils";

const SPARKLES = [
  { top: "-14%", left: "6%", size: 3, delay: 0 },
  { top: "55%", left: "-5%", size: 2, delay: 0.9 },
  { top: "-20%", left: "68%", size: 2, delay: 1.5 },
  { top: "65%", left: "94%", size: 3, delay: 0.4 },
];

/** The floating four-item glass badge above the headline — Websites · SaaS
 * · AI · Automation, each with its own colored dot, plus a handful of tiny
 * glowing particles drifting just outside its edges. Mount entrance is
 * driven by the hero's GSAP timeline (step 1, targeting `[data-hero-badge]`);
 * this component only owns the idle sparkle motion. */
export function HeroBadge() {
  const t = useTranslations("hero.badge.items");
  const reduceMotion = useReducedMotion();

  return (
    <div
      data-hero-badge
      className="glass relative inline-flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-pill px-4 py-2 text-caption font-medium text-foreground-secondary"
    >
      {SPARKLES.map((s, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="bg-brand-cyan pointer-events-none absolute rounded-full"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
          animate={reduceMotion ? { opacity: 0.5 } : { opacity: [0, 0.85, 0], scale: [0.6, 1, 0.6] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
        />
      ))}
      {heroBadgeItems.map((item, i) => (
        <span key={item.id} className="inline-flex items-center gap-3">
          {i > 0 ? (
            <span aria-hidden className="text-foreground-secondary/30">
              ·
            </span>
          ) : null}
          <span className="inline-flex items-center gap-1.5">
            <span
              aria-hidden
              className={cn("h-1.5 w-1.5 rounded-full", accentBg[item.accent])}
              style={{ boxShadow: `0 0 6px 1px ${accentStroke[item.accent]}` }}
            />
            {t(item.id)}
          </span>
        </span>
      ))}
    </div>
  );
}
