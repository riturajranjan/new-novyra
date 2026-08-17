"use client";

import type { KeyboardEvent } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { accentStroke } from "@/lib/accent";
import { cn } from "@/lib/utils";
import type { Industry } from "@/content/industries";

interface IndustryNavProps {
  industries: Industry[];
  activeId: string;
  onSelect: (id: string) => void;
}

/** A vertical numbered list — Industries' own navigator shape, distinct
 * from the Services Explorer's horizontal rail so the two "choose one of
 * six" moments on the site don't feel like the same component reused. */
export function IndustryNav({ industries, activeId, onSelect }: IndustryNavProps) {
  const t = useTranslations("industries");
  const reduceMotion = useReducedMotion();

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next =
      e.key === "ArrowDown"
        ? (index + 1) % industries.length
        : e.key === "ArrowUp"
          ? (index - 1 + industries.length) % industries.length
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? industries.length - 1
              : null;
    if (next === null) return;
    e.preventDefault();
    const target = industries[next];
    onSelect(target.id);
    document.getElementById(`industry-tab-${target.id}`)?.focus();
  }

  return (
    <div role="tablist" aria-label={t("explorer.navAriaLabel")} className="flex flex-col">
      {industries.map((industry, index) => {
        const isActive = industry.id === activeId;
        const stroke = accentStroke[industry.accent];
        return (
          <button
            key={industry.id}
            id={`industry-tab-${industry.id}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`industry-panel-${industry.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(industry.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="group relative flex items-center gap-3 border-t border-white/8 py-3.5 text-left outline-none first:border-t-0 focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            {isActive ? (
              <motion.span
                layoutId="industry-nav-bar"
                aria-hidden
                className="absolute top-1.5 bottom-1.5 left-0 w-0.5 rounded-full"
                style={{ backgroundColor: stroke }}
                transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 38 }}
              />
            ) : null}
            <span
              className={cn("pl-4 font-mono text-[11px] font-semibold tabular-nums transition-colors duration-base", isActive ? "" : "text-white/30 group-hover:text-white/50")}
              style={isActive ? { color: stroke } : undefined}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className={cn("text-body-sm min-w-0 flex-1 font-semibold transition-colors duration-base", isActive ? "text-white" : "text-white/45 group-hover:text-white/75")}>
              {t(`items.${industry.id}.title`)}
            </span>
            {isActive ? (
              <motion.span
                aria-hidden
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: [1, 1.5, 1], opacity: 1 }}
                transition={reduceMotion ? { duration: 0.2 } : { scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.2 } }}
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: stroke, boxShadow: `0 0 6px 1px ${stroke}` }}
              />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
