"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { fadeInUp } from "@/lib/motion";
import { homepageStageIds } from "@/content/case-studies";

/** Selected Work's intro — centered, matching the approved What We Do
 * heading's visual language exactly (gradient eyebrow, centered white
 * heading, cool-gray supporting copy), just sized to its own larger scale.
 * No CTA here — "View all work" moved to the bottom principles strip so
 * this stays a clean centered block, not an asymmetric one. */
export function SelectedWorkHeader() {
  const t = useTranslations("caseStudies.stage");
  const total = homepageStageIds.length;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "150px" }}
      variants={fadeInUp}
      className="flex flex-col items-center gap-5 text-center">
      <span className="flex items-center gap-2 text-sm font-semibold tracking-[0.14em] uppercase">
        <span className="text-gradient-brand">{t("eyebrow")}</span>
        <span aria-hidden className="text-white/30 tabular-nums">
          / {String(total).padStart(2, "0")}
        </span>
      </span>
      <h2 className="text-headline sm:text-display-lg font-semibold text-foreground text-balance">
        {t("heading")}
      </h2>
      <p
        className="text-foreground-secondary max-w-[900px] text-pretty"
        style={{ fontSize: "19px", lineHeight: 1.55 }}>
        {t("description")}
      </p>
    </motion.div>
  );
}
