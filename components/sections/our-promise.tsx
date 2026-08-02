"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { RippleLink } from "@/components/ui/ripple-link";
import { PromiseBackground } from "@/components/promise/promise-background";
import { TrustBar } from "@/components/promise/trust-bar";
import { FeaturedCommitment } from "@/components/promise/featured-commitment";
import { CommitmentCard } from "@/components/promise/commitment-card";
import { FocusMarquee } from "@/components/promise/focus-marquee";
import { commitmentCards } from "@/content/our-promise";
import { cn } from "@/lib/utils";

/** "Our Promise" — stands in for a testimonials section. Novyra is a new
 * studio without completed client engagements yet, so there are no real
 * quotes, star ratings, review-platform badges, or client logos to show
 * honestly. Every element here is a verifiable, forward-looking operating
 * commitment instead — the same premium interaction design a testimonials
 * section would use, without inventing the people behind it. */
export function OurPromise() {
  const t = useTranslations("promise");

  return (
    <section className="relative isolate overflow-hidden py-14 md:py-20">
      <PromiseBackground />

      <Container className="flex flex-col gap-10 md:gap-14">
        <SectionHeading
          eyebrow={t("sectionHeading.eyebrow")}
          title={
            <>
              {t("sectionHeading.titleLine1")}
              <br className="hidden sm:block" /> <span className="text-gradient-brand">{t("sectionHeading.titleHighlight")}</span>
            </>
          }
          description={t("sectionHeading.description")}
        />

        <TrustBar />

        <FeaturedCommitment />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-6">
          {commitmentCards.map((card, i) => (
            <CommitmentCard key={card.id} card={card} index={i} />
          ))}
        </div>

        <FocusMarquee />

        {/* founding-client CTA */}
        <div className="glass-strong shadow-card relative flex flex-col items-center gap-6 overflow-hidden rounded-hero p-8 text-center sm:flex-row sm:justify-between sm:p-10 sm:text-left">
          <div
            aria-hidden
            className="bg-gradient-brand pointer-events-none absolute -inset-16 -z-10 rounded-full opacity-20 blur-3xl"
          />
          <div className="flex flex-col gap-2">
            <span className="text-caption text-brand-emerald inline-flex w-fit items-center gap-1.5 font-semibold tracking-wide uppercase sm:mx-0">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              {t("cta.badge")}
            </span>
            <h3 className="text-title-lg text-foreground font-semibold">{t("cta.heading")}</h3>
            <p className="text-body-sm text-foreground-secondary max-w-md">{t("cta.description")}</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <RippleLink
              href="/#contact"
              className={cn(buttonVariants({ variant: "gradient", size: "lg" }), "group relative w-full overflow-hidden sm:w-auto")}
            >
              <span
                aria-hidden
                className="bg-gradient-shimmer pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-full"
              />
              {t("cta.bookConsultation")}
              <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-0.5" aria-hidden />
            </RippleLink>
            <RippleLink href="/#process" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto")}>
              {t("cta.seeProcess")}
            </RippleLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
