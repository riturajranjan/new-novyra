"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { trustBarItems } from "@/content/our-promise";
import { easePremium } from "@/lib/motion";

/** Top trust strip — real operating commitments (how we work), never a
 * star rating or review count Novyra doesn't have yet. */
export function TrustBar() {
  const t = useTranslations("promise.trustBar");
  return (
    <div className="glass mx-auto flex max-w-full flex-wrap items-center justify-center gap-x-8 gap-y-4 rounded-hero px-6 py-5 sm:gap-x-10">
      {trustBarItems.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "150px" }}
            transition={{ duration: 0.45, delay: i * 0.05, ease: easePremium }}
            className="flex items-center gap-2.5"
          >
            <span className="bg-brand-emerald/12 flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
              <Icon className="text-brand-emerald h-4 w-4" aria-hidden />
            </span>
            <div className="flex flex-col">
              <span className="text-body-sm text-foreground leading-tight font-semibold">{t(`${item.id}.label`)}</span>
              <span className="text-caption text-foreground-secondary leading-tight">{t(`${item.id}.detail`)}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
