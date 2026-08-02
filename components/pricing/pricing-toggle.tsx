"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { billingModes, type BillingMode } from "@/content/pricing";
import { cn } from "@/lib/utils";

interface PricingToggleProps {
  active: BillingMode;
  onSelect: (mode: BillingMode) => void;
  className?: string;
}

/** Elegant segmented glass toggle with a spring-animated sliding indicator
 * and a soft glow, matching the filter-pill language used elsewhere on the
 * page (see the Case Studies filter bar). */
export function PricingToggle({ active, onSelect, className }: PricingToggleProps) {
  const t = useTranslations("pricing");
  return (
    <div
      role="tablist"
      aria-label={t("toggleAriaLabel")}
      className={cn(
        "glass relative mx-auto flex max-w-full gap-1 overflow-x-auto rounded-pill p-1.5 shadow-[0_0_24px_-14px_var(--color-brand-purple)] [scrollbar-width:none] sm:w-[300px] md:w-[320px] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {billingModes.map((mode) => {
        const isActive = mode.id === active;
        return (
          <button
            key={mode.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(mode.id)}
            className="text-caption sm:text-body-sm relative flex h-[46px] flex-1 shrink-0 items-center justify-center rounded-pill px-3 font-medium whitespace-nowrap transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-5"
          >
            {isActive ? (
              <motion.span
                layoutId="pricing-toggle-active"
                className="bg-gradient-brand absolute inset-0 rounded-pill"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            ) : null}
            <span className={cn("relative", isActive ? "text-white" : "text-foreground-secondary")}>
              {t(`billingModes.${mode.id}`)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
