import { Check } from "lucide-react";

/** Squircle gradient checkmark chip used for every feature-list item across
 * the pricing cards — a rounded-square with a soft accent-to-transparent
 * fill and a colored check glyph, not a flat filled circle: the shape and
 * the two-tone gradient are a deliberate small brand signature rather than
 * a generic "confirmed" bullet. */
export function FeatureCheck({ color }: { color: string }) {
  return (
    <span
      aria-hidden
      className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-[6px]"
      style={{ backgroundImage: `linear-gradient(150deg, ${color}, color-mix(in oklab, ${color} 60%, transparent))` }}
    >
      <Check className="h-2.5 w-2.5 text-white" strokeWidth={3.25} aria-hidden />
    </span>
  );
}
