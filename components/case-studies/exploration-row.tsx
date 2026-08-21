"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { RippleLink } from "@/components/ui/ripple-link";
import type { ConceptBuild } from "@/content/case-studies";
import { accentStroke } from "@/lib/accent";
import { easePremium } from "@/lib/motion";

interface ExplorationRowProps {
  build: ConceptBuild;
  number: string;
}

/** One compact editorial row for the remaining, plainer concepts — index,
 * category, title, one-line statement, a single "View →" link. No
 * visual, no card shell: this is the archive's index, not another
 * gallery. */
export function ExplorationRow({ build, number }: ExplorationRowProps) {
  const t = useTranslations("caseStudies");
  const tBuild = useTranslations(`caseStudies.builds.${build.id}`);
  const stroke = accentStroke[build.accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "100px" }}
      transition={{ duration: 0.35, ease: easePremium }}
      className="border-t border-white/8 py-4 first:border-t-0 sm:py-5"
    >
      <RippleLink href={build.demoUrl ? `/work/${build.id}` : "/contact"} className="group flex items-center gap-4">
        <span className="text-caption w-8 shrink-0 font-mono font-semibold text-white/25">{number}</span>
        <span className="text-caption w-24 shrink-0 font-semibold tracking-wide uppercase sm:w-32" style={{ color: stroke }}>
          {tBuild("industryLabel")}
        </span>
        <span className="min-w-0 flex-1">
          <span className="text-body-sm text-foreground block truncate font-semibold">{tBuild("title")}</span>
          <span className="text-caption text-foreground-secondary block truncate">{tBuild.raw("highlights")[0]}</span>
        </span>
        <span className="text-caption hidden shrink-0 items-center gap-1.5 font-semibold text-white/50 transition-colors duration-base group-hover:text-white sm:flex">
          {t("card.viewLabel")}
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-fast group-hover:translate-x-1" aria-hidden />
        </span>
      </RippleLink>
    </motion.div>
  );
}
