"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sparkle } from "lucide-react";
import { easePremium } from "@/lib/motion";
import type { AdvisorAccent } from "@/lib/advisor-accent";

interface InsightPanelProps {
  text?: string;
  accent: AdvisorAccent;
}

/** Small contextual note inside the canvas that updates after every
 * selection — one or two lines, soft gradient surface, never a rectangular
 * detail panel. The left accent strip and spark icon track whichever
 * category is currently selected. */
export function InsightPanel({ text, accent }: InsightPanelProps) {
  return (
    <AnimatePresence mode="wait">
      {text ? (
        <motion.div
          key={text}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: easePremium }}
          style={{ borderLeft: `3px solid ${accent.base}` }}
          className="mx-auto flex w-full max-w-[720px] items-start gap-2.5 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] px-4 py-3"
        >
          <Sparkle className="mt-0.5 h-4 w-4 shrink-0" style={{ color: accent.base }} aria-hidden />
          <p className="text-body-sm text-pretty text-white/75">{text}</p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
