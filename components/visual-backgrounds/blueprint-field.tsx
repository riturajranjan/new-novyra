"use client";

import { motion, useReducedMotion } from "framer-motion";

interface BlueprintFieldProps {
  labels?: { text: string; top: string; left: string }[];
  lines?: { d: string; delay?: number }[];
  viewBox?: string;
  color?: string;
  opacity?: number;
  className?: string;
}

/** DEPTH 2/3 primitive — corner brackets, measurement ticks, faint mono
 * labels, and one or two lines that draw themselves once on viewport entry
 * (not a loop). Used wherever a section's metaphor is "engineering
 * documentation" (Trust/Engineering, Process) rather than atmosphere. */
export function BlueprintField({ labels = [], lines = [], viewBox = "0 0 800 500", color = "var(--color-brand-blue)", opacity = 0.4, className }: BlueprintFieldProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}>
      <svg aria-hidden viewBox="0 0 40 40" className="absolute top-5 left-5 h-7 w-7 opacity-25">
        <path d="M2,14 L2,2 L14,2" fill="none" stroke={color} strokeWidth="1.25" />
      </svg>
      <svg aria-hidden viewBox="0 0 40 40" className="absolute right-5 bottom-5 h-7 w-7 opacity-25">
        <path d="M26,38 L38,38 L38,26" fill="none" stroke={color} strokeWidth="1.25" />
      </svg>

      {labels.map((label) => (
        <span
          key={label.text}
          className="absolute font-mono text-[10px] font-medium tracking-[0.2em] text-white/20"
          style={{ top: label.top, left: label.left }}
        >
          {label.text}
        </span>
      ))}

      {lines.length > 0 ? (
        <svg aria-hidden viewBox={viewBox} preserveAspectRatio="none" className="absolute inset-0 h-full w-full" style={{ opacity }}>
          {lines.map((line, i) => (
            <motion.path
              key={i}
              d={line.d}
              fill="none"
              stroke={color}
              strokeWidth="1"
              strokeDasharray="3 5"
              initial={reduceMotion ? false : { pathLength: 0 }}
              whileInView={reduceMotion ? undefined : { pathLength: 1 }}
              viewport={{ once: true, margin: "150px" }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: line.delay ?? 0 }}
            />
          ))}
        </svg>
      ) : null}
    </div>
  );
}
