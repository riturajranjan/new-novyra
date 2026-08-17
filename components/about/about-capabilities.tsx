"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { RippleLink } from "@/components/ui/ripple-link";
import { capabilityStripItems, techPhilosophyCategories } from "@/content/about";
import { fadeInUp } from "@/lib/motion";

const STACK_HIGHLIGHTS = ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS"];
const stackColors = new Map(techPhilosophyCategories.flatMap((c) => c.items).map((item) => [item.name, item.color]));

/** A single compact strip replacing five separate, overlapping sections
 * (What We Build, Our Approach, Why Choose Novyra, Industries, Technology
 * Philosophy) — each now a short row: capability labels, a one-line
 * process, an industries statement, and a restrained tech-stack list.
 * Services/Process/Industries already have their own dedicated pages and
 * homepage sections; this page only needs to point there, not repeat
 * them. */
export function AboutCapabilities() {
  const t = useTranslations("about.capabilities");

  return (
    <section className="relative isolate py-14 md:py-18">
      <Container className="flex flex-col gap-8 md:gap-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "120px" }}
          variants={fadeInUp}
          className="flex flex-col gap-6 border-t pt-8"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          <span className="text-caption text-foreground-secondary font-semibold tracking-[0.14em] uppercase">
            {t("services.eyebrow")}
          </span>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {capabilityStripItems.map((item) => (
                <span key={item.id} className="text-body-lg text-foreground font-medium">
                  {t(`services.items.${item.id}`)}
                </span>
              ))}
            </div>
            <RippleLink
              href="/services"
              className="text-body-sm hover:text-brand-blue group inline-flex shrink-0 items-center gap-1.5 font-semibold text-foreground transition-colors duration-fast"
            >
              {t("services.explore")}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-fast group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </RippleLink>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "120px" }}
          variants={fadeInUp}
          className="flex flex-col gap-2 border-t pt-8"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          <span className="text-caption text-foreground-secondary font-semibold tracking-[0.14em] uppercase">
            {t("approach.eyebrow")}
          </span>
          <p className="text-body-lg text-foreground font-medium">{t("approach.line")}</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "120px" }}
          variants={fadeInUp}
          className="flex flex-col items-start justify-between gap-4 border-t pt-8 sm:flex-row sm:items-center"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          <div className="flex flex-col gap-2">
            <span className="text-caption text-foreground-secondary font-semibold tracking-[0.14em] uppercase">
              {t("industries.eyebrow")}
            </span>
            <p className="text-body text-foreground-secondary max-w-[620px] text-pretty leading-[1.6]">{t("industries.statement")}</p>
          </div>
          <RippleLink
            href="/industries"
            className="text-body-sm hover:text-brand-blue group inline-flex shrink-0 items-center gap-1.5 font-semibold text-foreground transition-colors duration-fast"
          >
            {t("industries.explore")}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-fast group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </RippleLink>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "120px" }}
          variants={fadeInUp}
          className="flex flex-col gap-4 border-t pt-8"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          <span className="text-caption text-foreground-secondary font-semibold tracking-[0.14em] uppercase">
            {t("technology.eyebrow")}
          </span>
          <p className="text-body text-foreground-secondary max-w-[620px] text-pretty leading-[1.6]">{t("technology.statement")}</p>
          <div className="flex flex-wrap gap-2">
            {STACK_HIGHLIGHTS.map((name) => (
              <span
                key={name}
                className="text-caption border-border-subtle text-foreground-secondary inline-flex items-center gap-1.5 rounded-pill border px-3 py-1.5 font-medium"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: stackColors.get(name) ?? "#94A3B8" }} aria-hidden />
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
