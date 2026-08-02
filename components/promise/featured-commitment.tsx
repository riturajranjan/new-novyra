"use client";

import { CircleCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ProcessVisual } from "@/components/promise/process-visual";
import { easePremium } from "@/lib/motion";

/** The large featured "how we work" card — a split glass hero, standing in
 * for a featured testimonial. Every claim is an operating commitment we make
 * going forward, never a quote attributed to a client that doesn't exist. */
export function FeaturedCommitment() {
  const t = useTranslations("promise.featuredCommitment");
  const bullets = t.raw("bullets") as string[];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "150px" }}
      transition={{ duration: 0.5, ease: easePremium }}
      className="glass-strong shadow-card relative overflow-hidden rounded-[36px]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/10 to-transparent" />
      <div
        aria-hidden
        className="bg-brand-emerald/16 pointer-events-none absolute -inset-24 -z-10 rounded-full blur-3xl"
      />

      <div className="grid grid-cols-1 gap-8 p-6 sm:p-10 lg:grid-cols-2 lg:items-stretch lg:gap-10">
        <div className="min-h-[280px] lg:min-h-[420px]">
          <ProcessVisual />
        </div>

        <div className="flex flex-col justify-center gap-6">
          <span className="text-caption bg-brand-emerald/12 text-brand-emerald inline-flex w-fit items-center gap-1.5 rounded-full border border-brand-emerald/35 px-3 py-1 font-semibold tracking-wide uppercase">
            {t("eyebrow")}
          </span>

          <div className="flex flex-col gap-3">
            <h3 className="text-headline text-foreground font-semibold text-balance">{t("title")}</h3>
            <p className="text-body-sm sm:text-body text-foreground-secondary text-pretty">{t("description")}</p>
          </div>

          <ul className="grid grid-cols-1 gap-2">
            {bullets.map((item) => (
              <li key={item} className="text-body-sm text-foreground-secondary flex items-start gap-2">
                <CircleCheck className="text-brand-emerald mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="border-border-subtle flex items-center gap-3 border-t pt-4">
            <p className="text-caption text-foreground-secondary font-semibold tracking-wide uppercase">
              {t("metricLabel")}
            </p>
            <p className="text-title-lg text-brand-emerald font-semibold">{t("metricValue")}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
