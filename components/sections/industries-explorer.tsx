"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { IndustriesExplorerBackground } from "@/components/industries/industries-explorer-background";
import { IndustryNav } from "@/components/industries/industry-nav";
import { IndustryVisual } from "@/components/industries/industry-visual";
import { industries } from "@/content/industries";
import { accentStroke, accentTint } from "@/lib/accent";
import { easePowerOut } from "@/lib/motion";

/** Section 02 — an editorial Industry Explorer: a persistent vertical
 * numbered nav (≈22%) driving a content column (≈34%) and a large dynamic
 * visual canvas (≈44%) side by side — real headline/description/
 * capability copy plus a genuinely distinct visual per industry, never a
 * 6-card grid. Content and visual cross-fade together (opacity + blur +
 * scale) so switching reads as one transition, not two. */
export function IndustriesExplorer() {
  const t = useTranslations("industries");
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(industries[0].id);
  const active = industries.find((i) => i.id === activeId) ?? industries[0];
  const activeIndex = industries.findIndex((i) => i.id === activeId);
  const stroke = accentStroke[active.accent];
  const capabilities = t.raw(`items.${active.id}.capabilities`) as string[];

  const panelVariants = {
    initial: { opacity: 0, y: 10, scale: reduceMotion ? 1 : 0.985, filter: reduceMotion ? "none" : "blur(4px)" },
    animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, y: -8, scale: reduceMotion ? 1 : 0.985, filter: reduceMotion ? "none" : "blur(3px)" },
  };
  const transition = { duration: reduceMotion ? 0.15 : 0.48, ease: easePowerOut };

  return (
    <section id="industry-explorer" className="relative isolate scroll-mt-24 overflow-hidden py-14 md:py-16 lg:py-20">
      <IndustriesExplorerBackground />

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
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col gap-3.5">
                <span className="text-caption font-mono font-medium tracking-[0.2em] uppercase" style={{ color: stroke }}>
                  {String(activeIndex + 1).padStart(2, "0")} / {t(`items.${active.id}.title`)}
                </span>
                <h3
                  className="text-foreground max-w-md font-semibold text-balance"
                  style={{ fontSize: "clamp(26px, 2.2vw, 34px)", lineHeight: 1.14, letterSpacing: "-0.02em" }}
                >
                  {t(`items.${active.id}.headline`)}
                </h3>
                <p className="text-body-sm text-foreground-secondary max-w-md">{t(`items.${active.id}.description`)}</p>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-caption text-foreground-secondary/70 font-semibold tracking-wide uppercase">
                  {t("explorer.whatWeCanBuild")}
                </p>
                <ul className="flex flex-col gap-2">
                  {capabilities.map((cap, i) => (
                    <motion.li
                      key={cap}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.08 + i * 0.05 }}
                      className="text-body-sm text-foreground flex items-center gap-2.5"
                    >
                      <span aria-hidden className="h-1 w-1 rounded-full" style={{ backgroundColor: stroke }} />
                      {cap}
                    </motion.li>
                  ))}
                </ul>
              </div>
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
              <div className="h-80 min-w-0 sm:h-90 lg:h-100">
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
