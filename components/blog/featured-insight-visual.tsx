import { accentStroke, accentTint } from "@/lib/accent";
import type { AccentColor } from "@/content/hero-screens";

interface FeaturedInsightVisualProps {
  accent: AccentColor;
}

const BARS = [38, 62, 48, 80, 58, 92, 70];
const AREA_PATH = "M0,46 C14,38 22,50 34,40 C46,30 56,44 70,32 C84,20 92,34 104,24 L104,64 L0,64 Z";
const LINE_PATH = "M0,46 C14,38 22,50 34,40 C46,30 56,44 70,32 C84,20 92,34 104,24";

/** A dimensional SaaS/product-engineering composition standing in for
 * article photography that doesn't exist — floating dashboard panels, a
 * data-visualization layer, translucent glass surfaces at different
 * depths, thin technical connector lines, and blue/violet/cyan
 * illumination. Reads as "premium campaign artwork for a technology
 * publication," not a browser mockup or placeholder icon. Pure CSS/SVG. */
export function FeaturedInsightVisual({ accent }: FeaturedInsightVisualProps) {
  const stroke = accentStroke[accent];

  return (
    <div aria-hidden className="relative h-full w-full overflow-hidden" style={{ backgroundColor: "#080b18" }}>
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(150,170,220,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(150,170,220,0.9) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />

      {/* Depth 1 — distant illumination */}
      <span
        className="pointer-events-none absolute -top-16 -left-10 rounded-full blur-[80px]"
        style={{ width: 280, height: 280, backgroundColor: "color-mix(in oklab, var(--color-brand-blue) 55%, transparent)", opacity: 0.4 }}
      />
      <span
        className="pointer-events-none absolute -right-16 -bottom-10 rounded-full blur-[80px]"
        style={{ width: 260, height: 260, backgroundColor: "color-mix(in oklab, var(--color-brand-purple) 55%, transparent)", opacity: 0.32 }}
      />

      {/* Depth 2 — thin connector lines threading the panels together */}
      <svg aria-hidden viewBox="0 0 420 320" className="absolute inset-0 h-full w-full opacity-[0.45]">
        <path d="M60,140 C120,120 150,90 210,80" fill="none" stroke={stroke} strokeWidth="1" strokeDasharray="1.5 5" />
        <path d="M230,190 C270,170 300,210 350,196" fill="none" stroke="var(--color-brand-cyan)" strokeWidth="1" strokeDasharray="1.5 5" />
        <circle cx="210" cy="80" r="2.5" fill={stroke} />
        <circle cx="350" cy="196" r="2.5" fill="var(--color-brand-cyan)" />
      </svg>

      {/* Depth 3 — floating panel: data-viz bar chart, glass surface, slight tilt */}
      <div
        className="absolute top-[10%] left-[6%] h-[46%] w-[54%] rounded-xl border shadow-[0_30px_70px_-30px_rgba(0,0,0,0.75)] backdrop-blur-[2px]"
        style={{
          borderColor: accentTint(accent, 22),
          backgroundColor: "rgba(255,255,255,0.035)",
          transform: "perspective(900px) rotateX(6deg) rotateY(-4deg)",
        }}
      >
        <div className="flex items-center justify-between px-3.5 pt-3">
          <span className="h-1.5 w-10 rounded-full" style={{ backgroundColor: accentTint(accent, 40) }} />
          <span className="text-[8px] font-semibold tracking-[0.14em] text-white/25 uppercase">Live</span>
        </div>
        <div className="flex h-[calc(100%-30px)] items-end gap-[5px] px-3.5 pb-3.5 pt-2">
          {BARS.map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-t-sm"
              style={{ height: `${h}%`, backgroundColor: i === BARS.length - 1 ? stroke : accentTint(accent, i % 2 === 0 ? 26 : 16) }}
            />
          ))}
        </div>
      </div>

      {/* Depth 3 — floating panel: line/area chart, glass surface */}
      <div
        className="absolute right-[7%] bottom-[9%] h-[38%] w-[48%] overflow-hidden rounded-xl border shadow-[0_30px_70px_-30px_rgba(0,0,0,0.75)] backdrop-blur-[2px]"
        style={{
          borderColor: "color-mix(in oklab, var(--color-brand-cyan) 30%, transparent)",
          backgroundColor: "rgba(8,12,26,0.72)",
          transform: "perspective(900px) rotateX(-4deg) rotateY(5deg)",
        }}
      >
        <svg aria-hidden viewBox="0 0 104 64" preserveAspectRatio="none" className="h-full w-full">
          <defs>
            <linearGradient id="featured-area-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-brand-cyan)" stopOpacity="0.32" />
              <stop offset="100%" stopColor="var(--color-brand-cyan)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={AREA_PATH} fill="url(#featured-area-fill)" />
          <path d={LINE_PATH} fill="none" stroke="var(--color-brand-cyan)" strokeWidth="1.4" />
        </svg>
      </div>

      {/* Depth 3 — small floating code/token fragment */}
      <div
        className="absolute top-[54%] left-[2%] flex w-[30%] flex-col gap-1.5 rounded-lg border p-2.5 backdrop-blur-[2px]"
        style={{ borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(8,12,26,0.65)", transform: "rotate(-2deg)" }}
      >
        {[["var(--color-brand-purple)", 60], [stroke, 85], ["rgba(255,255,255,0.18)", 40]].map(([color, w], i) => (
          <span key={i} className="h-1 rounded-full" style={{ width: `${w}%`, backgroundColor: color as string }} />
        ))}
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: "linear-gradient(200deg, transparent 55%, rgba(4,6,14,0.55) 100%)" }}
      />
    </div>
  );
}
