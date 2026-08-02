"use client";

import { Check } from "lucide-react";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { accentStroke, accentTint } from "@/lib/accent";
import type { AccentColor } from "@/content/hero-screens";

interface ProcessDotProps {
  scrollYProgress: MotionValue<number>;
  threshold: number;
  accent: AccentColor;
  reduceMotion: boolean;
  /** True while the visitor is hovering this step's card — lights the node
   * up with a glowing ring and a soft pulse, independent of scroll state. */
  isActive?: boolean;
}

/** A milestone marker on the timeline rail — a glass outer ring around a
 * colored inner dot that fills in as scroll progress passes its threshold,
 * with a small completion check once fully passed, and a glowing ripple
 * whenever its associated card is hovered. */
export function ProcessDot({ scrollYProgress, threshold, accent, reduceMotion, isActive = false }: ProcessDotProps) {
  const fill = useTransform(scrollYProgress, [Math.max(threshold - 0.08, 0), threshold], [0, 1]);
  const isComplete = useTransform(fill, (v) => v > 0.85);
  const stroke = accentStroke[accent];

  return (
    <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center">
      <span aria-hidden className="absolute inset-0 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-sm" />
      <motion.span
        aria-hidden
        className="absolute inset-[5px] rounded-full"
        style={{ backgroundColor: stroke, opacity: reduceMotion ? 1 : fill }}
      />
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-full"
        animate={{ boxShadow: isActive ? `0 0 0 1.5px ${stroke}` : "0 0 0 0px transparent" }}
        transition={{ duration: 0.3 }}
      />
      {isActive && !reduceMotion ? (
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{ border: `1.5px solid ${stroke}` }}
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 1.9 }}
          transition={{ duration: 1.1, ease: "easeOut", repeat: Infinity }}
        />
      ) : null}
      <motion.span
        aria-hidden
        className="absolute -inset-2.5 rounded-full transition-opacity duration-300"
        style={{ boxShadow: `0 0 20px 3px ${accentTint(accent, 70)}`, opacity: isActive ? 1 : 0 }}
      />
      {!reduceMotion ? <ProcessDotCheck isComplete={isComplete} /> : null}
    </span>
  );
}

function ProcessDotCheck({ isComplete }: { isComplete: MotionValue<boolean> }) {
  const opacity = useTransform(isComplete, (complete) => (complete ? 1 : 0));
  const scale = useTransform(isComplete, (complete) => (complete ? 1 : 0.4));
  return (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute inset-0 flex items-center justify-center text-white"
      style={{ opacity, scale }}
    >
      <Check className="h-3 w-3" />
    </motion.span>
  );
}
