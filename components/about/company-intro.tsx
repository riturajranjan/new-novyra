"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { capabilityTiles } from "@/content/about";
import { accentStroke } from "@/lib/accent";
import { fadeInUp, staggerContainer } from "@/lib/motion";

/** "Who We Are" — an asymmetric editorial story (large heading left, the
 * company's own words right) instead of a glass card beside four capability
 * tiles. The four capabilities now read as one connected product journey
 * (Strategy → Product Design → Engineering → Growth) joined by an animated
 * line, not four separate boxes. An oversized, partially-cropped "NOVYRA"
 * sits behind the composition as pure decoration. */
export function CompanyIntro() {
  const t = useTranslations("about.intro");
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <section id="about-us" className="relative isolate scroll-mt-24 overflow-hidden py-14 md:py-18">
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 leading-none font-bold whitespace-nowrap text-white select-none"
        style={{
          fontSize: "clamp(160px, 20vw, 320px)",
          letterSpacing: "-0.06em",
          opacity: 0.025,
          transform: "translate(-50%, -50%)",
        }}
      >
        NOVYRA
      </span>

      <Container className="flex flex-col gap-10 md:gap-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-14">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "120px" }}
            variants={fadeInUp}
            className="text-headline sm:text-display-lg max-w-[520px] font-semibold tracking-[-0.03em] text-foreground text-balance"
          >
            <span className="text-gradient-brand mb-3 block text-sm font-semibold tracking-[0.14em] uppercase">
              {t("eyebrow")}
            </span>
            {t("title")}
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "120px" }}
            variants={fadeInUp}
            className="flex flex-col gap-4 lg:pt-2"
          >
            {paragraphs.map((paragraph, i) => (
              <p key={i} className="text-body-lg text-foreground-secondary text-pretty leading-[1.65]">
                {paragraph}
              </p>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "120px" }}
          variants={staggerContainer}
          className="flex flex-col gap-0 rounded-2xl border sm:flex-row sm:items-stretch"
          style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: "#0a0e1e" }}
        >
          {capabilityTiles.map((tile, i) => (
            <motion.div
              key={tile.id}
              variants={fadeInUp}
              className="relative flex flex-1 items-center gap-3 border-t px-5 py-4 first:border-t-0 sm:border-t-0 sm:border-l sm:first:border-l-0"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
              <span className="text-[11px] font-semibold text-white/30 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-body-sm font-semibold text-white">{t(`tiles.${tile.id}.label`)}</span>
              {i < capabilityTiles.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute top-1/2 -right-[1px] hidden h-px w-6 -translate-y-1/2 sm:block"
                  style={{ backgroundColor: accentStroke[tile.accent], opacity: 0.4 }}
                />
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
