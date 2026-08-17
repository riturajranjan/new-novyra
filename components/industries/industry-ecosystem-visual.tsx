"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { industries } from "@/content/industries";
import { accentStroke, accentTint } from "@/lib/accent";

interface NodeLayout {
  top: string;
  left: string;
  size: number;
  radius: string;
}

/** Asymmetric, hand-placed positions (not a symmetric ring like the
 * Services hexagon or the About pentagon) — reads as scattered business
 * environments rather than one engineered system. Sizes vary too, so the
 * six tiles never read as identical shapes with swapped icons. */
const LAYOUT: Record<string, NodeLayout> = {
  education: { top: "10%", left: "18%", size: 84, radius: "1.1rem" },
  healthcare: { top: "6%", left: "58%", size: 72, radius: "999px" },
  "retail-ecommerce": { top: "34%", left: "84%", size: 80, radius: "0.6rem" },
  "travel-hospitality": { top: "68%", left: "78%", size: 66, radius: "999px" },
  finance: { top: "76%", left: "30%", size: 76, radius: "0.9rem" },
  "professional-services": { top: "48%", left: "4%", size: 64, radius: "1.4rem" },
};

const CENTER = { top: "56%", left: "44%" };

/** A tiny per-industry decorative glyph beneath the main icon — a ruled
 * line for Education, a pulse for Healthcare, a dot-grid for Retail, a
 * dashed route for Travel, bar ticks for Finance, linked dots for
 * Professional Services — so the six tiles differ in more than color. */
function MicroGlyph({ id, color }: { id: string; color: string }) {
  switch (id) {
    case "education":
      return (
        <svg viewBox="0 0 32 6" className="h-1 w-8" aria-hidden>
          <line x1={0} y1={1} x2={20} y2={1} stroke={color} strokeWidth={1.4} strokeLinecap="round" opacity={0.7} />
          <line x1={0} y1={5} x2={14} y2={5} stroke={color} strokeWidth={1.4} strokeLinecap="round" opacity={0.45} />
        </svg>
      );
    case "healthcare":
      return (
        <svg viewBox="0 0 32 10" className="h-2.5 w-8" aria-hidden>
          <path d="M0,5 L8,5 L11,1 L15,9 L18,5 L32,5" fill="none" stroke={color} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" opacity={0.7} />
        </svg>
      );
    case "retail-ecommerce":
      return (
        <svg viewBox="0 0 32 10" className="h-2.5 w-8" aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={i * 8} y={0} width={5} height={5} rx={1} fill={color} opacity={0.5 + i * 0.08} />
          ))}
        </svg>
      );
    case "travel-hospitality":
      return (
        <svg viewBox="0 0 32 6" className="h-1.5 w-8" aria-hidden>
          <path d="M0,3 Q16,-4 32,3" fill="none" stroke={color} strokeWidth={1.2} strokeDasharray="2 2.5" opacity={0.65} />
        </svg>
      );
    case "finance":
      return (
        <svg viewBox="0 0 32 10" className="h-2.5 w-8" aria-hidden>
          {[3, 6, 4, 8, 5].map((h, i) => (
            <rect key={i} x={i * 7} y={10 - h} width={4} height={h} rx={0.5} fill={color} opacity={0.55} />
          ))}
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 32 10" className="h-2.5 w-8" aria-hidden>
          <circle cx={3} cy={5} r={1.6} fill={color} opacity={0.7} />
          <circle cx={16} cy={2} r={1.6} fill={color} opacity={0.6} />
          <circle cx={29} cy={7} r={1.6} fill={color} opacity={0.5} />
          <path d="M3,5 L16,2 L29,7" fill="none" stroke={color} strokeWidth={0.7} opacity={0.4} />
        </svg>
      );
  }
}

function pct(v: string) {
  return parseFloat(v);
}

/** Industries hero's signature visual — a scattered "Industry Ecosystem":
 * six differently-shaped, differently-sized environment tiles connected
 * to a lower-center Novyra node by curved (not straight) routes, with a
 * moving signal per route. Hovering a tile brightens its route, dims the
 * others, and surfaces its real capability list — never a popup card. */
