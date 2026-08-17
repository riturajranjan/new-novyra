"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { RippleLink } from "@/components/ui/ripple-link";
import { ProjectShowcaseVisual } from "@/components/case-studies/project-showcase-visual";
import { SelectedWorkBackground } from "@/components/services/selected-work-background";
import { conceptBuilds, type ConceptBuild } from "@/content/case-studies";
import { accentStroke, accentTint } from "@/lib/accent";
import { easePowerOut } from "@/lib/motion";
import { cn } from "@/lib/utils";

const featured: { id: string; variant: "education" | "healthcare" | "saas" }[] = [
  { id: "school-erp", variant: "education" },
  { id: "hospital-platform", variant: "healthcare" },
  { id: "ai-saas-dashboard", variant: "saas" },
];

/** Section 05 — a compact single-active-project showcase (one large visual
 * + info block, switched via a small numbered rail) instead of the old
 * tall alternating-row list. Three real concept builds only, no fabricated
 * stats, no generic bar-chart placeholder — a domain-specific composition
 * per project via `ProjectShowcaseVisual`. */
export function SelectedServiceWork() {
  const t = useTranslations("services");
  const [activeIndex, setActiveIndex] = useState(0);
  const active = featured[activeIndex];
  const build = conceptBuilds.find((b) => b.id === active.id) as ConceptBuild;
  const tCase = useTranslations("caseStudies");
  const tBuild = useTranslations(`caseStudies.builds.${build.id}`);
  const stroke = accentStroke[build.accent];

  return (
    <section id="selected-work" className="relative isolate scroll-mt-24 overflow-hidden py-14 md:py-16 lg:py-20">
      <SelectedWorkBackground />

      <Container className="flex flex-col gap-8 md:gap-10">
        <div className="flex flex-col gap-4">
          <span className="text-caption inline-flex w-fit items-center gap-2 font-mono font-medium tracking-[0.2em] text-white/40 uppercase">
            <span className="h-px w-6 bg-white/25" aria-hidden />
            {t("selectedWork.eyebrow")}
          </span>
          <h2
            className="max-w-xl font-bold text-balance text-white"
            style={{ fontSize: "clamp(34px, 4vw, 54px)", lineHeight: 1.08, letterSpacing: "-0.025em" }}
          >
            {t("selectedWork.headingLine1")}
            <br />
            {t("selectedWork.headingLine2")}
          </h2>
          <p className="text-body text-white/55 max-w-md">{t("selectedWork.description")}</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={build.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.32, ease: easePowerOut }}
            className="h-80 overflow-hidden rounded-2xl sm:h-95 md:h-105"
          >
            <ProjectShowcaseVisual variant={active.variant} accent={build.accent} />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={build.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, delay: 0.05 }}
            className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end"
          >
            <div className="flex flex-col gap-2">
              <span className="text-caption font-mono font-medium tracking-[0.2em] uppercase" style={{ color: stroke }}>
                {String(activeIndex + 1).padStart(2, "0")} / {tBuild("industryLabel")}
              </span>
              <h3
                className="text-foreground max-w-lg font-semibold text-balance"
                style={{ fontSize: "clamp(26px, 2.6vw, 38px)", lineHeight: 1.15, letterSpacing: "-0.02em" }}
              >
                {tBuild("title")}
              </h3>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span
                  className="text-caption inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-medium text-foreground"
                  style={{ backgroundColor: accentTint(build.accent, 12) }}
                >
                  <Clock className="h-3 w-3" style={{ color: stroke }} aria-hidden />
                  {tBuild("timeline")}
                </span>
                <span className="text-caption text-foreground-secondary">{build.techStack.join(" · ")}</span>
              </div>
            </div>

            <RippleLink
              href="/work"
              className="group text-body-sm flex shrink-0 items-center gap-1.5 font-semibold text-white/80 transition-colors duration-base hover:text-white"
            >
              {t("selectedWork.viewProject")}
              <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-1" aria-hidden />
            </RippleLink>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center gap-6 border-t border-white/8 pt-4">
          {featured.map((item, i) => {
            const b = conceptBuilds.find((c) => c.id === item.id) as ConceptBuild;
            const isActive = i === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(i)}
                className="group flex items-center gap-1.5 outline-none"
              >
                <span
                  className={cn(
                    "font-mono text-[11px] font-semibold tabular-nums transition-colors duration-base",
                    isActive ? "" : "text-white/30 group-hover:text-white/50",
                  )}
                  style={isActive ? { color: accentStroke[b.accent] } : undefined}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "text-body-sm font-medium transition-colors duration-base",
                    isActive ? "text-white" : "text-white/40 group-hover:text-white/70",
                  )}
                >
                  {tCase(`builds.${item.id}.industryLabel`)}
                </span>
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
