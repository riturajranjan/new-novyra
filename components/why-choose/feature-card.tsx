"use client";

import { CircleCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { accentStroke, accentTint } from "@/lib/accent";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { FeatureCard as FeatureCardData } from "@/content/why-choose";

const SPAN_CLASS: Record<number, string> = {
  2: "sm:col-span-3 lg:col-span-2",
  3: "sm:col-span-6 lg:col-span-3",
  6: "sm:col-span-6",
};

interface FeatureCardProps {
  card: FeatureCardData;
  index: number;
}

/** One bento feature card — colored icon, title, description, a short
 * bullet list, and an optional technical-standard metric badge. Never a
 * flat surface: gradient fill, top reflection, and an accent glow that
 * brightens on hover. */
export function FeatureCard({ card, index }: FeatureCardProps) {
  const t = useTranslations("whyChoose.featureCards");
  const Icon = card.icon;
  const stroke = accentStroke[card.accent];
  const bullets = t.raw(`${card.id}.bullets`) as string[];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "150px" }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: easePremium }}
      className={cn(
        "group border-border-subtle relative col-span-1 flex flex-col gap-3 overflow-hidden rounded-hero border p-5 backdrop-blur-xl transition-shadow duration-base md:gap-4 md:p-7",
        "bg-surface/70",
        SPAN_CLASS[card.span] ?? "sm:col-span-3 lg:col-span-2",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/10 to-transparent"
      />
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

      <div className="flex items-start justify-between gap-4">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-base group-hover:-translate-y-0.5 group-hover:rotate-3"
          style={{ backgroundColor: accentTint(card.accent, 16) }}
        >
          <Icon className="h-6 w-6" style={{ color: stroke }} aria-hidden />
        </span>
        {card.hasMetric ? (
          <div className="text-right">
            <p className="text-caption text-foreground-secondary uppercase tracking-wide">{t(`${card.id}.metricLabel`)}</p>
            <p className="text-title-lg font-semibold" style={{ color: stroke }}>
              {t(`${card.id}.metricValue`)}
            </p>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-title text-foreground font-semibold">{t(`${card.id}.title`)}</h3>
        <p className="text-body-sm text-foreground-secondary max-w-md">{t(`${card.id}.description`)}</p>
      </div>

      <ul className="mt-auto flex flex-col gap-2">
        {bullets.map((bullet) => (
          <li key={bullet} className="text-body-sm text-foreground-secondary flex items-start gap-2">
            <CircleCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: stroke }} aria-hidden />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
