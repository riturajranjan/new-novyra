"use client";

import { Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { hexToRgba, type AdvisorAccent } from "@/lib/advisor-accent";
import type { AdvisorOption } from "@/content/solution-advisor";

interface SolutionCardProps {
  option: AdvisorOption;
  accent: AdvisorAccent;
  isSelected: boolean;
  onSelect: (id: string) => void;
  /** Which column the card renders in — selected/hover states nudge toward
   * the orb, so left cards shift right and right cards shift left. "none"
   * skips the nudge entirely, for the compact grid layouts (mobile/tablet)
   * where there's no adjacent orb to lean toward. */
  side: "left" | "right" | "none";
  onHoverChange?: (hovering: boolean) => void;
}

/** Compact horizontal service card for the AI Orb + Side Cards layout —
 * icon circle, title/description/badge, and a radio/check indicator. Stays
 * mostly dark glass even when selected: the accent shows up only as a thin
 * gradient border, a faint tint, and icon emphasis, never a solid fill. */
export function SolutionCard({ option, accent, isSelected, onSelect, side, onHoverChange }: SolutionCardProps) {
  const reduceMotion = useReducedMotion();
  const Icon = option.icon;
  const toward = side === "left" ? 4 : side === "right" ? -4 : 0;
  const hoverToward = side === "left" ? 2 : side === "right" ? -2 : 0;

  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={isSelected}
      aria-label={`${option.label} — ${option.description}`}
      onClick={() => onSelect(option.id)}
      onHoverStart={() => onHoverChange?.(true)}
      onHoverEnd={() => onHoverChange?.(false)}
      animate={{ x: isSelected ? toward : 0, scale: isSelected ? 1.015 : 1 }}
      whileHover={reduceMotion ? undefined : { y: -3, x: isSelected ? toward : hoverToward }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      style={{
        backgroundImage: isSelected
          ? `linear-gradient(145deg, ${hexToRgba(accent.base, 0.12)}, ${hexToRgba(accent.base, 0.03)})`
          : "linear-gradient(145deg, rgba(255,255,255,0.075), rgba(255,255,255,0.022))",
        borderColor: isSelected ? hexToRgba(accent.base, 0.55) : "rgba(255,255,255,0.08)",
        boxShadow: isSelected
          ? `0 16px 45px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 28px -8px ${hexToRgba(accent.base, 0.5)}`
          : "0 16px 45px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
      className={cn(
        "group relative flex min-h-24 w-full items-center gap-3 overflow-hidden rounded-[21px] border p-4 text-left backdrop-blur-[22px] backdrop-saturate-[1.45] transition-[box-shadow,border-color] duration-base",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05060f]",
        isSelected ? "opacity-100" : "opacity-[0.85] hover:opacity-100",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[21px] bg-gradient-to-b from-white/10 to-transparent"
      />

      <span
        className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-[background-color,box-shadow] duration-base group-hover:scale-105"
        style={{
          backgroundColor: hexToRgba(accent.base, isSelected ? 0.22 : 0.12),
          boxShadow: isSelected ? `0 0 22px ${hexToRgba(accent.base, 0.4)}` : undefined,
        }}
      >
        <Icon className="h-4.5 w-4.5" style={{ color: isSelected ? accent.base : hexToRgba(accent.base, 0.85) }} aria-hidden />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[15px] leading-tight font-semibold text-white">{option.label}</span>
        <span className="text-caption mt-0.5 line-clamp-2 block text-white/50">{option.description}</span>
        {option.badge ? (
          <span
            className="mt-1.5 inline-block rounded-full border px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase"
            style={{
              borderColor: hexToRgba(accent.base, 0.35),
              color: isSelected ? accent.base : "rgba(255,255,255,0.5)",
            }}
          >
            {option.badge}
          </span>
        ) : null}
      </span>

      <span
        className="relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 text-white transition-colors duration-base"
        style={{
          borderColor: isSelected ? "transparent" : "rgba(255,255,255,0.2)",
          backgroundColor: isSelected ? accent.base : "transparent",
        }}
        aria-hidden
      >
        {isSelected ? (
          <motion.span initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.25 }}>
            <Check className="h-3 w-3" />
          </motion.span>
        ) : null}
      </span>
    </motion.button>
  );
}
