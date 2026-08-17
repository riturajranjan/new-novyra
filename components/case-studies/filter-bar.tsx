"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { conceptBuilds, filters, type CaseStudyFilter } from "@/content/case-studies";

interface FilterBarProps {
  active: CaseStudyFilter;
  onSelect: (filter: CaseStudyFilter) => void;
}

/** Real counts only — computed from the actual data, never invented.
 * Filters with zero matches (e.g. "AI," which no current concept uses)
 * are dropped from the rail entirely rather than shown as a dead option. */
function getFilterCounts(): { id: CaseStudyFilter; count: number }[] {
  return filters
    .map((id) => ({ id, count: id === "All" ? conceptBuilds.length : conceptBuilds.filter((b) => b.category === id).length }))
    .filter((f) => f.id === "All" || f.count > 0);
}

/** A compact editorial filter rail — id + real count, a thin gradient
 * underline and a tiny pulsing dot on the active item, muted text
 * everywhere else. No pill backgrounds, no glass capsule: this reads as
 * an index, not a row of buttons. */
export function FilterBar({ active, onSelect }: FilterBarProps) {
  const t = useTranslations("caseStudies");
  const reduceMotion = useReducedMotion();
  const counts = getFilterCounts();

  return (
    <div
      id="project-filter"
      role="tablist"
      aria-label={t("filterBar.ariaLabel")}
      className="scroll-mt-24 scrollbar-none flex min-h-13 items-center gap-6 overflow-x-auto border-b border-white/8 [&::-webkit-scrollbar]:hidden"
    >
      {counts.map(({ id, count }) => {
        const isActive = id === active;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(id)}
            className="group relative flex shrink-0 items-center gap-1.5 pb-3 whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            {isActive ? (
              <motion.span
                aria-hidden
                animate={reduceMotion ? { opacity: 1 } : { opacity: [0.5, 1, 0.5] }}
                transition={reduceMotion ? undefined : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="bg-brand-blue h-1.5 w-1.5 shrink-0 rounded-full shadow-[0_0_6px_1px_var(--color-brand-blue)]"
              />
            ) : null}
            <span className={cn("text-body-sm font-semibold transition-colors duration-base", isActive ? "text-white" : "text-white/45 group-hover:text-white/70")}>
              {t(`filters.${id}`)}
            </span>
            <span className={cn("text-caption font-mono tabular-nums transition-colors duration-base", isActive ? "text-white/50" : "text-white/25")}>
              {String(count).padStart(2, "0")}
            </span>

            {isActive ? (
              <motion.span
                layoutId="work-filter-underline"
                aria-hidden
                className="bg-gradient-brand absolute inset-x-0 bottom-0 h-0.5 rounded-full"
                transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 38 }}
              />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