export function IndustryEcosystemVisual() {
  const t = useTranslations("industries");
  const reduceMotion = useReducedMotion();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const hovered = industries.find((i) => i.id === hoveredId) ?? null;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-110 md:max-w-120 lg:max-w-130">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-brand-blue absolute top-[4%] left-[10%] h-40 w-40 rounded-full opacity-[0.14] blur-[90px]" />
        <div className="bg-brand-purple absolute right-[4%] bottom-[10%] h-48 w-48 rounded-full opacity-[0.13] blur-[100px]" />
      </div>

      <svg aria-hidden viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full">
        {industries.map((industry, i) => {
          const layout = LAYOUT[industry.id];
          const isHovered = hoveredId === industry.id;
          const cx = pct(CENTER.left);
          const cy = pct(CENTER.top);
          const nx = pct(layout.left);
          const ny = pct(layout.top);
          const mx = (cx + nx) / 2 + (i % 2 === 0 ? -6 : 6);
          const my = (cy + ny) / 2 + (i % 2 === 0 ? 6 : -6);
          const d = `M${cx},${cy} Q${mx},${my} ${nx},${ny}`;
          return (
            <g key={industry.id}>
              <motion.path
                d={d}
                fill="none"
                stroke={accentStroke[industry.accent]}
                strokeWidth={isHovered ? 0.55 : 0.3}
                strokeLinecap="round"
                initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: isHovered ? 0.85 : 0.22 }}
                transition={
                  reduceMotion
                    ? { opacity: { duration: 0.25 } }
                    : { pathLength: { duration: 0.9, ease: "easeOut", delay: 0.35 + i * 0.07 }, opacity: { duration: 0.25 }, strokeWidth: { duration: 0.25 } }
                }
              />
              {!reduceMotion ? (
                <motion.circle
                  r={0.7}
                  fill={accentStroke[industry.accent]}
                  initial={{ opacity: 0 }}
                  animate={{
                    cx: [cx, mx, nx],
                    cy: [cy, my, ny],
                    opacity: [0, isHovered ? 0.9 : 0.4, 0],
                  }}
                  transition={{ duration: 5 + i * 0.6, repeat: Infinity, ease: "linear", delay: i * 0.8 }}
                />
              ) : null}
            </g>
          );
        })}
      </svg>

      {industries.map((industry, i) => {
        const Icon = industry.icon;
        const layout = LAYOUT[industry.id];
        const isHovered = hoveredId === industry.id;
        const stroke = accentStroke[industry.accent];
        return (
          <motion.button
            key={industry.id}
            type="button"
            onMouseEnter={() => setHoveredId(industry.id)}
            onMouseLeave={() => setHoveredId(null)}
            onFocus={() => setHoveredId(industry.id)}
            onBlur={() => setHoveredId(null)}
            className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 transition-colors duration-base focus-visible:outline-none"
            style={{
              top: layout.top,
              left: layout.left,
              width: layout.size,
              height: layout.size,
              borderRadius: layout.radius,
              background: isHovered ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${isHovered ? accentTint(industry.accent, 45) : "rgba(255,255,255,0.08)"}`,
              boxShadow: isHovered ? `0 12px 30px -12px ${accentTint(industry.accent, 55)}` : undefined,
            }}
            initial={reduceMotion ? undefined : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: 0.55 + i * 0.06, ease: "easeOut" }}
          >
            <Icon className="h-4 w-4" style={{ color: stroke }} aria-hidden />
            <MicroGlyph id={industry.id} color={stroke} />
          </motion.button>
        );
      })}

      <div
        className="glass-strong shadow-card-hover absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-2xl px-6 py-5 text-center"
        style={{ top: CENTER.top, left: CENTER.left }}
      >
        <span className="text-[22px] leading-tight font-semibold tracking-[-0.03em] text-gradient-brand">NOVYRA</span>
        <span className="text-[10px] leading-snug font-medium text-foreground-secondary uppercase">
          Digital systems
          <br />
          built around your world.
        </span>
      </div>

      <div className="pointer-events-none absolute inset-x-0 -bottom-2 z-30 flex justify-center">
        <motion.div
          initial={false}
          animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="glass-strong text-caption flex max-w-75 flex-col items-center gap-1 rounded-xl px-4 py-2.5 text-center"
        >
          {hovered ? (
            <>
              <span className="font-semibold text-white">{t(`items.${hovered.id}.title`)}</span>
              <span className="text-foreground-secondary">
                {(t.raw(`items.${hovered.id}.capabilities`) as string[]).slice(0, 3).join(" · ")}
              </span>
            </>
          ) : null}
        </motion.div>
      </div>
    </div>
  );
}
