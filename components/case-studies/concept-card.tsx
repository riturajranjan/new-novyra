"use client";

import { useTranslations } from "next-intl";
import { FlaskConical } from "lucide-react";
import { motion } from "framer-motion";
import { ConceptPreview } from "@/components/case-studies/concept-preview";
import type { ConceptBuild } from "@/content/case-studies";
import { accentStroke, accentTint } from "@/lib/accent";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface ConceptCardProps {
  build: ConceptBuild;
  index: number;
  wide?: boolean;
}

/** One bento card for the "more concepts" grid — a compact abstract
 * preview, industry badge, title, description, tech badges, and a single
 * qualitative highlight. Tagged "Concept" rather than a launch year, since
 * nothing here has actually shipped for a client yet. */
export function ConceptCard({ build, index, wide = false }: ConceptCardProps) {
  const t = useTranslations("caseStudies");
  const tBuild = useTranslations(`caseStudies.builds.${build.id}`);
  const Icon = build.icon;
  const stroke = accentStroke[build.accent];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: easePremium }}
      className={cn(
        "group border-border-subtle bg-surface/70 shadow-card relative flex flex-col gap-3 overflow-hidden rounded-hero border p-5 backdrop-blur-xl transition-shadow duration-base hover:shadow-card-hover md:gap-4 md:p-6",
        wide && "lg:col-span-2",
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/8 to-transparent" />
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] opacity-0 blur-3xl transition-opacity duration-slow group-hover:opacity-100"
        style={{ backgroundColor: accentTint(build.accent, 20) }}
      />

      <div className="h-36 overflow-hidden rounded-2xl transition-transform duration-slow group-hover:scale-[1.02]">
        <ConceptPreview accent={build.accent} />
      </div>

      <div className="flex items-center justify-between gap-2">
        <span
          className="text-caption inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-semibold tracking-wide uppercase"
          style={{ borderColor: accentTint(build.accent, 35), color: stroke, backgroundColor: accentTint(build.accent, 12) }}
        >
          <Icon className="h-3 w-3" aria-hidden />
          {tBuild("industryLabel")}
        </span>
        {/* Persistent, high-contrast disclosure — amber, not the same
            muted border-only style as every other pill on this card, so
            it reads as a notice rather than blending into the metadata
            row. */}
        <span className="border-brand-amber/50 bg-brand-amber/15 text-brand-amber text-caption inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 font-semibold">
          <FlaskConical className="h-3 w-3" aria-hidden />
          {t("conceptBadge")}
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <h4 className="text-title text-foreground font-semibold">{tBuild("title")}</h4>
        <p className="text-body-sm text-foreground-secondary line-clamp-2">{tBuild("description")}</p>
      </div>

      <p className="text-body-sm flex items-start gap-2" style={{ color: stroke }}>
        {tBuild.raw("highlights")[0]}
      </p>

      <div className="mt-auto flex flex-wrap gap-1.5">
        {build.techStack.slice(0, 3).map((tech) => (
          <span key={tech} className="border-border-subtle text-caption text-foreground-secondary rounded-full border px-2.5 py-1">
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
