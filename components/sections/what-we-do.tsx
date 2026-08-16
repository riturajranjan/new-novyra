"use client";

import { ArrowRight, Layers } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RippleLink } from "@/components/ui/ripple-link";
import { WhatWeDoBackground } from "@/components/what-we-do/what-we-do-background";
import { whatWeDoCategories, type WhatWeDoCategory } from "@/content/what-we-do";
import { accentStroke, accentTint } from "@/lib/accent";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";

const leftCategories = whatWeDoCategories.filter((c) => c.side === "left");
const rightCategories = whatWeDoCategories.filter((c) => c.side === "right");

/** Hub-and-spoke services composition — 3 categories left / 3 right,
 * feeding into a central "Services" hub via dashed connector lines. Desktop
 * only; mobile drops the geometry entirely for a static hub + 2-col card
 * grid (see the `lg:hidden` block below). Connectors are a single static
 * SVG per side with a one-time `pathLength` draw-in (whileInView, not
 * scroll-linked) — the same lightweight technique already used for the
 * pricing comparison table's check glyphs, not a continuous animation. */
export function WhatWeDo() {
  const t = useTranslations("services");
  const reduceMotion = useReducedMotion();

  return (
    <section id="what-we-do" className="relative isolate scroll-mt-24 overflow-hidden py-14 md:py-16 lg:py-20">
      <WhatWeDoBackground />
      <Container size="wide" className="flex flex-col gap-10 md:gap-12">
        <SectionHeading eyebrow={t("home.eyebrow")} title={t("home.heading")} description={t("home.description")} />

        {/* mobile / tablet — static hub, no connectors */}
        <div className="flex flex-col items-center gap-8 lg:hidden">
          <ServicesHub compact reduceMotion={reduceMotion} label={t("hub.label")} />
          <div className="grid w-full grid-cols-2 gap-4">
            {whatWeDoCategories.map((category) => (
              <ServiceCard key={category.id} category={category} t={t} />
            ))}
          </div>
        </div>

        {/* desktop — full hub and spoke */}
        <div className="mx-auto hidden w-full max-w-[1180px] grid-cols-[minmax(240px,1fr)_64px_auto_64px_minmax(240px,1fr)] items-stretch gap-y-5 lg:grid">
          <div className="flex flex-col justify-center gap-5">
            {leftCategories.map((category) => (
              <ServiceCard key={category.id} category={category} t={t} />
            ))}
          </div>
          <Connectors side="left" reduceMotion={reduceMotion} />
          <div className="flex items-center justify-center">
            <ServicesHub reduceMotion={reduceMotion} label={t("hub.label")} />
          </div>
          <Connectors side="right" reduceMotion={reduceMotion} />
          <div className="flex flex-col justify-center gap-5">
            {rightCategories.map((category) => (
              <ServiceCard key={category.id} category={category} t={t} />
            ))}
          </div>
        </div>

        <RippleLink
          href="/services"
          className="text-body-sm border-border-subtle hover:border-brand-blue/40 mx-auto inline-flex items-center gap-1.5 rounded-pill border px-5 py-2.5 font-semibold text-foreground transition-colors duration-fast"
        >
          {t("home.viewAllCta")}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </RippleLink>
      </Container>
    </section>
  );
}

function ServiceCard({ category, t }: { category: WhatWeDoCategory; t: ReturnType<typeof useTranslations> }) {
  const Icon = category.icon;
  const stroke = accentStroke[category.accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "150px" }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.4, ease: easePremium }}
      className="group border-border-subtle bg-surface/60 relative flex items-center gap-3.5 overflow-hidden rounded-xl border p-4 backdrop-blur-md transition-shadow duration-base sm:p-4.5"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[32px] opacity-0 blur-2xl transition-opacity duration-slow group-hover:opacity-100"
        style={{ backgroundColor: accentTint(category.accent, 16) }}
      />
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: accentTint(category.accent, 16) }}
      >
        <Icon className="h-4.5 w-4.5" style={{ color: stroke }} aria-hidden />
      </span>
      <div className="flex min-w-0 flex-col gap-0.5">
        <h3 className="text-body-sm sm:text-body text-foreground font-semibold text-pretty">
          {t(`homeCategories.${category.id}.title`)}
        </h3>
        <p className="text-caption text-foreground-secondary truncate">{t(`homeCategories.${category.id}.description`)}</p>
      </div>
    </motion.div>
  );
}

function ServicesHub({ label, compact, reduceMotion }: { label: string; compact?: boolean; reduceMotion: boolean | null }) {
  return (
    <motion.div
      animate={reduceMotion ? { y: 0 } : { y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className={cn("relative flex items-center justify-center rounded-full", compact ? "h-32 w-32" : "h-44 w-44")}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-full opacity-70 blur-2xl"
        style={{ backgroundImage: "radial-gradient(circle, var(--color-brand-blue), var(--color-brand-purple) 60%, transparent 75%)" }}
      />
      <span className="border-border-subtle absolute inset-0 rounded-full border" />
      <span className="border-border-subtle absolute inset-3 rounded-full border" />
      <span
        className={cn(
          "shadow-card relative flex flex-col items-center justify-center gap-1.5 rounded-full",
          compact ? "h-22 w-22" : "h-30 w-30",
        )}
        style={{ backgroundImage: "linear-gradient(145deg, var(--color-brand-blue), var(--color-brand-purple))" }}
      >
        <Layers className={compact ? "h-5 w-5 text-white" : "h-7 w-7 text-white"} aria-hidden />
        <span className="text-[10px] font-semibold tracking-[0.18em] text-white/90 uppercase">{label}</span>
      </span>
    </motion.div>
  );
}

const CARD_Y = [16, 50, 84];

function Connectors({ side, reduceMotion }: { side: "left" | "right"; reduceMotion: boolean | null }) {
  const stroke = "var(--color-brand-blue)";
  const paths =
    side === "left"
      ? CARD_Y.map((y) => (y === 50 ? `M0,${y} L100,50` : `M0,${y} C55,${y} 55,50 100,50`))
      : CARD_Y.map((y) => (y === 50 ? `M0,50 L100,${y}` : `M0,50 C45,50 45,${y} 100,${y}`));

  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="h-full w-full"
    >
      {paths.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke={stroke}
          strokeOpacity={0.35}
          strokeWidth={0.7}
          strokeDasharray="2.5 3"
          strokeLinecap="round"
          initial={reduceMotion ? false : { pathLength: 0 }}
          whileInView={reduceMotion ? undefined : { pathLength: 1 }}
          viewport={{ once: true, margin: "150px" }}
          transition={{ duration: 0.8, delay: i * 0.12, ease: easePremium }}
        />
      ))}
      {CARD_Y.map((y) => (
        <circle key={`card-${y}`} cx={side === "left" ? 0 : 100} cy={y} r={1.4} fill={stroke} fillOpacity={0.5} />
      ))}
      <circle cx={side === "left" ? 100 : 0} cy={50} r={1.4} fill={stroke} fillOpacity={0.6} />
    </svg>
  );
}
