"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { filters, type CaseStudyFilter } from "@/content/case-studies";

interface FilterBarProps {
  active: CaseStudyFilter;
  onSelect: (filter: CaseStudyFilter) => void;
}

/** Floating glass filter pill — industry chips with a spring-animated
 * selection indicator, horizontally scrollable on mobile. Filter identity
 * and comparison (`active`/`onSelect`) always use the stable
 * `CaseStudyFilter` id; only the rendered label is translated. */
export function FilterBar({ active, onSelect }: FilterBarProps) {
  const t = useTranslations("caseStudies");

  return (
    <div
      role="tablist"
      aria-label={t("filterBar.ariaLabel")}
      className="glass mx-auto flex max-w-full gap-1.5 overflow-x-auto rounded-pill p-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {filters.map((filter) => {
        const isActive = filter === active;
        return (
          <button
            key={filter}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(filter)}
            className="text-caption relative flex min-h-11 shrink-0 items-center rounded-pill px-4 py-2 font-medium whitespace-nowrap transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {isActive ? (
              <motion.span
                layoutId="case-study-filter-active"
                className="bg-gradient-brand absolute inset-0 rounded-pill"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            ) : null}
            <span className={cn("relative", isActive ? "text-white" : "text-foreground-secondary")}>
              {t(`filters.${filter}`)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
