"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { RippleLink } from "@/components/ui/ripple-link";
import { IndustriesExplorerBackground } from "@/components/industries/industries-explorer-background";
import { IndustryNav } from "@/components/industries/industry-nav";
import { IndustryVisual } from "@/components/industries/industry-visual";
import { industries } from "@/content/industries";
import { accentStroke, accentTint } from "@/lib/accent";
import { easePowerOut } from "@/lib/motion";

/** Section 02 — a compact Industry Navigator: pick one of six, see its
 * number/name, one strong sentence, a handful of capability tags and a
 * compact visual. Deliberately shorter than it used to be — the deep
 * storytelling now belongs to the three Spotlights below, so this
 * section only has to answer "which industries does Novyra work with,"
 * not "how does Novyra think about each one." */
export function IndustriesExplorer() {
  const t = useTranslations("industries");
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(industries[0].id);
  const active = industries.find((i) => i.id === activeId) ?? industries[0];
  const activeIndex = industries.findIndex((i) => i.id === activeId);
  const stroke = accentStroke[active.accent];
  const capabilities = (t.raw(`items.${active.id}.capabilities`) as string[]).slice(0, 4);

  const panelVariants = {
    initial: { opacity: 0, y: 10, scale: reduceMotion ? 1 : 0.985, filter: reduceMotion ? "none" : "blur(4px)" },
    animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, y: -8, scale: reduceMotion ? 1 : 0.985, filter: reduceMotion ? "none" : "blur(3px)" },
  };
  const transition = { duration: reduceMotion ? 0.15 : 0.48, ease: easePowerOut };

  return (
    <section id="industry-explorer" className="relative isolate scroll-mt-24 overflow-hidden py-14 md:py-16 lg:py-20">
      <IndustriesExplorerBackground accent={active.accent} />

      <Container className="flex flex-col gap-8 md:gap-10">
        <div className="flex flex-col gap-4">
          <span className="text-caption inline-flex w-fit items-center gap-2 font-mono font-medium tracking-[0.2em] text-white/40 uppercase">
            <span className="h-px w-6 bg-white/25" aria-hidden />
            {t("explorer.eyebrow")}
          </span>
          <h2
            className="max-w-2xl font-bold text-balance text-white"
            style={{ fontSize: "clamp(34px, 3.6vw, 50px)", lineHeight: 1.08, letterSpacing: "-0.025em" }}
          >
            {t("explorer.headingLine1")}
            <br />
            {t("explorer.headingLine2")}
          </h2>
          <p className="text-body text-white/55 max-w-lg">{t("explorer.description")}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[22fr_34fr_44fr] lg:gap-8">
          <IndustryNav industries={industries} activeId={activeId} onSelect={setActiveId} />

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              variants={panelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={transition}
              className="flex flex-col gap-5"
            >
              <div className="flex flex-col gap-3">
                <span className="text-caption font-mono font-medium tracking-[0.2em] uppercase" style={{ color: stroke }}>
                  {String(activeIndex + 1).padStart(2, "0")} / {t(`items.${active.id}.title`)}
                </span>
                <h3
                  className="text-foreground max-w-md font-semibold text-balance"
                  style={{ fontSize: "clamp(24px, 2vw, 30px)", lineHeight: 1.16, letterSpacing: "-0.02em" }}
                >
                  {t(`items.${active.id}.headline`)}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {capabilities.map((cap, i) => (
                  <motion.span
                    key={cap}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.08 + i * 0.05 }}
                    className="text-caption rounded-full px-3 py-1.5 font-medium text-foreground"
                    style={{ backgroundColor: accentTint(active.accent, 10), border: `1px solid ${accentTint(active.accent, 24)}` }}
                  >
                    {cap}
                  </motion.span>
                ))}
              </div>

              <RippleLink
                href="/#contact"
                className="group text-body-sm mt-1 flex w-fit items-center gap-1.5 font-semibold text-white/75 transition-colors duration-base hover:text-white"
              >
                {t("explorer.exploreCta", { industry: t(`items.${active.id}.title`) })}
                <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-1" aria-hidden />
              </RippleLink>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              variants={panelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={transition}
              id={`industry-panel-${active.id}`}
              role="tabpanel"
              aria-labelledby={`industry-tab-${active.id}`}
              className="flex flex-col gap-3"
            >
              <div className="h-72 min-w-0 sm:h-80">
                <IndustryVisual industry={active} />
              </div>
              <span
                className="text-caption inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 font-medium text-foreground-secondary"
                style={{ backgroundColor: accentTint(active.accent, 8) }}
              >
                {t("explorer.illustrativeNote")}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
