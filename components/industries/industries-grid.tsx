"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { RippleLink } from "@/components/ui/ripple-link";
import { companyInfo } from "@/content/footer";
import { industries } from "@/content/industries";
import { accentStroke, accentTint } from "@/lib/accent";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** The full /industries page — same six industries and data as the
 * homepage's IndustriesPreview teaser, rendered without the "view all" link
 * (we're already on that page) and followed by a final CTA. */
export function IndustriesGrid() {
  const t = useTranslations("industries");
  const whatsappHref = companyInfo.whatsapp;

  return (
    <section className="relative isolate py-14 md:py-20">
      <Container className="flex flex-col gap-10 md:gap-14">
        <SectionHeading eyebrow={t("page.eyebrow")} title={t("page.heading")} description={t("page.description")} />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, i) => {
            const Icon = industry.icon;
            const stroke = accentStroke[industry.accent];
            return (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "150px" }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: easePremium }}
                className="group border-border-subtle bg-surface/60 relative flex flex-col gap-5 overflow-hidden rounded-2xl border p-7 backdrop-blur-xl transition-shadow duration-base"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-10 opacity-70 transition-opacity duration-slow group-hover:opacity-100"
                  style={{ backgroundImage: `linear-gradient(160deg, ${accentTint(industry.accent, 12)}, transparent 65%)` }}
                />
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: accentTint(industry.accent, 16) }}
                >
                  <Icon className="h-6.5 w-6.5" style={{ color: stroke }} aria-hidden />
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-title-lg text-foreground font-semibold">{t(`items.${industry.id}.title`)}</h3>
                  <p className="text-body-sm text-foreground-secondary text-pretty leading-[1.6]">
                    {t(`items.${industry.id}.outcome`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="glass-strong shadow-card relative flex flex-col items-center gap-6 overflow-hidden rounded-hero p-8 text-center sm:flex-row sm:justify-between sm:p-10 sm:text-left">
          <div
            aria-hidden
            className="bg-gradient-brand pointer-events-none absolute -inset-16 -z-10 rounded-full opacity-20 blur-3xl"
          />
          <div className="flex flex-col gap-2">
            <h3 className="text-title-lg text-foreground font-semibold">{t("cta.heading")}</h3>
            <p className="text-body-sm text-foreground-secondary max-w-md">{t("cta.description")}</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <RippleLink
              href="/#contact"
              className={cn(buttonVariants({ variant: "gradient", size: "lg" }), "group relative w-full overflow-hidden sm:w-auto")}
            >
              <span
                aria-hidden
                className="bg-gradient-shimmer pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-full"
              />
              {t("cta.primaryCta")}
              <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-0.5" aria-hidden />
            </RippleLink>
            <RippleLink
              href={whatsappHref}
              target={whatsappHref.startsWith("http") ? "_blank" : undefined}
              rel={whatsappHref.startsWith("http") ? "noopener noreferrer" : undefined}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto")}
            >
              {t("cta.secondaryCta")}
            </RippleLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
