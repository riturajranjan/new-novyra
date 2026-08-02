"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { accentStroke, accentTint } from "@/lib/accent";
import { easePremium } from "@/lib/motion";
import type { QuickContactCard as QuickContactCardData } from "@/content/contact-cta";

interface QuickContactCardProps {
  card: QuickContactCardData;
  index: number;
}

/** One of the four quick-contact glass cards — floating icon, glow on
 * hover, gradient-tinted border, and a lift on hover. */
export function QuickContactCard({ card, index }: QuickContactCardProps) {
  const t = useTranslations("contact");
  const Icon = card.icon;
  const stroke = accentStroke[card.accent];
  const external = card.href.startsWith("http") || card.href.startsWith("mailto") || card.href.startsWith("tel");
  const title = t(`quickContactCards.${card.id}.title`);

  return (
    <motion.a
      href={card.href}
      target={card.href.startsWith("http") ? "_blank" : undefined}
      rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "150px" }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: easePremium }}
      className="group border-border-subtle bg-surface/70 relative flex min-h-[76px] flex-row items-center gap-3 overflow-hidden rounded-xl border p-4 backdrop-blur-xl transition-shadow duration-base md:flex-col md:items-start md:gap-3 md:p-6"
      aria-label={`${title}${external ? t("opensInNewTab") : ""}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-2xl opacity-0 blur-2xl transition-opacity duration-slow group-hover:opacity-100"
        style={{ backgroundColor: accentTint(card.accent, 20) }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-base group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 0 1px ${accentTint(card.accent, 45)}` }}
      />
      <motion.span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl md:h-12 md:w-12"
        style={{ backgroundColor: accentTint(card.accent, 16) }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3.5 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Icon className="h-5 w-5 md:h-6 md:w-6" style={{ color: stroke }} aria-hidden />
      </motion.span>
      <div className="flex min-w-0 flex-col gap-0.5 md:gap-1">
        <h4 className="text-body-sm md:text-title text-foreground truncate font-semibold">{title}</h4>
        <p className="text-caption md:text-body-sm text-foreground-secondary truncate">{t(`quickContactCards.${card.id}.detail`)}</p>
        <p className="text-caption text-foreground-secondary/80 hidden md:block">{t(`quickContactCards.${card.id}.note`)}</p>
      </div>
    </motion.a>
  );
}
