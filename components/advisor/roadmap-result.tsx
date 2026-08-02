"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarClock, CircleCheck, Layers, RotateCcw, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { hexToRgba, type AdvisorAccent } from "@/lib/advisor-accent";
import { getRoadmapPhaseInfo, type AdvisorResult as AdvisorResultData } from "@/content/solution-advisor";
import { buttonVariants } from "@/components/ui/button";
import { RippleLink } from "@/components/ui/ripple-link";

interface RoadmapResultProps {
  result: AdvisorResultData;
  accent: AdvisorAccent;
  onRestart: () => void;
}

/** A fixed rail gradient, independent of the recommended service's accent —
 * the roadmap's signature look stays consistent across every result. */
const RAIL_GRADIENT = "linear-gradient(to bottom, #3B82F6, #8B5CF6, #EC4899, #10B981)";

interface KpiCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  accent: AdvisorAccent;
  delay: number;
}

function KpiCard({ icon: Icon, label, value, accent, delay }: KpiCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "150px" }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, delay, ease: easePremium }}
      className="flex flex-col gap-3 rounded-[22px] border p-5 backdrop-blur-[28px] transition-shadow duration-base hover:shadow-[0_0_28px_-10px_var(--kpi-glow)]"
      style={{
        ["--kpi-glow" as string]: hexToRgba(accent.base, 0.5),
        borderColor: "rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.05)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      <span
        className="flex h-9 w-9 items-center justify-center rounded-full"
        style={{ backgroundColor: hexToRgba(accent.base, 0.16) }}
      >
        <Icon className="h-4 w-4" style={{ color: accent.base }} aria-hidden />
      </span>
      <div>
        <p className="text-caption font-medium tracking-wide text-white/50 uppercase">{label}</p>
        <p className="text-title text-white font-semibold">{value}</p>
      </div>
    </motion.div>
  );
}

/** The advisor's final state — a premium glass roadmap reveal rather than a
 * flat result card, matching the "guided AI advisor" identity through to
 * the end. Every number shown here is real (deliverable/step counts, the
 * actual estimated timeline) — deliberately no invented confidence scores
 * or success-rate claims, since Novyra doesn't have historical data to
 * back those. */
