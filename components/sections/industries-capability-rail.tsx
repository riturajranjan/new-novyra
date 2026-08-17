"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Compass, Link2, PenTool, Code2, TrendingUp } from "lucide-react";
import { Container } from "@/components/ui/container";
import { RippleLink } from "@/components/ui/ripple-link";
import { easePremium } from "@/lib/motion";

const stages = [
  { id: "discover", icon: Compass },
  { id: "design", icon: PenTool },
  { id: "engineer", icon: Code2 },
  { id: "integrate", icon: Link2 },
  { id: "scale", icon: TrendingUp },
];

/** Section 05 — "Different industries. One engineering standard." — an
 * elegant horizontal engineering pipeline (Discover → Design → Engineer
 * → Integrate → Scale), not a list of six service names in a rail
 * anymore: this reframes the Industries→Services bridge as "how we
 * work," letting the Services page itself own "what we build." One thin
 * line draws left→right on scroll, connecting all five stages — the
 * calmest, most blueprint-like section on the page. */
export function IndustriesCapabilityRail() {
  const t = useTranslations("industries.capabilityRail");
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden py-16 md:py-20" style={{ backgroundColor: "#050710" }}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "100% 96px",
        }}
      />

      <Container className="relative flex flex-col gap-12 md:gap-16">
        <h2
          className="max-w-md font-bold text-balance text-white"
          style={{ fontSize: "clamp(30px, 3vw, 44px)", lineHeight: 1.14, letterSpacing: "-0.02em" }}
        >
          {t("headingLine1")}
          <br />
          {t("headingLine2")}
        </h2>

        <div className="relative flex flex-col gap-8 md:flex-row md:items-start md:gap-0">
          <div aria-hidden className="absolute top-5 right-0 left-0 hidden h-px bg-white/8 md:block" />
          <motion.div
            aria-hidden
            className="bg-gradient-brand absolute top-5 left-0 hidden h-px origin-left md:block"
            style={{ right: 0 }}
            initial={reduceMotion ? undefined : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.3, ease: "easeOut", delay: 0.1 }}
          />

          {stages.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.08, ease: easePremium }}
                className="relative flex flex-1 items-start gap-3 md:flex-col md:items-start md:gap-4 md:pr-6"
              >
                <span className="border-border-subtle bg-background relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border">
                  <Icon className="text-brand-blue h-4 w-4" aria-hidden />
                </span>
                <div className="flex flex-col gap-1 pt-1.5 md:pt-0">
                  <span className="text-caption font-mono text-white/30">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-body-sm font-semibold text-white">{t(`stages.${stage.id}.title`)}</span>
                  <span className="text-caption text-foreground-secondary max-w-40">{t(`stages.${stage.id}.phrase`)}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <RippleLink
          href="/services"
          className="group text-body-sm flex w-fit items-center gap-1.5 font-semibold text-white/60 transition-colors duration-base hover:text-white"
        >
          {t("exploreCta")}
          <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-1" aria-hidden />
        </RippleLink>
      </Container>
    </section>
  );
}
