"use client";

import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { RippleLink } from "@/components/ui/ripple-link";
import { ProjectVisual } from "@/components/case-studies/project-visual";
import { CardMotif, getCardTheme } from "@/components/case-studies/card-theme";
import type { ConceptBuild } from "@/content/case-studies";
import { accentStroke, accentTint } from "@/lib/accent";

interface ProjectCardProps {
  build: ConceptBuild;
  index: number;
  priority?: boolean;
}

/** One card in the 3×2 grid — number badge + status top-left, category icon
 * top-right, title/tagline/capabilities/CTA bottom-left, real image as a
 * small fixed tile in the bottom-right corner. All essential info (title,
 * tagline, CTA) is always visible — hover only adds restrained motion,
 * nothing is revealed exclusively on hover. */
export function ProjectCard({ build, index, priority }: ProjectCardProps) {
  const tBuild = useTranslations(`caseStudies.builds.${build.id}`);
  const tStage = useTranslations("caseStudies.stage");
  const Icon = build.icon;
  const number = String(index + 1).padStart(2, "0");
  const productName = tBuild("productName");
  const capabilities = tBuild.raw("capabilities") as string[];
  const theme = getCardTheme(build.id);

  return (
    <RippleLink
      href="/work"
      aria-label={tStage("viewProjectLabel", { product: productName })}
      className="group relative isolate flex h-[300px] flex-col justify-between overflow-hidden rounded-2xl border p-5 transition-colors duration-[400ms] md:h-[276px] md:p-6"
      style={{ borderColor: theme.borderTint, background: theme.background }}
    >
      {/* Thin top-edge accent highlight — always faintly visible, not hover-only. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ backgroundImage: `linear-gradient(90deg, transparent, ${theme.line}, transparent)`, opacity: 0.22 }}
      />

      <CardMotif build={build} />

      {/* Directional overlay keeping the left text zone readable regardless of the background gradient. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: "linear-gradient(90deg, rgba(5,8,18,.85) 0%, rgba(5,8,18,.55) 48%, transparent 75%)" }}
      />

      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl border opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100"
        style={{ borderColor: accentTint(build.accent, 42) }}
      />

      <div className="pointer-events-none absolute inset-0 transition-transform duration-[400ms] ease-out group-hover:scale-[1.03] group-hover:-translate-y-[3px]">
        <ProjectVisual build={build} priority={priority} />
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-50 transition-opacity duration-[400ms] group-hover:opacity-70 md:opacity-60"
        style={{ backgroundImage: `radial-gradient(38% 48% at 86% 84%, ${theme.glow}, transparent 72%)` }}
      />

      <div className="relative z-10 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border text-[12px] font-semibold text-white/75"
            style={{ borderColor: accentTint(build.accent, 42), backgroundColor: accentTint(build.accent, 5) }}
          >
            {number}
          </span>
          <span className="text-[10px] font-semibold tracking-[0.1em] text-white/35 uppercase">{tStage("statusLabel")}</span>
        </div>
        <Icon className="h-[21px] w-[21px] shrink-0 transition-colors duration-300" style={{ color: accentTint(build.accent, 55) }} aria-hidden />
      </div>

      <div className="relative z-10 flex max-w-[62%] flex-col gap-1.5 md:max-w-[54%]">
        <h3
          className="line-clamp-2 text-[20px] leading-[1.2] font-semibold text-white transition-transform duration-300 group-hover:translate-x-0.5 md:text-[22px]"
          style={{ fontWeight: 630, letterSpacing: "-0.02em" }}
        >
          {productName}
        </h3>
        <p className="line-clamp-2 text-[14px] leading-[1.55] text-white/[0.74]">{tBuild("tagline")}</p>
        <p className="line-clamp-2 text-[12px] leading-snug font-medium tracking-[0.01em]" style={{ color: accentTint(build.accent, 75) }}>
          {capabilities.join(" · ")}
        </p>
        <span
          className="relative mt-1 inline-flex w-fit items-center gap-2 text-[14px] font-semibold text-white transition-colors duration-300 group-hover:text-[var(--cta-accent)]"
          style={{ "--cta-accent": accentStroke[build.accent] } as CSSProperties}
        >
          {tStage("viewProjectCta")}
          <span
            className="h-px w-5 transition-[width] duration-300 group-hover:w-8"
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
