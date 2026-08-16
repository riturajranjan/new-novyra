"use client";

import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { whatWeBuildItems } from "@/content/about";
import { accentStroke, accentTint } from "@/lib/accent";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** A 6-column asymmetric-span bento grid — spans map directly onto Tailwind
 * grid-span classes below. */
const SPAN_CLASS: Record<number, string> = {
  2: "sm:col-span-3 lg:col-span-2",
  3: "sm:col-span-6 lg:col-span-3",
  6: "sm:col-span-6",
};

const PREVIEW_HEIGHTS = [0.9, 0.6, 0.4];

/** "What We Build" — a real asymmetric bento (not six identical cards):
 * each tile carries an icon, a one-line value statement, a tiny accent
 * skeleton "preview", and an explore arrow. The sixth, full-width tile
 * (AI-Powered Solutions) closes the grid the same way `post-launch` closes
 * the homepage's why-choose bento. */
export function WhatWeBuild() {
  const t = useTranslations("about.whatWeBuild");

  return (
    <section className="relative isolate py-14 md:py-20">
      <Container className="flex flex-col gap-10 md:gap-14">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={
            <>
              {t("titleLine1")}
              <br className="hidden sm:block" /> <span className="text-gradient-brand">{t("titleHighlight")}</span>
            </>
          }
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "120px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-5 sm:grid-cols-6"
        >
          {whatWeBuildItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.id} variants={fadeInUp} className={cn("col-span-1", SPAN_CLASS[item.span])}>
                <Link
                  href={item.href}
                  style={{ "--tile-border": accentTint(item.accent, 45) } as CSSProperties}
                  className="glass shadow-card group hover:ring-(--tile-border) relative flex h-full flex-col justify-between gap-6 rounded-[26px] p-6 transition-shadow duration-base hover:ring-1"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
                      style={{ background: accentTint(item.accent, 16) }}
                    >
                      <Icon className="h-5 w-5" style={{ color: accentStroke[item.accent] }} aria-hidden />
                    </span>
                    <span aria-hidden className="hidden shrink-0 items-end gap-1 sm:flex">
                      {PREVIEW_HEIGHTS.map((h, i) => (
                        <span
                          key={i}
                          className="w-1.5 rounded-full"
                          style={{ height: `${h * 28}px`, background: accentTint(item.accent, 14 + i * 8) }}
                        />
                      ))}
                    </span>
                  </div>
                  <div>
                    <p className="text-title-lg font-semibold tracking-[-0.01em] text-foreground">
                      {t(`items.${item.id}.label`)}
                    </p>
                    <p className="text-body-sm text-foreground-secondary mt-1.5 max-w-[440px] text-pretty">
                      {t(`items.${item.id}.description`)}
                    </p>
                  </div>
                  <span className="text-caption group-hover:text-gradient-brand inline-flex items-center gap-1.5 font-semibold text-foreground transition-colors">
                    {t("explore")}
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-fast group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
