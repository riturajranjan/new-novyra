"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { fadeInUp } from "@/lib/motion";

/** Selected Work's intro — centered, matching the approved What We Do
 * heading's visual language exactly (gradient eyebrow, centered white
 * heading, cool-gray supporting copy), just sized to its own larger scale.
 * No CTA here — "View all work" moved to the bottom principles strip so
 * this stays a clean centered block, not an asymmetric one. */
export function SelectedWorkHeader() {
  const t = useTranslations("caseStudies.stage");

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "150px" }}
      variants={fadeInUp}
      className="flex flex-col items-center gap-5 text-center"
    >
      <span className="text-gradient-brand text-sm font-semibold tracking-[0.14em] uppercase">{t("eyebrow")}</span>
      <h2
        className="text-foreground max-w-[1000px] text-balance font-semibold"
        style={{ fontSize: "clamp(3rem, 5vw, 4.75rem)", lineHeight: 1.06, letterSpacing: "-0.03em" }}
      >
        {t("heading")}
      </h2>
      <p className="text-foreground-secondary max-w-[900px] text-pretty" style={{ fontSize: "19px", lineHeight: 1.55 }}>
        {t("description")}
      </p>
    </motion.div>
  );
}
