"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { principleModules } from "@/content/about";
import { accentStroke, accentTint } from "@/lib/accent";
import { easePremium } from "@/lib/motion";

/** Principles — an editorial interactive layout: a large number on the
 * left, the title in the center, a short explanation on the right, and a
 * thin progress line that shifts to the active row. Hovering (desktop) or
 * focusing a row makes it visually dominant; the rest recede. Mobile falls
 * back to clean stacked rows — no cards. */
export function CorePrinciples() {
  const t = useTranslations("about.principles");
  const [active, setActive] = useState(0);
  const activeModule = principleModules[active];

  return (
    <section className="relative isolate overflow-hidden py-14 md:py-18">
      <Container className="flex flex-col gap-10 md:gap-12">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

        <div
          className="hidden overflow-hidden rounded-2xl border md:flex md:flex-col"
          style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: "#0a0e1e" }}
          onMouseLeave={() => setActive(0)}
        >
          {principleModules.map((module, i) => {
            const isActive = i === active;
            return (
              <div
                key={module.id}
                role="button"
                tabIndex={0}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group relative grid cursor-default grid-cols-[80px_1fr_1.3fr] items-center gap-6 border-t px-7 py-5 outline-none transition-colors duration-300 first:border-t-0"
                style={{ borderColor: "rgba(255,255,255,0.07)" }}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
                  style={{
                    backgroundImage: `radial-gradient(60% 130% at 0% 50%, ${accentTint(module.accent, 7)}, transparent 75%)`,
                    opacity: isActive ? 1 : 0,
                  }}
                />

                <span
                  className="relative z-10 text-[34px] leading-none font-bold tabular-nums transition-colors duration-300"
                  style={{ color: isActive ? accentStroke[module.accent] : "rgba(255,255,255,0.18)" }}
                >
                  {module.number}
                </span>

                <h3
                  className="relative z-10 text-[19px] leading-tight font-semibold transition-colors duration-300"
                  style={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.62)" }}
                >
                  {t(`items.${module.id}.title`)}
                </h3>

                <p
                  className="relative z-10 text-body-sm text-pretty transition-colors duration-300"
                  style={{ color: isActive ? "rgba(226,231,240,0.8)" : "rgba(226,231,240,0.4)" }}
                >
                  {t(`items.${module.id}.statement`)}
                </p>
              </div>
            );
          })}

          <div className="relative h-[2px] w-full" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
            <motion.div
              className="absolute inset-y-0 rounded-full"
              style={{ backgroundColor: accentStroke[activeModule.accent] }}
              animate={{ left: `${(active / principleModules.length) * 100}%`, width: `${100 / principleModules.length}%` }}
              transition={{ duration: 0.35, ease: easePremium }}
            />
          </div>
        </div>

        <ol className="flex flex-col gap-5 md:hidden">
          {principleModules.map((module, i) => {
            const Icon = module.icon;
            return (
              <motion.li
                key={module.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "120px" }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: easePremium }}
                className="relative flex gap-4"
              >
                {i < principleModules.length - 1 ? (
                  <span className="bg-border-subtle absolute top-10 bottom-[-20px] left-5 w-px" aria-hidden />
                ) : null}
                <span
                  className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                  style={{ background: accentTint(module.accent, 16), border: `1px solid ${accentTint(module.accent, 40)}` }}
                >
                  <Icon className="h-4 w-4" style={{ color: accentStroke[module.accent] }} aria-hidden />
                </span>
                <div className="flex flex-col gap-1 pt-1">
                  <span className="text-caption text-foreground-secondary/50 font-semibold">{module.number}</span>
                  <h3 className="text-body font-semibold text-foreground">{t(`items.${module.id}.title`)}</h3>
                  <p className="text-body-sm text-foreground-secondary text-pretty">{t(`items.${module.id}.statement`)}</p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
