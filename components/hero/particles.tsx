"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Fixed (not random-at-render) so server and client markup match exactly. */
const particles = [
  { x: 12, y: 20, size: 3, delay: 0, duration: 6 },
  { x: 28, y: 65, size: 2, delay: 0.6, duration: 7.5 },
  { x: 42, y: 12, size: 2, delay: 1.2, duration: 5.5 },
  { x: 58, y: 78, size: 3, delay: 0.3, duration: 8 },
  { x: 68, y: 30, size: 2, delay: 1.8, duration: 6.5 },
  { x: 78, y: 55, size: 3, delay: 0.9, duration: 7 },
  { x: 88, y: 15, size: 2, delay: 1.5, duration: 6 },
  { x: 20, y: 42, size: 2, delay: 2.1, duration: 7.2 },
  { x: 92, y: 70, size: 2, delay: 0.4, duration: 5.8 },
  { x: 50, y: 90, size: 2, delay: 1.1, duration: 6.8 },
];

/** Subtle drifting particles for atmospheric depth. */
export function Particles() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="bg-brand-cyan absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          initial={{ opacity: 0 }}
          animate={
            reduceMotion
              ? { opacity: 0.35 }
              : { opacity: [0, 0.5, 0], y: [0, -18, 0] }
          }
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: reduceMotion ? 0 : Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
