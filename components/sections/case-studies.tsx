"use client";

import { Container } from "@/components/ui/container";
import { CaseStudiesBackground } from "@/components/case-studies/case-studies-background";
import { SelectedWorkHeader } from "@/components/case-studies/selected-work-header";
import { ProjectCard } from "@/components/case-studies/project-card";
import { SelectedWorkPrinciples } from "@/components/case-studies/selected-work-principles";
import { conceptBuilds, homepageStageIds } from "@/content/case-studies";

const stageBuilds = homepageStageIds.map((id) => conceptBuilds.find((build) => build.id === id)!);

/** "Selected Work" — a compact 3×2 project grid on desktop (2 columns on
 * tablet, one column on mobile), not a carousel: all six projects visible
 * and reachable without interaction. Every build here is an honest concept
 * exploration (see content/case-studies.ts) — the "Concept" status stays
 * visible on every card. */
export function CaseStudies() {
  return (
    <section id="work" className="relative isolate scroll-mt-24 overflow-hidden py-12 md:py-14">
      <CaseStudiesBackground />

      <Container size="wide" className="flex flex-col gap-7 md:gap-8">
        <SelectedWorkHeader />

        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
          {stageBuilds.map((build, i) => (
            <ProjectCard key={build.id} build={build} index={i} priority={i === 0} />
          ))}
        </div>

        <SelectedWorkPrinciples />
      </Container>
    </section>
  );
}
