"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { BackgroundLabel } from "@/components/visual-backgrounds/background-label";
import { processSteps } from "@/content/contact-page";
import { easePremium } from "@/lib/motion";

/** Section 03 — "What Happens Next": one connected horizontal timeline
 * (no cards), a thin glowing line with a slow-traveling signal marking
 * the four steps. Almost-black "Signal Pipeline" background, distinct
 * from the Hero's particles and the Workspace's diagonal lines. */
export function ContactProcess() {
  const t = useTranslations("contact.process");
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden py-14 md:py-16 lg:py-20" style={{ backgroundColor: "#040509" }}>
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 leading-none font-bold whitespace-nowrap text-white select-none"
        style={{ fontSize: "clamp(140px, 15vw, 260px)", letterSpacing: "-0.05em", opacity: 0.02, transform: "translate(-50%, -50%)" }}
      >
        PROCESS
      </span>
      <BackgroundLabel text="STEP 01–04" top="10%" left="6%" opacity={0.08} />

      <Container className="relative flex flex-col gap-10 md:gap-14">
        <div className="flex flex-col gap-4">
          <span className="text-caption inline-flex w-fit items-center gap-2 font-mono font-medium tracking-[0.2em] text-white/40 uppercase">
            <span className="h-px w-6 bg-white/25" aria-hidden />
            {t("eyebrow")}
          </span>
          <h2
            className="max-w-lg font-bold text-balance text-white"
            style={{ fontSize: "clamp(30px, 3.4vw, 46px)", lineHeight: 1.12, letterSpacing: "-0.02em" }}
          >
            {t("headingLine1")}
            <br />
            {t("headingLine2")}
          </h2>
          <p className="text-body text-white/55 max-w-lg">{t("description")}</p>
        </div>

        <div className="relative flex flex-col gap-8 md:flex-row md:items-start md:gap-0">
          <div aria-hidden className="absolute top-5 right-0 left-0 hidden h-px bg-white/8 md:block" />
          <motion.div
            aria-hidden
            className="bg-gradient-brand absolute top-5 left-0 hidden h-px origin-left md:block"
            style={{ right: 0 }}
            initial={reduceMotion ? undefined : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.3, ease: "easeOut", delay: 0.1 }}
          />
          {!reduceMotion ? (
            <motion.span
              aria-hidden
              className="bg-brand-blue absolute top-5 left-0 hidden h-1.5 w-1.5 -translate-y-1/2 rounded-full shadow-[0_0_8px_1px_var(--color-brand-blue)] md:block"
              animate={{ left: ["0%", "100%"] }}
              transition={{ duration: 9, repeat: Infinity, ease: "linear", delay: 1 }}
            />
          ) : null}

          {processSteps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.08, ease: easePremium }}
              className="relative flex flex-1 items-start gap-3 md:flex-col md:items-start md:gap-3 md:pr-6"
            >
              <span className="border-border-subtle bg-background relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-[12px] font-bold text-white/60">
                {step.number}
              </span>
              <span className="text-body-sm max-w-45 pt-1.5 font-semibold text-white md:pt-0">{t(`steps.${step.id}.title`)}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
