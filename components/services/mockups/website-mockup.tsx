"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { accentStroke, accentTint } from "@/lib/accent";
import { easePremium } from "@/lib/motion";
import type { AccentColor } from "@/content/hero-screens";

const navLinkIds = ["home", "work", "services", "contact"] as const;
const quickLinkIds = ["features", "services", "about", "contact"] as const;

/** Full landing-page mockup (browser chrome, navbar, hero, feature cards,
 * testimonial, pricing, footer) for the Web Design service preview, with a
 * small phone preview alongside it. Illustrative demo copy only. */
export function WebsiteMockup({ accent }: { accent: AccentColor }) {
  const t = useTranslations("services");
  const stroke = accentStroke[accent];
  const tint = (p: number) => accentTint(accent, p);

  return (
    <div className="flex h-full min-h-0 gap-3 p-3 sm:gap-4 sm:p-4">
      <div className="border-border-subtle flex min-w-0 flex-[3] flex-col overflow-hidden rounded-xl border">
        <div className="border-border-subtle flex items-center gap-1.5 border-b px-3 py-2">
          <span className="bg-foreground/15 h-2 w-2 rounded-full" />
          <span className="bg-foreground/15 h-2 w-2 rounded-full" />
          <span className="bg-foreground/15 h-2 w-2 rounded-full" />
          <span className="bg-foreground/5 text-foreground-secondary ml-2 h-5 flex-1 truncate rounded-full px-3 text-[10px] leading-5">
            novyra.studio
          </span>
        </div>

        <div className="border-border-subtle flex items-center gap-3 border-b px-4 py-2.5">
          <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: stroke }} />
          <span className="bg-foreground/15 h-1.5 w-10 rounded-full" />
          <nav className="text-caption text-foreground-secondary ml-auto hidden gap-3 sm:flex">
            {navLinkIds.map((id) => (
              <span key={id}>{t(`mockups.website.navLinks.${id}`)}</span>
            ))}
          </nav>
        </div>

        <div className="border-border-subtle flex items-center gap-4 border-b px-4 py-3">
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: easePremium }}
            className="min-w-0 flex-1"
          >
            <span
              className="inline-block rounded-full px-2 py-0.5 font-medium tracking-wide uppercase"
              style={{ fontSize: "10px", color: stroke, backgroundColor: tint(14) }}
            >
              {t("mockups.website.hero.badge")}
            </span>
            <p
              className="text-foreground mt-1.5 leading-tight font-semibold whitespace-pre-line"
              style={{ fontSize: "clamp(14px, 2vw, 22px)" }}
            >
              {t("mockups.website.hero.title")}
            </p>
            <p
              className="text-foreground-secondary mt-1 line-clamp-2"
              style={{ fontSize: "clamp(11px, 1.5vw, 13px)" }}
            >
              {t("mockups.website.hero.description")}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span
                className="inline-block rounded-full px-3 py-1 font-medium text-white"
                style={{ backgroundColor: stroke, fontSize: "clamp(10px, 1.2vw, 12px)" }}
              >
                {t("mockups.website.hero.cta")}
              </span>
              <span
                className="border-border-subtle inline-block rounded-full border px-3 py-1 font-medium"
                style={{ fontSize: "clamp(10px, 1.2vw, 12px)" }}
              >
                {t("mockups.website.hero.secondaryCta")}
              </span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.1, ease: easePremium }}
            className="hidden h-16 w-24 shrink-0 rounded-lg sm:block"
            style={{ backgroundColor: tint(20) }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.34, ease: easePremium }}
          className="border-border-subtle flex items-center gap-2.5 border-b px-4 py-2.5"
        >
          <span className="h-6 w-6 shrink-0 rounded-full" style={{ backgroundColor: tint(24) }} />
          <div className="min-w-0 flex-1">
            <span className="bg-foreground/12 block h-1.5 w-4/5 rounded-full" />
            <span className="bg-foreground/8 mt-1.5 block h-1.5 w-1/2 rounded-full" />
          </div>
        </motion.div>

        <div className="grid grid-cols-4 gap-2 px-4 py-2.5">
          {quickLinkIds.map((id, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.42 + i * 0.06, ease: easePremium }}
              className="border-border-subtle rounded-md border py-1.5 text-center"
            >
              <p className="text-foreground-secondary px-1" style={{ fontSize: "clamp(9px, 1.6vw, 12px)" }}>
                {t(`mockups.website.quickLinks.${id}`)}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="border-border-subtle mt-auto flex items-center justify-between border-t px-4 py-2">
          <span className="bg-foreground/10 h-1.5 w-16 rounded-full" />
          <span className="bg-foreground/10 h-1.5 w-10 rounded-full" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15, ease: easePremium }}
        className="border-border-subtle hidden w-16 shrink-0 flex-col overflow-hidden rounded-[1.1rem] border sm:flex sm:w-20"
      >
        <div className="border-border-subtle flex items-center justify-center border-b py-1.5">
          <span className="bg-foreground/20 h-1 w-6 rounded-full" />
        </div>
        <div className="flex flex-1 flex-col gap-1.5 p-2">
          <span className="h-8 rounded-md" style={{ backgroundColor: tint(16) }} />
          <span className="h-1.5 w-full rounded-full" style={{ backgroundColor: tint(20) }} />
          <span className="h-1.5 w-3/4 rounded-full" style={{ backgroundColor: tint(14) }} />
          <span className="mt-1 h-5 rounded-full" style={{ backgroundColor: stroke }} />
          <span className="h-10 flex-1 rounded-md" style={{ backgroundColor: tint(10) }} />
        </div>
      </motion.div>
    </div>
  );
}
