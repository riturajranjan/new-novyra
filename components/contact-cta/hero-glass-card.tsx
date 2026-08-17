"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Magnetic } from "@/components/ui/magnetic";
import { buttonVariants } from "@/components/ui/button";
import { RippleLink } from "@/components/ui/ripple-link";
import { GlassOrb } from "@/components/contact-cta/glass-orb";
import { companyInfo } from "@/content/footer";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** The site's one and only closing CTA (the footer's own internal CTA was
 * removed to avoid two consecutive "let's build something" panels) — a
 * compact horizontal strip, not a large hero-style glass card: orbital
 * rocket mark, heading + description, two real actions. Target height
 * ~220-300px on desktop, well under the previous panel's footprint. */
export function HeroGlassCard() {
  const t = useTranslations("contact.heroCard");
  const whatsappHref = companyInfo.whatsapp;
  const isExternal = whatsappHref.startsWith("http");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "150px" }}
      transition={{ duration: 0.6, ease: easePremium }}
      className="relative isolate flex flex-col items-center gap-6 overflow-hidden rounded-[20px] border p-6 text-center sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:text-left"
      style={{ borderColor: "rgba(255,255,255,0.1)", backgroundColor: "rgba(13,18,36,0.6)" }}
    >
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6 lg:items-center">
        <GlassOrb />
        <div className="flex flex-col items-center gap-1.5 lg:items-start">
          <h3 className="text-headline text-foreground font-semibold text-balance" style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}>
            {t("title")}
          </h3>
          <p className="text-body text-foreground-secondary max-w-md text-pretty">{t("description")}</p>
        </div>
      </div>

      <div className="flex w-full flex-col items-stretch gap-2.5 sm:w-auto sm:flex-row sm:items-center">
        <Magnetic className="w-full sm:w-auto">
          <RippleLink
            href="mailto:hello@novyratech.in"
            className={cn(buttonVariants({ variant: "gradient", size: "lg" }), "group relative w-full overflow-hidden sm:w-auto")}
          >
            <span
              aria-hidden
              className="bg-gradient-shimmer pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-full"
            />
            {t("startProject")}
            <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-0.5" aria-hidden />
          </RippleLink>
        </Magnetic>
        <Magnetic className="w-full sm:w-auto">
          <RippleLink
            href={whatsappHref}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto")}
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            {t("whatsappUs")}
          </RippleLink>
        </Magnetic>
      </div>
    </motion.div>
  );
}
