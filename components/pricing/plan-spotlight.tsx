"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown, ShieldCheck, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { buttonVariants } from "@/components/ui/button";
import { RippleLink } from "@/components/ui/ripple-link";
import { FeatureCheck } from "@/components/pricing/feature-check";
import { accentStroke, accentTint } from "@/lib/accent";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { groupFeatures, splitFeatureGroups, type BillingMode, type PricingPlan } from "@/content/pricing";

const MAX_VISIBLE_FEATURES = 12;

interface PlanSpotlightProps {
  plan: PricingPlan;
  mode: BillingMode;
  /** This renders once per responsive tier (a mobile/tablet instance and a
   * separate desktop instance, toggled with CSS display), so the id must be
   * distinct per instance to stay valid HTML — two elements can never share
   * an id even when only one is visible at a time. */
  panelId: string;
}

/** The featured-plan panel — one reusable, content-driven spotlight rather
 * than an oversized fixed-height card. Deliberately a dark glass "hero" card
 * regardless of site theme, so it reads as a premium focal point instead of
 * a flat brand-colored rectangle. Three layers, kept close together on a
 * 24px rhythm rather than spread out: identity + price up top, grouped
 * features in the middle (each group flagged with a colored rule instead of
 * a plain icon+caption, for actual hierarchy), CTA + a short trust line
 * directly under the features — not stranded in leftover space below. */
