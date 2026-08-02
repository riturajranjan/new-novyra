"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { AboutBackground } from "@/components/about/about-background";
import { missionPanel, visionPanel } from "@/content/about";
import type { AccentColor } from "@/content/hero-screens";
import { accentStroke, accentTint } from "@/lib/accent";
import { fadeInUp } from "@/lib/motion";

interface PanelProps {
  icon: LucideIcon;
  accent: AccentColor;
  label: string;
  headline: string;
  paragraph: string;
  chips: string[];
}

function Panel({ icon: Icon, accent, label, headline, paragraph, chips }: PanelProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "120px" }}
      variants={fadeInUp}
      className="glass-strong shadow-card flex flex-1 flex-col gap-5 rounded-hero p-7 sm:p-9"
    >
      <span
        className="flex h-14 w-14 items-center justify-center rounded-2xl"
        style={{ background: accentTint(accent, 18) }}
      >
        <Icon className="h-7 w-7" style={{ color: accentStroke[accent] }} aria-hidden />
      </span>
      <div>
        <span
          className="text-caption font-semibold tracking-[0.14em] uppercase"
          style={{ color: accentStroke[accent] }}
        >
          {label}
        </span>
        <h2 className="text-title-lg sm:text-headline mt-2 font-semibold tracking-[-0.02em] text-foreground">
          {headline}
        </h2>
      </div>
      <p className="text-body text-foreground-secondary max-w-[500px] text-pretty leading-[1.65]">{paragraph}</p>
      <div className="mt-auto flex flex-wrap gap-2 pt-2">
        {chips.map((chip) => (
          <span
            key={chip}
            className="text-caption rounded-pill px-3 py-1.5 font-medium"
            style={{
              background: accentTint(accent, 12),
              color: accentStroke[accent],
              border: `1px solid ${accentTint(accent, 30)}`,
            }}
          >
            {chip}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/** Mission & Vision — a distinct dual-panel layout (not two generic equal
 * cards): a thin animated light beam travels the vertical seam between them
 * on desktop, visually joining "why we build" to "where we're headed".
 * Kept in the "strong" visual tier, between the calm intro and the calm
 * process strip. */
export function MissionVision() {
  const t = useTranslations("about.missionVision");
  const missionChips = t.raw("mission.chips") as string[];
  const visionChips = t.raw("vision.chips") as string[];

  return (
    <section id="mission" className="relative isolate scroll-mt-24 py-14 md:py-20">
      <AboutBackground variant="strong" />

      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-0">
          <Panel
            icon={missionPanel.icon}
            accent={missionPanel.accent}
            label={t("mission.label")}
            headline={t("mission.headline")}
            paragraph={t("mission.paragraph")}
            chips={missionChips}
          />

          <div aria-hidden className="relative mx-6 hidden w-px shrink-0 lg:block">
            <div className="via-foreground-secondary/25 absolute inset-0 bg-gradient-to-b from-transparent to-transparent" />
            <motion.div
              className="via-brand-blue absolute inset-x-0 h-28 bg-gradient-to-b from-transparent to-transparent"
              animate={{ top: ["-15%", "115%"] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <Panel
            icon={visionPanel.icon}
            accent={visionPanel.accent}
            label={t("vision.label")}
            headline={t("vision.headline")}
            paragraph={t("vision.paragraph")}
            chips={visionChips}
          />
        </div>
      </Container>
    </section>
  );
}
