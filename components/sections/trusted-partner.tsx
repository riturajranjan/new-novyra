"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { RippleLink } from "@/components/ui/ripple-link";
import { TrustedPartnerBackground } from "@/components/trusted-partner/trusted-partner-background";
import { differentiators } from "@/content/trusted-partner";
import { accentStroke, accentTint } from "@/lib/accent";
import { easePremium, fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** "Why choose Novyra" as an asymmetric editorial split rather than a
 * repeating icon-card grid — large heading + copy on the left, four stacked
 * differentiator panels (gently offset, not a bento grid) on the right. */
export function TrustedPartner() {
  const t = useTranslations("trustedPartner");

  return (
    <section id="trusted-partner" className="relative isolate scroll-mt-24 overflow-hidden py-14 md:py-16 lg:py-20">
      <TrustedPartnerBackground />
      <Container size="wide" className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "150px" }}
          variants={fadeInUp}
          className="flex flex-col gap-5 lg:col-span-5 lg:justify-center"
        >
          <span className="text-gradient-brand text-sm font-semibold uppercase tracking-[0.14em]">{t("sectionHeading.eyebrow")}</span>
          <h2 className="text-headline sm:text-display-lg text-foreground text-balance font-semibold">
            {t("sectionHeading.titleBefore")} <span className="text-gradient-brand">{t("sectionHeading.titleHighlight")}</span>
          </h2>
          <p className="text-body-lg text-foreground-secondary max-w-md text-pretty">{t("sectionHeading.description")}</p>
          <div className="pt-2">
            <RippleLink href="/contact" className={cn(buttonVariants({ variant: "gradient", size: "lg" }), "group w-fit")}>
              {t("cta")}
              <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-1" aria-hidden />
            </RippleLink>
          </div>
        </motion.div>

        <div className="flex flex-col gap-4 lg:col-span-7">
          {differentiators.map((item, i) => {
            const Icon = item.icon;
            const stroke = accentStroke[item.accent];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "150px" }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: easePremium }}
                className={cn(
                  "group border-border-subtle bg-surface/60 relative flex items-start gap-4 overflow-hidden rounded-2xl border p-6 backdrop-blur-xl transition-shadow duration-base",
                  i % 2 === 1 && "lg:ml-8",
                )}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] opacity-0 blur-3xl transition-opacity duration-slow group-hover:opacity-100"
                  style={{ backgroundColor: accentTint(item.accent, 16) }}
                />
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: accentTint(item.accent, 16) }}
                >
                  <Icon className="h-5 w-5" style={{ color: stroke }} aria-hidden />
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-body-lg text-foreground font-semibold">{t(`items.${item.id}.title`)}</h3>
                  <p className="text-body-sm text-foreground-secondary text-pretty leading-[1.6]">
                    {t(`items.${item.id}.description`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
