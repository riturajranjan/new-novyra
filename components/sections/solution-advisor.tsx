"use client";

import { useMemo, useState, type MouseEvent, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { AdvisorCanvasBackground } from "@/components/advisor/advisor-canvas-background";
import { JourneyProgress } from "@/components/advisor/journey-progress";
import { SolutionSelector } from "@/components/advisor/solution-selector";
import { GoalPathway } from "@/components/advisor/goal-pathway";
import { StageTimeline } from "@/components/advisor/stage-timeline";
import { AdvisorOptionRow } from "@/components/advisor/advisor-option-row";
import { InsightPanel } from "@/components/advisor/insight-panel";
import { RoadmapResult } from "@/components/advisor/roadmap-result";
import {
  needOptions,
  goalOptions,
  stageOptions,
  getRecommendation,
  type AdvisorOption,
  type StageId,
} from "@/content/solution-advisor";
import { getNeedAccent, getGoalAccent, getStageAccent } from "@/lib/advisor-accent";
import { cn } from "@/lib/utils";

const stepOrder = ["need", "goal", "stage"] as const;

interface Answers {
  need?: string;
  goal?: string;
  stage?: StageId;
}

/** Small magnetic wrapper for the Back/Continue buttons — nudges toward the
 * pointer within a subtle range and springs back on leave. */
function MagneticButton({ children }: { children: ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 16, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 16, mass: 0.4 });

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  }
  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div style={{ x: springX, y: springY }} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      {children}
    </motion.div>
  );
}

/** Compact "live solution map" — Goal / Requirement / Recommended
 * Direction — that fills in as the visitor answers each question. This is
 * the section's "solution builds progressively" signature: not a second
 * split-screen layout competing with the already-elaborate per-step
 * visuals below it (SolutionSelector / GoalPathway / StageTimeline), but a
 * thin horizontal trail sitting above them that turns their choices into
 * a readable, accumulating map. */
function SolutionMapTrail({
  needLabel,
  goalLabel,
  directionLabel,
  accent,
}: {
  needLabel?: string;
  goalLabel?: string;
  directionLabel?: string;
  accent: ReturnType<typeof getNeedAccent>;
}) {
  const t = useTranslations("advisor");
  const segments = [
    { label: t("solutionMap.goal"), value: needLabel },
    { label: t("solutionMap.requirement"), value: goalLabel },
    { label: t("solutionMap.direction"), value: directionLabel },
  ];

  return (
    <div className="glass flex w-full max-w-2xl flex-col gap-0 rounded-2xl px-4 py-3 sm:flex-row sm:items-center sm:gap-0 sm:py-2.5">
      {segments.map((seg, i) => (
        <div key={seg.label} className="flex flex-1 items-center gap-3">
          <div className="flex min-w-0 flex-1 flex-col gap-0.5 py-1.5">
            <span className="text-[10px] font-semibold tracking-[0.14em] text-white/35 uppercase">{seg.label}</span>
            <motion.span
              key={seg.value ?? "empty"}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={cn("text-body-sm truncate font-semibold", seg.value ? "text-white" : "text-white/25")}
              style={seg.value ? { color: accent.base } : undefined}
            >
              {seg.value ?? "—"}
            </motion.span>
          </div>
          {i < segments.length - 1 ? (
            <ArrowRight className={cn("h-3.5 w-3.5 shrink-0 transition-colors duration-300", seg.value ? "text-white/40" : "text-white/15")} aria-hidden />
          ) : null}
        </div>
      ))}
    </div>
  );
}

/** A guided "Business Pathway" experience — a decision canvas the visitor
 * moves through rather than a service catalog. Recommends one of Novyra's
 * five real service lines, never a fabricated offering or a price. */
