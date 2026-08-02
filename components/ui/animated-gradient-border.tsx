"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedGradientBorderProps {
  children: ReactNode;
  className?: string;
  /** Border thickness in pixels. Default 1.5. */
  borderWidth?: number;
}

/** A slim, continuously rotating gradient ring around pill-shaped CTAs —
 * lighter weight than GlowBorder (no blurred halo), sized to hug its child. */
export function AnimatedGradientBorder({ children, className, borderWidth = 1.5 }: AnimatedGradientBorderProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={cn("relative isolate inline-flex overflow-hidden rounded-pill", className)}>
      <motion.div
        aria-hidden
        className="absolute inset-[-100%]"
        style={{
          background:
            "conic-gradient(from 0deg, var(--color-brand-blue), var(--color-brand-purple), var(--color-brand-cyan), var(--color-brand-blue))",
        }}
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />
      <div className="relative z-10 rounded-pill" style={{ margin: borderWidth }}>
        {children}
      </div>
    </div>
  );
}
