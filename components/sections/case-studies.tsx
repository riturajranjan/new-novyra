"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { RippleLink } from "@/components/ui/ripple-link";
import { CaseStudiesBackground } from "@/components/case-studies/case-studies-background";
import { FeaturedConcept } from "@/components/case-studies/featured-concept";
import { ConceptCard } from "@/components/case-studies/concept-card";
import { conceptBuilds, homepageConceptIds } from "@/content/case-studies";
import { fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

const [featuredId, ...restIds] = homepageConceptIds;
const featuredBuild = conceptBuilds.find((build) => build.id === featuredId)!;
const restBuilds = restIds.map((id) => conceptBuilds.find((build) => build.id === id)!);

/** "Case Studies" — reframed honestly as a concept showcase. Novyra is a
 * new studio without completed client engagements to cite yet, so every
 * build here is explicitly labeled a concept exploration: no invented
 * client names, no fabricated outcome percentages, no fake testimonial.
 * The homepage shows three fixed picks (no category filter — with only
 * three items on screen, filtering by industry has nothing useful to do);
 * the full six, filterable, live on the dedicated /work page. */
export function CaseStudies() {
  const t = useTranslations("caseStudies");

  return (
    <section id="work" className="relative isolate scroll-mt-24 overflow-hidden py-14 md:py-18">
      <CaseStudiesBackground />

      <Container className="flex flex-col gap-8 md:gap-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "150px" }}
          variants={fadeInUp}
          className="flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-end"
        >
          <div className="flex flex-col gap-3">
            <span className="text-gradient-brand text-sm font-semibold uppercase tracking-[0.14em]">{t("section.eyebrow")}</span>
            <h2 className="text-headline sm:text-display-lg text-foreground max-w-xl text-balance font-semibold">
              {t("section.heading")}
            </h2>
          </div>
          <div className="flex flex-col items-start gap-3 lg:max-w-xs lg:items-end lg:text-right">
            <p className="text-body-sm text-foreground-secondary text-pretty">{t("section.supportingCopy")}</p>
            <RippleLink href="/work" className={cn(buttonVariants({ variant: "outline", size: "md" }), "group w-fit")}>
              {t("viewAll")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-fast group-hover:translate-x-0.5" aria-hidden />
            </RippleLink>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "150px" }} transition={{ duration: 0.3 }}>
          <FeaturedConcept build={featuredBuild} />
        </motion.div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
          {restBuilds.map((build, i) => (
            <ConceptCard key={build.id} build={build} index={i + 1} className={i === 0 ? "lg:col-span-3" : "lg:col-span-2"} />
          ))}
        </div>
      </Container>
    </section>
  );
}
