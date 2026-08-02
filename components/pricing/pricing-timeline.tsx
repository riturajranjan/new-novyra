"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { pricingTimeline } from "@/content/pricing";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Horizontal glass roadmap — nodes with a gradient glow on hover and an
 * animated connecting line that draws in on scroll. */
export function PricingTimeline() {
  const t = useTranslations("pricing");
  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-caption text-foreground-secondary text-center font-semibold tracking-wide uppercase">
        {t("timeline.heading")}
      </p>
      <ol className="flex w-full items-start justify-between overflow-x-auto pb-2 sm:overflow-visible">
        {pricingTimeline.map((step, i) => {
          const Icon = step.icon;
          return (
            <li
              key={step.id}
              className={cn("flex min-w-[4.5rem] shrink-0 items-center sm:min-w-0", i < pricingTimeline.length - 1 && "flex-1")}
            >
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "150px" }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: easePremium }}
                className="group border-border-subtle bg-surface/70 relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border backdrop-blur-md"
              >
                <div
                  aria-hidden
                  className="bg-gradient-brand pointer-events-none absolute -inset-2 -z-10 rounded-full opacity-0 blur-md transition-opacity duration-slow group-hover:opacity-60"
                />
                <Icon className="text-brand-blue h-4.5 w-4.5" aria-hidden />
              </motion.div>
              <span className="text-caption text-foreground-secondary ml-2 hidden font-medium sm:block">
                {t(`timeline.steps.${step.id}`)}
              </span>
              {i < pricingTimeline.length - 1 ? (
                <span className="bg-border-subtle relative mx-2 h-px flex-1 overflow-hidden rounded-full">
                  <motion.span
                    className="bg-gradient-brand absolute inset-y-0 left-0"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true, margin: "150px" }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: easePremium }}
                  />
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
