import { AmbientGlow } from "@/components/visual-backgrounds/ambient-glow";
import { TechnicalGrid } from "@/components/visual-backgrounds/technical-grid";
import { BackgroundLabel } from "@/components/visual-backgrounds/background-label";

const CONTOURS = [
  "M-40,120 C120,80 260,160 420,110 C560,68 680,140 800,95",
  "M-40,200 C140,240 300,170 460,220 C600,258 700,190 820,235",
  "M-40,280 C160,310 320,250 480,300 C620,340 720,280 840,320",
];

/** Industries hero's signature motif — "sector topology": curved,
 * geographic-style contour lines (not a receding perspective floor, which
 * is already this page's homepage-teaser signature) layered under a faint
 * technical grid, tiny sector coordinate labels, and cool blue/violet
 * atmospheric lighting. Deliberately calmer than Services' rigid hexagon
 * network — this page is about varied business environments, not a
 * single engineered system. */
export function IndustriesHeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" style={{ backgroundColor: "#05070f" }}>
      <span
        className="absolute top-1/2 right-[-3%] leading-none font-bold whitespace-nowrap text-white select-none"
        style={{
          fontSize: "clamp(150px, 17vw, 280px)",
          letterSpacing: "-0.05em",
          opacity: 0.03,
          transform: "translateY(-50%)",
        }}
      >
        INDUSTRIES
      </span>

      <TechnicalGrid opacity={0.035} size={60} mask="radial-gradient(70% 60% at 32% 45%, black, transparent)" />

      <svg aria-hidden viewBox="0 0 800 400" preserveAspectRatio="none" className="absolute inset-0 h-full w-full opacity-[0.14]">
        {CONTOURS.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="rgba(120,160,255,0.7)" strokeWidth={0.6} />
        ))}
      </svg>

      <AmbientGlow top="-12%" left="-6%" width="46%" height="56%" color="var(--color-brand-blue)" opacity={0.12} blur="150px" className="animate-drift" />
      <AmbientGlow bottom="-16%" right="-8%" width="46%" height="52%" color="var(--color-brand-purple)" opacity={0.1} blur="150px" className="animate-drift-slow" />

      <BackgroundLabel text="SECTOR 01–06" top="8%" left="6%" opacity={0.1} />
      <BackgroundLabel text="26.14°N 85.39°E" top="90%" left="72%" opacity={0.08} />

      {/* Soft edge vignette — a touch more cinematic depth without
          altering the approved composition underneath it. */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: "radial-gradient(120% 100% at 50% 40%, transparent 55%, rgba(0,0,0,0.35) 100%)" }}
      />
    </div>
  );
}
