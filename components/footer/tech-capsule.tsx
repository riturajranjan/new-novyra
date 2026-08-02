"use client";

import type { PointerEvent } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { hexToRgba } from "@/lib/advisor-accent";
import { easePremium } from "@/lib/motion";

interface TechCapsuleProps {
  name: string;
  color: string;
  index: number;
}

/** One glass technology capsule — a colored mark standing in for a logo,
 * a cursor-tracked reflection, and a gradient-tinted glow on hover. Kept to
 * a fade-up entrance and a hover lift only — no idle motion, so a row of
 * these never reads as busy. */
export function TechCapsule({ name, color, index }: TechCapsuleProps) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(50);
  const y = useMotionValue(50);
  const reflection = useMotionTemplate`radial-gradient(90px circle at ${x}% ${y}%, ${hexToRgba(color, 0.25)}, transparent 70%)`;

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - rect.left) / rect.width) * 100);
    y.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "150px" }}
      whileHover={reduceMotion ? undefined : { y: -3, scale: 1.04 }}
      transition={{ duration: 0.3, delay: index * 0.02, ease: easePremium }}
      style={{ ["--capsule-border" as string]: hexToRgba(color, 0.5), ["--capsule-glow" as string]: hexToRgba(color, 0.35) }}
      className="border-border-subtle bg-surface/60 group relative flex shrink-0 items-center gap-2 overflow-hidden rounded-full border px-3.5 py-2 backdrop-blur-md transition-[box-shadow,border-color] duration-base hover:border-[color:var(--capsule-border)] hover:shadow-[0_0_20px_-8px_var(--capsule-glow)]"
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: reflection }}
      />
      <span aria-hidden className="relative h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 8px 1px ${hexToRgba(color, 0.6)}` }} />
      <span className="text-body-sm text-foreground relative font-medium whitespace-nowrap">{name}</span>
    </motion.div>
  );
}
