"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { AboutBackground } from "@/components/about/about-background";
import { processSteps } from "@/content/process-steps";
import { accentStroke, accentTint } from "@/lib/accent";
import { fadeInUp, staggerContainer } from "@/lib/motion";

/** "How Novyra Works" — a compact, icon-forward horizontal strip of the
 * same six canonical steps as the homepage's OurProcess timeline (see
 * components/sections/our-process.tsx and content/process-steps.ts) —
 * same data, same wording, just this page's own condensed layout rather
 * than the full glass-card version. */
export function HowNovyraWorks() {
  const t = useTranslations("about.howWeWork");
  const tSteps = useTranslations("process");

  return (
    <section className="relative isolate py-14 md:py-20">
      <AboutBackground variant="calm" />

      <Container className="flex flex-col gap-10 md:gap-14">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "120px" }}
          variants={staggerContainer}
          className="relative"
        >
          <div
            aria-hidden
            className="absolute top-6 right-[10%] left-[10%] hidden h-px md:block"
            style={{
              backgroundImage:
                "linear-gradient(90deg, var(--color-brand-blue), var(--color-brand-cyan), var(--color-brand-purple), var(--color-brand-pink), var(--color-brand-amber), var(--color-brand-emerald))",
              opacity: 0.3,
            }}
          />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 md:gap-4">
            {processSteps.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  variants={fadeInUp}
                  className="relative flex flex-col items-start gap-3 md:items-center md:text-center"
                >
                  <span
                    className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{
                      background: accentTint(step.accent, 18),
                      border: `1px solid ${accentTint(step.accent, 40)}`,
                      boxShadow: `0 10px 24px -10px ${accentTint(step.accent, 55)}`,
                    }}
                  >
                    <Icon className="h-5 w-5" style={{ color: accentStroke[step.accent] }} aria-hidden />
                  </span>
                  <span className="text-caption font-semibold" style={{ color: accentStroke[step.accent] }}>
                    {step.number}
                  </span>
                  <h3 className="text-body-lg font-semibold text-foreground">{tSteps(`steps.${step.id}.title`)}</h3>
                  <p className="text-body-sm text-foreground-secondary max-w-[220px] text-pretty md:mx-auto">
                    {tSteps(`steps.${step.id}.description`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
