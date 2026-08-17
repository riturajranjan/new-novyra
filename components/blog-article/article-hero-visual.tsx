import { accentStroke, accentTint } from "@/lib/accent";
import type { AccentColor } from "@/content/hero-screens";

interface ArticleHeroVisualProps {
  accent: AccentColor;
}

const BARS = [34, 58, 42, 74, 52, 88, 64, 46];

/** A dark, dimensional "SaaS console" composition standing in for article
 * photography that doesn't exist — floating dashboard panels at
 * different depths, a thin connector, and blue/violet illumination. Same
 * abstract, honestly-illustrative approach as FeaturedInsightVisual, sized
 * up for the hero and given a slow CSS float (no Framer Motion, so this
 * stays a server component). */
export function ArticleHeroVisual({ accent }: ArticleHeroVisualProps) {
  const stroke = accentStroke[accent];

  return (
    <div aria-hidden className="relative aspect-[6/5] w-full overflow-hidden rounded-[24px] border border-white/8" style={{ backgroundColor: "#070a16" }}>
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(150,170,220,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(150,170,220,0.9) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <span
        className="pointer-events-none absolute -top-20 -left-10 rounded-full blur-[100px]"
        style={{ width: 320, height: 320, backgroundColor: "color-mix(in oklab, var(--color-brand-blue) 55%, transparent)", opacity: 0.35 }}
      />
      <span
        className="pointer-events-none absolute -right-16 -bottom-16 rounded-full blur-[100px]"
        style={{ width: 300, height: 300, backgroundColor: "color-mix(in oklab, var(--color-brand-purple) 55%, transparent)", opacity: 0.3 }}
      />

      <svg aria-hidden viewBox="0 0 480 400" className="absolute inset-0 h-full w-full opacity-40">
        <path d="M90,180 C150,150 190,120 260,104" fill="none" stroke={stroke} strokeWidth="1" strokeDasharray="1.5 5" />
        <circle cx="260" cy="104" r="3" fill={stroke} />
      </svg>

      {/* Depth 1 — main console panel: bar chart + top chrome */}
      <div
        className="article-panel-float absolute top-[8%] left-[8%] h-[48%] w-[62%] rounded-xl border shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur-[2px]"
        style={{ borderColor: accentTint(accent, 24), backgroundColor: "rgba(255,255,255,0.035)", transform: "perspective(1000px) rotateX(6deg) rotateY(-6deg)" }}
      >
        <div className="flex items-center justify-between px-4 pt-3.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
          </div>
          <span className="text-[9px] font-semibold tracking-[0.14em] text-white/25 uppercase">Console</span>
        </div>
        <div className="flex h-[calc(100%-34px)] items-end gap-[6px] px-4 pt-3 pb-4">
          {BARS.map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-t-sm"
              style={{ height: `${h}%`, backgroundColor: i === BARS.length - 2 ? stroke : accentTint(accent, i % 2 === 0 ? 24 : 14) }}
            />
          ))}
        </div>
      </div>

      {/* Depth 2 — secondary panel, service topology fragment */}
      <div
        className="article-panel-float-slow absolute right-[6%] bottom-[10%] h-[36%] w-[46%] overflow-hidden rounded-xl border shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur-[2px]"
        style={{ borderColor: "color-mix(in oklab, var(--color-brand-cyan) 28%, transparent)", backgroundColor: "rgba(7,10,22,0.75)", transform: "perspective(1000px) rotateX(-5deg) rotateY(6deg)" }}
      >
        <svg aria-hidden viewBox="0 0 200 140" className="h-full w-full">
          <circle cx="40" cy="70" r="4" fill="var(--color-brand-cyan)" />
          <circle cx="100" cy="40" r="4" fill={stroke} />
          <circle cx="160" cy="90" r="4" fill="var(--color-brand-cyan)" />
          <path d="M40,70 L100,40 L160,90" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
        </svg>
      </div>

      {/* Depth 2 — small floating token fragment */}
      <div
        className="absolute top-[58%] left-[4%] flex w-[26%] flex-col gap-1.5 rounded-lg border p-2.5 backdrop-blur-[2px]"
        style={{ borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(7,10,22,0.7)", transform: "rotate(-3deg)" }}
      >
        {[["var(--color-brand-purple)", 62], [stroke, 88], ["rgba(255,255,255,0.18)", 42]].map(([color, w], i) => (
          <span key={i} className="h-1 rounded-full" style={{ width: `${w}%`, backgroundColor: color as string }} />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "linear-gradient(200deg, transparent 55%, rgba(4,6,14,0.5) 100%)" }} />
    </div>
  );
}
