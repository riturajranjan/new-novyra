"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import { useIsMounted } from "@/lib/use-is-mounted";
import { registerStickyBarHidden, registerStickyBarVisible } from "@/lib/sticky-bar-registry";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { RippleLink } from "@/components/ui/ripple-link";
import { PricingBackground } from "@/components/pricing/pricing-background";
import { PricingToggle } from "@/components/pricing/pricing-toggle";
import { PlanSelectorCard } from "@/components/pricing/plan-selector-card";
import { PlanSpotlight } from "@/components/pricing/plan-spotlight";
import { ComparePanel } from "@/components/pricing/compare-panel";
import { TrustStrip } from "@/components/pricing/trust-strip";
import { CustomProjectCta } from "@/components/pricing/custom-project-cta";
import { PricingTimeline } from "@/components/pricing/pricing-timeline";
import { ValueCard } from "@/components/pricing/value-card";
import { PricingFaq } from "@/components/pricing/pricing-faq";
import { pricingPlans, valueCards, type BillingMode } from "@/content/pricing";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";

const DEFAULT_PLAN_ID = pricingPlans.find((p) => p.featured)?.id ?? pricingPlans[0].id;

/** A compact plan rail beside one reusable spotlight — the rail only ever
 * shows the plans *not* currently spotlighted (three cards, not four):
 * clicking one promotes it into the spotlight and the plan that used to be
 * there reappears in the rail in its place. */
export function Pricing() {
  const t = useTranslations("pricing");
  const [mode, setMode] = useState<BillingMode>("project");
  const [selectedId, setSelectedId] = useState<string>(DEFAULT_PLAN_ID);

  const selectedPlan = pricingPlans.find((p) => p.id === selectedId) ?? pricingPlans[0];
  const railPlans = pricingPlans.filter((p) => p.id !== selectedId);

  // Mobile-only sticky action bar — shown while the mobile spotlight card is
  // roughly centered in the viewport, so the CTA stays reachable without a
  // long scroll back up while comparing plans on a small screen.
  const mobileSpotlightRef = useRef<HTMLDivElement>(null);
  const mobileSpotlightInView = useInView(mobileSpotlightRef, { margin: "-40% 0px -40% 0px" });

  // Tells the persistent mobile conversion dock (layout/mobile-conversion-
  // dock.tsx) to step aside while this section's own sticky bar occupies
  // the same fixed bottom-of-viewport position — otherwise the two would
  // render stacked on top of each other.
  useEffect(() => {
    if (!mobileSpotlightInView) return;
    registerStickyBarVisible();
    return () => registerStickyBarHidden();
  }, [mobileSpotlightInView]);

  // Portal to `document.body`: `app/[locale]/template.tsx` wraps all page
  // content in a `motion.div` whose `filter` animation settles at
  // `blur(0px)` rather than `none` — and any non-`none` filter on an
  // ancestor becomes the containing block for `position: fixed`
  // descendants, so a fixed element left inside page content is positioned
  // relative to that wrapper instead of the viewport. LeadPopup/CustomCursor
  // avoid this by mounting as siblings of `{children}` in the layout itself;
  // portaling is the equivalent escape hatch from inside a page section.
  const mounted = useIsMounted();

  return (
    <section id="pricing" className="relative isolate scroll-mt-24 overflow-hidden py-14 md:py-20">
      <PricingBackground />

      <Container className="flex flex-col gap-6 md:gap-7">
        <div className="flex flex-col items-center gap-3 md:gap-4">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={
              <>
                {t("heading.line1")}
                <br className="hidden sm:block" />{" "}
                <span className="text-gradient-brand">{t("heading.highlight")}</span>
              </>
            }
            description={t("description")}
          />
          <div className="pt-1">
            <PricingToggle active={mode} onSelect={setMode} />
          </div>
        </div>

        {/* One tree for every breakpoint: below `lg` this is a horizontal
            scroll-snap rail with the spotlight stacked underneath; at `lg`+
            the same wrapper becomes a 12-col grid (rail left, spotlight
            right) purely via the `lg:` variants below — no separate
            mobile/desktop instances of the rail or the spotlight. Previously
            there were two of each (four plan cards' worth of markup, plus
            the entire spotlight card including every feature line, rendered
            twice), with only one copy visible at a time via `hidden`/
            `lg:hidden`. `items-start` on the grid keeps each column sized to
            its own content — a plain CSS grid stretches row height by
            default, which would otherwise pull the (much shorter) rail
            column to match the spotlight's height. */}
        <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-5 lg:grid lg:grid-cols-12 lg:items-start lg:gap-6">
          <div
            role="group"
            aria-label={t("radiogroupAriaLabel")}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [scrollbar-width:none] lg:col-span-4 lg:flex-col lg:snap-none lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
          >
            <AnimatePresence initial={false} mode="popLayout">
              {railPlans.map((plan, i) => (
                <PlanSelectorCard key={plan.id} plan={plan} mode={mode} onSelect={setSelectedId} index={i} />
              ))}
            </AnimatePresence>
          </div>
          <div ref={mobileSpotlightRef} className="lg:col-span-8">
            <PlanSpotlight plan={selectedPlan} mode={mode} panelId="pricing-spotlight-panel" />
          </div>
        </div>

        <div className="mx-auto mt-4 flex w-full max-w-[1240px] flex-col md:mt-5">
          {/* Compare panel + trust strip share one dark glass shell so they
              read as a single connected block instead of two floating boxes
              — and stay part of the same dark, premium card system as the
              rail/spotlight above regardless of the site's light/dark
              setting. (A nested `.dark` class won't do this: Tailwind's
              `@theme inline` tokens like `--color-glass-strong` alias
              `var(--glass-bg-strong)` once at `:root`, so descendants just
              inherit that already-resolved value instead of re-evaluating
              the alias against a locally-overridden `.dark` scope —
              confirmed via computed styles, not assumed.) */}
          <div
            className="shadow-card divide-y divide-white/10 overflow-hidden rounded-hero border border-white/8"
            style={{ backgroundImage: "linear-gradient(160deg, rgba(255,255,255,0.05), rgba(13,12,20,0.97) 55%)" }}
          >
            <ComparePanel />
            <TrustStrip />
          </div>
        </div>

        <CustomProjectCta />

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
                href="/#contact"
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
                href="/#contact"
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

      {mounted
        ? createPortal(
            <AnimatePresence>
              {mobileSpotlightInView ? (
                <motion.div
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 80, opacity: 0 }}
                  transition={{ duration: 0.3, ease: easePremium }}
                  className="glass-strong shadow-card-hover fixed inset-x-3 bottom-3 z-40 flex items-center justify-between gap-3 rounded-2xl p-3 lg:hidden"
                >
                  <div className="flex min-w-0 flex-col leading-tight">
                    <span className="text-caption text-foreground-secondary truncate">{t(`plans.${selectedPlan.id}.name`)}</span>
                    <span className="text-body-sm text-foreground font-semibold">
                      {selectedPlan.price[mode]}
                      <span className="text-caption text-foreground-secondary font-normal">{selectedPlan.priceSuffix[mode]}</span>
                    </span>
                  </div>
                  <RippleLink
                    href={selectedPlan.ctaHref}
                    className={cn(buttonVariants({ variant: "gradient", size: "md" }), "shrink-0")}
                  >
                    {t(`plans.${selectedPlan.id}.cta`)}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </RippleLink>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </section>
  );
}
