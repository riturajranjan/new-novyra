"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { TechBadge } from "@/components/why-choose/tech-badge";
import { featureStrip, techCategories, trustMetrics, type TechCategory } from "@/content/why-choose";
import { accentStroke, accentTint } from "@/lib/accent";
import { easePremium } from "@/lib/motion";

function TechCategoryCard({ category, index }: { category: TechCategory; index: number }) {
  const t = useTranslations("whyChoose");
  const Icon = category.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "150px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: easePremium }}
      className="border-border-subtle bg-surface/50 shadow-card relative flex flex-col gap-4 overflow-hidden rounded-xl border p-5 backdrop-blur-lg md:gap-5 md:p-6"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-16 rounded-t-[24px] bg-gradient-to-b from-white/8 to-transparent"
      />
      <div className="relative flex items-center gap-3">
        <span className="bg-foreground/5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
          <Icon className="text-foreground-secondary h-5 w-5" aria-hidden />
        </span>
        <p className="text-title text-foreground font-semibold">{t(`techCategories.${category.id}.label`)}</p>
      </div>
      <p className="text-body-sm text-foreground-secondary relative -mt-2">{t(`techCategories.${category.id}.reason`)}</p>
      <div className="relative flex flex-wrap gap-2.5">
        {category.items.map((item, i) => (
          <TechBadge key={item.name} name={item.name} color={item.color} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

/** The "Trusted Technologies" block — a section header, one large floating
 * glass container holding four categorized technology cards, a premium
 * feature strip, and a trust-metrics strip. Every number shown is real
 * (a real technology count, a real engineering standard) — never an
 * invented project count, satisfaction score, or uptime figure. */
export function TrustedTechnologies() {
  const t = useTranslations("whyChoose");
  return (
    <div className="flex flex-col gap-9 md:gap-14">
      <div className="mx-auto flex max-w-[760px] flex-col items-center gap-3 text-center md:gap-4">
        <span
          className="text-caption font-medium uppercase"
          style={{
            letterSpacing: "0.35em",
            backgroundImage: "linear-gradient(90deg, #3B82F6, #22D3EE)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          {t("trustedTechnologies.eyebrow")}
        </span>
        <h3 className="text-headline sm:text-display-lg text-foreground text-balance font-bold">
          {t("trustedTechnologies.heading")}
        </h3>
        <p className="text-body-lg text-foreground-secondary text-balance">
          {t("trustedTechnologies.description")}
        </p>
      </div>

      {/* main glass container */}
      <div className="glass-strong shadow-card relative w-full overflow-hidden rounded-2xl p-5 md:p-12">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/10 to-transparent" />
        <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2">
          {techCategories.map((category, i) => (
            <TechCategoryCard key={category.id} category={category} index={i} />
          ))}
        </div>
      </div>

      {/* feature strip */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {featureStrip.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "150px" }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: easePremium }}
              className="group border-border-subtle bg-surface/60 shadow-card relative flex flex-col gap-3 overflow-hidden rounded-xl border p-5 backdrop-blur-lg transition-shadow duration-base md:gap-4 md:p-6"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-8 -z-10 rounded-[36px] opacity-0 blur-2xl transition-opacity duration-slow group-hover:opacity-100"
                style={{ backgroundColor: accentTint(item.accent, 24) }}
              />
              <motion.span
                whileHover={{ rotate: 8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex h-11 w-11 items-center justify-center rounded-2xl"
                style={{ backgroundColor: accentTint(item.accent, 16) }}
              >
                <Icon className="h-5 w-5" style={{ color: accentStroke[item.accent] }} aria-hidden />
              </motion.span>
              <div>
                <p className="text-body text-foreground font-semibold">{t(`featureStrip.${item.id}.label`)}</p>
                <p className="text-body-sm text-foreground-secondary mt-1">{t(`featureStrip.${item.id}.detail`)}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* trust metrics */}
      <div className="glass shadow-card rounded-3xl px-5 py-6 md:px-10 md:py-8">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          {trustMetrics.map((metric, i) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "150px" }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: easePremium }}
              className="text-center"
            >
              <p className="text-display-lg text-gradient-brand font-bold">{t(`trustMetrics.${metric.id}.value`)}</p>
              <p className="text-caption text-foreground-secondary mt-1">{t(`trustMetrics.${metric.id}.label`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