export function RoadmapResult({ result, accent, onRestart }: RoadmapResultProps) {
  const t = useTranslations("advisor");
  const reduceMotion = useReducedMotion();

  const service = t(`recommendations.${result.needId}.service`);
  const insight = t(`recommendations.${result.needId}.insight`);
  const technology = t.raw(`recommendations.${result.needId}.technology`) as string[];
  const deliverables = t.raw(`recommendations.${result.needId}.deliverables`) as string[];
  const focus = t(`focusByGoal.${result.goalId}`);
  const timelineText = t(
    result.timelineUnit === "weeksToLaunch" ? "timelineTemplates.weeksToLaunch" : "timelineTemplates.weeks",
    { range: result.timeline },
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easePremium }}
      className="mx-auto flex w-full max-w-4xl flex-col items-center gap-9 pt-8 md:gap-16"
    >
      {/* header */}
      <div className="flex flex-col items-center gap-6 text-center">
        <span className="relative isolate overflow-hidden rounded-full border border-white/15 px-4 py-1.5 backdrop-blur-sm">
          <span aria-hidden className="bg-gradient-shimmer animate-shimmer pointer-events-none absolute inset-0" />
          <span className="text-caption relative flex items-center gap-1.5 font-medium text-white">
            <Sparkles className="h-3.5 w-3.5" style={{ color: accent.base }} aria-hidden />
            {t("result.badge")}
          </span>
        </span>

        <div className="flex flex-col items-center gap-3">
          <span
            className="text-caption font-medium tracking-[0.28em] uppercase"
            style={{ backgroundImage: "linear-gradient(90deg, #3B82F6, #22D3EE)", backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent" }}
          >
            {t("result.eyebrow")}
          </span>
          <h3 className="text-headline sm:text-display-lg text-balance font-bold text-white">{service}</h3>
          <p className="text-body-lg max-w-[700px] text-balance text-center" style={{ color: "rgba(255,255,255,0.72)" }}>
            {t("result.description")}
          </p>
        </div>
      </div>

      {/* AI insight card */}
      <div
        className="relative w-full overflow-hidden rounded-hero border p-6 backdrop-blur-[34px]"
        style={{ borderColor: hexToRgba(accent.base, 0.28), background: "rgba(255,255,255,0.04)" }}
      >
        {!reduceMotion ? (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ boxShadow: `inset 0 0 60px -20px ${hexToRgba(accent.base, 0.4)}` }}
          />
        ) : null}
        <div className="relative flex items-start gap-4">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundImage: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}
          >
            <Sparkles className="h-5 w-5 text-white" aria-hidden />
          </span>
          <div className="flex flex-col gap-2 text-left">
            <p className="text-caption font-semibold tracking-wide text-white/50 uppercase">{t("result.insightLabel")}</p>
            <p className="text-body-sm text-white/80">{insight}</p>
            {focus ? <p className="text-body-sm text-white/55">{focus}</p> : null}
          </div>
        </div>
      </div>

      {/* roadmap timeline */}
      <ol className="flex w-full flex-col gap-3">
        {result.roadmap.map((phaseId, i) => {
          const { statusCategory } = getRoadmapPhaseInfo(phaseId);
          const phaseTitle = t(`roadmapPhases.${phaseId}.title`);
          const phaseDescription = t(`roadmapPhases.${phaseId}.description`);
          const status = t(`roadmapStatus.${statusCategory}`);
          const isLast = i === result.roadmap.length - 1;
          return (
            <motion.li
              key={phaseId}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "150px" }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: easePremium }}
              className="relative grid grid-cols-[56px_minmax(0,1fr)] gap-5"
            >
              {!isLast ? (
                <motion.span
                  aria-hidden
                  className="absolute top-14 left-7 w-px origin-top"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, margin: "150px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 + 0.1, ease: "easeOut" }}
                  style={{ height: "calc(100% + 0.75rem)", backgroundImage: RAIL_GRADIENT, opacity: 0.6 }}
                />
              ) : null}
              <motion.span
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border text-body-sm font-bold backdrop-blur-xl"
                style={{
                  borderColor: hexToRgba(accent.base, 0.4),
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: accent.base,
                  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.1), 0 0 24px -8px ${hexToRgba(accent.base, 0.5)}`,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </motion.span>
              <div
                className="rounded-[22px] border p-4 backdrop-blur-[28px] transition-[box-shadow,border-color] duration-base hover:shadow-[0_0_24px_-10px_var(--rc-glow)]"
                style={{
                  ["--rc-glow" as string]: hexToRgba(accent.base, 0.4),
                  borderColor: "rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.05)",
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-body font-semibold text-white">{phaseTitle}</h4>
                  <span
                    className="text-[11px] rounded-full border px-2.5 py-0.5 font-medium"
                    style={{ borderColor: hexToRgba(accent.base, 0.35), color: accent.base }}
                  >
                    {status}
                  </span>
                </div>
                <p className="text-body-sm mt-1.5 text-white/60">{phaseDescription}</p>
              </div>
            </motion.li>
          );
        })}
      </ol>

      {/* deliverables + project overview */}
      <div
        className="relative w-full overflow-hidden rounded-hero border p-5 backdrop-blur-[34px] md:p-8"
        style={{
          borderColor: "rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.05)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 24px 60px -20px rgba(0,0,0,0.4)",
        }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/8 to-transparent" />
        <div className="relative grid grid-cols-1 gap-5 text-left sm:grid-cols-2 md:gap-8">
          <div className="flex flex-col gap-4">
            <p className="text-caption flex items-center gap-1.5 font-semibold tracking-wide text-white/50 uppercase">
              <CircleCheck className="h-3.5 w-3.5" style={{ color: accent.base }} aria-hidden />
              {t("result.deliverablesLabel")}
            </p>
            <ul className="flex flex-col gap-1">
              {deliverables.map((item, i) => (
                <motion.li
                  key={`deliverable-${i}`}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "150px" }}
                  transition={{ duration: 0.3, delay: i * 0.05, ease: easePremium }}
                  className="-mx-2 flex items-center gap-3 rounded-xl px-2 py-1.5 transition-colors duration-base hover:bg-white/[0.04]"
                >
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundImage: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}
                  >
                    <CircleCheck className="h-4 w-4 text-white" aria-hidden />
                  </span>
                  <span className="text-body-sm text-white/80">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-caption flex items-center gap-1.5 font-semibold tracking-wide text-white/50 uppercase">
              <CalendarClock className="h-3.5 w-3.5" style={{ color: accent.base }} aria-hidden />
              {t("result.overviewLabel")}
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4 shrink-0" style={{ color: accent.base }} aria-hidden />
                <span className="text-body-sm text-white/80">{timelineText}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {technology.map((tech, i) => (
                  <span key={`tech-${i}`} className="text-caption rounded-full border border-white/12 px-2.5 py-1 text-white/70">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* project metrics */}
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
        <KpiCard icon={CalendarClock} label={t("result.kpi.timeline")} value={timelineText} accent={accent} delay={0} />
        <KpiCard
          icon={Layers}
          label={t("result.kpi.deliverables")}
          value={t("result.kpi.deliverablesValue", { count: deliverables.length })}
          accent={accent}
          delay={0.06}
        />
        <KpiCard
          icon={Sparkles}
          label={t("result.kpi.roadmap")}
          value={t("result.kpi.roadmapValue", { count: result.roadmap.length })}
          accent={accent}
          delay={0.12}
        />
      </div>

      {/* CTA */}
      <div
        className="w-full overflow-hidden rounded-hero border p-3 backdrop-blur-2xl sm:p-4"
        style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)" }}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <RippleLink
            href="/#contact"
            className={cn(buttonVariants({ variant: "gradient", size: "lg" }), "group relative flex-1 overflow-hidden")}
          >
            <span
              aria-hidden
              className="bg-gradient-shimmer pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-full"
            />
            {t("result.cta.consultation")}
            <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-1" aria-hidden />
          </RippleLink>
          <RippleLink
            href="/#contact"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "flex-1 border-white/20 text-white hover:border-white/30 hover:bg-white/5",
            )}
          >
            {t("result.cta.quote")}
          </RippleLink>
        </div>
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="text-caption flex items-center gap-1.5 font-medium text-white/50 transition-colors duration-fast hover:text-white"
      >
        <RotateCcw className="h-3.5 w-3.5" aria-hidden />
        {t("result.restart")}
      </button>
    </motion.div>
  );
}
