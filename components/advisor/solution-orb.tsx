"use client";

import { useTranslations } from "next-intl";
import { Sparkles } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { easePremium } from "@/lib/motion";
import { hexToRgba, type AdvisorAccent } from "@/lib/advisor-accent";
import { cn } from "@/lib/utils";

const RING_GRADIENT = "conic-gradient(from 0deg, #3B82F6, #06B6D4, #8B5CF6, #EC4899, #F59E0B, #10B981, #3B82F6)";

const orbParticles = [
  { top: "-4%", left: "50%", delay: 0 },
  { top: "50%", left: "102%", delay: 0.7 },
  { top: "102%", left: "50%", delay: 1.4 },
];

const sizeClasses = {
  compact: "h-[120px] w-[120px]",
  medium: "h-[170px] w-[170px]",
  full: "h-[210px] w-[210px] xl:h-[228px] xl:w-[228px]",
} as const;

interface SolutionOrbProps {
  size: keyof typeof sizeClasses;
  accent: AdvisorAccent;
  /** Selected option's label — shown bold above the subtitle once a card is
   * picked. Undefined before any selection. */
  title?: string;
  /** Hint text by default; swaps to the hovered/selected option's
   * description so the orb reacts without ever holding a long paragraph. */
  subtitle: string;
  /** True while a hover or selection is actively driving `accent` — speeds
   * the ring and brightens the glow. */
  active: boolean;
  className?: string;
}

/** Compact premium AI orb — frosted glass center, a thin rotating gradient
 * ring, a soft breathing glow, and a couple of floating particles. Reacts
 * to whichever service is hovered or selected via `accent`/`active`, but
 * never grows past ~230px or holds more than a two-line reactive caption. */
export function SolutionOrb({ size, accent, title, subtitle, active, className }: SolutionOrbProps) {
  const t = useTranslations("advisor");
  const reduceMotion = useReducedMotion();

  return (
    <div className={cn("relative mx-auto flex shrink-0 items-center justify-center", sizeClasses[size], className)}>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -inset-2.5 rounded-full"
        style={{
          backgroundImage: RING_GRADIENT,
          WebkitMask: "radial-gradient(closest-side, transparent calc(100% - 2px), black calc(100% - 1px))",
          mask: "radial-gradient(closest-side, transparent calc(100% - 2px), black calc(100% - 1px))",
          opacity: active ? 0.85 : 0.35,
        }}
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: active ? 8 : 18, repeat: Infinity, ease: "linear" }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-1 rounded-full border border-white/10 backdrop-blur-md"
      />
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-full blur-2xl"
        style={{ backgroundColor: active ? hexToRgba(accent.base, 0.45) : "rgba(255,255,255,0.08)" }}
        animate={reduceMotion ? undefined : { scale: [1, 1.015, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      {!reduceMotion
        ? orbParticles.map((p, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="pointer-events-none absolute h-1 w-1 rounded-full bg-white/60"
              style={{ top: p.top, left: p.left }}
              animate={{ opacity: [0.15, 0.7, 0.15], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
            />
          ))
        : null}

      <div
        className="relative flex h-full w-full flex-col items-center justify-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-4 text-center backdrop-blur-[28px] backdrop-saturate-150 transition-colors duration-300"
        style={{
          backgroundImage: "linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.025))",
          boxShadow: "0 24px 70px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-4 top-1.5 h-1/3 rounded-full bg-gradient-to-b from-white/10 to-transparent"
        />
        <Sparkles
          className="h-4 w-4 transition-colors duration-300"
          style={{ color: active ? accent.base : "rgba(255,255,255,0.55)" }}
          aria-hidden
        />
        <span className="text-[10px] font-semibold tracking-[0.14em] text-white/45 uppercase">{t("orb.label")}</span>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${title ?? ""}-${subtitle}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3, ease: easePremium }}
            className="flex flex-col items-center gap-0.5 px-1"
          >
            {title ? (
              <span className="text-caption line-clamp-1 font-semibold" style={{ color: accent.base }}>
                {title}
              </span>
            ) : null}
            <span className="text-caption line-clamp-2 text-white/55">{subtitle}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
