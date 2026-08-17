import { Lightbulb, Quote } from "lucide-react";
import { accentStroke, accentTint } from "@/lib/accent";
import type { AccentColor } from "@/content/hero-screens";

interface ArticleCalloutProps {
  text: string;
  variant: "insight" | "note";
  label: string;
  accent: AccentColor;
}

/** The reusable premium callout — a dark translucent surface, a thin
 * accent line on the left edge, a tiny icon, and restrained gradient
 * illumination behind it. No glass blur, no border-everywhere treatment —
 * just enough weight to separate it from a normal paragraph. `insight`
 * (purple, quote icon) is the "Key Insight" component from the spec;
 * `note` (accent-tinted, lightbulb) is the lighter-weight inline callout. */
export function ArticleCallout({ text, variant, label, accent }: ArticleCalloutProps) {
  const lineColor = variant === "insight" ? accentStroke.purple : accentStroke[accent];
  const Icon = variant === "insight" ? Quote : Lightbulb;

  return (
    <div
      className="relative isolate my-2 overflow-hidden rounded-r-lg py-4 pr-5 pl-5"
      style={{ borderLeft: `2px solid ${lineColor}`, backgroundColor: "rgba(255,255,255,0.025)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-6 -top-10 -z-10 h-24 rounded-full opacity-60 blur-3xl"
        style={{ backgroundColor: variant === "insight" ? accentTint("purple", 18) : accentTint(accent, 16) }}
      />
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5" style={{ color: lineColor }} aria-hidden />
        <span className="text-[11px] font-semibold tracking-[0.14em] uppercase" style={{ color: lineColor }}>
          {label}
        </span>
      </div>
      <p className="mt-2 text-[17px] leading-[1.55] font-medium text-white/90 italic">{text}</p>
    </div>
  );
}