export function SolutionAdvisor() {
  const t = useTranslations("advisor");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const translatedNeedOptions = useMemo<AdvisorOption[]>(
    () =>
      needOptions.map((o) => ({
        ...o,
        label: t(`needOptions.${o.id}.label`),
        description: t(`needOptions.${o.id}.description`),
        badge: t(`needOptions.${o.id}.badge`),
        timeline: t(`needOptions.${o.id}.timeline`),
      })),
    [t],
  );
  const translatedGoalOptions = useMemo<AdvisorOption[]>(
    () =>
      goalOptions.map((o) => ({
        ...o,
        label: t(`goalOptions.${o.id}.label`),
        description: t(`goalOptions.${o.id}.description`),
        badge: t(`goalOptions.${o.id}.badge`),
        timeline: t(`goalOptions.${o.id}.timeline`),
      })),
    [t],
  );
  const translatedStageOptions = useMemo<(AdvisorOption & { id: StageId })[]>(
    () =>
      stageOptions.map((o) => ({
        ...o,
        label: t(`stageOptions.${o.id}.label`),
        description: t(`stageOptions.${o.id}.description`),
      })),
    [t],
  );

  const result = useMemo(() => {
    if (!answers.need || !answers.goal || !answers.stage) return null;
    return getRecommendation(answers.need, answers.goal, answers.stage);
  }, [answers]);

  const currentAnswerId = step === 0 ? answers.need : step === 1 ? answers.goal : answers.stage;
  const canContinue = Boolean(currentAnswerId);
  const stepKey = stepOrder[step] ?? stepOrder[0];
  const question = t(`stepQuestions.${stepKey}.question`);
  const hint = t(`stepQuestions.${stepKey}.hint`);
  const accent = getNeedAccent(answers.need);

  const insightText =
    step === 0 && answers.need
      ? t(`recommendations.${answers.need}.insight`)
      : step === 1 && answers.goal
        ? translatedGoalOptions.find((g) => g.id === answers.goal)?.description
        : step === 2 && answers.stage
          ? translatedStageOptions.find((s) => s.id === answers.stage)?.description
          : undefined;

  function selectNeed(id: string) {
    setAnswers((a) => ({ ...a, need: id }));
  }
  function selectGoal(id: string) {
    setAnswers((a) => ({ ...a, goal: id }));
  }
  function selectStage(id: StageId) {
    setAnswers((a) => ({ ...a, stage: id }));
  }
  function goNext() {
    if (!canContinue) return;
    setStep((s) => Math.min(3, s + 1));
  }
  function goBack() {
    setStep((s) => Math.max(0, s - 1));
  }
  function restart() {
    setAnswers({});
    setStep(0);
  }

  return (
    <section id="advisor" className="relative isolate scroll-mt-24 py-14 md:py-20">
      <AdvisorCanvasBackground />

      <Container className="flex flex-col items-center gap-5">
        <div className="relative mb-8 flex flex-col items-center gap-5 md:mb-12">
          <div
            aria-hidden
            className="bg-gradient-brand pointer-events-none absolute top-1/2 left-1/2 -z-10 h-72 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.16] blur-[100px]"
          />
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={
              <>
                {t("titleLine1")}
                <br />
                {t("titleLine2")}
              </>
            }
            description={t("description")}
          />
          <div className="flex flex-wrap items-center justify-center gap-2">
            {(["freeConsultation", "personalizedRoadmap", "noCommitment"] as const).map((pointId) => (
              <span
                key={pointId}
                className="text-caption rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-white/70 backdrop-blur-sm"
              >
                {t(`trustPoints.${pointId}`)}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full">
          <div className="flex flex-col items-center gap-8 md:gap-16">
            <SolutionMapTrail
              needLabel={translatedNeedOptions.find((o) => o.id === answers.need)?.label}
              goalLabel={translatedGoalOptions.find((o) => o.id === answers.goal)?.label}
              directionLabel={result ? t(`recommendations.${result.needId}.service`) : undefined}
              accent={accent}
            />

            <JourneyProgress currentStep={step} accent={accent} />

            <AnimatePresence mode="wait">
              {step < 3 ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, filter: "blur(6px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(6px)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex w-full flex-col items-center gap-5"
                >
                  {step === 0 ? (
                    <div className="flex w-full flex-col items-center gap-6 sm:gap-8">
                      <div className="flex max-w-2xl flex-col items-center gap-2 px-2">
                        <p className="text-[28px] leading-tight font-bold text-balance text-center text-white sm:text-headline">
                          {question}
                        </p>
                        <p className="text-body-sm max-w-md text-balance text-center text-white/50">{hint}</p>
                      </div>
                      <SolutionSelector
                        options={translatedNeedOptions}
                        hint={hint}
                        selectedId={answers.need}
                        onSelect={selectNeed}
                      />
                    </div>
                  ) : null}

                  <div className="flex w-full max-w-md flex-col gap-7 md:hidden">
                    <div className="flex flex-col gap-2">
                      {step === 1 ? (
                        <>
                          <p className="text-title text-balance text-center font-semibold text-white">{question}</p>
                          <p className="text-body-sm text-balance text-center text-white/50">{t("stepDescriptions.goalHint")}</p>
                        </>
                      ) : null}
                      {step === 2 ? (
                        <>
                          <p className="text-title text-balance text-center font-semibold text-white">{question}</p>
                          <p className="text-body-sm text-balance text-center text-white/50">
                            {t("stepDescriptions.stageHintShort")}
                          </p>
                        </>
                      ) : null}
                    </div>
                    <div className="flex flex-col gap-3">
                      {step === 1
                        ? translatedGoalOptions.map((o) => (
                            <AdvisorOptionRow
                              key={o.id}
                              option={o}
                              accent={getGoalAccent(o.id)}
                              isSelected={o.id === answers.goal}
                              onSelect={selectGoal}
                            />
                          ))
                        : null}
                      {step === 2
                        ? translatedStageOptions.map((o) => (
                            <AdvisorOptionRow
                              key={o.id}
                              option={o}
                              accent={getStageAccent(o.id)}
                              isSelected={o.id === answers.stage}
                              onSelect={(id) => selectStage(id as StageId)}
                            />
                          ))
                        : null}
                    </div>
                  </div>

                  <div className="hidden w-full md:block">
                    {step === 1 ? (
                      <div className="flex flex-col items-center gap-18">
                        <div className="mx-auto flex max-w-175 flex-col items-center gap-3">
                          <p
                            className="text-balance text-center font-bold text-white"
                            style={{ fontSize: 48, letterSpacing: "-0.03em", lineHeight: 1.1 }}
                          >
                            {question}
                          </p>
                          <p className="text-body-lg max-w-175 text-balance text-center text-white/50">
                            {t("stepDescriptions.goalHint")}
                          </p>
                        </div>
                        <GoalPathway options={translatedGoalOptions} selectedId={answers.goal} onSelect={selectGoal} />
                      </div>
                    ) : null}
                    {step === 2 ? (
                      <div className="mb-25 flex flex-col items-center gap-18">
                        <div className="mx-auto flex max-w-175 flex-col items-center gap-3">
                          <p
                            className="text-balance text-center font-bold text-white"
                            style={{ fontSize: 56, letterSpacing: "-0.02em", lineHeight: 1.1 }}
                          >
                            {question}
                          </p>
                          <p
                            className="text-body-lg max-w-175 text-balance text-center"
                            style={{ color: "rgba(255,255,255,0.72)" }}
                          >
                            {t("stepDescriptions.stageHintLong")}
                          </p>
                        </div>
                        <StageTimeline options={translatedStageOptions} selectedId={answers.stage} onSelect={selectStage} />
                      </div>
                    ) : null}
                  </div>

                  <InsightPanel text={insightText} accent={accent} />

                  <div className="sticky justify-between bottom-4 z-10 mt-6 flex w-full max-w-[680px] items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.06] p-2.5 backdrop-blur-2xl md:static md:mt-12 md:min-h-[72px] md:justify-between md:gap-4 md:rounded-full md:border-white/10 md:bg-white/[0.04] md:p-2 md:pl-5">
                    <motion.button
                      type="button"
                      onClick={goBack}
                      disabled={step === 0}
                      whileTap={{ scale: 0.96 }}
                      className={cn(
                        "text-caption inline-flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.04] px-4 font-medium transition-colors duration-fast md:h-auto md:border-0 md:bg-transparent md:px-0",
                        step === 0 ? "text-white/20" : "text-white/60 hover:text-white",
                      )}
                    >
                      <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
                      {t("actions.back")}
                    </motion.button>
                    <MagneticButton>
                      <motion.button
                        type="button"
                        onClick={goNext}
                        disabled={!canContinue}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                          "bg-gradient-brand px-3 text-caption group relative flex h-13 w-full flex-1 items-center justify-center gap-1.5 overflow-hidden rounded-2xl font-semibold text-white shadow-glow-blue transition-opacity duration-fast",
                          "md:h-15 md:w-auto md:flex-none md:rounded-pill md:px-8",
                          !canContinue && "pointer-events-none opacity-30",
                        )}
                      >
                        <span
                          aria-hidden
                          className="bg-gradient-shimmer pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-700 ease-out group-active:translate-x-full md:hidden"
                        />
                        {t("actions.continue")}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-fast group-hover:translate-x-0.5" aria-hidden />
                      </motion.button>
                    </MagneticButton>
                  </div>
                </motion.div>
              ) : result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <RoadmapResult result={result} accent={accent} onRestart={restart} />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
