"use client";

import { Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { hexToRgba, type AdvisorAccent } from "@/lib/advisor-accent";
import type { AdvisorOption } from "@/content/solution-advisor";

interface AdvisorOptionRowProps {
  option: AdvisorOption;
  accent: AdvisorAccent;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

/** Premium glass option card for the mobile journey — a 56px glowing icon
 * circle, title/description/badge stack, and an animated check on the
 * right. Shared across all three steps: Step 1 passes each option its own
 * category accent, Steps 2–3 pass the one accent carried through the rest
 * of the journey. */
export function AdvisorOptionRow({ option, accent, isSelected, onSelect }: AdvisorOptionRowProps) {
  const reduceMotion = useReducedMotion();
  const Icon = option.icon;
  const stroke = accent.base;

  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={isSelected}
      onClick={() => onSelect(option.id)}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{
        backgroundImage: isSelected
          ? `linear-gradient(145deg, ${hexToRgba(stroke, 0.18)}, ${hexToRgba(stroke, 0.04)})`
          : "linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
        borderColor: isSelected ? hexToRgba(stroke, 0.5) : undefined,
        boxShadow: isSelected
          ? `0 0 24px -8px ${hexToRgba(stroke, 0.5)}, inset 0 1px 0 rgba(255,255,255,0.1)`
          : "inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
      className={cn(
        "group relative flex min-h-[112px] w-full items-center gap-4 overflow-hidden rounded-hero border p-4 text-left backdrop-blur-[30px] transition-[box-shadow,border-color] duration-base",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-[#05060f]",
        !isSelected && "border-white/10",
      )}
    >
      {/* top reflection */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[28px] bg-gradient-to-b from-white/10 to-transparent"
      />

      <motion.span
        animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
        transition={reduceMotion ? undefined : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: hexToRgba(stroke, isSelected ? 0.3 : 0.14) }}
      >
        <span aria-hidden className="absolute -inset-2 rounded-full blur-md" style={{ backgroundColor: hexToRgba(stroke, 0.35) }} />
        <Icon className="relative h-6 w-6" style={{ color: stroke }} aria-hidden />
      </motion.span>

      <span className="min-w-0 flex-1">
        <span className="block text-[16px] leading-tight font-bold text-white">{option.label}</span>
        <span className="mt-0.5 line-clamp-2 block text-[14px] font-medium text-white/55">{option.description}</span>
        {option.badge || option.timeline ? (
          <span className="mt-2 flex flex-wrap items-center gap-2">
            {option.badge ? (
              <span
                className="rounded-full border px-2 py-1 text-[11px] font-medium backdrop-blur-sm"
                style={{ borderColor: hexToRgba(stroke, 0.35), color: stroke, backgroundColor: hexToRgba(stroke, 0.1) }}
              >
                {option.badge}
              </span>
            ) : null}
            {option.timeline ? <span className="text-caption text-white/40">• {option.timeline}</span> : null}
          </span>
        ) : null}
      </span>

      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 text-white transition-colors duration-base"
        style={{ borderColor: isSelected ? "transparent" : "rgba(255,255,255,0.2)", backgroundColor: isSelected ? stroke : "transparent" }}
        aria-hidden
      >
        {isSelected ? <Check className="h-3 w-3" /> : null}
      </span>
    </motion.button>
  );
}
