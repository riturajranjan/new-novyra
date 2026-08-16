"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { accentStroke, accentTint } from "@/lib/accent";
import type { ConceptBuild } from "@/content/case-studies";

interface ProjectVisualProps {
  build: ConceptBuild;
  priority?: boolean;
}

/** One quiet technical motif per project — a grid, a pulse line, a wave, or
 * corner brackets — never the same shape twice, kept just above the noise
 * floor (opacity 0.05–0.07) so it reads as texture, not decoration. */
function Motif({ kind, accent }: { kind: "grid" | "pulse" | "wave" | "frame"; accent: ConceptBuild["accent"] }) {
  const stroke = accentStroke[accent];
  return (
    <svg aria-hidden viewBox="0 0 200 200" className="pointer-events-none absolute inset-0 h-full w-full" style={{ opacity: 0.06 }}>
      {kind === "grid" ? (
        <>
          {[40, 80, 120, 160].map((v) => (
            <line key={`v${v}`} x1={v} y1="0" x2={v} y2="200" stroke={stroke} strokeWidth="0.5" />
          ))}
          {[40, 80, 120, 160].map((h) => (
            <line key={`h${h}`} x1="0" y1={h} x2="200" y2={h} stroke={stroke} strokeWidth="0.5" />
          ))}
        </>
      ) : null}
      {kind === "pulse" ? (
        <path d="M0,100 L50,100 L65,60 L80,140 L95,100 L200,100" fill="none" stroke={stroke} strokeWidth="1" />
      ) : null}
      {kind === "wave" ? (
        <path d="M0,110 C40,70 60,150 100,110 C140,70 160,150 200,110" fill="none" stroke={stroke} strokeWidth="1" />
      ) : null}
      {kind === "frame" ? (
        <>
          <path d="M10,10 L10,45 M10,10 L45,10" fill="none" stroke={stroke} strokeWidth="1.5" />
          <path d="M190,10 L190,45 M190,10 L155,10" fill="none" stroke={stroke} strokeWidth="1.5" />
          <path d="M10,190 L10,155 M10,190 L45,190" fill="none" stroke={stroke} strokeWidth="1.5" />
          <path d="M190,190 L190,155 M190,190 L155,190" fill="none" stroke={stroke} strokeWidth="1.5" />
        </>
      ) : null}
    </svg>
  );
}

function Metric({ label, value, accent }: { label: string; value: string; accent: ConceptBuild["accent"] }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-md border border-white/[0.07] px-2.5 py-2" style={{ backgroundColor: accentTint(accent, 5) }}>
      <span className="text-[9.5px] font-medium tracking-wide text-white/40 uppercase">{label}</span>
      <span className="text-[13px] font-semibold text-white/85">{value}</span>
    </div>
  );
}

/** The project card's visual — a distinct, domain-meaningful composition
 * per project (never the same shape reused with a different color), pushed
 * toward the right edge and allowed to bleed past it. Still honestly
 * abstract — no image-generation capability exists in this environment —
 * but each one now shows real illustrative labels/values instead of
 * generic bars, so every card reads as a different product. Renders a real
 * photo via `next/image` the moment `build.image` is set. */
export function ProjectVisual({ build, priority }: ProjectVisualProps) {
  const t = useTranslations(`caseStudies.visuals.${build.id}`);

  if (build.image) {
    return (
      <div className="absolute inset-y-0 right-0 w-[52%]">
        <Image src={build.image} alt="" fill priority={priority} sizes="(min-width: 768px) 28vw, 55vw" className="object-cover" />
      </div>
    );
  }

  const accent = build.accent;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-y-0 -right-[4%] w-[52%] overflow-hidden">
      <span
        className="absolute inset-0"
        style={{ backgroundImage: `radial-gradient(70% 90% at 80% 45%, ${accentTint(accent, 10)}, transparent 70%)` }}
      />
      <Motif
        kind={build.id === "school-erp" ? "grid" : build.id === "hospital-platform" ? "pulse" : build.id === "ai-saas-dashboard" ? "wave" : "frame"}
        accent={accent}
      />

      {build.id === "school-erp" ? (
        <div className="absolute top-[16%] right-[8%] flex w-[86%] flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <Metric label={t("metric1Label")} value="1,248" accent={accent} />
            <Metric label={t("metric2Label")} value="92%" accent={accent} />
          </div>
          <div className="mt-1 flex items-end gap-1 rounded-md border border-white/[0.07] p-2.5" style={{ backgroundColor: accentTint(accent, 4) }}>
            {[38, 55, 46, 70, 58, 82, 92].map((h, i) => (
              <span key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, backgroundColor: accentTint(accent, i === 6 ? 70 : 30) }} />
            ))}
          </div>
          <span className="text-[10px] font-medium text-white/35">{t("caption")}</span>
        </div>
      ) : null}

      {build.id === "hospital-platform" ? (
        <div className="absolute top-[14%] right-[8%] flex w-[86%] flex-col gap-2">
          {[
            ["08:30", t("step1")],
            ["09:15", t("step2")],
            ["10:00", t("step3")],
          ].map(([time, label], i) => (
            <div
              key={time}
              className="flex items-center gap-2.5 rounded-md border border-white/[0.07] px-2.5 py-1.5"
              style={{ backgroundColor: accentTint(accent, i === 0 ? 8 : 4) }}
            >
              <span className="text-[11px] font-semibold tabular-nums" style={{ color: accentStroke[accent] }}>
                {time}
              </span>
              <span className="text-[11px] text-white/55">{label}</span>
            </div>
          ))}
          <div className="mt-0.5">
            <Metric label={t("queueLabel")} value="24" accent={accent} />
          </div>
        </div>
      ) : null}

      {build.id === "ai-saas-dashboard" ? (
        <div className="absolute top-[16%] right-[8%] flex w-[86%] flex-col gap-2">
          <div className="grid grid-cols-3 gap-2">
            <Metric label={t("metric1Label")} value={t("metric1Value")} accent={accent} />
            <Metric label={t("metric2Label")} value="84ms" accent={accent} />
            <Metric label={t("metric3Label")} value="03" accent={accent} />
          </div>
          <svg viewBox="0 0 200 60" className="mt-1 h-14 w-full rounded-md border border-white/[0.07]" style={{ backgroundColor: accentTint(accent, 4) }}>
            <path
              d="M4,45 C30,20 45,50 65,30 C85,10 100,45 120,25 C140,10 160,35 196,15"
              fill="none"
              stroke={accentStroke[accent]}
              strokeOpacity={0.75}
              strokeWidth="1.5"
            />
          </svg>
        </div>
      ) : null}

      {build.id === "real-estate-crm" ? (
        <div className="absolute top-[16%] right-[8%] flex w-[86%] gap-2">
          {[
            [t("stage1"), "08"],
            [t("stage2"), "05"],
            [t("stage3"), "03"],
            [t("stage4"), "02"],
          ].map(([label, value], i) => (
            <div
              key={label}
              className="flex flex-1 flex-col items-center gap-1.5 rounded-md border border-white/[0.07] px-1.5 py-2.5"
              style={{ backgroundColor: accentTint(accent, i === 3 ? 10 : 4) }}
            >
              <span className="text-[9px] font-semibold tracking-wide text-white/40 uppercase">{label as string}</span>
              <span className="text-[16px] font-semibold text-white/85">{value}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
