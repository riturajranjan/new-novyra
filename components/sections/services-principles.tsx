"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { ServicesPrinciplesBackground } from "@/components/services/services-principles-background";
import { easePremium } from "@/lib/motion";

const principleIds = ["clearScope", "directCollaboration", "modernEngineering", "builtForGrowth"] as const;

/** Section 06 — "Why Novyra," compressed to four honest working
 * principles read as flowing typography (number + statement) separated
 * by thin rules, not a fourth grid of cards on a page that's already
 * mostly typography and diagrams. */
export function ServicesPrinciples() {
  const t = useTranslations("services.principles");

  return (
    <section className="relative isolate overflow-hidden py-14 md:py-16 lg:py-20">
      <ServicesPrinciplesBackground />

      <Container className="flex flex-col gap-10 md:gap-12">
        <h2
          className="max-w-xl font-bold text-balance text-white"
          style={{ fontSize: "clamp(30px, 3.4vw, 46px)", lineHeight: 1.12, letterSpacing: "-0.02em" }}
        >
          {t("headingLine1")}
          <br />
          {t("headingLine2")}
        </h2>

        <div className="grid grid-cols-1 divide-y divide-white/8 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {principleIds.map((id, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: easePremium }}
              className="flex flex-col gap-2.5 py-6 first:pt-0 lg:px-7 lg:py-0 lg:first:pl-0 lg:last:pr-0"
            >
              <span className="text-caption font-mono font-semibold text-white/30 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-body-lg font-semibold text-white">{t(`items.${id}.title`)}</h3>
              <p className="text-body-sm text-white/55">{t(`items.${id}.description`)}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