export function PlanSpotlight({ plan, mode, panelId }: PlanSpotlightProps) {
  const t = useTranslations("pricing");
  const [expanded, setExpanded] = useState(false);
  const stroke = accentStroke[plan.accent];

  const groups = groupFeatures(plan.features);
  const { visible, overflow, overflowCount } = splitFeatureGroups(groups, MAX_VISIBLE_FEATURES);

  return (
    <div
      id={panelId}
      className="relative isolate flex flex-col overflow-hidden rounded-hero p-px transition-[background-image] duration-500"
      style={{
        backgroundImage: `linear-gradient(135deg, ${accentTint(plan.accent, 48)}, rgba(255,255,255,0.07), ${accentTint(plan.accent, 20)})`,
      }}
    >
      {/* Ambient halo behind the card — reacts to whichever plan is selected. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-full blur-3xl transition-colors duration-500"
        style={{ backgroundColor: accentTint(plan.accent, 15) }}
      />

      <div
        className="relative flex flex-1 flex-col gap-6 overflow-hidden rounded-hero p-5 sm:p-6 lg:p-7"
        style={{
          backgroundImage:
            "radial-gradient(120% 100% at 0% 0%, rgba(255,255,255,0.055), transparent 55%), linear-gradient(160deg, #0a0b14 0%, #13111f 55%, #0a0912 100%)",
          boxShadow: `0 24px 70px -22px ${accentTint(plan.accent, 40)}, inset 0 1px 0 rgba(255,255,255,0.08)`,
          transition: "box-shadow 0.5s ease",
        }}
      >
        {/* Top-left light */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 -left-16 -z-10 h-52 w-52 rounded-full blur-[90px] transition-colors duration-500"
          style={{ backgroundColor: accentTint(plan.accent, 35) }}
        />
        {/* Bottom-right fade */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-12 -bottom-16 -z-10 h-56 w-56 rounded-full blur-[95px]"
          style={{ backgroundColor: accentTint(plan.accent, 14) }}
        />
        {/* Very subtle noise texture */}
        <div aria-hidden className="bg-noise pointer-events-none absolute inset-0 -z-10 opacity-[0.05] mix-blend-overlay" />
        {/* Top glass reflection */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-20 bg-gradient-to-b from-white/[0.06] to-transparent" />

        {/* Only this content swaps on plan change — the gradient-border
            wrapper and dark card shell above stay mounted and untouched,
            so the card itself never resizes or re-lays-out; a plain
            horizontal slide + slight fade, no scale/rotation/blur, reads
            as a tab change rather than an "arrival" effect. */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col gap-6"
          >
            {/* ---- TOP: identity + price ---- */}
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${accentTint(plan.accent, 30)}, ${accentTint(plan.accent, 8)})`,
                    boxShadow: `inset 0 0 0 1px ${accentTint(plan.accent, 45)}`,
                  }}
                >
                  <plan.icon className="h-5 w-5" style={{ color: stroke }} aria-hidden />
                </span>
                <div className="flex min-w-0 flex-col gap-0.5 pt-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-headline font-semibold text-white">{t(`plans.${plan.id}.name`)}</h3>
                    {plan.featured ? (
                      <span className="bg-gradient-brand flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold text-white">
                        <Sparkles className="h-3 w-3" aria-hidden />
                        {t("popular")}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-body-sm max-w-md text-white/55">{t(`plans.${plan.id}.tagline`)}</p>
                  {plan.featured ? (
                    <p className="text-gradient-brand text-caption pt-0.5 font-semibold">{t("bestValue")}</p>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                {plan.hasPriceLabel ? (
                  <p className="text-gradient-brand text-caption font-semibold tracking-wide uppercase">
                    {t(`plans.${plan.id}.priceLabel`)}
                  </p>
                ) : null}
                <p className="text-display-lg font-semibold text-white">
                  {plan.price[mode]}
                  <span className="text-title font-medium text-white/50">{plan.priceSuffix[mode]}</span>
                </p>
                {plan.hasPriceLabel ? (
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-caption flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-white/55">
                      <ShieldCheck className="h-3 w-3" style={{ color: stroke }} aria-hidden />
                      {mode === "project" ? t("priceNote.oneTimePayment") : t("priceNote.billedMonthly")}
                    </span>
                    <span className="text-caption flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-white/55">
                      <ShieldCheck className="h-3 w-3" style={{ color: stroke }} aria-hidden />
                      {mode === "project" ? t("priceNote.noHiddenCharges") : t("priceNote.cancelAnytime")}
                    </span>
                  </div>
                ) : null}
              </div>
            </div>

            {/* ---- MIDDLE: grouped feature list — each group carries a
                colored rule + brighter label, not a flat icon+caption, so
                the list actually reads as sectioned instead of one run-on
                block. ---- */}
            <div className="grid grid-cols-1 items-start gap-x-8 gap-y-5 sm:grid-cols-2">
              {visible.map((group) => (
                <div key={group.category} className="flex flex-col gap-2.5 border-l-2 pl-3.5" style={{ borderColor: accentTint(plan.accent, 40) }}>
                  <div className="flex items-center gap-1.5">
                    <group.icon className="h-3.5 w-3.5" style={{ color: stroke }} aria-hidden />
                    <span className="text-caption font-semibold tracking-wide text-white/75 uppercase">
                      {t(`featureCategories.${group.category}`)}
                    </span>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {group.items.map((feature) => (
                      <li key={feature} className="text-body-sm flex items-center gap-2.5 text-white/78">
                        <FeatureCheck color={stroke} />
                        <span className="truncate">{t(`plans.${plan.id}.features.${feature}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <AnimatePresence initial={false}>
                {expanded
                  ? overflow.map((group) => (
                      <motion.div
                        key={group.category}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: easePremium }}
                        className="overflow-hidden border-l-2 pl-3.5"
                        style={{ borderColor: accentTint(plan.accent, 40) }}
                      >
                        <div className="flex flex-col gap-2.5">
                          <div className="flex items-center gap-1.5">
                            <group.icon className="h-3.5 w-3.5" style={{ color: stroke }} aria-hidden />
                            <span className="text-caption font-semibold tracking-wide text-white/75 uppercase">
                              {t(`featureCategories.${group.category}`)}
                            </span>
                          </div>
                          <ul className="flex flex-col gap-2">
                            {group.items.map((feature) => (
                              <li key={feature} className="text-body-sm flex items-center gap-2.5 text-white/78">
                                <FeatureCheck color={stroke} />
                                <span className="truncate">{t(`plans.${plan.id}.features.${feature}`)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    ))
                  : null}
              </AnimatePresence>
            </div>

            {overflowCount > 0 ? (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                className="text-caption -mt-2 flex items-center gap-1 self-start font-semibold"
                style={{ color: stroke }}
              >
                {expanded ? t("showLess") : t("viewAllFeatures", { count: overflowCount })}
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-fast", expanded && "rotate-180")} aria-hidden />
              </button>
            ) : null}

            {/* ---- BOTTOM: CTA, kept close to the feature list, plus a
                short trust line instead of leftover empty space. ---- */}
            <div className="flex flex-col gap-4 border-t border-white/10 pt-5">
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                <RippleLink
                  href={plan.ctaHref}
                  className={cn(
                    buttonVariants({ variant: "gradient", size: "lg" }),
                    "group/cta relative w-full overflow-hidden sm:w-auto sm:min-w-[190px]",
                  )}
                >
                  <span
                    aria-hidden
                    className="bg-gradient-shimmer pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-700 ease-out group-hover/cta:translate-x-full"
                  />
                  {t(`plans.${plan.id}.cta`)}
                  <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover/cta:translate-x-0.5" aria-hidden />
                </RippleLink>
                <RippleLink
                  href={plan.ctaHref}
                  className="text-body-sm font-medium text-white/55 underline-offset-4 transition-colors duration-fast hover:text-white hover:underline"
                >
                  {t("viewCompletePackage")}
                </RippleLink>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                <span className="text-caption flex items-center gap-1.5 text-white/45">
                  <FeatureCheck color={stroke} />
                  {t("spotlightTrust.freeConsultation")}
                </span>
                <span className="text-caption flex items-center gap-1.5 text-white/45">
                  <FeatureCheck color={stroke} />
                  {t("priceNote.noHiddenCharges")}
                </span>
                <span className="text-caption flex items-center gap-1.5 text-white/45">
                  <FeatureCheck color={stroke} />
                  {t("trustStrip.sourceCodeOwnership")}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
