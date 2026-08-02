"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { techPhilosophyCategories } from "@/content/about";
import { fadeInUp, staggerContainer } from "@/lib/motion";

/** Technology Philosophy — compact glass rows grouped by discipline
 * (never a giant logo wall), closing with one plain-language statement
 * about why the stack is chosen the way it is. */
export function TechPhilosophy() {
  const t = useTranslations("about.techPhilosophy");

  return (
    <section className="relative isolate py-14 md:py-20">
      <Container className="flex flex-col gap-10 md:gap-14">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "120px" }}
          variants={staggerContainer}
          className="flex flex-col gap-3"
        >
          {techPhilosophyCategories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                variants={fadeInUp}
                className="glass shadow-card flex flex-col gap-3 rounded-2xl p-5 sm:flex-row sm:items-center sm:gap-6"
              >
                <div className="flex shrink-0 items-center gap-2.5 sm:w-40">
                  <span className="bg-brand-soft flex h-9 w-9 items-center justify-center rounded-xl">
                    <Icon className="text-brand-blue h-4 w-4" aria-hidden />
                  </span>
                  <span className="text-body-sm font-semibold text-foreground">{t(`categories.${category.id}`)}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span
                      key={item.name}
                      className="text-caption rounded-pill bg-white/3 text-foreground-secondary inline-flex items-center gap-1.5 px-3 py-1.5 font-medium"
                    >
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: item.color }} aria-hidden />
                      {item.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "120px" }}
          variants={fadeInUp}
          className="text-body text-foreground-secondary mx-auto max-w-[620px] text-center text-pretty"
        >
          {t("statement")}
        </motion.p>
      </Container>
    </section>
  );
}
