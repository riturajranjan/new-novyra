"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FeatureCheck } from "@/components/pricing/feature-check";
import { accentStroke, accentTint } from "@/lib/accent";
import { cn } from "@/lib/utils";
import type { BillingMode, PricingPlan } from "@/content/pricing";

interface PlanSelectorCardProps {
  plan: PricingPlan;
  mode: BillingMode;
  onSelect: (id: string) => void;
  index?: number;
}

/** One compact plan card in the rail beside the spotlight — clicking it
 * promotes that plan into the spotlight (and the plan the spotlight was
 * just showing reappears here in its place). The rail only ever shows the
 * plans *not* currently spotlighted, so there's no "selected" state to
 * carry here — that's a plain button, not a radio: nothing in this list is
 * ever the current choice, the choice is whatever's large on the right.
 *
 * Renders once and reflows itself with responsive classes — below `lg` it's
 * a compact horizontal scroll-snap tab (icon, name, price only); at `lg`+
 * the tagline, divider, and benefit list reveal via `lg:` variants on the
 * same elements. This used to be two separate call sites (a "row" instance
 * below `lg`, a "stack" instance at `lg`+, picked with `layout: "stack" |
 * "row"`) which meant every plan's full markup — including its translated
 * text — was duplicated in the DOM at all times, with only one copy ever
 * visible. A single CSS-responsive component removes that duplication
 * entirely rather than just hiding it.
 *
 * The border is a 1px padding frame (gradient background behind a fully
 * opaque inner card) with a slow `animate-aurora` background-position pan
 * — reusing the same drift token as the section's ambient background
 * rather than a bespoke animation, so the "living" border reads as part of
 * the page's existing motion language. Deliberately dark-glass regardless
 * of site theme, matching PlanSpotlight.
 *
 * Only fades in/out as the rail's composition changes — no lift, slide, or
 * layout-driven reflow animation on the card itself. Hover feedback is
 * limited to border/glow/background-color transitions (~220ms), not a
 * transform, so switching plans stays quiet rather than bouncy. */
export function PlanSelectorCard({ plan, mode, onSelect, index = 0 }: PlanSelectorCardProps) {
  const t = useTranslations("pricing");
  const reduceMotion = useReducedMotion();
  const Icon = plan.icon;
  const stroke = accentStroke[plan.accent];
  const benefits = plan.features.slice(0, 3);
  const planName = t(`plans.${plan.id}.name`);
  const priceSuffix = plan.priceSuffix[mode];
  const accessibleLabel = `${planName}, ${plan.price[mode]}${priceSuffix ? ` ${priceSuffix}` : ""}`;

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(plan.id)}
      aria-label={accessibleLabel}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, delay: index * 0.04, ease: "easeOut" }}
      style={
        {
          backgroundImage: `linear-gradient(135deg, ${accentTint(plan.accent, 35)}, rgba(255,255,255,0.05), ${accentTint(plan.accent, 18)})`,
          backgroundSize: "200% 200%",
          "--card-glow": accentTint(plan.accent, 55),
        } as React.CSSProperties
      }
      className={cn(
        "group relative flex w-[160px] shrink-0 cursor-pointer snap-start rounded-2xl p-px text-left transition-shadow duration-[220ms] sm:w-[172px]",
        "lg:w-full lg:snap-align-none",
        "focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "hover:shadow-[0_18px_44px_-18px_var(--card-glow)]",
        !reduceMotion && "animate-aurora",
      )}
    >
      <div
        className="relative flex h-full min-h-[112px] w-full flex-col overflow-hidden rounded-[15px] p-4 backdrop-blur-xl backdrop-saturate-150 lg:min-h-[150px]"
        style={{ backgroundImage: "linear-gradient(160deg, rgba(255,255,255,0.06), rgba(13,12,20,0.97) 55%)" }}
      >
        {/* Background-color hover feedback — a soft brightening wash, not
            a transform. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[220ms] group-hover:opacity-100"
          style={{ backgroundColor: accentTint(plan.accent, 5) }}
        />

        {/* One `relative` wrapper for all real content, rather than marking
            each child individually — the overlay above is `position:
            absolute` and would otherwise paint over any plain in-flow
            sibling regardless of DOM order. */}
        <div className="relative flex h-full flex-col">
          <div className="mb-1.5 flex items-start gap-3 lg:mb-3">
            <span
              aria-hidden
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-[220ms]"
              style={{
                backgroundImage: `linear-gradient(135deg, ${accentTint(plan.accent, 28)}, ${accentTint(plan.accent, 8)})`,
                boxShadow: `inset 0 0 0 1px ${accentTint(plan.accent, 40)}`,
              }}
            >
              <Icon className="h-4.5 w-4.5" style={{ color: stroke }} aria-hidden />
            </span>
            <div className="flex min-w-0 flex-col">
              <span className="text-body-sm font-semibold text-white">{planName}</span>
              <span className="text-caption hidden line-clamp-2 text-white/50 lg:block">{t(`plans.${plan.id}.tagline`)}</span>
            </div>
          </div>

          <div className="mb-3 hidden border-t border-white/10 lg:block" />

          <span aria-hidden className="mt-auto mb-0 flex items-baseline gap-1 lg:mt-0 lg:mb-3">
            <span className="text-title-lg font-semibold text-white">{plan.price[mode]}</span>
            {priceSuffix ? <span className="text-caption text-white/45">{priceSuffix}</span> : null}
          </span>

          <ul aria-hidden className="mt-auto hidden flex-col gap-2 lg:flex">
            {benefits.map((feature) => (
              <li key={feature} className="text-caption flex items-center gap-2 text-white/65">
                <FeatureCheck color={stroke} />
                <span className="truncate">{t(`plans.${plan.id}.features.${feature}`)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.button>
  );
}
