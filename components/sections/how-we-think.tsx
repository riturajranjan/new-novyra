"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { TechnicalGrid } from "@/components/visual-backgrounds/technical-grid";
import { accentStroke } from "@/lib/accent";
import { cn } from "@/lib/utils";
import type { AccentColor } from "@/content/hero-screens";

const scenarios: { id: string; accent: AccentColor }[] = [
  { id: "school", accent: "blue" },
  { id: "hospital", accent: "cyan" },
  { id: "retail", accent: "emerald" },
];

const stepKeys = ["context", "workflow", "friction", "system", "outcome"] as const;

/** Section 03 — "How We Think": one connected transformation line
 * (Industry → Workflow → Friction → Digital System → Better Experience)
 * that swaps its real-world example (School / Hospital / Retail) via
 * tabs. Steps 01–03 stay muted (the fragmented state), step 04 picks up
 * the active accent (the system), step 05 goes bright white (the
 * outcome) — the line itself fills in step by step rather than five
 * disconnected arrows, so the section reads as one diagram, not a list. */
export function HowWeThink() {
  const t = useTranslations("industries.howWeThink");
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(scenarios[0].id);
  const active = scenarios.find((s) => s.id === activeId) ?? scenarios[0];
  const stroke = accentStroke[active.accent];

  return (
    <section className="relative isolate overflow-hidden py-16 md:py-20 lg:py-24" style={{ backgroundColor: "#070810" }}>
      <TechnicalGrid opacity={0.035} size={52} mask="radial-gradient(80% 70% at 50% 50%, black, transparent)" />
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 leading-none font-bold whitespace-nowrap text-white select-none"
        style={{ fontSize: "clamp(140px, 15vw, 260px)", letterSpacing: "-0.05em", opacity: 0.028, transform: "translate(-50%, -50%)" }}
      >
        WORKFLOW
      </span>

      <Container className="relative flex flex-col gap-10 md:gap-14">
        <div className="flex flex-col gap-4">
          <span className="text-caption inline-flex w-fit items-center gap-2 font-mono font-medium tracking-[0.2em] text-white/40 uppercase">
            <span className="h-px w-6 bg-white/25" aria-hidden />
            {t("eyebrow")}
          </span>
          <h2
            className="max-w-xl font-bold text-balance text-white"
            style={{ fontSize: "clamp(32px, 3.4vw, 50px)", lineHeight: 1.04, letterSpacing: "-0.025em" }}
          >
            {t("headingLine1")}
            <br />
            {t("headingLine2")}
            <br />
            {t("headingLine3")}
            <br />
            {t("headingLine4")}
          </h2>
        </div>

        <div className="flex items-center gap-1">
          {scenarios.map((s) => {
            const isActive = s.id === activeId;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveId(s.id)}
                className={cn(
                  "text-body-sm rounded-pill px-4 py-2 font-medium transition-colors duration-base",
                  isActive ? "text-white" : "text-white/40 hover:text-white/70",
                )}
                style={{ backgroundColor: isActive ? "rgba(255,255,255,0.06)" : "transparent" }}
              >
                {t(`scenarios.${s.id}.label`)}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="relative flex flex-col gap-0 lg:flex-row lg:items-start lg:gap-0"
          >
            {/* One connecting line spanning the whole chain — desktop:
                a horizontal rule behind the steps that fills left→right;
                mobile: a vertical guide. Replaces five separate arrows
                with a single diagram. */}
            <div aria-hidden className="absolute top-4.5 right-6 left-6 hidden h-px bg-white/8 lg:block" />
            <motion.div
              aria-hidden
              className="absolute top-4.5 right-6 left-6 hidden h-px origin-left lg:block"
              style={{ backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.15), ${stroke})` }}
              initial={reduceMotion ? undefined : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: "easeOut", delay: 0.15 }}
            />
            <span aria-hidden className="absolute top-6 bottom-6 left-4.5 block w-px bg-white/8 lg:hidden" />

            {stepKeys.map((key, i) => {
              const isSystem = i === 3;
              const isOutcome = i === 4;
              return (
                <div key={key} className="relative flex flex-1 items-start gap-3 py-3 lg:flex-col lg:items-center lg:gap-2 lg:py-0 lg:text-center">
                  <span
                    className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold tabular-nums"
                    style={{
                      backgroundColor: isOutcome ? stroke : isSystem ? "rgba(255,255,255,0.08)" : "#0a0d18",
                      border: `1.5px solid ${isOutcome || isSystem ? stroke : "rgba(255,255,255,0.14)"}`,
                      color: isOutcome ? "#050816" : isSystem ? stroke : "rgba(255,255,255,0.4)",
                      boxShadow: isOutcome ? `0 0 18px -4px ${stroke}` : undefined,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="text-body-sm pt-1.5 font-semibold text-balance lg:pt-0"
                    style={{ color: isOutcome ? "white" : isSystem ? stroke : "rgba(255,255,255,0.45)" }}
                  >
                    {t(`scenarios.${activeId}.steps.${key}`)}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
