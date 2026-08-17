import { TechnicalGrid } from "@/components/visual-backgrounds/technical-grid";
import { AmbientGlow } from "@/components/visual-backgrounds/ambient-glow";
import { BackgroundLabel } from "@/components/visual-backgrounds/background-label";
import { accentStroke } from "@/lib/accent";
import type { AccentColor } from "@/content/hero-screens";

const TICKS = [
  { top: "14%", left: "4%" },
  { top: "14%", left: "96%" },
  { top: "86%", left: "4%" },
  { top: "86%", left: "96%" },
];

/** Section 02's backdrop — "Digital Blueprint": a deep navy engineering
 * canvas with coordinate lines, corner measurement ticks, faint sector
 * labels and a giant cropped "INDUSTRIES" ghost word — visibly distinct
 * from the Hero's scattered network and the CTA's flattened constellation.
 * The one bit of life: the radial glow behind the active panel recolors
 * to the selected industry's own accent as it changes. */
export function IndustriesExplorerBackground({ accent }: { accent: AccentColor }) {
  const stroke = accentStroke[accent];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" style={{ backgroundColor: "#05060c" }}>
      <span
        className="absolute top-1/2 right-[-2%] leading-none font-bold whitespace-nowrap text-white select-none"
        style={{ fontSize: "clamp(140px, 15vw, 260px)", letterSpacing: "-0.05em", opacity: 0.03, transform: "translateY(-50%)" }}
      >
        INDUSTRIES
      </span>

      <TechnicalGrid opacity={0.045} size={48} mask="linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)" />

      <div
        className="absolute inset-0 opacity-70 transition-[background] duration-700 ease-out"
        style={{ backgroundImage: `radial-gradient(38% 46% at 68% 42%, color-mix(in oklab, ${stroke} 14%, transparent), transparent 70%)` }}
      />
      <AmbientGlow top="-16%" left="-6%" width="40%" height="42%" color="var(--color-brand-blue)" opacity={0.05} blur="170px" />

      {TICKS.map((t, i) => (
        <span key={i} aria-hidden className="absolute h-2 w-2 border-white/12" style={{ top: t.top, left: t.left, borderWidth: "0 0 1px 1px" }} />
      ))}
      <BackgroundLabel text="GRID 01–06" top="8%" left="5%" opacity={0.09} />
      <BackgroundLabel text="SCALE 1:1" top="92%" left="88%" opacity={0.07} />
    </div>
  );
}
