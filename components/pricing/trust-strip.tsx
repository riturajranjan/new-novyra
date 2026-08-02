"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { pricingTrustStrip } from "@/content/pricing";
import { easePremium } from "@/lib/motion";

/** Compact row of glass pill capsules below the comparison panel — the
 * short, delivery-process version of the pricing trust story (distinct
 * from the header's broader trust chips and the fuller "Why Our Pricing
 * Works" cards further down the page, both of which stay as-is). Renders
 * without its own outer glass shell — see ComparePanel's doc comment; the
 * parent wraps both together as one connected card. */
export function TrustStrip() {
  const t = useTranslations("pricing");
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5 p-5 sm:gap-3 sm:p-6">
      {pricingTrustStrip.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "150px" }}
            transition={{ duration: 0.4, delay: i * 0.05, ease: easePremium }}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2"
          >
            <Icon className="text-brand-blue h-3.5 w-3.5 shrink-0" aria-hidden />
            <span className="text-body-sm font-medium text-white/70">{t(`trustStrip.${item.id}`)}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
