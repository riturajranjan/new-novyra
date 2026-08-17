"use client";

import { motion, useReducedMotion } from "framer-motion";
import { industries } from "@/content/industries";
import { accentStroke } from "@/lib/accent";

const RADIUS = 42;

function nodePosition(index: number, total: number) {
  const angle = (-90 + (index * 360) / total) * (Math.PI / 180);
  return { x: 50 + RADIUS * Math.cos(angle), y: 50 + RADIUS * Math.sin(angle) * 0.55 + 8 };
}

/** The Final CTA's backdrop — a quiet echo of the hero's Industry
 * Ecosystem: the same six industries, a center Novyra point, thin
 * connecting lines, but flattened into a wide low-contrast arc that sits
 * *behind* the CTA copy rather than beside it, and pulses instead of
 * inviting interaction. Closes the loop the hero opened, without
 * repeating its composition or competing with the CTA text on top of
 * it. */
export function IndustryConstellationBackground() {
  const reduceMotion = useReducedMotion();
  const center = { x: 50, y: 46 };

  return (
    <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 h-full w-full opacity-60">
      {industries.map((industry, i) => {
        const p = nodePosition(i, industries.length);
        return (
          <motion.line
            key={industry.id}
            x1={center.x}
            y1={center.y}
            x2={p.x}
            y2={p.y}
            stroke={accentStroke[industry.accent]}
            strokeWidth={0.25}
            strokeLinecap="round"
            initial={reduceMotion ? { opacity: 0.14 } : { opacity: 0.06 }}
            animate={reduceMotion ? undefined : { opacity: [0.06, 0.22, 0.06] }}
            transition={reduceMotion ? undefined : { duration: 6 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          />
        );
      })}
      {industries.map((industry, i) => {
        const p = nodePosition(i, industries.length);
        return (
          <motion.circle
            key={industry.id}
            cx={p.x}
            cy={p.y}
            r={0.6}
            fill={accentStroke[industry.accent]}
            initial={{ opacity: 0.3 }}
            animate={reduceMotion ? undefined : { opacity: [0.3, 0.7, 0.3] }}
            transition={reduceMotion ? undefined : { duration: 5 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
          />
        );
      })}
      <circle cx={center.x} cy={center.y} r={1} fill="white" opacity={0.5} />
    </svg>
  );
}
