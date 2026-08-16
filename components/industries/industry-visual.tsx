"use client";

import { motion } from "framer-motion";
import { accentStroke, accentTint } from "@/lib/accent";
import type { AccentColor, ScreenLayout } from "@/content/hero-screens";

interface IndustryVisualProps {
  layout: ScreenLayout;
  accent: AccentColor;
  label: string;
}

const dashboardStats = [62, 84, 46];
const chartBars = [35, 55, 42, 70, 58, 85];
const gridTiles = [70, 45, 85, 55, 30, 65];
const kanbanColumns = [2, 3, 2];

/** An abstract, honestly-illustrative skeleton panel — not a screenshot of
 * a real product, since none exists per industry. Five compositions keyed
 * by the same ScreenLayout vocabulary used for the hero's browser-mockup
 * cycle (content/hero-screens.ts), so every "illustrative UI" preview on
 * the site draws from one shared shape language instead of inventing a new
 * one per section. Purely CSS/SVG shapes — no images to load. */
export function IndustryVisual({ layout, accent, label }: IndustryVisualProps) {
  const stroke = accentStroke[accent];

  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border p-4"
      style={{
        borderColor: accentTint(accent, 35),
        backgroundImage: `linear-gradient(160deg, ${accentTint(accent, 10)}, transparent 70%)`,
        boxShadow: `0 0 0 1px ${accentTint(accent, 12)} inset, 0 24px 60px -24px ${accentTint(accent, 35)}`,
      }}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[10px] font-semibold tracking-[0.14em] text-foreground-secondary/70 uppercase">{label}</span>
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: stroke, opacity: 0.6 }} />
      </div>

      <div className="min-h-0 flex-1">
        {layout === "dashboard" ? (
          <div className="flex h-full gap-3">
            <div className="flex w-8 shrink-0 flex-col gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-2">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="h-2 w-2 rounded-full" style={{ backgroundColor: accentTint(accent, i === 0 ? 60 : 18) }} />
              ))}
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <div className="grid grid-cols-3 gap-2">
                {dashboardStats.map((h, i) => (
                  <div key={i} className="rounded-lg border border-white/5 p-2" style={{ backgroundColor: accentTint(accent, 8) }}>
                    <span className="block h-1.5 w-6 rounded-full" style={{ backgroundColor: accentTint(accent, 40) }} />
                    <span className="mt-2 block h-2 w-8 rounded-full bg-white/10" />
                  </div>
                ))}
              </div>
              <div className="flex flex-1 items-end gap-1 rounded-lg border border-white/5 p-2" style={{ backgroundColor: accentTint(accent, 6) }}>
                {chartBars.slice(0, 5).map((h, i) => (
                  <span key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, backgroundColor: accentTint(accent, i % 2 ? 50 : 25) }} />
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {layout === "chart" ? (
          <div className="flex h-full flex-col gap-3">
            <div className="flex items-center justify-between rounded-lg border border-white/5 p-2.5" style={{ backgroundColor: accentTint(accent, 8) }}>
              <span className="block h-2 w-14 rounded-full bg-white/10" />
              <span className="text-body-sm font-semibold" style={{ color: stroke }}>
                +
              </span>
            </div>
            <div className="flex flex-1 items-end gap-1.5 rounded-lg border border-white/5 p-3" style={{ backgroundColor: accentTint(accent, 6) }}>
              {chartBars.map((h, i) => (
                <span key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, backgroundColor: accentTint(accent, i % 2 ? 55 : 26) }} />
              ))}
            </div>
            <div className="flex gap-2">
              <span className="h-1.5 w-10 rounded-full" style={{ backgroundColor: accentTint(accent, 45) }} />
              <span className="h-1.5 w-10 rounded-full bg-white/10" />
            </div>
          </div>
        ) : null}

        {layout === "grid" ? (
          <div className="grid h-full grid-cols-3 gap-2">
            {gridTiles.map((v, i) => (
              <span key={i} className="rounded-lg border border-white/5" style={{ backgroundColor: accentTint(accent, v / 3) }} />
            ))}
          </div>
        ) : null}

        {layout === "kanban" ? (
          <div className="flex h-full gap-2">
            {kanbanColumns.map((count, col) => (
              <div key={col} className="flex flex-1 flex-col gap-2 rounded-lg border border-white/5 p-2" style={{ backgroundColor: accentTint(accent, 5) }}>
                <span className="block h-1.5 w-6 rounded-full bg-white/10" />
                {Array.from({ length: count }).map((_, i) => (
                  <span key={i} className="block h-6 rounded-md border border-white/5" style={{ backgroundColor: accentTint(accent, 12 + i * 8) }} />
                ))}
              </div>
            ))}
          </div>
        ) : null}

        {layout === "content" || layout === "chat" ? (
          <div className="flex h-full flex-col justify-center gap-3">
            <span
              className="w-fit rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide"
              style={{ color: stroke, backgroundColor: accentTint(accent, 16) }}
            >
              {label}
            </span>
            <span className="block h-3 w-3/4 rounded-full bg-white/12" />
            <span className="block h-3 w-1/2 rounded-full bg-white/8" />
            <div className="mt-1 flex gap-2">
              <span className="h-6 w-20 rounded-full" style={{ backgroundColor: stroke }} />
              <span className="h-6 w-16 rounded-full border border-white/10" />
            </div>
          </div>
        ) : null}
      </div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-10 -bottom-10 -z-10 h-40 w-40 rounded-full blur-3xl"
        style={{ backgroundColor: accentTint(accent, 40) }}
      />
    </div>
  );
}
