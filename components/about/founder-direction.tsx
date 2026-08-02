"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { ownershipCommitments, teamIcon as TeamIcon } from "@/content/about";
import { accentStroke, accentTint } from "@/lib/accent";
import { fadeInUp } from "@/lib/motion";

/** Founder / Team Direction — an honest "Built With Ownership" section.
 * No fabricated headcount, no stock employee portraits: a plain-language
 * statement about how the work actually gets done, plus an abstract
 * workspace visual (never a stock photo). */
export function FounderDirection() {
  const t = useTranslations("about.founder");
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <section className="relative isolate py-14 md:py-20">
      <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "120px" }}
          variants={fadeInUp}
          className="flex flex-col gap-5"
        >
          <span className="text-gradient-brand text-sm font-semibold tracking-[0.14em] uppercase">
            {t("eyebrow")}
          </span>
          <h2 className="text-headline sm:text-display-lg max-w-140 font-semibold tracking-[-0.03em] text-foreground text-balance">
            {t("title")}
          </h2>
          <div className="flex max-w-145 flex-col gap-4">
            {paragraphs.map((paragraph, i) => (
              <p key={i} className="text-body-lg text-foreground-secondary text-pretty leading-[1.65]">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-3">
            {ownershipCommitments.map((commitment) => {
              const Icon = commitment.icon;
              return (
                <span
                  key={commitment.id}
                  className="glass text-caption text-foreground-secondary inline-flex items-center gap-2 rounded-pill px-3.5 py-2 font-medium"
                >
                  <span
                    className="flex h-5 w-5 items-center justify-center rounded-full"
                    style={{ background: accentTint(commitment.accent, 18) }}
                  >
                    <Icon className="h-3 w-3" style={{ color: accentStroke[commitment.accent] }} aria-hidden />
                  </span>
                  {t(`commitments.${commitment.id}`)}
                </span>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "120px" }}
          variants={fadeInUp}
          className="relative mx-auto flex h-64 w-full max-w-100 items-center justify-center md:h-72"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="bg-brand-blue absolute top-[10%] left-[10%] h-40 w-40 rounded-full opacity-20 blur-[80px]" />
            <div className="bg-brand-purple absolute right-[10%] bottom-[10%] h-44 w-44 rounded-full opacity-20 blur-[90px]" />
          </div>
          <div aria-hidden className="glass-strong shadow-card-hover absolute inset-4 rounded-hero" />
          <div className="relative z-10 flex flex-col items-center gap-3">
            <span className="bg-brand-soft flex h-16 w-16 items-center justify-center rounded-full">
              <TeamIcon className="text-brand-blue h-7 w-7" aria-hidden />
            </span>
            <span aria-hidden className="via-foreground-secondary/25 h-px w-24 bg-gradient-to-r from-transparent to-transparent" />
            <span className="text-caption text-foreground-secondary">{t("visualLabel")}</span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
