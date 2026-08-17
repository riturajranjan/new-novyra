"use client";

import type { KeyboardEvent } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { accentStroke } from "@/lib/accent";
import { cn } from "@/lib/utils";
import type { ServiceCategory } from "@/content/service-categories";

interface ServiceRailProps {
  categories: ServiceCategory[];
  activeId: string;
  onSelect: (id: string) => void;
}

/** A numbered horizontal rail replacing the old boxed 6-pill selector —
 * full names always visible (horizontal scroll instead of truncation),
 * no pill container per item, one thin gradient underline marking the
 * active service. */
export function ServiceRail({ categories, activeId, onSelect }: ServiceRailProps) {
  const t = useTranslations("services");
  const reduceMotion = useReducedMotion();

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next =
      e.key === "ArrowRight"
        ? (index + 1) % categories.length
        : e.key === "ArrowLeft"
          ? (index - 1 + categories.length) % categories.length
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? categories.length - 1
              : null;
    if (next === null) return;
    e.preventDefault();
    const target = categories[next];
    onSelect(target.id);
    document.getElementById(`service-rail-tab-${target.id}`)?.focus();
  }

  return (
    <div
      role="tablist"
      aria-label={t("nav.ariaLabel")}
      className="scrollbar-none flex items-stretch gap-5 overflow-x-auto border-b border-white/8 sm:gap-7 [&::-webkit-scrollbar]:hidden"
    >
      {categories.map((category, index) => {
        const isActive = category.id === activeId;
        const stroke = accentStroke[category.accent];
        return (
          <button
            key={category.id}
            id={`service-rail-tab-${category.id}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`service-panel-${category.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(category.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="group relative flex shrink-0 items-baseline gap-1.5 pb-3 whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            <span
              className={cn(
                "font-mono text-[11px] font-semibold tabular-nums transition-colors duration-base",
                isActive ? "" : "text-white/30 group-hover:text-white/50",
              )}
              style={isActive ? { color: stroke } : undefined}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className={cn(
                "text-body-sm font-semibold tracking-tight transition-colors duration-base",
                isActive ? "text-white" : "text-white/45 group-hover:text-white/75",
              )}
            >
              {t(`categories.${category.id}.label`)}
            </span>

            {isActive ? (
              <motion.span
                layoutId="service-rail-underline"
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-0.5 rounded-full"
                style={{ backgroundColor: stroke }}
                transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 38 }}
              />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
