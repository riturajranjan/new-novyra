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
  number: string;
  label: string;
  headline: string;
  paragraph: string;
  chips: string[];
}

function Panel({ icon: Icon, accent, number, label, headline, paragraph, chips }: PanelProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "120px" }}
      variants={fadeInUp}
      className="flex flex-1 flex-col gap-5 p-2 sm:p-4"
    >
      <div className="flex items-center gap-3">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
          style={{ borderColor: accentTint(accent, 30), backgroundColor: accentTint(accent, 6) }}
        >
          <Icon className="h-5 w-5" style={{ color: accentStroke[accent] }} aria-hidden />
        </span>
        <span className="text-[13px] font-semibold tracking-[0.1em] uppercase" style={{ color: accentStroke[accent] }}>
          {label} <span className="text-white/25">{number}</span>
        </span>
      </div>
      <h2 className="text-title-lg sm:text-headline font-semibold tracking-[-0.02em] text-foreground">{headline}</h2>
      <p className="text-body text-foreground-secondary max-w-[480px] text-pretty leading-[1.65]">{paragraph}</p>
      <div className="mt-auto flex flex-wrap gap-2 pt-2">
        {chips.map((chip) => (
          <span
            key={chip}
            className="text-caption rounded-pill px-3 py-1.5 font-medium"
            style={{ background: accentTint(accent, 8), color: accentStroke[accent], border: `1px solid ${accentTint(accent, 26)}` }}
          >
            {chip}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/** Mission & Vision — one connected split composition (not two equal glass
 * cards): a thin animated light beam travels the vertical seam between
 * them on desktop, joining "why we build" to "where we're headed". */
export function MissionVision() {
  const t = useTranslations("about.missionVision");
  const missionChips = t.raw("mission.chips") as string[];
  const visionChips = t.raw("vision.chips") as string[];

  return (
    <section id="mission" className="relative isolate scroll-mt-24 overflow-hidden py-14 md:py-18">
      <AboutBackground variant="strong" />

      <Container>
        <div
          className="flex flex-col gap-6 rounded-2xl border lg:flex-row lg:items-stretch lg:gap-0"
          style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: "#0a0e1e" }}
        >
          <Panel
            icon={missionPanel.icon}
            accent={missionPanel.accent}
            number="01"
            label={t("mission.label")}
            headline={t("mission.headline")}
            paragraph={t("mission.paragraph")}
            chips={missionChips}
          />

          <div aria-hidden className="relative mx-6 hidden w-px shrink-0 lg:block">
            <div className="absolute inset-0" style={{ backgroundColor: "rgba(255,255,255,0.07)" }} />
            <motion.div
              className="via-brand-blue absolute inset-x-0 h-28 bg-gradient-to-b from-transparent to-transparent"
              animate={{ top: ["-15%", "115%"] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <Panel
            icon={visionPanel.icon}
            accent={visionPanel.accent}
            number="02"
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
