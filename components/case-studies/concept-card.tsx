"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { RippleLink } from "@/components/ui/ripple-link";
import type { ConceptBuild } from "@/content/case-studies";
import { accentStroke, accentTint } from "@/lib/accent";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface ConceptCardProps {
  build: ConceptBuild;
  index: number;
  className?: string;
}

/** One card in the Selected Concepts gallery — a real project image
 * (where one exists) dominating the top ~50%, a short product statement
 * and 2-3 capability tags below, one honest CTA. Equal height across the
 * grid, controlled accent (lighting/border/CTA only — never a bright
 * colored rectangle). */
export function ConceptCard({ build, index, className }: ConceptCardProps) {
  const t = useTranslations("caseStudies");
  const tBuild = useTranslations(`caseStudies.builds.${build.id}`);
  const Icon = build.icon;
  const stroke = accentStroke[build.accent];
  const hasProductName = tBuild.has("productName");
  const capabilities = hasProductName ? (tBuild.raw("capabilities") as string[]).slice(0, 3) : [];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: easePremium }}
      className={cn(
        "group border-border-subtle relative isolate flex h-108 flex-col overflow-hidden rounded-2xl border transition-colors duration-base hover:border-white/20",
        className,
      )}
      style={{ backgroundColor: "rgba(10,14,26,0.7)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] opacity-0 blur-3xl transition-opacity duration-slow group-hover:opacity-100"
        style={{ backgroundColor: accentTint(build.accent, 18) }}
      />

      <div className="relative h-[52%] shrink-0 overflow-hidden">
        <div className="h-full w-full transition-transform duration-slow ease-soft group-hover:scale-[1.025]">
          {build.image ? (
            <Image src={build.image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
          ) : (
            <div className="h-full w-full" style={{ backgroundImage: `linear-gradient(155deg, ${accentTint(build.accent, 26)}, #0a0e1c 75%)` }} />
          )}
        </div>
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "linear-gradient(180deg, rgba(0,0,0,0.05), transparent 40%, rgba(6,9,18,0.9))" }} />
        <span
          aria-hidden
          className="absolute top-3 right-3 text-4xl leading-none font-bold text-white/10 select-none"
        >
          {String(index + 2).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-caption flex items-center gap-1.5 font-semibold tracking-wide uppercase" style={{ color: stroke }}>
            <Icon className="h-3 w-3" aria-hidden />
            {tBuild("industryLabel")}
          </span>
          <span className="text-[10px] font-medium tracking-[0.1em] text-white/25 uppercase">{t("conceptTag")}</span>
        </div>

        <div className="flex flex-col gap-1">
          <h4 className="text-title text-foreground font-semibold">{hasProductName ? tBuild("productName") : tBuild("title")}</h4>
          <p className="text-body-sm text-foreground-secondary line-clamp-2">{hasProductName ? tBuild("tagline") : tBuild("description")}</p>
        </div>

        {capabilities.length > 0 ? (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
            {capabilities.map((cap) => (
              <span key={cap} className="border-border-subtle text-caption text-foreground-secondary rounded-full border px-2.5 py-1">
                {cap}
              </span>
            ))}
          </div>
        ) : null}

        <RippleLink
          href="/contact"
          className="group/cta text-caption mt-2 flex w-fit items-center gap-1.5 font-semibold text-white/70 transition-colors duration-base hover:text-white"
        >
          {t("card.startSimilarProject")}
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-fast group-hover/cta:translate-x-1" aria-hidden />
        </RippleLink>
      </div>
    </motion.div>
  );
}
