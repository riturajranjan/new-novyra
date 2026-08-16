"use client";

import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { RippleLink } from "@/components/ui/ripple-link";
import { ProjectVisual } from "@/components/case-studies/project-visual";
import type { ConceptBuild } from "@/content/case-studies";
import { accentStroke, accentTint } from "@/lib/accent";

interface ProjectCardProps {
  build: ConceptBuild;
  index: number;
  priority?: boolean;
}

/** One 2×2 grid card — number badge + status top-left, category icon
 * top-right, title/statement/capabilities/CTA bottom-left, visual embedded
 * and bled toward the right edge. All essential info (title, statement,
 * CTA) is always visible — hover only adds restrained motion, nothing is
 * revealed exclusively on hover. */
export function ProjectCard({ build, index, priority }: ProjectCardProps) {
  const tBuild = useTranslations(`caseStudies.builds.${build.id}`);
  const tStage = useTranslations("caseStudies.stage");
  const Icon = build.icon;
  const number = String(index + 1).padStart(2, "0");
  const productName = tBuild("productName");
  const capabilities = tBuild.raw("capabilities") as string[];

  return (
    <RippleLink
      href="/work"
      aria-label={tStage("viewProjectLabel", { product: productName })}
      className="group relative isolate flex h-[300px] flex-col justify-between overflow-hidden rounded-2xl border p-6 transition-colors duration-[400ms] sm:h-[300px] sm:p-7"
      style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: "#070a16" }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl border opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100"
        style={{ borderColor: accentTint(build.accent, 30) }}
      />

      <div className="pointer-events-none absolute inset-0 transition-transform duration-[400ms] ease-out group-hover:scale-[1.025] group-hover:-translate-y-[2px]">
        <ProjectVisual build={build} priority={priority} />
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70 transition-opacity duration-[400ms] group-hover:opacity-100"
        style={{ backgroundImage: `radial-gradient(55% 75% at 82% 45%, ${accentTint(build.accent, 7)}, transparent 70%)` }}
      />

      <div className="relative z-10 flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border text-[13px] font-semibold text-white/75"
            style={{ borderColor: accentTint(build.accent, 42), backgroundColor: accentTint(build.accent, 5) }}
          >
            {number}
          </span>
          <span className="text-[10px] font-semibold tracking-[0.1em] text-white/35 uppercase">{tStage("statusLabel")}</span>
        </div>
        <Icon className="h-[22px] w-[22px] shrink-0 transition-colors duration-300" style={{ color: accentTint(build.accent, 55) }} aria-hidden />
      </div>

      <div className="relative z-10 flex max-w-[300px] flex-col gap-2.5">
        <h3
          className="text-[24px] leading-tight font-semibold text-white transition-transform duration-300 group-hover:translate-x-0.5 sm:text-[26px]"
          style={{ fontWeight: 620 }}
        >
          {productName}
        </h3>
        <p className="text-[14.5px] leading-relaxed text-white/[0.74] sm:text-[15px]">{tBuild("tagline")}</p>
        <p className="text-[12.5px] font-medium tracking-[0.01em]" style={{ color: accentTint(build.accent, 75) }}>
          {capabilities.join(" · ")}
        </p>
        <span
          className="relative mt-1 inline-flex w-fit items-center gap-2 text-[13px] font-semibold text-white transition-colors duration-300 group-hover:text-[var(--cta-accent)]"
          style={{ "--cta-accent": accentStroke[build.accent] } as CSSProperties}
        >
          {tStage("viewProjectCta")}
          <span
            className="h-px w-6 transition-[width] duration-300 group-hover:w-9"
            style={{ backgroundColor: accentTint(build.accent, 60) }}
            aria-hidden
          />
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </span>
      </div>
    </RippleLink>
  );
}
