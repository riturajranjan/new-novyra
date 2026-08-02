"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { AboutBackground } from "@/components/about/about-background";
import { capabilityTiles } from "@/content/about";
import { accentStroke, accentTint } from "@/lib/accent";
import { fadeInUp, staggerContainer } from "@/lib/motion";

/** "Who We Are" — one large editorial glass card (the company's own words)
 * beside four compact capability tiles. Deliberately calm: no strong
 * background glow here, so the mission/vision section right after it can
 * read as the visual step-up. */
export function CompanyIntro() {
  const t = useTranslations("about.intro");
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <section id="about-us" className="relative isolate scroll-mt-24 py-14 md:py-20">
      <AboutBackground variant="calm" />

      <Container className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "120px" }}
          variants={fadeInUp}
          className="glass-strong shadow-card rounded-hero p-7 sm:p-9 md:p-10"
        >
          <span className="text-gradient-brand text-sm font-semibold tracking-[0.14em] uppercase">
            {t("eyebrow")}
          </span>
          <h2 className="text-headline sm:text-display-lg mt-4 max-w-[700px] font-semibold tracking-[-0.03em] text-foreground text-balance">
            {t("title")}
          </h2>
          <div className="mt-5 flex max-w-[640px] flex-col gap-4">
            {paragraphs.map((paragraph, i) => (
              <p key={i} className="text-body-lg text-foreground-secondary text-pretty leading-[1.65]">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "120px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2"
        >
          {capabilityTiles.map((tile) => {
            const Icon = tile.icon;
            return (
              <motion.div
                key={tile.id}
                variants={fadeInUp}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="glass shadow-card flex flex-col gap-3 rounded-[22px] p-5"
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-2xl"
                  style={{ background: accentTint(tile.accent, 16) }}
                >
                  <Icon className="h-5 w-5" style={{ color: accentStroke[tile.accent] }} aria-hidden />
                </span>
                <div>
                  <p className="text-body-sm font-semibold text-foreground">{t(`tiles.${tile.id}.label`)}</p>
                  <p className="text-caption text-foreground-secondary mt-1">
                    {t(`tiles.${tile.id}.description`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
