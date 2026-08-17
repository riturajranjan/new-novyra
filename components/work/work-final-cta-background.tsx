"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SignalNode } from "@/components/visual-backgrounds/signal-node";

/** CTA's backdrop — "Next Project": deep navy, one soft blue→violet→pink
 * illumination, and an incomplete product-window outline that draws
 * itself in once on scroll — "the next project, waiting to be built."
 * No grid, no particles scattered everywhere — just this one drawing
 * line and a couple of quiet signal points. */
export function WorkFinalCtaBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" style={{ backgroundColor: "#05060d" }}>
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(50% 60% at 25% 30%, color-mix(in oklab, var(--color-brand-blue) 14%, transparent), transparent 70%), radial-gradient(50% 60% at 78% 70%, color-mix(in oklab, var(--color-brand-pink) 12%, transparent), transparent 70%)",
        }}
      />

      <svg aria-hidden viewBox="0 0 300 200" className="absolute top-1/2 right-[6%] h-[70%] w-[42%] -translate-y-1/2 opacity-25">
        <motion.rect
          x={10}
          y={10}
          width={280}
          height={180}
          rx={14}
          fill="none"
          stroke="rgba(160,170,255,0.7)"
          strokeWidth={1}
          strokeDasharray="3 4"
          initial={reduceMotion ? undefined : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />
        <motion.line
          x1={10}
          y1={44}
          x2={290}
          y2={44}
          stroke="rgba(160,170,255,0.4)"
          strokeWidth={0.75}
          initial={reduceMotion ? undefined : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
        />
      </svg>

      <SignalNode x="18%" y="30%" color="var(--color-brand-blue)" delay="0.5s" />
      <SignalNode x="72%" y="68%" color="var(--color-brand-purple)" delay="2.2s" />
    </div>
  );
}
