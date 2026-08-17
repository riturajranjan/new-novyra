"use client";

import type { CSSProperties } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Magnetic } from "@/components/ui/magnetic";
import { RippleLink } from "@/components/ui/ripple-link";
import { buttonVariants } from "@/components/ui/button";
import { ctaTags, whatsappHref } from "@/content/about";
import { fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

const TAG_POSITIONS: CSSProperties[] = [
  { top: "9%", left: "5%" },
  { top: "16%", right: "6%" },
  { bottom: "14%", left: "8%" },
  { bottom: "10%", right: "5%" },
  { top: "48%", left: "1.5%" },
];

/** Final CTA — one compact glass container (not an oversized panel): a
 * rotating conic-gradient border, a soft top spotlight, and small floating
 * project tags, closing the page without needing more height than the
 * copy actually requires. */
export function AboutCta() {
  const t = useTranslations("about.cta");

  return (
    <section className="relative isolate py-12 md:py-16">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "120px" }}
          variants={fadeInUp}
          className="relative mx-auto max-w-225"
        >
          <div
            aria-hidden
            className="bg-gradient-brand pointer-events-none absolute -inset-16 -z-10 rounded-[56px] opacity-25 blur-3xl"
          />

          <div className="relative overflow-hidden rounded-2xl p-px">
            <motion.div
              aria-hidden
              className="absolute inset-[-60%] -z-10"
              style={{
                background:
                  "conic-gradient(from 0deg, var(--color-brand-blue), var(--color-brand-purple), var(--color-brand-pink), var(--color-brand-cyan), var(--color-brand-blue))",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />

            {/* 31px = the 2xl (32px) outer wrapper's radius minus the 1px
                gradient-border inset — keeps the inner and outer corners
                concentric. Documented exception to the radius scale. */}
            <div className="glass-strong relative overflow-hidden rounded-[31px] px-7 py-10 text-center sm:px-10 sm:py-12">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                  background:
                    "radial-gradient(60% 60% at 50% 0%, color-mix(in oklab, var(--color-brand-blue) 18%, transparent), transparent 70%)",
                }}
              />

              <div aria-hidden className="pointer-events-none absolute inset-0 hidden sm:block">
                {ctaTags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    className="glass text-caption text-foreground-secondary absolute rounded-pill px-3 py-1 font-medium"
                    style={TAG_POSITIONS[i]}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                  >
                    {t(`tags.${tag}`)}
                  </motion.span>
                ))}
              </div>

              <div className="relative z-10 mx-auto flex max-w-140 flex-col items-center gap-4">
                <h2 className="text-headline sm:text-display-lg font-semibold tracking-[-0.03em] text-foreground text-balance">
                  {t("title")}
                </h2>
                <p className="text-body-lg text-foreground-secondary text-pretty">{t("description")}</p>
              </div>

              <div className="relative z-10 mx-auto mt-8 grid w-full max-w-125 grid-cols-1 gap-3 sm:grid-cols-2">
                <Magnetic className="w-full">
                  <RippleLink
                    href="/contact"
                    className={cn(buttonVariants({ variant: "gradient", size: "lg" }), "group min-h-13 w-full")}
                  >
                    {t("primary")}
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-1"
                      aria-hidden
                    />
                  </RippleLink>
                </Magnetic>
                <Magnetic className="w-full">
                  <RippleLink
                    href="/contact"
                    className={cn(buttonVariants({ variant: "glass", size: "lg" }), "min-h-13 w-full")}
                  >
                    {t("secondary")}
                  </RippleLink>
                </Magnetic>
              </div>

              <RippleLink
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-caption text-foreground-secondary hover:text-foreground relative z-10 mt-5 inline-flex items-center gap-1.5 font-medium transition-colors duration-fast"
              >
                <MessageCircle className="h-3.5 w-3.5" aria-hidden />
                {t("whatsapp")}
              </RippleLink>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
