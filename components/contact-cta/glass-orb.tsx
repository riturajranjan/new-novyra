"use client";

import { Rocket } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const satellites = [
  { angle: 20, radius: 36, size: "h-2 w-2", color: "bg-brand-blue" },
  { angle: 150, radius: 41, size: "h-1.5 w-1.5", color: "bg-brand-purple" },
  { angle: 260, radius: 32, size: "h-1.5 w-1.5", color: "bg-brand-cyan" },
];

/** A compact orbital rocket motif — rotating rings, a glowing core, and
 * orbiting satellite lights — the Final CTA's visual anchor, sized to fit
 * a 220-300px-tall compact section rather than a large hero-style panel. */
export function GlassOrb() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="relative flex h-20 w-20 shrink-0 items-center justify-center sm:h-24 sm:w-24"
      animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      {satellites.map((s, i) => {
        const rad = (s.angle * Math.PI) / 180;
        const x = Math.cos(rad) * s.radius;
        const y = Math.sin(rad) * s.radius;
        return (
          <motion.span
            key={i}
            aria-hidden
            className={`absolute rounded-full ${s.size} ${s.color} shadow-glow-blue`}
            style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
            animate={reduceMotion ? undefined : { opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
          />
        );
      })}

      <motion.div
        aria-hidden
        className="border-brand-blue/25 absolute inset-0 rounded-full border"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        aria-hidden
        className="border-brand-purple/25 absolute inset-2.5 rounded-full border border-dashed"
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        aria-hidden
        className="bg-gradient-brand absolute inset-5 rounded-full opacity-30 blur-xl"
        animate={reduceMotion ? undefined : { scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="glass-strong shadow-card relative flex h-9 w-9 items-center justify-center rounded-xl sm:h-11 sm:w-11">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-xl bg-gradient-to-b from-white/15 to-transparent" />
        <Rocket className="text-brand-blue h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
      </div>
    </motion.div>
  );
}
