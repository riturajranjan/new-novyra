"use client";

import { motion, useMotionTemplate, type MotionValue } from "framer-motion";

interface CursorSpotlightProps {
  x: MotionValue<number>;
  y: MotionValue<number>;
}

/** Restrained cursor-follow spotlight — a soft, low-opacity radial highlight
 * that trails the pointer across the hero. Built with useMotionTemplate so it
 * updates without triggering React re-renders. */
export function CursorSpotlight({ x, y }: CursorSpotlightProps) {
  const background = useMotionTemplate`radial-gradient(560px circle at ${x}% ${y}%, color-mix(in oklab, var(--color-brand-blue) 32%, transparent), color-mix(in oklab, var(--color-brand-purple) 18%, transparent) 45%, transparent 70%)`;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.16] dark:opacity-[0.22]"
      style={{ background }}
    />
  );
}
