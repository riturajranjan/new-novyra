"use client";

import { useState } from "react";
import { ChevronDown, Scale } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ComparisonTable } from "@/components/pricing/comparison-table";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** The full feature-comparison table is expensive real estate — this keeps
 * it out of the default page length behind one compact, always-visible
 * trigger, expanding in place via AnimatePresence rather than a full table
 * rendered up front. Renders without its own outer glass shell — the parent
 * (components/sections/pricing.tsx) wraps this together with TrustStrip in
 * one shared card so the two read as a single connected block rather than
 * two separate floating boxes. */
export function ComparePanel() {
  const t = useTranslations("pricing");
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="compare-all-plans-panel"
        className="flex min-h-[100px] w-full flex-col gap-4 p-6 text-left transition-colors duration-fast hover:bg-white/[0.03] sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex min-w-0 items-center gap-3.5">
          <span className="bg-brand-purple/15 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
            <Scale className="text-brand-purple h-4.5 w-4.5" aria-hidden />
          </span>
          <div className="flex min-w-0 flex-col gap-1">
            <span className="text-title font-semibold text-white">{t("comparePanel.title")}</span>
            <span className="text-body-sm text-white/55">{t("comparePanel.description")}</span>
          </div>
        </div>
        <span className="text-body-sm text-brand-blue flex shrink-0 items-center gap-1.5 font-semibold">
          {open ? t("comparePanel.closeLabel") : t("comparePanel.openLabel")}
          <ChevronDown className={cn("h-4 w-4 transition-transform duration-base", open && "rotate-180")} aria-hidden />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id="compare-all-plans-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: easePremium }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/10 p-4 pt-5 sm:p-6 sm:pt-5">
              <ComparisonTable />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
