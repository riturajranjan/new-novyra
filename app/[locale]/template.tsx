"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Next.js remounts `template.tsx` on every navigation (unlike layout.tsx,
 * which persists) — the correct place for a per-page enter transition. Only
 * one route exists on this site today, so this mainly covers the initial
 * load's fade-in; it'll also cover future route changes once more pages
 * exist, without needing a heavier AnimatePresence/pathname-keyed setup
 * that there's nothing yet to actually exercise. */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(6px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
