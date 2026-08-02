import type { AccentColor } from "@/content/hero-screens";

/** Literal class lookups — Tailwind's scanner needs full class strings, not
 * interpolated ones (`bg-brand-${accent}` would never be generated). */
export const accentBg: Record<AccentColor, string> = {
  blue: "bg-brand-blue",
  purple: "bg-brand-purple",
  cyan: "bg-brand-cyan",
  pink: "bg-brand-pink",
  emerald: "bg-brand-emerald",
  amber: "bg-brand-amber",
};

export const accentText: Record<AccentColor, string> = {
  blue: "text-brand-blue",
  purple: "text-brand-purple",
  cyan: "text-brand-cyan",
  pink: "text-brand-pink",
  emerald: "text-brand-emerald",
  amber: "text-brand-amber",
};

export const accentStroke: Record<AccentColor, string> = {
  blue: "var(--color-brand-blue)",
  purple: "var(--color-brand-purple)",
  cyan: "var(--color-brand-cyan)",
  pink: "var(--color-brand-pink)",
  emerald: "var(--color-brand-emerald)",
  amber: "var(--color-brand-amber)",
};

/** Inline color-mix tint for skeleton shapes — dynamic per-accent value, so a
 * Tailwind class (which needs a static string) won't work here. */
export function accentTint(accent: AccentColor, percent: number) {
  return `color-mix(in oklab, ${accentStroke[accent]} ${percent}%, transparent)`;
}

/** Soft colored ambient glow shadow for hover states — dynamic per-accent,
 * meant to be animated via Framer Motion's `whileHover` (not a static class). */
export function accentGlow(accent: AccentColor) {
  return `0 0 40px -8px ${accentTint(accent, 55)}`;
}
