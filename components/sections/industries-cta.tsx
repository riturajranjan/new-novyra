"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Magnetic } from "@/components/ui/magnetic";
import { RippleLink } from "@/components/ui/ripple-link";
import { buttonVariants } from "@/components/ui/button";
import { IndustryConstellationBackground } from "@/components/industries/industry-constellation-background";
import { companyInfo } from "@/content/footer";
import { fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Section 06 — the page's one conversion moment. Deliberately not the
 * bright blue/purple/pink gradient rectangle every other page's CTA
 * uses: a dark, cinematic close with the industry constellation echoing
 * the hero behind it, so the page reads as a loop closing rather than a
 * generic SaaS card interrupting it. Compact — the last thing before the
 * shared Footer, no second redundant CTA follows it. */
export function IndustriesCta() {
  const t = useTranslations("industries.cta");
  const whatsappHref = companyInfo.whatsapp;

  return (
    <section className="relative isolate flex min-h-[42svh] items-center overflow-hidden py-16 md:min-h-[50svh] md:py-20" style={{ backgroundColor: "#040509" }}>
      <IndustryConstellationBackground />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(46% 60% at 20% 30%, color-mix(in oklab, var(--color-brand-blue) 20%, transparent), transparent 70%), radial-gradient(46% 60% at 80% 70%, color-mix(in oklab, var(--color-brand-pink) 16%, transparent), transparent 70%), radial-gradient(60% 50% at 50% 100%, color-mix(in oklab, var(--color-brand-purple) 14%, transparent), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: "radial-gradient(120% 100% at 50% 45%, transparent 45%, #040509 100%)" }}
      />

      <Container className="relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "120px" }}
          variants={fadeInUp}
          className="mx-auto flex max-w-160 flex-col items-center gap-5 text-center"
        >
          <span className="text-caption inline-flex items-center gap-2 font-mono font-medium tracking-[0.2em] text-white/45 uppercase">
            {t("eyebrow")}
          </span>
          <h2
            className="font-bold text-balance text-white"
            style={{ fontSize: "clamp(32px, 3.8vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
          >
            {t("headingLine1")}
            <br />
            {t("headingLine2")}
          </h2>
          <p className="text-body-lg max-w-130 text-pretty text-white/60">{t("description")}</p>

          <div className="mt-2 grid w-full max-w-115 grid-cols-1 gap-3 sm:grid-cols-2">
            <Magnetic className="w-full">
              <RippleLink
                href="/contact"
                className={cn(buttonVariants({ variant: "gradient", size: "lg" }), "group min-h-13 w-full")}
              >
                {t("primaryCta")}
                <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-1" aria-hidden />
              </RippleLink>
            </Magnetic>
            <Magnetic className="w-full">
              <RippleLink
                href={whatsappHref}
                target={whatsappHref.startsWith("http") ? "_blank" : undefined}
                rel={whatsappHref.startsWith("http") ? "noopener noreferrer" : undefined}
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "min-h-13 w-full")}
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                {t("secondaryCta")}
              </RippleLink>
            </Magnetic>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
