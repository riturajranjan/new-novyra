"use client";

import { ArrowRight, Compass } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Magnetic } from "@/components/ui/magnetic";
import { RippleLink } from "@/components/ui/ripple-link";
import { buttonVariants } from "@/components/ui/button";
import { fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Section 07 — the page's closing action. Deliberately the highest-
 * contrast moment on the page: a solid brand-gradient panel with a giant
 * cropped "LET'S BUILD" wordmark and a couple of thin drawing paths,
 * rather than this site's usual dark-glass CTA treatment (About's CTA,
 * the Process panel) — so it reads as a distinct "we mean it" close. */
export function ServicesCta() {
  const t = useTranslations("services.cta");
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[50svh] items-center py-14 md:min-h-[58svh] md:py-16">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "120px" }}
          variants={fadeInUp}
          className="relative mx-auto max-w-225 overflow-hidden rounded-hero px-7 py-14 text-center sm:px-12 sm:py-18"
          style={{ backgroundImage: "linear-gradient(120deg, var(--color-brand-blue), var(--color-brand-purple) 55%, var(--color-brand-pink))" }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-[6%] left-1/2 -translate-x-1/2 leading-none font-bold whitespace-nowrap text-white select-none"
            style={{ fontSize: "clamp(90px, 12vw, 190px)", letterSpacing: "-0.05em", opacity: 0.08 }}
          >
            LET&apos;S BUILD
          </span>

          <svg aria-hidden viewBox="0 0 400 200" className="pointer-events-none absolute inset-0 h-full w-full opacity-25">
            <motion.path
              d="M0,150 C100,120 180,170 260,130 C320,100 360,140 400,110"
              fill="none"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth={1}
              initial={reduceMotion ? undefined : { pathLength: 0 }}
              whileInView={reduceMotion ? undefined : { pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: "easeOut", delay: 0.2 }}
            />
          </svg>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{ backgroundImage: "radial-gradient(60% 80% at 15% 0%, rgba(255,255,255,0.25), transparent 60%)" }}
          />

          <div className="relative z-10 mx-auto flex max-w-140 flex-col items-center gap-4">
            <span className="text-caption inline-flex items-center gap-2 font-mono font-medium tracking-[0.2em] text-white/70 uppercase">
              {t("eyebrow")}
            </span>
            <h2
              className="font-bold text-balance text-white"
              style={{ fontSize: "clamp(34px, 4.4vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.03em" }}
            >
              {t("headingLine1")}
              <br />
              {t("headingLine2")}
            </h2>
            <p className="text-body-lg text-pretty text-white/80">{t("description")}</p>
          </div>

          <div className="relative z-10 mx-auto mt-8 grid w-full max-w-125 grid-cols-1 gap-3 sm:grid-cols-2">
            <Magnetic className="w-full">
              <RippleLink
                href="/#contact"
                className={cn(buttonVariants({ variant: "glass", size: "lg" }), "group min-h-13 w-full !bg-white !text-[#141024] hover:!bg-white/90")}
              >
                {t("primary")}
                <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-1" aria-hidden />
              </RippleLink>
            </Magnetic>
            <Magnetic className="w-full">
              <RippleLink
                href="/services#advisor"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "min-h-13 w-full !border-white/40 !text-white hover:!bg-white/10")}
              >
                <Compass className="h-4 w-4" aria-hidden />
                {t("secondary")}
              </RippleLink>
            </Magnetic>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
