"use client";

import type { PointerEvent } from "react";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getGoalAccent, hexToRgba } from "@/lib/advisor-accent";
import type { AdvisorOption } from "@/content/solution-advisor";

interface GoalPathwayProps {
  options: AdvisorOption[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

interface GoalCardProps {
  option: AdvisorOption;
  isSelected: boolean;
  onSelect: (id: string) => void;
  index: number;
}

/** One premium goal card — 56px glowing glass icon, title/description,
 * a badge pill, and a subtle timeline pinned to the bottom-right corner.
 * Carries its own accent color (unlike Steps 1 and 3, which share the one
 * accent chosen in Step 1). Selected state stays mostly dark glass with the
 * accent only as a thin gradient border, an inner glow, and icon emphasis —
 * never a solid accent fill. */
function GoalCard({ option, isSelected, onSelect, index }: GoalCardProps) {
  const reduceMotion = useReducedMotion();
  const Icon = option.icon;
  const accent = getGoalAccent(option.id);

  const spotlightX = useMotionValue(50);
  const spotlightY = useMotionValue(50);
  const spotlightBackground = useMotionTemplate`radial-gradient(180px circle at ${spotlightX}% ${spotlightY}%, ${hexToRgba(accent.base, 0.22)}, transparent 70%)`;

  function handlePointerMove(e: PointerEvent<HTMLButtonElement>) {
    if (reduceMotion || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    spotlightX.set(((e.clientX - rect.left) / rect.width) * 100);
    spotlightY.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  return (
    <div className="relative">
      {isSelected && !reduceMotion ? (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -inset-[1.5px] rounded-hero"
          style={{
            background: `conic-gradient(from 0deg, ${accent.base} 0%, rgba(255,255,255,0.35) 50%, ${accent.base} 100%)`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      ) : null}
      <motion.button
        type="button"
        role="radio"
        aria-checked={isSelected}
        aria-label={`${option.label} — ${option.description}`}
        onClick={() => onSelect(option.id)}
        onPointerMove={handlePointerMove}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "150px" }}
        animate={{
          scale: isSelected ? 1.03 : 1,
          backgroundColor: isSelected ? hexToRgba(accent.base, 0.12) : "rgba(0,0,0,0)",
        }}
        whileHover={
          reduceMotion
            ? undefined
            : isSelected
              ? { y: -4, scale: 1.015, backgroundColor: hexToRgba(accent.base, 0.16) }
              : { y: -8, scale: 1.02, backgroundColor: "rgba(0,0,0,0)" }
        }
        transition={{
          opacity: { duration: 0.4, delay: index * 0.05, ease: "easeOut" },
          y: { type: "spring", stiffness: 260, damping: 20 },
          scale: { type: "spring", stiffness: 260, damping: 20 },
        }}
        style={{
          ["--gp-ring" as string]: accent.base,
          ["--gp-hover-border" as string]: hexToRgba(accent.base, 0.5),
          ["--gp-hover-glow" as string]: hexToRgba(accent.base, 0.35),
          borderColor: isSelected ? "transparent" : undefined,
          backgroundImage: isSelected ? undefined : "linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
          boxShadow: isSelected
            ? `inset 0 1px 0 rgba(255,255,255,0.08), 0 0 40px ${hexToRgba(accent.base, 0.18)}`
            : "inset 0 1px 0 rgba(255,255,255,0.07)",
        }}
        className={cn(
          "group relative flex min-h-[120px] w-full items-center gap-3 overflow-hidden rounded-hero border p-[18px] text-left backdrop-blur-[36px] backdrop-saturate-[1.6] transition-[box-shadow,border-color] duration-base",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gp-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05060f]",
          !isSelected &&
            "border-white/10 opacity-90 hover:border-[color:var(--gp-hover-border)] hover:opacity-100 hover:shadow-[0_0_24px_-8px_var(--gp-hover-glow)]",
        )}
      >
        {/* cursor spotlight */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-hero opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spotlightBackground }}
        />
        {/* top reflection */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[28px] bg-gradient-to-b from-white/10 to-transparent"
        />

        {isSelected ? (
          <motion.span
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white backdrop-blur-sm"
            style={{
              backgroundImage: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
              boxShadow: `0 2px 8px -2px ${hexToRgba(accent.base, 0.6)}`,
            }}
            aria-hidden
          >
            <Check className="h-4 w-4" />
          </motion.span>
        ) : null}
        {isSelected && !reduceMotion ? (
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-hero"
            style={{ boxShadow: `0 0 0 1px ${hexToRgba(accent.base, 0.5)}` }}
            initial={{ opacity: 0.7, scale: 1 }}
            animate={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        ) : null}

        <motion.span
          animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
          transition={reduceMotion ? undefined : { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
          className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
          style={{
            backgroundColor: hexToRgba(accent.base, isSelected ? 0.18 : 0.14),
            boxShadow: isSelected ? `0 0 35px ${hexToRgba(accent.base, 0.45)}` : undefined,
          }}
        >
          <Icon className="relative h-6 w-6" style={{ color: accent.base }} aria-hidden />
        </motion.span>

        <span className="min-w-0 flex-1 pr-8">
          <span className="text-body-sm block font-semibold text-white">{option.label}</span>
          <span
            className="text-caption mt-0.5 line-clamp-2 block"
            style={{ color: isSelected ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.5)" }}
          >
            {option.description}
          </span>
          {option.badge ? (
            <span
              className="mt-1.5 inline-flex w-fit items-center rounded-full border px-2 py-0.5 text-[11px] font-medium"
              style={{
                borderColor: hexToRgba(accent.base, 0.35),
                color: accent.base,
                boxShadow: isSelected ? `0 0 12px -4px ${hexToRgba(accent.base, 0.4)}` : undefined,
              }}
            >
              {option.badge}
            </span>
          ) : null}
        </span>

        {option.timeline ? (
          <span
            className="absolute right-4 bottom-3 text-[10px]"
            style={{ color: isSelected ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.35)" }}
          >
            {option.timeline}
          </span>
        ) : null}
      </motion.button>
    </div>
  );
}

/** Step 2's desktop/tablet widget — a premium 4-column, 2-row grid of glass
 * cards, one per accent color, replacing the earlier wavy pathway track.
 * Same selection logic and step position as before. */
export function GoalPathway({ options, selectedId, onSelect }: GoalPathwayProps) {
  const t = useTranslations("advisor");
  return (
    <div
      role="radiogroup"
      aria-label={t("stepQuestions.goal.question")}
      className="grid w-full grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6"
    >
      {options.map((option, i) => (
        <GoalCard key={option.id} option={option} isSelected={option.id === selectedId} onSelect={onSelect} index={i} />
      ))}
    </div>
  );
}
