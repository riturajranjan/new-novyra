"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ecosystemNodes } from "@/content/about";
import { accentStroke, accentTint } from "@/lib/accent";

/** The About hero's right-side visual — an abstract "Novyra Product
 * Ecosystem": five honest capability nodes (no fake dashboard, no invented
 * metrics) orbiting a center Novyra mark, joined by thin glowing connector
 * lines that brighten when their node is hovered. Mount entrance (as one
 * unit) is driven by the hero's GSAP timeline via `[data-about-visual]` on
 * the parent; this component only owns the idle float and hover-line
 * motion, so GSAP and Framer Motion never touch the same element. */
export function AboutEcosystemVisual() {
  const t = useTranslations("about.hero.ecosystem");
  const reduceMotion = useReducedMotion();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-105 md:max-w-115 lg:max-w-125">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-brand-blue absolute top-[8%] left-[8%] h-48 w-48 rounded-full opacity-20 blur-[90px]" />
        <div className="bg-brand-purple absolute right-[6%] bottom-[8%] h-56 w-56 rounded-full opacity-20 blur-[100px]" />
      </div>

      <svg aria-hidden viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full">
        {ecosystemNodes.map((node, i) => {
          const isHovered = hoveredId === node.id;
          return (
            <motion.line
              key={node.id}
              x1={50}
              y1={50}
              x2={parseFloat(node.left)}
              y2={parseFloat(node.top)}
              stroke={accentStroke[node.accent]}
              strokeWidth={isHovered ? 0.55 : 0.35}
              strokeLinecap="round"
              initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: isHovered ? 0.8 : 0.25,
              }}
              transition={
                reduceMotion
                  ? { opacity: { duration: 0.25 } }
                  : { pathLength: { duration: 1, ease: "easeOut", delay: 0.4 + i * 0.06 }, opacity: { duration: 0.25 }, strokeWidth: { duration: 0.25 } }
              }
            />
          );
        })}
      </svg>

      {ecosystemNodes.map((node, i) => {
        const Icon = node.icon;
        return (
          <motion.div
            key={node.id}
            onMouseEnter={() => setHoveredId(node.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-2xl px-3.5 py-3 backdrop-blur-xl transition-colors duration-base"
            style={{
              top: node.top,
              left: node.left,
              background: "rgba(255,255,255,0.055)",
              border: "1px solid rgba(255,255,255,0.10)",
              backdropFilter: "blur(22px) saturate(145%)",
              WebkitBackdropFilter: "blur(22px) saturate(145%)",
              boxShadow: hoveredId === node.id ? `0 14px 34px -12px ${accentTint(node.accent, 55)}` : undefined,
            }}
            animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 6 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
          >
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{ background: accentTint(node.accent, 18) }}
            >
              <Icon className="h-4 w-4" style={{ color: accentStroke[node.accent] }} aria-hidden />
            </span>
            <span className="text-body-sm text-foreground font-medium whitespace-nowrap">
              {t(`nodes.${node.id}`)}
            </span>
          </motion.div>
        );
      })}

      <div className="glass-strong shadow-card-hover absolute top-1/2 left-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-hero px-7 py-6 text-center">
        <span className="text-[28px] leading-tight font-semibold tracking-[-0.03em] text-gradient-brand">
          {t("centerTitle")}
        </span>
        <span className="text-body-sm text-foreground-secondary">{t("centerSubtitle")}</span>
      </div>
    </div>
  );
}
