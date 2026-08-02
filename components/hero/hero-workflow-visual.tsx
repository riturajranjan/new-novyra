"use client";

import { Compass, PenTool, Code2, Bug, Rocket } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { accentStroke, accentTint } from "@/lib/accent";
import type { AccentColor } from "@/content/hero-screens";

const STAGES: { id: string; icon: typeof Compass; accent: AccentColor }[] = [
  { id: "scope", icon: Compass, accent: "blue" },
  { id: "design", icon: PenTool, accent: "purple" },
  { id: "build", icon: Code2, accent: "pink" },
  { id: "test", icon: Bug, accent: "amber" },
  { id: "launch", icon: Rocket, accent: "emerald" },
];

/** The hero's centerpiece — what Novyra's own delivery workflow looks like,
 * not a stock product-dashboard render. Earlier this slot held a generic
 * purchased "SaaS dashboard" image complete with invented revenue and user
 * counts ($45,231, 12.4K users, an "AI Assistant" widget) — exactly the
 * fabricated-metrics problem this rebuild removes everywhere else, so it
 * had to go here too. This is real information instead: the five stages
 * every engagement actually moves through (see content/process-steps.ts
 * for the same five, spelled out on the homepage's own process section),
 * connected by the same traveling-pulse rail technique already used there
 * — one visual language for "how Novyra works," not two competing ones. */
export function HeroWorkflowVisual() {
  const t = useTranslations("hero.workflow");
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto flex w-full max-w-105 items-center justify-center py-6 md:max-w-115 lg:mx-0 lg:ml-auto lg:max-w-125">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-brand-blue absolute top-[8%] left-[4%] h-56 w-56 rounded-full opacity-[0.2] blur-[90px]" />
        <div className="bg-brand-purple absolute top-[2%] right-[6%] h-64 w-64 rounded-full opacity-[0.2] blur-[100px]" />
        <div className="bg-brand-emerald absolute bottom-[6%] left-1/3 h-52 w-52 rounded-full opacity-[0.14] blur-[90px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="glass-strong shadow-card-hover relative w-full overflow-hidden rounded-[28px] p-6 sm:p-8"
      >
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/8 to-transparent" />

        <p className="text-caption text-foreground-secondary mb-6 font-semibold tracking-[0.14em] uppercase">{t("label")}</p>

        <div className="relative flex flex-col">
          <span
            aria-hidden
            className="absolute top-5 bottom-5 left-[19px] w-px"
            style={{ background: "linear-gradient(to bottom, var(--color-brand-blue), var(--color-brand-purple), var(--color-brand-pink), var(--color-brand-amber), var(--color-brand-emerald))" }}
          />
          {!reduceMotion ? (
            <motion.span
              aria-hidden
              className="absolute left-[15px] h-8 w-8 rounded-full blur-md"
              style={{ background: "var(--color-brand-blue)", opacity: 0.5 }}
              animate={{ top: ["4%", "96%", "4%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          ) : null}

          {STAGES.map((stage, i) => {
            const Icon = stage.icon;
            const stroke = accentStroke[stage.accent];
            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex items-center gap-4 py-3"
              >
                <span
                  className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2"
                  style={{ borderColor: stroke, backgroundColor: accentTint(stage.accent, 16) }}
                >
                  <Icon className="h-4.5 w-4.5" style={{ color: stroke }} aria-hidden />
                </span>
                <div className="flex flex-col">
                  <span className="text-body-sm text-foreground font-semibold">{t(`stages.${stage.id}.label`)}</span>
                  <span className="text-caption text-foreground-secondary">{t(`stages.${stage.id}.detail`)}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
