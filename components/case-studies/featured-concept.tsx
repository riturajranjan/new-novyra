"use client";

import { ArrowRight, CircleCheck, FlaskConical } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ConceptPreview } from "@/components/case-studies/concept-preview";
import { buttonVariants } from "@/components/ui/button";
import { RippleLink } from "@/components/ui/ripple-link";
import type { ConceptBuild } from "@/content/case-studies";
import { accentStroke, accentTint } from "@/lib/accent";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface FeaturedConceptProps {
  build: ConceptBuild;
}

/** The large featured concept — a split glass hero card. Framed honestly
 * throughout as a concept exploration, not a completed client engagement:
 * no claimed live demo, no invented outcome metrics. */
export function FeaturedConcept({ build }: FeaturedConceptProps) {
  const t = useTranslations("caseStudies");
  const tBuild = useTranslations(`caseStudies.builds.${build.id}`);
  const tCard = useTranslations("caseStudies.card");
  const Icon = build.icon;
  const stroke = accentStroke[build.accent];
  const highlights = tBuild.raw("highlights") as string[];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "150px" }}
      transition={{ duration: 0.5, ease: easePremium }}
      className="glass-strong shadow-card relative overflow-hidden rounded-[36px]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/10 to-transparent" />
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-24 -z-10 rounded-full blur-3xl"
        style={{ backgroundColor: accentTint(build.accent, 16) }}
      />
      <span
        aria-hidden
        className="text-foreground/[0.05] pointer-events-none absolute top-3 right-6 -z-10 text-[7rem] leading-none font-bold select-none sm:text-[9rem]"
      >
        01
      </span>

      <div className="grid grid-cols-1 gap-5 p-5 md:gap-8 md:p-10 lg:grid-cols-[3fr_2fr] lg:items-stretch lg:gap-10">
        <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[440px]">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] opacity-60 blur-2xl"
            style={{ backgroundColor: accentTint(build.accent, 22) }}
          />
          <div
            className="h-full w-full overflow-hidden rounded-2xl border"
            style={{
              borderColor: accentTint(build.accent, 45),
              transform: "perspective(1400px) rotateY(2deg) rotateX(0.5deg)",
              boxShadow: `0 30px 80px -30px ${accentTint(build.accent, 45)}`,
            }}
          >
            <ConceptPreview accent={build.accent} />
          </div>
        </div>

        <div className="flex flex-col justify-center gap-5 md:gap-6">
          <span className="text-caption text-foreground-secondary/60 font-semibold tracking-[0.14em] uppercase">
            01 / {t("featuredLabel")}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="text-caption inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 font-semibold tracking-wide uppercase"
              style={{ borderColor: accentTint(build.accent, 35), color: stroke, backgroundColor: accentTint(build.accent, 12) }}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden />
              {tBuild("industryLabel")}
            </span>
            {/* Persistent, high-contrast disclosure — never combined into
                the industry pill's subtler styling, so it can't be skimmed
                past: this is a concept exploration, not a shipped client
                project. */}
            <span className="border-brand-amber/50 bg-brand-amber/15 text-brand-amber text-caption inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 font-semibold tracking-wide uppercase">
              <FlaskConical className="h-3.5 w-3.5" aria-hidden />
              {t("conceptBadge")}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-headline text-foreground font-semibold text-balance">{tBuild("title")}</h3>
            <p className="text-body-sm sm:text-body text-foreground-secondary text-pretty">{tBuild("description")}</p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-caption text-foreground-secondary font-semibold tracking-wide uppercase">{tCard("buildHighlights")}</p>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {highlights.map((item) => (
                <li key={item} className="text-body-sm text-foreground-secondary flex items-start gap-2">
                  <CircleCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: stroke }} aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-border-subtle flex flex-col gap-1.5 border-t pt-4">
            <p className="text-caption font-semibold tracking-wide uppercase" style={{ color: stroke }}>
              {tCard("demonstrates")}
            </p>
            <p className="text-body-sm text-foreground-secondary">{tBuild("demonstrates")}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-wrap gap-1.5">
              {build.techStack.map((tech) => (
                <span key={tech} className="border-border-subtle text-caption text-foreground-secondary rounded-full border px-2.5 py-1">
                  {tech}
                </span>
              ))}
            </div>
            <span className="text-caption text-foreground-secondary ml-auto font-medium">
              {tCard("estimatedTimeline", { timeline: tBuild("timeline") })}
            </span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <RippleLink href="/#contact" className={cn(buttonVariants({ variant: "gradient", size: "md" }), "group flex-1")}>
              {tCard("startSimilarProject")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-fast group-hover:translate-x-0.5" aria-hidden />
            </RippleLink>
            <RippleLink href="/services" className={cn(buttonVariants({ variant: "outline", size: "md" }), "flex-1")}>
              {tCard("seeFullApproach")}
            </RippleLink>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
