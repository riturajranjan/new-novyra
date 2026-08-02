"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { accentStroke, accentTint } from "@/lib/accent";
import { easePremium } from "@/lib/motion";
import type { ValueCard as ValueCardData } from "@/content/pricing";

interface ValueCardProps {
  card: ValueCardData;
  index: number;
}

/** One "Why Our Pricing Works" glass card — icon, title, description, glow
 * on hover. */
export function ValueCard({ card, index }: ValueCardProps) {
  const t = useTranslations("pricing");
  const Icon = card.icon;
  const stroke = accentStroke[card.accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "150px" }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: easePremium }}
      className="group border-border-subtle bg-surface/60 relative flex flex-col items-center gap-3 overflow-hidden rounded-xl border p-6 text-center backdrop-blur-xl transition-shadow duration-base"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-2xl opacity-0 blur-2xl transition-opacity duration-slow group-hover:opacity-100"
        style={{ backgroundColor: accentTint(card.accent, 20) }}
      />
      <span
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-base group-hover:-translate-y-0.5 group-hover:rotate-3"
        style={{ backgroundColor: accentTint(card.accent, 16) }}
      >
        <Icon className="h-6 w-6" style={{ color: stroke }} aria-hidden />
      </span>
      <h4 className="text-title text-foreground font-semibold">{t(`whyItWorks.cards.${card.id}.title`)}</h4>
      <p className="text-body-sm text-foreground-secondary">{t(`whyItWorks.cards.${card.id}.description`)}</p>
    </motion.div>
  );
}
