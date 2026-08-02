"use client";

import { useState } from "react";
import { SolutionOrb } from "@/components/advisor/solution-orb";
import { SolutionCard } from "@/components/advisor/solution-card";
import { SideConnectors } from "@/components/advisor/solution-connectors";
import { getNeedAccent } from "@/lib/advisor-accent";
import { LEFT_NEED_IDS, RIGHT_NEED_IDS } from "@/lib/advisor-layout";
import type { AdvisorOption } from "@/content/solution-advisor";

interface SolutionSelectorProps {
  options: AdvisorOption[];
  hint: string;
  selectedId?: string;
  onSelect: (id: string) => void;
}

/** Compact hybrid "AI Orb + Side Cards" selector for Step 1 (need). Below
 * `lg` the orb sits centered above a 1–2 column card grid with no
 * connectors; at `lg`+ it becomes a true three-column layout — four cards
 * left, the orb centered, four cards right — with a thin connector line
 * per card. Replaces the old full-circle radial canvas, which used too
 * much vertical space and didn't leave the headline room to breathe. */
export function SolutionSelector({ options, hint, selectedId, onSelect }: SolutionSelectorProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const byId = new Map(options.map((o) => [o.id, o]));
  const left = LEFT_NEED_IDS.map((id) => byId.get(id)).filter((o): o is AdvisorOption => Boolean(o));
  const right = RIGHT_NEED_IDS.map((id) => byId.get(id)).filter((o): o is AdvisorOption => Boolean(o));

  const hoveredOption = hoveredId ? byId.get(hoveredId) : undefined;
  const selectedOption = selectedId ? byId.get(selectedId) : undefined;
  const activeOption = hoveredOption ?? selectedOption;
  const orbAccent = getNeedAccent(activeOption?.id);
  const orbSubtitle = activeOption?.description ?? hint;
  const orbTitle = !hoveredOption && selectedOption ? selectedOption.label : undefined;

  function handleHoverChange(id: string, hovering: boolean) {
    setHoveredId((current) => (hovering ? id : current === id ? null : current));
  }

  return (
    <div role="radiogroup" aria-label={hint} className="w-full">
      {/* Compact tier (mobile + tablet): orb above, 1–2 column grid below,
          no connectors — matches spec's "simplify or remove" guidance for
          anything below the true 3-column desktop breakpoint. */}
      <div className="flex flex-col items-center gap-6 lg:hidden">
        <SolutionOrb
          size="medium"
          accent={orbAccent}
          title={orbTitle}
          subtitle={orbSubtitle}
          active={Boolean(activeOption)}
          className="hidden sm:flex"
        />
        <SolutionOrb
          size="compact"
          accent={orbAccent}
          title={orbTitle}
          subtitle={orbSubtitle}
          active={Boolean(activeOption)}
          className="flex sm:hidden"
        />
        <div className="grid w-full grid-cols-1 gap-3 min-[390px]:grid-cols-2">
          {options.map((option) => (
            <SolutionCard
              key={option.id}
              option={option}
              accent={getNeedAccent(option.id)}
              isSelected={option.id === selectedId}
              onSelect={onSelect}
              side="none"
              onHoverChange={(hovering) => handleHoverChange(option.id, hovering)}
            />
          ))}
        </div>
      </div>

      {/* Desktop tier: left cards | connectors | orb | connectors | right cards. */}
      <div
        className="hidden lg:grid lg:items-stretch"
        style={{ gridTemplateColumns: "minmax(260px,1fr) 36px minmax(180px,240px) 36px minmax(260px,1fr)" }}
      >
        <div className="grid grid-rows-[repeat(4,minmax(0,1fr))] gap-4">
          {left.map((option) => (
            <SolutionCard
              key={option.id}
              option={option}
              accent={getNeedAccent(option.id)}
              isSelected={option.id === selectedId}
              onSelect={onSelect}
              side="left"
              onHoverChange={(hovering) => handleHoverChange(option.id, hovering)}
            />
          ))}
        </div>

        <SideConnectors options={left} side="left" hoveredId={hoveredId} selectedId={selectedId} />

        <div className="flex items-center justify-center">
          <SolutionOrb size="full" accent={orbAccent} title={orbTitle} subtitle={orbSubtitle} active={Boolean(activeOption)} />
        </div>

        <SideConnectors options={right} side="right" hoveredId={hoveredId} selectedId={selectedId} />

        <div className="grid grid-rows-[repeat(4,minmax(0,1fr))] gap-4">
          {right.map((option) => (
            <SolutionCard
              key={option.id}
              option={option}
              accent={getNeedAccent(option.id)}
              isSelected={option.id === selectedId}
              onSelect={onSelect}
              side="right"
              onHoverChange={(hovering) => handleHoverChange(option.id, hovering)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
