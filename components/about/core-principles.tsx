"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { principleModules } from "@/content/about";
import { accentStroke, accentTint } from "@/lib/accent";
import { fadeInUp, staggerContainer } from "@/lib/motion";

/** Core Principles — five compact modules laid out as a horizontal
 * timeline on desktop (a numeral + thin accent line above each icon) and a
 * simple vertical spine on mobile. Deliberately lighter-weight than the
 * homepage's process timeline (no SVG rail) — this is five short
 * statements, not a six-step project workflow. */
export function CorePrinciples() {
  const t = useTranslations("about.principles");

  return (
    <section className="relative isolate py-14 md:py-20">
      <Container className="flex flex-col gap-10 md:gap-14">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "120px" }}
          variants={staggerContainer}
          className="hidden md:grid md:grid-cols-5 md:gap-6"
        >
          {principleModules.map((module) => {
            const Icon = module.icon;
            return (
              <motion.div key={module.id} variants={fadeInUp} className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-caption text-foreground-secondary/50 font-semibold">{module.number}</span>
                  <span className="h-px flex-1" style={{ background: accentTint(module.accent, 35) }} />
                </div>
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: accentTint(module.accent, 16) }}
                >
                  <Icon className="h-5 w-5" style={{ color: accentStroke[module.accent] }} aria-hidden />
                </span>
                <h3 className="text-body-lg font-semibold tracking-[-0.01em] text-foreground">
                  {t(`items.${module.id}.title`)}
                </h3>
                <p className="text-body-sm text-foreground-secondary text-pretty">
                  {t(`items.${module.id}.statement`)}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <ol className="flex flex-col gap-5 md:hidden">
          {principleModules.map((module, i) => {
            const Icon = module.icon;
            return (
              <motion.li
                key={module.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "120px" }}
                variants={fadeInUp}
                className="relative flex gap-4"
              >
                {i < principleModules.length - 1 ? (
                  <span className="bg-border-subtle absolute top-10 bottom-[-20px] left-5 w-px" aria-hidden />
                ) : null}
                <span
                  className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                  style={{ background: accentTint(module.accent, 16), border: `1px solid ${accentTint(module.accent, 40)}` }}
                >
                  <Icon className="h-4 w-4" style={{ color: accentStroke[module.accent] }} aria-hidden />
                </span>
                <div className="flex flex-col gap-1 pt-1">
                  <span className="text-caption text-foreground-secondary/50 font-semibold">{module.number}</span>
                  <h3 className="text-body font-semibold text-foreground">{t(`items.${module.id}.title`)}</h3>
                  <p className="text-body-sm text-foreground-secondary text-pretty">
                    {t(`items.${module.id}.statement`)}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
