"use client";

import { Rocket } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const satellites = [
  { angle: 20, radius: 78, size: "h-2.5 w-2.5", color: "bg-brand-blue" },
  { angle: 150, radius: 90, size: "h-2 w-2", color: "bg-brand-purple" },
  { angle: 260, radius: 70, size: "h-1.5 w-1.5", color: "bg-brand-cyan" },
];

/** The largest, most elaborate abstract glass object on the page — layered
 * rotating rings, a glowing core, and orbiting satellite lights — standing
 * in for a 3D render without needing one. */
export function GlassOrb() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="relative flex h-44 w-44 shrink-0 items-center justify-center sm:h-52 sm:w-52"
      animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
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
        className="border-brand-purple/25 absolute inset-6 rounded-full border border-dashed"
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        aria-hidden
        className="border-brand-cyan/20 absolute inset-12 rounded-full border"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        aria-hidden
        className="bg-gradient-brand absolute inset-14 rounded-full opacity-30 blur-2xl"
        animate={reduceMotion ? undefined : { scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="glass-strong shadow-card relative flex h-20 w-20 items-center justify-center rounded-hero sm:h-24 sm:w-24">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[28px] bg-gradient-to-b from-white/15 to-transparent" />
        <Rocket className="text-brand-blue h-8 w-8 sm:h-10 sm:w-10" aria-hidden />
      </div>
    </motion.div>
  );
}
