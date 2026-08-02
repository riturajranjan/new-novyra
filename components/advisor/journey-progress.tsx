"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { hexToRgba, type AdvisorAccent } from "@/lib/advisor-accent";

const journeyStepIds = ["discover", "define", "recommend"] as const;

interface JourneyProgressProps {
  currentStep: number;
  accent: AdvisorAccent;
}

/** Visual journey line — Discover → Define → Recommend — replacing a plain
 * numbered progress bar with a glowing active marker and motion traveling
 * along the connector toward the next destination. Once a need is picked in
 * Step 1, the active glow and connector fill switch to that category's
 * accent, carrying the same color through the rest of the journey. */
export function JourneyProgress({ currentStep, accent }: JourneyProgressProps) {
  const t = useTranslations("advisor");
  const reduceMotion = useReducedMotion();

  return (
    <ol aria-label={t("journey.ariaLabel")} className="mx-auto flex w-full max-w-xl items-start">
      {journeyStepIds.map((stepId, i) => {
        const isComplete = i < currentStep;
        const isActive = i === currentStep;
        return (
          <li key={stepId} className={cn("flex items-start", i < journeyStepIds.length - 1 && "flex-1")}>
            <div className="flex flex-col items-center gap-2">
              <span
                style={
                  isActive && !isComplete
                    ? { borderColor: accent.base, color: accent.base, boxShadow: `0 0 20px -4px ${hexToRgba(accent.base, 0.7)}` }
                    : undefined
                }
                className={cn(
                  "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-caption font-semibold transition-colors duration-base",
                  isComplete && "bg-brand-blue text-white",
                  isActive && !isComplete && "border-2",
                  !isComplete && !isActive && "border-2 border-white/15 text-white/40",
                )}
              >
                {isActive && !isComplete ? (
                  <motion.span
                    aria-hidden
                    className="absolute -inset-1 rounded-full"
                    style={{
                      backgroundImage: `conic-gradient(from 0deg, ${accent.from}, ${accent.to}, ${accent.from})`,
                      WebkitMask: "radial-gradient(closest-side, transparent calc(100% - 2px), black calc(100% - 1px))",
                      mask: "radial-gradient(closest-side, transparent calc(100% - 2px), black calc(100% - 1px))",
                      opacity: 0.7,
                    }}
                    animate={reduceMotion ? undefined : { rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  />
                ) : null}
                <span className="relative">
                  {isComplete ? <Check className="h-4 w-4" aria-hidden /> : <span aria-hidden>{i + 1}</span>}
                </span>
              </span>
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    "text-caption font-semibold tracking-wide uppercase",
                    isActive || isComplete ? "text-white" : "text-white/40",
                  )}
                >
                  {t(`journey.${stepId}.label`)}
                </span>
                <span className="text-caption hidden text-white/40 sm:block">{t(`journey.${stepId}.sublabel`)}</span>
              </div>
            </div>

            {i < journeyStepIds.length - 1 ? (
              <span className="relative mx-2 mt-4.5 h-px flex-1 overflow-hidden bg-white/10 sm:mx-3">
                <motion.span
                  className="absolute inset-y-0 left-0"
                  style={{ backgroundImage: `linear-gradient(to right, ${accent.from}, ${accent.to})` }}
                  initial={false}
                  animate={{ width: isComplete ? "100%" : "0%" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
                {isActive && !reduceMotion ? (
                  <motion.span
                    aria-hidden
                    className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full"
                    style={{ backgroundColor: accent.base, boxShadow: `0 0 8px 2px ${hexToRgba(accent.base, 0.8)}` }}
                    animate={{ left: ["0%", "100%"] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  />
                ) : null}
              </span>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
