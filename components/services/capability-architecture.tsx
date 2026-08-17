"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { serviceCategories } from "@/content/service-categories";
import { accentStroke, accentTint } from "@/lib/accent";

const RADIUS = 38;

function nodePosition(index: number) {
  const angle = (-90 + index * 60) * (Math.PI / 180);
  return {
    x: 50 + RADIUS * Math.cos(angle),
    y: 50 + RADIUS * Math.sin(angle),
  };
}

const HEX_PATH = Array.from({ length: 6 }, (_, i) => nodePosition(i))
  .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
  .join(" ") + " Z";

/** The Services hero's signature visual — a "Capability Architecture": six
 * real service lines arranged as a technical hexagonal network around a
 * center Novyra mark, connected both to the center (spokes) and to each
 * other (a faint perimeter circuit), rather than About's softer orbiting
 * pentagon. Deliberately rigid/structured rather than organic: no idle
 * per-node float, only one very slow ring rotation as ambient motion.
 * Hovering a node brightens its spoke and reveals a small honest
 * capability readout (real technologies, not invented metrics). */
export function CapabilityArchitecture() {
  const t = useTranslations("services");
  const reduceMotion = useReducedMotion();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const hovered = serviceCategories.find((c) => c.id === hoveredId) ?? null;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-105 md:max-w-115 lg:max-w-125">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-brand-blue absolute top-[6%] left-[4%] h-44 w-44 rounded-full opacity-[0.16] blur-[90px]" />
        <div className="bg-brand-pink absolute right-[2%] bottom-[6%] h-52 w-52 rounded-full opacity-[0.14] blur-[100px]" />
      </div>

      {/* Very slow outer ring — the visual's only continuous ambient
          motion, standing in for the About visual's per-node idle bob. */}
      <motion.svg
        aria-hidden
        viewBox="0 0 100 100"
        className="pointer-events-none absolute inset-0 h-full w-full"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      >
        <circle cx={50} cy={50} r={RADIUS + 6} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={0.3} strokeDasharray="0.5 3" />
      </motion.svg>

      <svg aria-hidden viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full">
        {/* Perimeter circuit — a faint hexagon joining every node, giving
            the composition an "architecture diagram" read rather than pure
            spokes-from-center. */}
        <motion.path
          d={HEX_PATH}
          fill="none"
          stroke="rgba(120,150,255,0.16)"
          strokeWidth={0.3}
          initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.5 }}
        />

        {serviceCategories.map((cat, i) => {
          const p = nodePosition(i);
          const isHovered = hoveredId === cat.id;
          return (
            <motion.line
              key={cat.id}
              x1={50}
              y1={50}
              x2={p.x}
              y2={p.y}
              stroke={accentStroke[cat.accent]}
              strokeWidth={isHovered ? 0.6 : 0.35}
              strokeLinecap="round"
              initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: isHovered ? 0.85 : 0.28 }}
              transition={
                reduceMotion
                  ? { opacity: { duration: 0.25 } }
                  : { pathLength: { duration: 0.9, ease: "easeOut", delay: 0.3 + i * 0.06 }, opacity: { duration: 0.25 }, strokeWidth: { duration: 0.25 } }
              }
            />
          );
        })}
      </svg>

      {serviceCategories.map((cat, i) => {
        const p = nodePosition(i);
        const isHovered = hoveredId === cat.id;
        return (
          <motion.button
            key={cat.id}
            type="button"
            onMouseEnter={() => setHoveredId(cat.id)}
            onMouseLeave={() => setHoveredId(null)}
            onFocus={() => setHoveredId(cat.id)}
            onBlur={() => setHoveredId(null)}
            className="absolute z-10 flex w-19 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-lg px-2 py-2 text-center transition-colors duration-base focus-visible:outline-none"
            style={{
              top: `${p.y}%`,
              left: `${p.x}%`,
              background: isHovered ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${isHovered ? accentTint(cat.accent, 45) : "rgba(255,255,255,0.08)"}`,
              boxShadow: isHovered ? `0 10px 28px -12px ${accentTint(cat.accent, 55)}` : undefined,
            }}
            initial={reduceMotion ? undefined : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: 0.55 + i * 0.05, ease: "easeOut" }}
          >
            <span className="text-[10px] font-mono font-semibold tabular-nums" style={{ color: accentStroke[cat.accent] }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-[11px] leading-tight font-medium text-white/85">
              {t(`categories.${cat.id}.label`)}
            </span>
          </motion.button>
        );
      })}

      <div className="glass-strong shadow-card-hover absolute top-1/2 left-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-2xl px-6 py-5 text-center">
        <span className="text-[24px] leading-tight font-semibold tracking-[-0.03em] text-gradient-brand">NOVYRA</span>
        <span className="text-[10px] font-medium tracking-[0.16em] text-foreground-secondary uppercase">
          Design · Build · Grow
        </span>
      </div>

      {/* Honest capability readout — real technology names, no invented
          metrics — replacing About's plain hover-line-brighten with a
          small piece of actual content, since Services' story is "what we
          build" rather than "who we are." */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-2 z-30 flex justify-center">
        <motion.div
          initial={false}
          animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="glass-strong text-caption flex max-w-70 flex-col items-center gap-1 rounded-xl px-4 py-2.5 text-center"
        >
          {hovered ? (
            <>
              <span className="font-semibold text-white">{t(`categories.${hovered.id}.label`)}</span>
              <span className="text-foreground-secondary">{hovered.technologies.slice(0, 3).join(" · ")}</span>
            </>
          ) : null}
        </motion.div>
      </div>
    </div>
  );
}
