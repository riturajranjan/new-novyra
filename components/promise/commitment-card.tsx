"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { accentStroke, accentTint } from "@/lib/accent";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { CommitmentCard as CommitmentCardData } from "@/content/our-promise";

const SPAN_CLASS: Record<number, string> = {
  2: "sm:col-span-3 lg:col-span-2",
  3: "sm:col-span-6 lg:col-span-3",
  6: "sm:col-span-6",
};

interface CommitmentCardProps {
  card: CommitmentCardData;
  index: number;
}

/** One bento card in the commitments grid — replaces a testimonial card
 * with an operating promise instead of an attributed client quote. */
export function CommitmentCard({ card, index }: CommitmentCardProps) {
  const t = useTranslations("promise.commitmentCards");
  const Icon = card.icon;
  const stroke = accentStroke[card.accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "150px" }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: easePremium }}
      className={cn(
        "group border-border-subtle bg-surface/70 relative col-span-1 flex flex-col gap-4 overflow-hidden rounded-hero border p-7 backdrop-blur-xl transition-shadow duration-base",
        SPAN_CLASS[card.span] ?? "sm:col-span-3 lg:col-span-2",
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/10 to-transparent" />
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] opacity-0 blur-3xl transition-opacity duration-slow group-hover:opacity-100"
        style={{ backgroundColor: accentTint(card.accent, 22) }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-hero opacity-0 transition-opacity duration-base group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 0 1px ${accentTint(card.accent, 45)}` }}
      />

      <span
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-base group-hover:-translate-y-0.5 group-hover:rotate-3"
        style={{ backgroundColor: accentTint(card.accent, 16) }}
      >
        <Icon className="h-6 w-6" style={{ color: stroke }} aria-hidden />
      </span>

      <div className="flex flex-col gap-2">
        <h4 className="text-title text-foreground font-semibold">{t(`${card.id}.title`)}</h4>
        <p className="text-body-sm text-foreground-secondary max-w-md">{t(`${card.id}.description`)}</p>
      </div>
    </motion.div>
  );
}
