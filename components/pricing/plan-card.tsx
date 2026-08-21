"use client";

import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { buttonVariants } from "@/components/ui/button";
import { RippleLink } from "@/components/ui/ripple-link";
import { FeatureCheck } from "@/components/pricing/feature-check";
import { accentStroke, accentTint } from "@/lib/accent";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { BillingMode, PricingPlan } from "@/content/pricing";

const MAX_VISIBLE_FEATURES = 6;

interface PlanCardProps {
  plan: PricingPlan;
  mode: BillingMode;
  index?: number;
  className?: string;
}

/** One compact, self-contained plan card — icon+name, a one-line audience
 * description, price, 4–6 top features and a CTA, with a "view full
 * features" link out to the comparison table below rather than expanding
 * in place. Replaces the old rail-of-tiny-cards + one giant spotlight
 * panel: every plan is visible and comparable at once instead of requiring
 * a click to see any plan but the default one. The featured plan gets a
 * brighter border/glow and an integrated top-edge badge, not a
 * dramatically larger footprint — all three should still read as one
 * family. */
export function PlanCard({ plan, mode, index = 0, className }: PlanCardProps) {
  const t = useTranslations("pricing");
  const stroke = accentStroke[plan.accent];
  const featured = Boolean(plan.featured);
  const features = plan.features.slice(0, MAX_VISIBLE_FEATURES);
  const priceSuffix = plan.priceSuffix[mode];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: easePremium }}
      whileHover={{ y: -4 }}
      className={cn("group relative isolate flex h-full flex-col rounded-2xl p-px transition-shadow duration-base", className)}
      style={{
        backgroundImage: featured
          ? `linear-gradient(150deg, ${accentTint(plan.accent, 55)}, rgba(255,255,255,0.08), ${accentTint(plan.accent, 28)})`
          : `linear-gradient(150deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))`,
      }}
    >
      {featured ? (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-6 -z-10 rounded-[32px] opacity-70 blur-2xl"
          style={{ backgroundColor: accentTint(plan.accent, 20) }}
        />
      ) : null}

      {featured ? (
        <span
          className="absolute -top-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold text-white shadow-[0_6px_18px_-4px_rgba(139,92,246,0.6)]"
          style={{ backgroundImage: "linear-gradient(90deg, #6366F1, #A855F7)" }}
        >
          <Sparkles className="h-3 w-3" aria-hidden />
          {t("popular")}
        </span>
      ) : null}

      <div
        className="relative flex h-full flex-col gap-5 overflow-hidden rounded-[15px] p-6 transition-colors duration-base group-hover:border-white/20 sm:p-7"
        style={{
          backgroundImage: featured
            ? "radial-gradient(120% 90% at 50% 0%, rgba(139,92,246,0.10), transparent 60%), linear-gradient(160deg, #0e0d18 0%, #14111f 55%, #0a0912 100%)"
            : "linear-gradient(160deg, rgba(255,255,255,0.04), rgba(10,10,16,0.96) 55%)",
        }}
      >
        <div className="flex items-center gap-3">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{
              backgroundImage: `linear-gradient(135deg, ${accentTint(plan.accent, 28)}, ${accentTint(plan.accent, 8)})`,
              boxShadow: `inset 0 0 0 1px ${accentTint(plan.accent, 42)}`,
            }}
          >
            <plan.icon className="h-4.5 w-4.5" style={{ color: stroke }} aria-hidden />
          </span>
          <div className="flex min-w-0 flex-col">
            <span className="text-title font-semibold text-white">{t(`plans.${plan.id}.name`)}</span>
            <span className="text-caption truncate text-white/50">{t(`plans.${plan.id}.tagline`)}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          {plan.hasPriceLabel ? (
            <span className="text-caption font-semibold tracking-wide uppercase" style={{ color: stroke }}>
              {t(`plans.${plan.id}.priceLabel`)}
            </span>
          ) : null}
          <p className="text-display-lg leading-none font-semibold text-white">
            {plan.price[mode]}
            <span className="text-title font-medium text-white/45">{priceSuffix}</span>
          </p>
          {plan.hasPriceLabel ? (
            <span className="text-caption flex items-center gap-1.5 text-white/45">
              <ShieldCheck className="h-3 w-3" style={{ color: stroke }} aria-hidden />
              {mode === "project" ? t("priceNote.oneTimePayment") : t("priceNote.billedMonthly")}
            </span>
          ) : null}
        </div>

        <ul className="flex flex-col gap-2.5">
          {features.map((feature) => (
            <li key={feature} className="text-body-sm flex items-center gap-2.5 text-white/78">
              <FeatureCheck color={stroke} />
              <span className="truncate">{t(`plans.${plan.id}.features.${feature}`)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-3 pt-1">
          <RippleLink
            href={plan.ctaHref}
            className={cn(
              buttonVariants({ variant: featured ? "gradient" : "outline", size: "lg" }),
              "group/cta relative w-full overflow-hidden",
            )}
          >
            {featured ? (
              <span
                aria-hidden
                className="bg-gradient-shimmer pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-700 ease-out group-hover/cta:translate-x-full"
              />
            ) : null}
            {t(`plans.${plan.id}.cta`)}
            <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover/cta:translate-x-0.5" aria-hidden />
          </RippleLink>
          <a
            href="#compare-plans"
            className="text-caption self-center font-medium text-white/50 underline-offset-4 transition-colors duration-fast hover:text-white hover:underline"
          >
            {t("viewCompletePackage")}
          </a>
        </div>
      </div>
    </motion.div>
  );
}
