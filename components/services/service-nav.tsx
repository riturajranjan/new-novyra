"use client";

import type { KeyboardEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { accentStroke, accentTint } from "@/lib/accent";
import { cn } from "@/lib/utils";
import type { ServiceCategory } from "@/content/service-categories";

interface ServiceNavProps {
  categories: ServiceCategory[];
  activeId: string;
  onSelect: (id: string) => void;
}

/** Glass service navigation — a horizontal tab strip below `lg`, a vertical
 * list above it. One markup, breakpoint-driven, so there's no split mobile /
 * desktop implementation to keep in sync. */
export function ServiceNav({ categories, activeId, onSelect }: ServiceNavProps) {
  const t = useTranslations("services");
  const reduceMotion = useReducedMotion();

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? (index + 1) % categories.length
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
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
    document.getElementById(`service-tab-${target.id}`)?.focus();
  }

  return (
    <div
      role="tablist"
      aria-label={t("nav.ariaLabel")}
      aria-orientation="vertical"
      className="glass flex shrink-0 gap-2 overflow-x-auto rounded-hero p-2.5 lg:flex-col lg:overflow-visible lg:gap-1.5"
    >
      {categories.map((category, index) => {
        const Icon = category.icon;
        const isActive = category.id === activeId;
        return (
          <button
            key={category.id}
            id={`service-tab-${category.id}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`service-panel-${category.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(category.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            style={{ ["--tab-glow" as string]: accentTint(category.accent, 45) }}
            className={cn(
              "group relative flex shrink-0 items-center gap-3 overflow-hidden rounded-2xl px-4 py-3 text-left transition-transform duration-base ease-soft",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              !isActive && "hover:-translate-y-0.5 hover:shadow-[0_0_28px_-10px_var(--tab-glow)]",
            )}
          >
            {isActive ? (
              <>
                {/* Outer layer carries the shared-element `layoutId`
                    (position/size morph between tabs) and is a gradient
                    ring — a 1.5px frame, not a flat fill — with a solid
                    tinted panel inset inside it plus an always-on soft
                    glow, so "selected" reads as a lit border, not just a
                    background tint. */}
                <motion.span
                  layoutId="service-nav-active"
                  transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 34 }}
                  className="absolute inset-0 -z-10 overflow-hidden rounded-2xl p-[1.5px]"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${accentStroke[category.accent]}, rgba(255,255,255,0.25), ${accentTint(category.accent, 60)})`,
                    boxShadow: `0 0 24px -10px ${accentTint(category.accent, 55)}`,
                  }}
                >
                  <span
                    aria-hidden
                    className="block h-full w-full rounded-[15px]"
                    style={{ backgroundImage: `linear-gradient(135deg, ${accentTint(category.accent, 22)}, ${accentTint(category.accent, 6)})` }}
                  />
                </motion.span>
                {/* Left accent line — a second, independent selection
                    signal alongside the ring, the common "active nav item"
                    marker in dense product sidebars. */}
                <motion.span
                  aria-hidden
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute top-1/2 left-0 h-6 w-[3px] -translate-y-1/2 rounded-full"
                  style={{ backgroundColor: accentStroke[category.accent], boxShadow: `0 0 10px -1px ${accentTint(category.accent, 60)}` }}
                />
              </>
            ) : (
              <span
                aria-hidden
                className="border-border-subtle absolute inset-0 -z-10 rounded-2xl border border-transparent opacity-0 transition-opacity duration-base group-hover:opacity-100"
              />
            )}

            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-base"
              style={{ backgroundColor: accentTint(category.accent, isActive ? 20 : 10) }}
            >
              <Icon className="h-5 w-5" style={{ color: accentStroke[category.accent] }} aria-hidden />
            </span>

            <span className="min-w-0 flex-1">
              <span
                className={cn(
                  "text-body-sm block truncate font-semibold",
                  isActive ? "text-foreground" : "text-foreground-secondary",
                )}
              >
                {t(`categories.${category.id}.label`)}
              </span>
              <span className="text-caption text-foreground-secondary hidden truncate lg:block">
                {t(`categories.${category.id}.subtitle`)}
              </span>
              {/* Small progress line — grows in on the active item as an
                  extra, non-color-alone selection signal. */}
              {isActive ? (
                <motion.span
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
                  className="mt-1.5 block h-[2px] w-8 origin-left rounded-full"
                  style={{ backgroundColor: accentStroke[category.accent] }}
                />
              ) : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}
