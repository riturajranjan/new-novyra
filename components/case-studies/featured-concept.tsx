"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { FeaturedStageBackground } from "@/components/case-studies/featured-stage-background";
import { buttonVariants } from "@/components/ui/button";
import { RippleLink } from "@/components/ui/ripple-link";
import type { ConceptBuild } from "@/content/case-studies";
import { accentStroke, accentTint } from "@/lib/accent";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface FeaturedConceptProps {
  build: ConceptBuild;
}

/** The one large featured presentation on the page — real product name
 * where the concept has one, a campaign-style statement, short
 * description, capability tags and one honest CTA, paired with a
 * dominant cinematic visual (a real project image where one exists).
 * Framed once, briefly ("Concept Project") rather than repeating the
 * full disclosure the hero already stated. */
export function FeaturedConcept({ build }: FeaturedConceptProps) {
  const t = useTranslations("caseStudies");
  const tBuild = useTranslations(`caseStudies.builds.${build.id}`);
  const Icon = build.icon;
  const stroke = accentStroke[build.accent];
  const hasProductName = tBuild.has("productName");
  const hasTagline = tBuild.has("tagline");
  const capabilities = tBuild.has("capabilities") ? (tBuild.raw("capabilities") as string[]) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "150px" }}
      transition={{ duration: 0.5, ease: easePremium }}
      className="relative isolate overflow-hidden rounded-[36px] border border-white/8"
    >
      <FeaturedStageBackground accent={accentStroke[build.accent]} />

      <div className="grid grid-cols-1 gap-6 p-5 md:gap-8 md:p-8 lg:grid-cols-[42fr_58fr] lg:items-center lg:gap-10 lg:p-10">
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
            <span className="text-[10px] font-medium tracking-[0.14em] text-white/30 uppercase">{t("conceptTag")}</span>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-headline text-foreground font-semibold text-balance">
              {hasProductName ? tBuild("productName") : tBuild("title")}
            </h3>
            <p className="text-body-sm sm:text-body font-medium text-balance" style={{ color: stroke }}>
              {hasTagline ? tBuild("tagline") : tBuild("description")}
            </p>
            <p className="text-body-sm text-foreground-secondary text-pretty">{tBuild("description")}</p>
          </div>

          {capabilities.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {capabilities.map((cap) => (
                <span key={cap} className="border-border-subtle text-caption text-foreground-secondary rounded-full border px-2.5 py-1">
                  {cap}
                </span>
              ))}
            </div>
          ) : null}

          {build.demoUrl ? (
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
              <RippleLink href={`/work/${build.id}`} className={cn(buttonVariants({ variant: "gradient", size: "md" }), "group w-fit")}>
                {t("card.viewCaseStudy")}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-fast group-hover:translate-x-0.5" aria-hidden />
              </RippleLink>
              <RippleLink
                href={build.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group text-body-sm flex w-fit items-center gap-1.5 font-semibold text-white/80 transition-colors duration-base hover:text-white"
              >
                {t("card.viewLiveDemo")}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-fast group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </RippleLink>
            </div>
          ) : (
            <RippleLink href="/contact" className={cn(buttonVariants({ variant: "gradient", size: "md" }), "group w-fit")}>
              {t("card.startSimilarProject")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-fast group-hover:translate-x-0.5" aria-hidden />
            </RippleLink>
          )}
        </div>

        <div className="relative aspect-[16/11] lg:aspect-auto lg:min-h-[460px]">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] opacity-60 blur-2xl"
            style={{ backgroundColor: accentTint(build.accent, 22) }}
          />
          <div
            className="relative h-full w-full overflow-hidden rounded-2xl border"
            style={{ borderColor: accentTint(build.accent, 40), boxShadow: `0 30px 80px -30px ${accentTint(build.accent, 45)}` }}
          >
            {build.image ? (
              <Image src={build.image} alt="" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" priority />
            ) : (
              <div className="h-full w-full" style={{ backgroundImage: `linear-gradient(155deg, ${accentTint(build.accent, 26)}, #0a0e1c 70%)` }} />
            )}
            <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "linear-gradient(180deg, rgba(0,0,0,0.1), transparent 30%, rgba(0,0,0,0.3))" }} />
          </div>

          {build.mobileImage ? (
            <div
              className="absolute bottom-4 left-4 h-40 w-20 overflow-hidden rounded-xl border-4 shadow-[0_20px_50px_-16px_rgba(0,0,0,0.65)] sm:h-48 sm:w-24"
              style={{ borderColor: "rgba(10,14,26,0.9)", backgroundColor: "#0b0e1a" }}
            >
              <Image src={build.mobileImage} alt="" fill sizes="140px" className="object-cover object-top" />
            </div>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
