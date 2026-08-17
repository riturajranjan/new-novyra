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
import { conceptBuilds, type CaseStudyFilter } from "@/content/case-studies";
import { cn } from "@/lib/utils";

/** The full, filterable set of all six concepts — the homepage shows three
 * fixed picks with no filter (see components/sections/case-studies.tsx);
 * this page is where "View All Concepts" leads for anyone who wants the
 * complete, browsable set. */
export function WorkShowcase() {
  const t = useTranslations("caseStudies");
  const tWork = useTranslations("work");
  const [filter, setFilter] = useState<CaseStudyFilter>("All");

  const filtered = useMemo(
    () => (filter === "All" ? conceptBuilds : conceptBuilds.filter((build) => build.category === filter)),
    [filter],
  );
  const [featured, ...rest] = filtered.length > 0 ? filtered : conceptBuilds;

  return (
    <section className="relative isolate overflow-hidden py-28 md:py-36">
      <CaseStudiesBackground />

      <Container className="flex flex-col gap-10 md:gap-14">
        <SectionHeading eyebrow={tWork("eyebrow")} title={tWork("heading")} description={tWork("description")} />

        <FilterBar active={filter} onSelect={setFilter} />

        <AnimatePresence mode="wait">
          <motion.div key={featured.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <FeaturedConcept build={featured} />
          </motion.div>
        </AnimatePresence>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {rest.map((build, i) => (
              <ConceptCard key={build.id} build={build} index={i} wide={i === 0} />
            ))}
          </AnimatePresence>
        </div>

        <div className="glass-strong shadow-card relative flex flex-col items-center gap-6 overflow-hidden rounded-hero p-8 text-center sm:flex-row sm:justify-between sm:p-10 sm:text-left">
          <div aria-hidden className="bg-gradient-brand pointer-events-none absolute -inset-16 -z-10 rounded-full opacity-20 blur-3xl" />
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
