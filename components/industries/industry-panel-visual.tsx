import Image from "next/image";
import { accentTint } from "@/lib/accent";
import type { Industry } from "@/content/industries";

interface IndustryPanelVisualProps {
  industry: Industry;
  priority?: boolean;
}

/** Fills the panel behind the dark overlay. Renders a real photo via
 * `next/image` once `industry.image` is set — until then (see the comment
 * on `Industry.image` in content/industries.ts for why none is set yet) it
 * renders a generated gradient/texture placeholder instead, so the layout,
 * overlay and text-readability treatment can be built and reviewed now and
 * swapped for a real asset later without touching any other component. */
export function IndustryPanelVisual({ industry, priority }: IndustryPanelVisualProps) {
  if (industry.image) {
    return (
      <Image
        src={industry.image}
        alt=""
        fill
        priority={priority}
        sizes="(min-width: 1100px) 60vw, 100vw"
        className="object-cover"
      />
    );
  }

  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(155deg, ${accentTint(industry.accent, 32)} 0%, #0a0e1c 55%, #050814 100%)`,
      }}
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: `radial-gradient(45% 55% at 80% 20%, ${accentTint(industry.accent, 30)}, transparent 70%), radial-gradient(35% 45% at 15% 85%, ${accentTint(industry.accent, 18)}, transparent 70%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="bg-noise absolute inset-0 opacity-[0.06] mix-blend-overlay" />
    </div>
  );
}
