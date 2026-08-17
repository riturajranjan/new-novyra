"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { founderProfile } from "@/content/about";
import { easePremium } from "@/lib/motion";

/** "Founder Says" — a cinematic editorial quote, not a testimonial card.
 * A giant translucent quotation mark and an outline "NOVYRA" sit behind the
 * text; the quote, supporting note, and signature reveal in sequence as
 * the section enters view. One real person's own words, not a fabricated
 * customer testimonial. */
export function FounderNote() {
  const t = useTranslations("about.founderNote");
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden py-16 md:py-20" style={{ backgroundColor: "#070a16" }}>
      <span
        aria-hidden
        className="pointer-events-none absolute -top-16 left-[4%] font-serif leading-none text-white select-none md:-top-24"
        style={{ fontSize: "clamp(180px, 24vw, 340px)", opacity: 0.05 }}
      >
        &ldquo;
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 leading-none font-bold whitespace-nowrap text-white select-none"
        style={{
          fontSize: "clamp(140px, 18vw, 280px)",
          letterSpacing: "-0.06em",
          opacity: 0.022,
          transform: "translate(-50%, -50%)",
          WebkitTextStroke: "1px rgba(255,255,255,0.5)",
          color: "transparent",
        }}
      >
        NOVYRA
      </span>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: "radial-gradient(55% 65% at 50% 30%, rgba(99,102,241,0.08), transparent 70%)" }}
      />

      <Container>
        <div className="mx-auto flex max-w-[880px] flex-col items-center gap-8 text-center">
          <motion.span
            initial={reduceMotion ? undefined : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "150px" }}
            transition={{ duration: 0.5, ease: easePremium }}
            className="text-gradient-brand text-sm font-semibold tracking-[0.14em] uppercase"
          >
            {t("eyebrow")}
          </motion.span>

          <motion.p
            initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "150px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: easePremium }}
            className="text-title-lg sm:text-headline text-balance font-semibold text-white"
            style={{ lineHeight: 1.35 }}
          >
            &ldquo;{t("quote")}&rdquo;
          </motion.p>

          <motion.p
            initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "150px" }}
            transition={{ duration: 0.5, delay: 0.25, ease: easePremium }}
            className="text-body text-foreground-secondary max-w-[620px] text-pretty leading-[1.65]"
          >
            {t("supporting")}
          </motion.p>

          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "150px" }}
            transition={{ duration: 0.5, delay: 0.4, ease: easePremium }}
            className="mt-2 flex flex-col items-center gap-1"
          >
            <span
              className="text-title text-white"
              style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontStyle: "italic" }}
            >
              {founderProfile.name}
            </span>
            <span className="text-caption text-foreground-secondary">{t("signatureRole")}</span>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
