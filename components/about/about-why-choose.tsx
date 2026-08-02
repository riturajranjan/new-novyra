"use client";

import { Code2, Palette, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { whyChooseReasons } from "@/content/about";
import type { AccentColor } from "@/content/hero-screens";
import { accentStroke, accentTint } from "@/lib/accent";
import { fadeInUp } from "@/lib/motion";

/** Purely decorative "design → build → launch" glass stack — an abstract
 * workflow visual, never a fake dashboard or claimed screenshot. */
const STACK: { icon: typeof Palette; accent: AccentColor; rotate: number; delay: number }[] = [
  { icon: Palette, accent: "purple", rotate: -6, delay: 0 },
  { icon: Code2, accent: "blue", rotate: 3, delay: 0.6 },
  { icon: Rocket, accent: "emerald", rotate: -2, delay: 1.2 },
];

/** "Why Choose Novyra" — one large glass feature card (not six separate
 * cards): an abstract workflow visual on the left, six honest,
 * capability-based reasons on the right. No claimed client counts, awards,
 * or years-in-business. */
export function AboutWhyChoose() {
  const t = useTranslations("about.whyChoose");

  return (
    <section id="why-choose-us" className="relative isolate scroll-mt-24 py-14 md:py-20">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "120px" }}
          variants={fadeInUp}
          className="glass-strong shadow-card-hover overflow-hidden rounded-2xl p-7 sm:p-9 md:p-10"
        >
          <div className="mx-auto max-w-[820px] text-center">
            <span className="text-gradient-brand text-sm font-semibold tracking-[0.14em] uppercase">
              {t("eyebrow")}
            </span>
            <h2 className="text-headline sm:text-display-lg mt-3 font-semibold tracking-[-0.03em] text-foreground text-balance">
              {t("title")}
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 items-center gap-10 md:mt-14 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-12">
            <div aria-hidden className="relative mx-auto flex h-56 w-full max-w-70 items-center justify-center md:h-64">
              {STACK.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    className="absolute flex h-28 w-40 items-center justify-center rounded-2xl backdrop-blur-xl"
                    style={{
                      background: "linear-gradient(155deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))",
                      border: `1px solid ${accentTint(item.accent, 35)}`,
                      boxShadow: `0 20px 40px -16px ${accentTint(item.accent, 55)}`,
                      rotate: `${item.rotate}deg`,
                      zIndex: i,
                    }}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: item.delay }}
                  >
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-full"
                      style={{ background: accentTint(item.accent, 20) }}
                    >
                      <Icon className="h-5 w-5" style={{ color: accentStroke[item.accent] }} aria-hidden />
                    </span>
                  </motion.div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 gap-3 min-[560px]:grid-cols-2">
              {whyChooseReasons.map((reason) => {
                const Icon = reason.icon;
                return (
                  <div key={reason.id} className="flex items-center gap-3 rounded-2xl bg-white/2 p-3">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: accentTint(reason.accent, 16) }}
                    >
                      <Icon className="h-4 w-4" style={{ color: accentStroke[reason.accent] }} aria-hidden />
                    </span>
                    <span className="text-body-sm font-medium text-foreground">{t(`reasons.${reason.id}`)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
