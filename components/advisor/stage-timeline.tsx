"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getStageAccent, hexToRgba } from "@/lib/advisor-accent";
import type { AdvisorOption, StageId } from "@/content/solution-advisor";

interface StageTimelineProps {
  options: (AdvisorOption & { id: StageId })[];
  selectedId?: StageId;
  onSelect: (id: StageId) => void;
}

/** A fixed rail gradient, independent of any single stage's accent — the
 * "roadmap" reads the same regardless of which stage is selected. */
const RAIL_GRADIENT = "linear-gradient(to right, #3B82F6, #8B5CF6, #EC4899)";

/** Step 3's desktop/tablet widget — a premium glass roadmap. Each of the
 * five stages carries its own accent (matching the per-option treatment
 * used for Step 2's goals); the connecting rail itself stays a fixed
 * blue→purple→pink gradient so the roadmap reads consistently regardless
 * of which stage is active. Selected state stays dark glass with the
 * accent only as a border, glow, and pulse ring — never a solid fill. */
export function StageTimeline({ options, selectedId, onSelect }: StageTimelineProps) {
  const t = useTranslations("advisor");
  const reduceMotion = useReducedMotion();
  const selectedIndex = options.findIndex((o) => o.id === selectedId);
  const progress = selectedIndex === -1 ? 0 : (selectedIndex / (options.length - 1)) * 100;

  return (
    <div
      role="radiogroup"
      aria-label={t("stepQuestions.stage.question")}
      className="relative flex w-full items-start justify-between"
    >
      <span className="absolute top-9 right-0 left-0 h-0.5 rounded-full bg-white/[0.08]" aria-hidden />
      <motion.span
        className="absolute top-9 left-0 h-0.5 overflow-hidden rounded-full"
        style={{ backgroundImage: RAIL_GRADIENT }}
        initial={false}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        aria-hidden
      >
        {!reduceMotion && progress > 0 ? (
          <motion.span
            aria-hidden
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent"
            animate={{ x: ["-100%", "300%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
          />
        ) : null}
      </motion.span>

      {options.map((option) => {
        const isSelected = option.id === selectedId;
        const accent = getStageAccent(option.id);
        const Icon = option.icon;
        return (
          <motion.button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={`${option.label} — ${option.description}`}
            onClick={() => onSelect(option.id)}
            whileHover={reduceMotion ? undefined : { y: -6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{ ["--st-ring" as string]: accent.base, ["--st-hover-glow" as string]: hexToRgba(accent.base, 0.35) }}
            className={cn(
              "group relative z-10 flex min-h-[44px] flex-1 flex-col items-center gap-4 rounded-2xl px-1 py-1 text-center",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--st-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05060f]",
            )}
          >
            <span className="relative flex h-18 w-18 items-center justify-center">
              {isSelected && !reduceMotion ? (
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full"
                  style={{ border: `1.5px solid ${accent.base}` }}
                  initial={{ opacity: 0.6, scale: 1 }}
                  animate={{ opacity: 0, scale: 1.5 }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                />
              ) : null}
              <motion.span
                animate={{ y: isSelected ? -6 : 0, scale: isSelected ? 1.06 : 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                style={{
                  borderColor: isSelected ? hexToRgba(accent.base, 0.55) : "rgba(255,255,255,0.12)",
                  boxShadow: isSelected
                    ? `0 0 40px ${hexToRgba(accent.base, 0.35)}, inset 0 1px 0 rgba(255,255,255,0.1)`
                    : "inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
                className={cn(
                  "flex h-18 w-18 items-center justify-center rounded-full border bg-white/[0.04] backdrop-blur-[28px] transition-[box-shadow,border-color] duration-[250ms]",
                  "group-hover:shadow-[0_0_28px_-6px_var(--st-hover-glow)]",
                )}
              >
                <Icon className="h-8 w-8" style={{ color: isSelected ? accent.base : "rgba(255,255,255,0.6)" }} aria-hidden />
              </motion.span>
            </span>
            <span className="flex flex-col items-center gap-4">
              <span className={cn("text-base font-bold sm:text-2xl", isSelected ? "text-white" : "text-white/70")}>
                {option.label}
              </span>
              <span
                className="hidden max-w-[10rem] text-sm sm:block"
                style={{ color: isSelected ? "rgba(255,255,255,0.62)" : "rgba(255,255,255,0.4)" }}
              >
                {option.description}
              </span>
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
