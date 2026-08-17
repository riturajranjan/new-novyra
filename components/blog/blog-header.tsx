"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { fadeInUp } from "@/lib/motion";

/** Same centered visual language as What We Do's heading (gradient
 * eyebrow, centered white heading, cool-gray supporting copy, same font
 * family/weight/tracking direction) — but constrained to its own slightly
 * smaller clamp so it stays compact rather than dominating the viewport.
 * Bespoke rather than reusing the shared `SectionHeading` component
 * because that component is also used by What We Do (which must not
 * change) and this section calls for different exact numbers. */
export function BlogHeader() {
  const t = useTranslations("blog.section");

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "150px" }}
      variants={fadeInUp}
      className="mx-auto flex max-w-[1450px] flex-col items-center gap-6 text-center"
    >
      <span className="text-gradient-brand text-[12px] font-semibold tracking-[0.14em] uppercase sm:text-[13px] sm:tracking-[0.16em]">
        {t("eyebrow")}
      </span>
      <h2
        className="text-foreground max-w-[900px] text-balance font-semibold"
        style={{ fontSize: "clamp(2.75rem, 4vw, 4.25rem)", lineHeight: 1.04, letterSpacing: "-0.04em" }}
      >
        {t("heading")}
      </h2>
      <p className="text-body-lg text-foreground-secondary max-w-[720px] text-pretty">{t("description")}</p>
    </motion.div>
  );
}
