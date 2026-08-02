"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhyChooseBackground } from "@/components/why-choose/why-choose-background";
import { TeamVisual } from "@/components/why-choose/team-visual";
import { FeatureCard } from "@/components/why-choose/feature-card";
import { TrustedTechnologies } from "@/components/why-choose/trusted-technologies";
import { capabilityChips, featureCards, heroBadges } from "@/content/why-choose";
import { accentStroke, accentTint } from "@/lib/accent";
import { easePremium } from "@/lib/motion";

/** "Why Choose Novyra" — a premium bento grid making the case for Novyra as
 * a technology partner. Every trust signal here is honest: capability and
 * technical-standard claims only, never an invented project count, client
 * satisfaction score, or years-in-business figure Novyra doesn't have. */
export function WhyChooseNovyra() {
  const t = useTranslations("whyChoose");

  return (
    <section id="why-choose-novyra" className="relative isolate overflow-hidden py-14 md:py-20">
      <WhyChooseBackground />

      <Container className="flex flex-col gap-10 md:gap-16">
        <SectionHeading
          eyebrow={t("sectionHeading.eyebrow")}
          title={
            <>
              {t("sectionHeading.titleBefore")} <span className="text-gradient-brand">{t("sectionHeading.titleHighlight")}</span>
            </>
          }
          description={t("sectionHeading.description")}
        />

        {/* hero bento card */}
        <div className="glass-strong shadow-card relative overflow-hidden rounded-2xl">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/10 to-transparent"
          />
          <div className="grid grid-cols-1 gap-6 p-5 md:gap-8 md:p-10 lg:grid-cols-2 lg:items-center">
            <div className="relative">
              <TeamVisual />
              <div className="border-border-subtle bg-surface/90 absolute -bottom-4 left-6 flex items-center gap-2 rounded-full border px-4 py-2 shadow-card backdrop-blur-md">
                {heroBadges.map((badgeId, i) => (
                  <span key={badgeId} className="flex items-center gap-1.5">
                    <CheckCircle2 className="text-brand-emerald h-3.5 w-3.5" aria-hidden />
                    <span className="text-caption text-foreground font-medium">{t(`heroBadges.${badgeId}`)}</span>
                    {i < heroBadges.length - 1 ? <span className="text-border-subtle mx-1">•</span> : null}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6 pt-4 lg:pt-0">
              <h3 className="text-title-lg sm:text-headline text-foreground font-semibold text-balance">
                {t("heroBento.heading")}
              </h3>
              <p className="text-body-sm sm:text-body text-foreground-secondary text-pretty">
                {t("heroBento.description")}
              </p>
              <div className="flex flex-wrap gap-2">
                {capabilityChips.map((chip, i) => {
                  const Icon = chip.icon;
                  return (
                    <motion.span
                      key={chip.id}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "150px" }}
                      whileHover={{ y: -2, scale: 1.04 }}
                      transition={{ duration: 0.3, delay: i * 0.03, ease: easePremium }}
                      className="border-border-subtle bg-surface/60 shadow-card flex items-center gap-1.5 rounded-full border px-3 py-1.5 backdrop-blur-sm transition-shadow duration-base hover:shadow-card-hover"
                      style={{ ["--chip-glow" as string]: accentTint(chip.accent, 45) }}
                    >
                      <Icon className="h-3.5 w-3.5" style={{ color: accentStroke[chip.accent] }} aria-hidden />
                      <span className="text-caption text-foreground-secondary font-medium">{t(`capabilityChips.${chip.id}`)}</span>
                    </motion.span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* feature bento grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-6">
          {featureCards.map((card, i) => (
            <FeatureCard key={card.id} card={card} index={i} />
          ))}
        </div>

        <TrustedTechnologies />

        {/* CTA */}
        {/* <div className="glass-strong shadow-card relative flex flex-col items-center gap-5 overflow-hidden rounded-hero p-6 text-center sm:flex-row sm:justify-between sm:text-left md:gap-6 md:p-10">
          <div
            aria-hidden
            className="bg-gradient-brand pointer-events-none absolute -inset-16 -z-10 rounded-full opacity-20 blur-3xl"
          />
          <div className="flex flex-col gap-2">
            <h3 className="text-title-lg text-foreground font-semibold">Ready to Build Something Amazing?</h3>
            <p className="text-body-sm text-foreground-secondary max-w-md">
              Tell us what you&apos;re planning, and we&apos;ll help you define the right next step.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <RippleLink
              href="/contact"
              className={cn(buttonVariants({ variant: "gradient", size: "lg" }), "group relative w-full overflow-hidden sm:w-auto")}
            >
              <span
                aria-hidden
                className="bg-gradient-shimmer pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-full"
              />
              Start Your Project
              <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-0.5" aria-hidden />
            </RippleLink>
            <RippleLink href="/contact" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto")}>
              Schedule a Call
            </RippleLink>
          </div>
        </div> */}
      </Container>
    </section>
  );
}
