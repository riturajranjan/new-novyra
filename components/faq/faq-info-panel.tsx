"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Magnetic } from "@/components/ui/magnetic";
import { buttonVariants } from "@/components/ui/button";
import { RippleLink } from "@/components/ui/ripple-link";
import { faqPanelStats } from "@/content/faq";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** An abstract floating glass object — concentric rings and a soft center
 * glyph — standing in for a 3D illustration without a stock render. */
function GlassObject() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative flex h-40 w-40 shrink-0 items-center justify-center">
      <motion.div
        aria-hidden
        className="border-brand-blue/25 absolute inset-0 rounded-full border"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        aria-hidden
        className="border-brand-purple/25 absolute inset-5 rounded-full border"
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        aria-hidden
        className="bg-gradient-brand absolute inset-10 rounded-full opacity-25 blur-xl"
        animate={reduceMotion ? undefined : { scale: [1, 1.12, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="glass-strong shadow-card relative flex h-16 w-16 items-center justify-center rounded-3xl"
        animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <MessageCircle className="text-brand-blue h-7 w-7" aria-hidden />
      </motion.div>
    </div>
  );
}

/** Left-column glass panel — "have more questions" invitation, real
 * response/engagement commitments (not a fabricated stat), and two CTAs. */
export function FaqInfoPanel() {
  const t = useTranslations("faq.infoPanel");
  const tCta = useTranslations("faq.ctas");

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "150px" }}
      transition={{ duration: 0.5, ease: easePremium }}
      className="glass-strong shadow-card relative flex flex-col items-center gap-6 overflow-hidden rounded-2xl p-6 text-center sm:p-10 md:gap-8 lg:sticky lg:top-24 lg:items-start lg:text-left"
    >
      <div aria-hidden className="bg-brand-blue/12 pointer-events-none absolute -inset-20 -z-10 rounded-full blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent" />

      <GlassObject />

      <div className="flex flex-col gap-2.5">
        <h3 className="text-title-lg text-foreground font-semibold">{t("heading")}</h3>
        <p className="text-body-sm text-foreground-secondary max-w-sm">{t("description")}</p>
      </div>

      <div className="grid w-full grid-cols-2 gap-3">
        {faqPanelStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="border-border-subtle bg-surface/60 flex flex-col items-center gap-2 rounded-2xl border p-4 text-center lg:items-start lg:text-left"
            >
              <Icon className="text-brand-blue h-4.5 w-4.5" aria-hidden />
              <span className="text-caption text-foreground font-semibold">{t(`stats.${stat.id}`)}</span>
            </div>
          );
        })}
      </div>

      <div className="flex w-full flex-col gap-3 sm:flex-row lg:flex-col">
        <Magnetic className="w-full">
          <RippleLink
            href="/#contact"
            className={cn(buttonVariants({ variant: "gradient", size: "lg" }), "group relative w-full overflow-hidden")}
          >
            <span
              aria-hidden
              className="bg-gradient-shimmer pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-full"
            />
            {tCta("bookConsultation")}
            <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-0.5" aria-hidden />
          </RippleLink>
        </Magnetic>
        <Magnetic className="w-full">
          <RippleLink href="/#contact" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full")}>
            {tCta("contactTeam")}
          </RippleLink>
        </Magnetic>
      </div>
    </motion.div>
  );
}
