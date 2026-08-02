"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RippleLink } from "@/components/ui/ripple-link";
import { coreServiceLines, supportingServices } from "@/content/core-services";
import { accentStroke, accentTint } from "@/lib/accent";
import { easePremium } from "@/lib/motion";

/** The three primary service lines, stated plainly before the interactive
 * explorer goes deep on any one of them — this is the section the homepage
 * IA was missing: a scannable "here's what we build" beat between the
 * operating promise and the process/explorer sections. Digital marketing
 * and brand design appear in a single compact row underneath, never as a
 * fourth and fifth card competing with the primary three. */
export function CoreServices() {
  const t = useTranslations("coreServices");

  return (
    <section id="what-we-build" className="relative isolate scroll-mt-24 py-14 md:py-20">
      <Container className="flex flex-col gap-10 md:gap-12">
        <SectionHeading eyebrow={t("eyebrow")} title={t("heading")} description={t("description")} />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {coreServiceLines.map((line, i) => {
            const Icon = line.icon;
            const stroke = accentStroke[line.accent];
            return (
              <motion.div
                key={line.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "150px" }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: easePremium }}
                className="group border-border-subtle bg-surface/60 relative flex flex-col gap-4 overflow-hidden rounded-2xl border p-7 backdrop-blur-xl transition-shadow duration-base md:p-8"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] opacity-0 blur-3xl transition-opacity duration-slow group-hover:opacity-100"
                  style={{ backgroundColor: accentTint(line.accent, 18) }}
                />
                <span
                  className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: accentTint(line.accent, 16) }}
                >
                  <Icon className="h-6 w-6" style={{ color: stroke }} aria-hidden />
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-title-lg text-foreground font-semibold">{t(`lines.${line.id}.title`)}</h3>
                  <p className="text-body-sm text-foreground-secondary text-pretty leading-[1.6]">
                    {t(`lines.${line.id}.description`)}
                  </p>
                </div>
                <RippleLink
                  href="/#services"
                  className="text-body-sm mt-auto inline-flex items-center gap-1.5 font-semibold"
                  style={{ color: stroke }}
                >
                  {t("cta")}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-fast group-hover:translate-x-0.5" aria-hidden />
                </RippleLink>
              </motion.div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <span className="text-caption text-foreground-secondary/70 font-medium">{t("supportingLabel")}</span>
          {supportingServices.map((item) => {
            const Icon = item.icon;
            return (
              <span
                key={item.id}
                className="border-border-subtle text-caption text-foreground-secondary inline-flex items-center gap-1.5 rounded-pill border px-3 py-1.5 font-medium"
              >
                <Icon className="h-3 w-3" aria-hidden />
                {t(`supporting.${item.id}`)}
              </span>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
