"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AmbientGlow } from "@/components/visual-backgrounds/ambient-glow";
import { BackgroundLabel } from "@/components/visual-backgrounds/background-label";

const STAGES = [
  { x: 70, label: "01 DISCOVER" },
  { x: 230, label: "02 DEFINE" },
  { x: 390, label: "03 DESIGN" },
  { x: 550, label: "04 BUILD" },
  { x: 710, label: "05 SCALE" },
];

/** Process's signature motif — "Engineering Pipeline": one technical
 * pathway running left → right with a node at each of five stages, faint
 * coordinate/stage labels, and a single signal that travels the path once
 * on viewport entry (not a loop). Base tone shifts slightly toward
 * deep blue/teal compared with Selected Work's warmer violet. */
export function ProcessBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-[0.6]">
      <AmbientGlow top="10%" left="0%" width="40%" height="55%" color="var(--color-brand-blue)" opacity={0.1} blur="140px" />
      <AmbientGlow bottom="0%" right="5%" width="42%" height="55%" color="var(--color-brand-cyan)" opacity={0.08} blur="140px" />

      <svg aria-hidden viewBox="0 0 800 260" preserveAspectRatio="none" className="absolute top-[20%] left-1/2 h-[45%] w-[84%] -translate-x-1/2">
        <path
          id="process-path"
          d="M40,180 C160,140 220,100 400,110 C560,118 620,60 760,80"
          fill="none"
          stroke="var(--color-brand-blue)"
          strokeWidth="1"
          opacity="0.28"
        />

        {STAGES.map((s, i) => (
          <circle key={s.x} cx={s.x} cy={180 - i * 25} r="3" fill={i === 0 ? "var(--color-brand-cyan)" : "var(--color-brand-blue)"} opacity="0.5" />
        ))}

        <motion.circle
          r="4.5"
          fill="var(--color-brand-cyan)"
          initial={reduceMotion ? false : { cx: 40, cy: 180, opacity: 0 }}
          whileInView={reduceMotion ? undefined : { cx: 760, cy: 80, opacity: [0, 1, 1, 0] }}
          viewport={{ once: true, margin: "150px" }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>

      {STAGES.map((s) => (
        <BackgroundLabel key={s.label} text={s.label} top="66%" left={`${8 + (s.x / 800) * 84}%`} opacity={0.14} size="9px" />
      ))}
    </div>
  );
}
