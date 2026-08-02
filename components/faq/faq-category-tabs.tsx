"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { faqCategories, type FaqCategory } from "@/content/faq";

interface FaqCategoryTabsProps {
  active: FaqCategory;
  onSelect: (category: FaqCategory) => void;
}

/** Premium glass pill tabs with a spring-animated selection indicator —
 * horizontally scrollable so it stays swipeable on mobile. Tab identity and
 * comparison (`active`/`onSelect`) always use the stable `FaqCategory` id;
 * only the rendered label is translated. Arrow-key roving focus + selection
 * (left/right cycles and activates the next tab) — required by the
 * `role="tablist"`/`role="tab"` semantics already declared here. */
export function FaqCategoryTabs({ active, onSelect }: FaqCategoryTabsProps) {
  const t = useTranslations("faq");
  const listRef = useRef<HTMLDivElement>(null);

  function onKeyDown(e: React.KeyboardEvent) {
    if (!["ArrowRight", "ArrowLeft"].includes(e.key)) return;
    const tabs = listRef.current?.querySelectorAll<HTMLElement>('[role="tab"]');
    if (!tabs || tabs.length === 0) return;
    e.preventDefault();
    const list = Array.from(tabs);
    const currentIndex = list.indexOf(document.activeElement as HTMLElement);
    const delta = e.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (currentIndex + delta + list.length) % list.length;
    list[nextIndex]?.focus();
    onSelect(faqCategories[nextIndex]);
  }

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={t("categoryTabs.ariaLabel")}
      onKeyDown={onKeyDown}
      className="glass flex max-w-full gap-1.5 overflow-x-auto rounded-pill p-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {faqCategories.map((category) => {
        const isActive = category === active;
        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(category)}
            className="text-caption relative flex min-h-11 shrink-0 items-center rounded-pill px-4 py-2 font-medium whitespace-nowrap transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {isActive ? (
              <motion.span
                layoutId="faq-category-active"
                className="bg-gradient-brand absolute inset-0 rounded-pill"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            ) : null}
            <span className={cn("relative", isActive ? "text-white" : "text-foreground-secondary")}>
              {t(`categories.${category}`)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
