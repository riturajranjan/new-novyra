"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CircleCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { accentStroke, accentTint } from "@/lib/accent";
import { easePowerOut, easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { processSteps } from "@/content/process-steps";

const SCATTERED = [
  [18, 20], [40, 14], [62, 28], [22, 52], [50, 58], [78, 40],
];
const ORGANIZED = [
  [16, 22], [38, 22], [60, 22], [16, 50], [38, 50], [60, 50],
];

/** One continuous visual story, six frames — the same abstract product
 * literally taking shape as the visitor steps through the process, rather
 * than six unrelated icons. Cheap SVG only, no continuous animation loop:
 * each frame is a static composition that cross-fades in on step change. */
function ProcessStoryVisual({ stageIndex, stroke, accent }: { stageIndex: number; stroke: string; accent: string }) {
  return (
    <svg viewBox="0 0 90 66" className="h-16 w-22" aria-hidden>
      {stageIndex === 0
        ? SCATTERED.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={2.4} fill={stroke} opacity={0.55} />)
        : null}
      {stageIndex === 1
        ? ORGANIZED.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={2.4} fill={stroke} opacity={0.7} />)
        : null}
      {stageIndex === 2 ? (
        <>
          <rect x={8} y={8} width={74} height={50} rx={3} fill="none" stroke={stroke} strokeWidth={1} strokeDasharray="3 3" opacity={0.7} />
          <line x1={8} y1={22} x2={82} y2={22} stroke={stroke} strokeWidth={0.75} strokeDasharray="2 3" opacity={0.5} />
          <rect x={14} y={30} width={26} height={20} rx={2} fill="none" stroke={stroke} strokeWidth={0.75} strokeDasharray="2 3" opacity={0.5} />
        </>
      ) : null}
      {stageIndex === 3 ? (
        <>
          <rect x={8} y={8} width={74} height={50} rx={3} fill={accent} opacity={0.16} />
          <rect x={8} y={8} width={74} height={12} rx={3} fill={stroke} opacity={0.35} />
          <rect x={14} y={30} width={26} height={20} rx={2} fill={stroke} opacity={0.28} />
          <rect x={46} y={30} width={28} height={9} rx={2} fill={stroke} opacity={0.22} />
          <rect x={46} y={41} width={28} height={9} rx={2} fill={stroke} opacity={0.22} />
        </>
      ) : null}
      {stageIndex === 4 ? (
        <>
          <rect x={8} y={8} width={74} height={50} rx={3} fill={accent} opacity={0.16} />
          <rect x={8} y={8} width={74} height={12} rx={3} fill={stroke} opacity={0.35} />
          <rect x={14} y={30} width={26} height={20} rx={2} fill={stroke} opacity={0.28} />
          <rect x={46} y={30} width={28} height={9} rx={2} fill={stroke} opacity={0.22} />
          <rect x={46} y={41} width={28} height={9} rx={2} fill={stroke} opacity={0.22} />
          <circle cx={78} cy={12} r={9} fill="#050816" stroke={stroke} strokeWidth={1.2} />
          <path d="M74,12 L77,15 L83,9" fill="none" stroke={stroke} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : null}
      {stageIndex === 5 ? (
        <>
          <rect x={8} y={8} width={74} height={50} rx={3} fill={accent} opacity={0.3} />
          <rect x={8} y={8} width={74} height={12} rx={3} fill={stroke} opacity={0.55} />
          <rect x={14} y={30} width={26} height={20} rx={2} fill={stroke} opacity={0.45} />
          <rect x={46} y={30} width={28} height={9} rx={2} fill={stroke} opacity={0.35} />
          <rect x={46} y={41} width={28} height={9} rx={2} fill={stroke} opacity={0.35} />
          <path d="M45,8 L45,-4" stroke={stroke} strokeWidth={1} strokeLinecap="round" opacity={0.6} />
        </>
      ) : null}
    </svg>
  );
}

/** The services page's own take on "how we build" — a horizontal step
 * rail (numbered nodes on a progress line) driving one large "evolving"
 * readout panel below, rather than a scrolling stack of six identical
 * cards. Click/keyboard driven only — nothing here is scroll-linked. */
export function ServiceProcessRail() {
  const t = useTranslations("process");
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = processSteps[activeIndex];
  const stroke = accentStroke[active.accent];
  const deliverables = t.raw(`steps.${active.id}.deliverables`) as string[];

  return (
    <div className="flex flex-col gap-8 md:gap-10">
      <div
        role="tablist"
        aria-label={t("timelineAriaLabel")}
        className="flex items-center gap-1 overflow-x-auto pb-2 md:justify-center md:gap-2 md:overflow-visible"
      >
        {processSteps.map((step, i) => {
          const Icon = step.icon;
          const isActive = i === activeIndex;
          const isPast = i < activeIndex;
          return (
            <div key={step.id} className="flex shrink-0 items-center md:flex-1">
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveIndex(i)}
                className="group flex shrink-0 flex-col items-center gap-2 rounded-xl px-2.5 py-2 outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300"
                  style={{
                    borderColor: isActive || isPast ? accentStroke[step.accent] : "rgba(255,255,255,0.14)",
                    backgroundColor: isActive ? accentTint(step.accent, 20) : "transparent",
                    boxShadow: isActive ? `0 0 20px -4px ${accentTint(step.accent, 55)}` : undefined,
                  }}
                >
                  <Icon
                    className="h-4.5 w-4.5 transition-colors duration-300"
                    style={{ color: isActive || isPast ? accentStroke[step.accent] : "rgba(255,255,255,0.35)" }}
                    aria-hidden
                  />
                </span>
                <span
                  className={cn(
                    "text-caption hidden font-medium transition-colors duration-300 sm:block",
                    isActive ? "text-white" : "text-white/35 group-hover:text-white/60",
                  )}
                >
                  {t(`steps.${step.id}.title`)}
                </span>
              </button>
              {i < processSteps.length - 1 ? (
                <span aria-hidden className="mx-0.5 h-px w-6 shrink-0 md:mx-1 md:w-full" style={{ backgroundColor: isPast ? accentStroke[step.accent] : "rgba(255,255,255,0.12)" }} />
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="glass-strong relative isolate overflow-hidden rounded-hero p-6 sm:p-8 md:p-10">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-20 -z-10 rounded-[3rem] blur-3xl"
          animate={{ backgroundColor: accentTint(active.accent, 12) }}
          transition={{ duration: 0.6, ease: easePremium }}
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: easePowerOut }}
            className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-8"
          >
            <div className="flex flex-col gap-3 md:max-w-70">
              <span className="text-caption font-mono font-medium tracking-[0.2em] uppercase" style={{ color: stroke }}>
                STEP {active.number} / 06
              </span>
              <h3 className="text-title-lg text-foreground font-semibold tracking-tight">{t(`steps.${active.id}.title`)}</h3>
              <p className="text-body text-foreground-secondary max-w-md">{t(`steps.${active.id}.description`)}</p>
            </div>

            <div className="glass hidden shrink-0 items-center justify-center rounded-2xl p-3 md:flex">
              <ProcessStoryVisual stageIndex={activeIndex} stroke={stroke} accent={accentTint(active.accent, 40)} />
            </div>

            <ul className="flex min-w-0 flex-col gap-2 md:w-[240px] md:shrink-0">
              {deliverables.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: 0.05 + i * 0.04, ease: easePremium }}
                  className="text-body-sm text-foreground flex items-center gap-2"
                >
                  <CircleCheck className="h-3.5 w-3.5 shrink-0" style={{ color: stroke }} aria-hidden />
                  <span className="truncate">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
