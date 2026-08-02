"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { RippleLink } from "@/components/ui/ripple-link";
import { CaseStudiesBackground } from "@/components/case-studies/case-studies-background";
import { FilterBar } from "@/components/case-studies/filter-bar";
import { FeaturedConcept } from "@/components/case-studies/featured-concept";
import { ConceptCard } from "@/components/case-studies/concept-card";
import { conceptBuilds, processStepIds, techStackBadges, type CaseStudyFilter } from "@/content/case-studies";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** "Case Studies" — reframed honestly as a concept showcase. Novyra is a
 * new studio without completed client engagements to cite yet, so every
 * build here is explicitly labeled a concept exploration: no invented
 * client names, no fabricated outcome percentages, no fake testimonial.
 * The premium interaction design (filters, featured hero, bento grid,
 * process timeline) stands on its own without needing false claims. */
export function CaseStudies() {
  const t = useTranslations("caseStudies");
  const [filter, setFilter] = useState<CaseStudyFilter>("All");

  const filtered = useMemo(
    () => (filter === "All" ? conceptBuilds : conceptBuilds.filter((build) => build.category === filter)),
    [filter],
  );
  const [featured, ...rest] = filtered.length > 0 ? filtered : conceptBuilds;

  return (
    <section id="case-studies" className="relative isolate overflow-hidden py-14 md:py-20">
      <CaseStudiesBackground />

      <Container className="flex flex-col gap-10 md:gap-14">
        <SectionHeading
          eyebrow={t("section.eyebrow")}
          title={
            <>
              {t("section.titleLine1")}
              <br className="hidden sm:block" /> <span className="text-gradient-brand">{t("section.titleLine2")}</span>
            </>
          }
          description={t("section.description")}
        />

        <FilterBar active={filter} onSelect={setFilter} />

        <AnimatePresence mode="wait">
          <motion.div
            key={featured.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FeaturedConcept build={featured} />
          </motion.div>
        </AnimatePresence>

        {/* process timeline */}
        <div className="flex flex-col items-center gap-6">
          <p className="text-caption text-foreground-secondary text-center font-semibold tracking-wide uppercase">
            {t("processSteps.heading")}
          </p>
          <ol className="flex w-full max-w-3xl items-start justify-between">
            {processStepIds.map((id, i) => (
              <li key={id} className={cn("flex items-center", i < processStepIds.length - 1 && "flex-1")}>
                <div className="flex flex-col items-center gap-2">
                  <span className="border-brand-blue/40 bg-surface text-foreground text-caption flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 font-semibold">
                    {i + 1}
                  </span>
                  <span className="text-caption text-foreground-secondary hidden font-medium sm:block">
                    {t(`processSteps.${id}`)}
                  </span>
                </div>
                {i < processStepIds.length - 1 ? (
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
            ))}
          </ol>
        </div>

        {/* tech stack */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {techStackBadges.map((tech) => (
            <span
              key={tech}
              className="border-border-subtle text-body-sm text-foreground bg-surface/60 hover:border-brand-blue/40 hover:shadow-glow-blue rounded-full border px-4 py-2 font-medium transition-[box-shadow,border-color] duration-base"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* more concepts bento grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {rest.map((build, i) => (
              <ConceptCard key={build.id} build={build} index={i} wide={i === 0} />
            ))}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <div className="glass-strong shadow-card relative flex flex-col items-center gap-6 overflow-hidden rounded-hero p-8 text-center sm:flex-row sm:justify-between sm:p-10 sm:text-left">
          <div
            aria-hidden
            className="bg-gradient-brand pointer-events-none absolute -inset-16 -z-10 rounded-full opacity-20 blur-3xl"
          />
          <div className="flex flex-col gap-2">
            <h3 className="text-title-lg text-foreground font-semibold">{t("cta.heading")}</h3>
            <p className="text-body-sm text-foreground-secondary max-w-md">{t("cta.description")}</p>
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
              {t("cta.bookConsultation")}
              <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-0.5" aria-hidden />
            </RippleLink>
            <RippleLink href="/contact" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto")}>
              {t("cta.requestQuote")}
            </RippleLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
