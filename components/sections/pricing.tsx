"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, FileText } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { RippleLink } from "@/components/ui/ripple-link";
import { PricingBackground } from "@/components/pricing/pricing-background";
import { PricingToggle } from "@/components/pricing/pricing-toggle";
import { PlanCard } from "@/components/pricing/plan-card";
import { ComparePanel } from "@/components/pricing/compare-panel";
import { TrustStrip } from "@/components/pricing/trust-strip";
import { CustomProjectCta } from "@/components/pricing/custom-project-cta";
import { PricingAssuranceStrip } from "@/components/pricing/pricing-assurance-strip";
import { PricingTimeline } from "@/components/pricing/pricing-timeline";
import { ValueCard } from "@/components/pricing/value-card";
import { PricingFaq } from "@/components/pricing/pricing-faq";
import { pricingPlans, valueCards, type BillingMode } from "@/content/pricing";
import { cn } from "@/lib/utils";

const starterPlan = pricingPlans.find((p) => p.id === "starter")!;
const professionalPlan = pricingPlans.find((p) => p.id === "professional")!;
const businessPlan = pricingPlans.find((p) => p.id === "business")!;

/** Three self-contained plan cards, always visible together (Starter,
 * Professional, Business) instead of a rail-of-tiny-cards beside one
 * giant spotlight panel that only ever showed one plan's full detail at a
 * time — every plan is comparable at a glance now. Professional sits
 * first on mobile (highest-intent plan first), spans the full row on
 * tablet, and sits centered with a small elevation on desktop. */
export function Pricing() {
  const t = useTranslations("pricing");
  const [mode, setMode] = useState<BillingMode>("project");

  return (
    <section id="pricing" className="relative isolate scroll-mt-24 overflow-hidden pt-8 pb-14 md:pt-10 md:pb-20">
      <PricingBackground />

      <Container className="flex flex-col gap-6 md:gap-7">
        <div className="flex justify-center">
          <PricingToggle active={mode} onSelect={setMode} />
        </div>

        {/* Three self-contained cards, no click-to-swap: Professional spans
            the full row on tablet and sits centered/first on mobile
            (highest-intent plan first); at `lg`+ all three sit in natural
            reading order with Professional only lightly elevated
            (`lg:-mt-3`), not dramatically larger — still one family of
            cards, not a hero card plus two afterthoughts. */}
        <div
          role="group"
          aria-label={t("radiogroupAriaLabel")}
          className="mx-auto grid w-full max-w-[1240px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          <div className="order-2 sm:order-2 lg:order-1">
            <PlanCard plan={starterPlan} mode={mode} index={0} className="h-full" />
          </div>
          <div className="order-1 sm:order-1 sm:col-span-2 lg:order-2 lg:col-span-1 lg:-mt-3">
            <PlanCard plan={professionalPlan} mode={mode} index={1} className="h-full" />
          </div>
          <div className="order-3 sm:order-3 lg:order-3">
            <PlanCard plan={businessPlan} mode={mode} index={2} className="h-full" />
          </div>
        </div>

        <div id="compare-plans" className="mx-auto mt-4 flex w-full max-w-[1240px] scroll-mt-24 flex-col md:mt-5">
          {/* Compare panel + trust strip share one dark glass shell so they
              read as a single connected block instead of two floating boxes
              — and stay part of the same dark, premium card system as the
              cards above regardless of the site's light/dark setting. (A
              nested `.dark` class won't do this: Tailwind's `@theme inline`
              tokens like `--color-glass-strong` alias `var(--glass-bg-
              strong)` once at `:root`, so descendants just inherit that
              already-resolved value instead of re-evaluating the alias
              against a locally-overridden `.dark` scope — confirmed via
              computed styles, not assumed.) */}
          <div
            className="shadow-card divide-y divide-white/10 overflow-hidden rounded-hero border border-white/8"
            style={{ backgroundImage: "linear-gradient(160deg, rgba(255,255,255,0.05), rgba(13,12,20,0.97) 55%)" }}
          >
            <ComparePanel />
            <TrustStrip />
          </div>
        </div>

        <CustomProjectCta />

        <PricingAssuranceStrip />

        <PricingTimeline />

        {/* why our pricing works */}
        <div className="glass-strong shadow-card relative flex flex-col gap-6 overflow-hidden rounded-2xl p-6 sm:p-10 md:gap-8">
          <div
            aria-hidden
            className="bg-brand-emerald/10 pointer-events-none absolute -inset-20 -z-10 rounded-full blur-3xl"
          />
          <div className="flex flex-col items-center gap-2 text-center">
            <h3 className="text-title-lg text-foreground font-semibold">
              {t("whyItWorks.heading")}
            </h3>
            <p className="text-body-sm text-foreground-secondary max-w-xl">
              {t("whyItWorks.description")}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {valueCards.map((card, i) => (
              <ValueCard key={card.id} card={card} index={i} />
            ))}
          </div>
        </div>

        <PricingFaq />

        {/* final CTA */}
        <div className="glass-strong shadow-card relative flex flex-col items-center gap-5 overflow-hidden rounded-hero p-6 text-center sm:flex-row sm:justify-between sm:p-10 sm:text-left md:gap-6">
          <div
            aria-hidden
            className="bg-gradient-brand pointer-events-none absolute -inset-16 -z-10 rounded-full opacity-20 blur-3xl"
          />
          <div className="flex flex-col gap-2">
            <h3 className="text-title-lg text-foreground font-semibold">
              {t("finalCta.heading")}
            </h3>
            <p className="text-body-sm text-foreground-secondary max-w-md">
              {t("finalCta.description")}
            </p>
          </div>
          <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:items-end">
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <RippleLink
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "gradient", size: "lg" }),
                  "group relative w-full overflow-hidden sm:w-auto",
                )}>
                <span
                  aria-hidden
                  className="bg-gradient-shimmer pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-full"
                />
                {t("finalCta.primaryCta")}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-0.5"
                  aria-hidden
                />
              </RippleLink>
              <RippleLink
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "group w-full sm:w-auto",
                )}>
                <FileText className="h-4 w-4" aria-hidden />
                {t("finalCta.secondaryCta")}
              </RippleLink>
            </div>
            <span className="text-caption text-foreground-secondary font-medium">{t("finalCta.trustNote")}</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
