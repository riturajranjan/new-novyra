"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { WorkHero } from "@/components/work/work-hero";
import { FilterBar } from "@/components/case-studies/filter-bar";
import { FeaturedConcept } from "@/components/case-studies/featured-concept";
import { ConceptCard } from "@/components/case-studies/concept-card";
import { ExplorationRow } from "@/components/case-studies/exploration-row";
import { SelectedGalleryBackground } from "@/components/case-studies/selected-gallery-background";
import { MoreExplorationsBackground } from "@/components/case-studies/more-explorations-background";
import { WorkFinalCta } from "@/components/work/work-final-cta";
import { conceptBuilds, type CaseStudyFilter } from "@/content/case-studies";

const SELECTED_GRID_SIZE = 6;

/** The Work page's showcase — Filter → Featured → Selected Concepts (a
 * 3×2 gallery) → More Explorations (compact index rows), all reacting to
 * the same category filter. Within whatever the filter leaves, concepts
 * with a real Novyra product identity (a translated `productName`) are
 * prioritized into the Featured slot and the gallery grid; the plainer
 * ones settle into the compact archive rows — computed from the real
 * translation data, never hardcoded by id. */
export function WorkShowcase() {
  const t = useTranslations("caseStudies");
  const tWork = useTranslations("work");
  const [filter, setFilter] = useState<CaseStudyFilter>("All");

  const filtered = useMemo(
    () => (filter === "All" ? conceptBuilds : conceptBuilds.filter((build) => build.category === filter)),
    [filter],
  );
  const base = filtered.length > 0 ? filtered : conceptBuilds;

  // Real, live, clickable builds outrank abstract SaaS/ERP explorations,
  // which outrank the plainer concepts with no product identity — a real
  // screenshot is stronger proof than an illustration.
  const rank = (build: (typeof base)[number]) => (build.demoUrl ? 2 : t.has(`builds.${build.id}.productName`) ? 1 : 0);
  const ranked = useMemo(() => [...base].sort((a, b) => rank(b) - rank(a)), [base, t]);
  const [featured, ...rest] = ranked;
  const selected = rest.slice(0, SELECTED_GRID_SIZE);
  const explorations = rest.slice(SELECTED_GRID_SIZE);

  return (
    <>
      <WorkHero />

      <section className="relative isolate overflow-hidden py-14 md:py-18 lg:py-20">
        <Container className="flex flex-col gap-10 md:gap-14">
          <FilterBar active={filter} onSelect={setFilter} />

          <AnimatePresence mode="wait">
            <motion.div key={featured.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35 }}>
              <FeaturedConcept build={featured} />
            </motion.div>
          </AnimatePresence>
        </Container>
      </section>

      {selected.length > 0 ? (
        <section className="relative isolate overflow-hidden py-14 md:py-16 lg:py-18">
          <SelectedGalleryBackground />
          <Container className="flex flex-col gap-8 md:gap-10">
            <div className="flex flex-col gap-2">
              <span className="text-caption inline-flex w-fit items-center gap-2 font-mono font-medium tracking-[0.2em] text-white/40 uppercase">
                <span className="h-px w-6 bg-white/25" aria-hidden />
                {tWork("selected.eyebrow")}
              </span>
              <h2 className="text-foreground font-bold text-balance" style={{ fontSize: "clamp(28px, 2.8vw, 40px)", lineHeight: 1.12, letterSpacing: "-0.02em" }}>
                {tWork("selected.heading")}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {selected.map((build, i) => (
                  <ConceptCard key={build.id} build={build} index={i} />
                ))}
              </AnimatePresence>
            </div>
          </Container>
        </section>
      ) : null}

      {explorations.length > 0 ? (
        <section className="relative isolate overflow-hidden py-12 md:py-14">
          <MoreExplorationsBackground />
          <Container className="flex flex-col gap-6 md:gap-8">
            <span className="text-caption inline-flex w-fit items-center gap-2 font-mono font-medium tracking-[0.2em] text-white/40 uppercase">
              <span className="h-px w-6 bg-white/25" aria-hidden />
              {tWork("explorations.heading")}
            </span>

            <div className="grid grid-cols-1 gap-x-10 md:grid-cols-2 lg:grid-cols-3">
              {explorations.map((build, i) => (
                <ExplorationRow key={build.id} build={build} number={String(i + SELECTED_GRID_SIZE + 2).padStart(2, "0")} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <WorkFinalCta />
    </>
  );
}
