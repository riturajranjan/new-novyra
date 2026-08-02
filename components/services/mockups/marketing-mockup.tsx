"use client";

import { motion } from "framer-motion";
import { Megaphone, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { accentStroke, accentTint } from "@/lib/accent";
import { easePremium } from "@/lib/motion";
import type { AccentColor } from "@/content/hero-screens";

/** Illustrative example search phrases — kept in English like real-world
 * SEO keyword research/data would be, not translated as UI copy. */
const keywords = [
  { term: "premium web design agency", position: "#3" },
  { term: "custom saas development", position: "#7" },
  { term: "hospital management software", position: "#12" },
];

const channels = [
  { id: "googleAds", icon: Search },
  { id: "metaAds", icon: Megaphone },
];

const campaignTimelineIds = ["plan", "launch", "optimize", "report"] as const;
const funnel = [
  { id: "visitors", width: "100%" },
  { id: "leads", width: "62%" },
  { id: "customers", width: "28%" },
];

/** SEO score, ad channels, keyword ranking, lead funnel, and campaign
 * timeline for the Digital Marketing service preview. Deliberately no
 * revenue, ROAS, or ad-spend figures — process and rankings only. */
export function MarketingMockup({ accent }: { accent: AccentColor }) {
  const t = useTranslations("services");
  const r = 20;
  const c = 2 * Math.PI * r;
  const score = 92;

  return (
    <div className="flex h-full min-h-0 flex-col gap-3 p-4">
      <div className="flex flex-wrap items-center gap-4">
        <svg viewBox="0 0 50 50" className="h-12 w-12 shrink-0 -rotate-90" aria-hidden>
          <circle cx="25" cy="25" r={r} fill="none" strokeWidth="4" className="stroke-foreground-secondary/15" />
          <motion.circle
            cx="25"
            cy="25"
            r={r}
            fill="none"
            strokeWidth="4"
            strokeLinecap="round"
            stroke={accentStroke[accent]}
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: c - (c * score) / 100 }}
            transition={{ duration: 1, ease: easePremium }}
          />
        </svg>
        <div>
          <p className="text-title-lg text-foreground leading-none font-semibold">{score}/100</p>
          <p className="text-caption text-foreground-secondary mt-1">{t("mockups.marketing.seoScoreLabel")}</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          {channels.map((ch, i) => (
            <motion.span
              key={ch.id}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 + i * 0.08, ease: easePremium }}
              className="text-caption flex items-center gap-1.5 rounded-full px-2.5 py-1 font-medium"
              style={{ backgroundColor: accentTint(accent, 12), color: accentTint(accent, 95) }}
            >
              <ch.icon className="h-3 w-3" aria-hidden />
              {t(`mockups.marketing.channels.${ch.id}`)}
            </motion.span>
          ))}
        </div>
      </div>

      <div className="border-border-subtle rounded-xl border p-3">
        <p className="text-caption text-foreground-secondary mb-2 font-medium tracking-[0.08em] uppercase">
          {t("mockups.marketing.keywordRankingTitle")}
        </p>
        <div className="flex flex-col gap-1.5">
          {keywords.map((k, i) => (
            <motion.div
              key={k.term}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.35 + i * 0.08, ease: easePremium }}
              className="flex items-center justify-between gap-2"
            >
              <span className="text-body-sm text-foreground-secondary truncate">{k.term}</span>
              <span className="text-caption text-foreground shrink-0 font-semibold">{k.position}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="border-border-subtle rounded-xl border p-3">
          <p className="text-caption text-foreground-secondary mb-2.5 font-medium tracking-[0.08em] uppercase">
            {t("mockups.marketing.leadFunnelTitle")}
          </p>
          <div className="flex flex-col gap-1.5">
            {funnel.map((stage, i) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1, ease: easePremium }}
                style={{ transformOrigin: "left" }}
                className="flex items-center gap-2"
              >
                <span
                  className="h-4 rounded-full"
                  style={{ width: stage.width, backgroundColor: accentTint(accent, 22 - i * 6) }}
                />
                <span className="text-caption text-foreground-secondary shrink-0">
                  {t(`mockups.marketing.funnel.${stage.id}`)}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="border-border-subtle rounded-xl border p-3">
          <p className="text-caption text-foreground-secondary mb-2.5 font-medium tracking-[0.08em] uppercase">
            {t("mockups.marketing.campaignTimelineTitle")}
          </p>
          <div className="flex flex-wrap items-center gap-1.5">
            {campaignTimelineIds.map((id, i) => (
              <motion.div key={id} className="flex items-center gap-1.5">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="text-caption rounded-full px-2.5 py-1 font-medium"
                  style={{ backgroundColor: accentTint(accent, 12), color: accentTint(accent, 95) }}
                >
                  {t(`mockups.marketing.timeline.${id}`)}
                </motion.span>
                {i < campaignTimelineIds.length - 1 ? (
                  <span className="text-foreground-secondary/40 text-caption">→</span>
                ) : null}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
