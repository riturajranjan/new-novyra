"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { accentStroke, accentTint } from "@/lib/accent";
import { buttonVariants } from "@/components/ui/button";
import { easePowerOut, easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { RippleLink } from "@/components/ui/ripple-link";
import { DeliverablesRail } from "@/components/services/deliverables-rail";
import { serviceCategories, type ServiceCategory } from "@/content/service-categories";

const trustIds = ["freeConsultation", "transparentPricing", "sourceCodeOwnership"] as const;

function InlineList({ items }: { items: string[] }) {
  return (
    <p className="text-body-sm text-foreground">
      {items.map((item, i) => (
        <span key={item}>
          {item}
          {i < items.length - 1 ? <span className="text-foreground-secondary/60"> · </span> : null}
        </span>
      ))}
    </p>
  );
}

/** Editorial service detail — the "02" section beneath the hero. An
 * asymmetric two-column read: left column is flowing description text
 * (no chip-in-card grid), right column is the deliverables rail and the
 * two engagement actions. Both columns key off the same selected
 * category and cross-fade together when it changes. */
export function ServiceDetails({ category }: { category: ServiceCategory }) {
  const t = useTranslations("services");
  const bestFor = t.raw(`categories.${category.id}.bestFor`) as string[];
  const keyBenefits = t.raw(`categories.${category.id}.keyBenefits`) as string[];
  const deliverables = t.raw(`categories.${category.id}.deliverables`) as string[];
  const stroke = accentStroke[category.accent];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={category.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.32, ease: easePowerOut }}
        className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,44%)_minmax(0,56%)] xl:gap-12"
      >
        <div className="flex flex-col gap-7">
          <div>
            <p className="text-caption font-semibold tracking-wide uppercase" style={{ color: stroke }}>
              {String(serviceCategories.findIndex((c) => c.id === category.id) + 1).padStart(2, "0")} /{" "}
              {t(`categories.${category.id}.label`)}
            </p>
            <h3
              className="text-foreground mt-1.5 font-semibold text-balance"
              style={{ fontSize: "clamp(32px, 3.4vw, 46px)", lineHeight: 1.08, letterSpacing: "-0.03em" }}
            >
              {t(`categories.${category.id}.description`)}
            </h3>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <p className="text-caption text-foreground-secondary/70 mb-1.5 font-semibold tracking-wide uppercase">
                {t("details.perfectFor")}
              </p>
              <InlineList items={bestFor} />
            </div>
            <div>
              <p className="text-caption text-foreground-secondary/70 mb-1.5 font-semibold tracking-wide uppercase">
                {t("details.technologies")}
              </p>
              <InlineList items={category.technologies} />
            </div>
          </div>

          <span
            className="text-caption inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 font-medium text-foreground"
            style={{ backgroundColor: accentTint(category.accent, 12) }}
          >
            <Clock className="h-3.5 w-3.5" style={{ color: stroke }} aria-hidden />
            {t(`categories.${category.id}.timeline`)}
          </span>
        </div>

        <div className="flex flex-col gap-6">
          <p className="text-caption font-semibold tracking-wide uppercase" style={{ color: stroke }}>
            {t("details.deliverables")}
          </p>

          <DeliverablesRail items={deliverables} accent={category.accent} supporting={keyBenefits} />

          <div className="border-border-subtle flex flex-col gap-3.5 border-t pt-6">
            <div className="grid grid-cols-1 gap-2.5 min-[520px]:grid-cols-2">
              <RippleLink
                href="/#contact"
                className={cn(buttonVariants({ variant: "gradient", size: "md" }), "group min-h-[46px] w-full min-w-0 px-3 text-[14px]")}
              >
                <span className="min-w-0 truncate">{t("details.requestQuote")}</span>
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-fast group-hover:translate-x-0.5" aria-hidden />
              </RippleLink>
              <RippleLink
                href="/work"
                className={cn(buttonVariants({ variant: "outline", size: "md" }), "min-h-[46px] w-full min-w-0 px-3 text-[14px]")}
              >
                <span className="min-w-0 truncate">{t("details.viewSelectedWork")}</span>
              </RippleLink>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
              {trustIds.map((id, i) => (
                <motion.span
                  key={id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 + i * 0.05, ease: easePremium }}
                  className="text-caption text-foreground-secondary flex items-center gap-1.5 font-medium"
                >
                  <span aria-hidden className="h-1 w-1 rounded-full" style={{ backgroundColor: stroke }} />
                  {t(`details.trust.${id}`)}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
