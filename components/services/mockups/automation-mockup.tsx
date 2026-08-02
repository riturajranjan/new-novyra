"use client";

import { Zap, Workflow, CheckCircle2, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { accentStroke, accentTint } from "@/lib/accent";
import { easePremium } from "@/lib/motion";
import type { AccentColor } from "@/content/hero-screens";

const STAGES = [
  { id: "trigger", icon: Zap },
  { id: "workflow", icon: Workflow },
  { id: "action", icon: CheckCircle2 },
  { id: "report", icon: BarChart3 },
];

/** Trigger → Workflow → Action → Report — the generic shape of any
 * automation, illustrated rather than any specific client's real pipeline. */
export function AutomationMockup({ accent }: { accent: AccentColor }) {
  const t = useTranslations("services");
  const stroke = accentStroke[accent];

  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 px-6 py-8">
      <div className="relative flex w-full max-w-sm items-center justify-between">
        <span aria-hidden className="absolute top-1/2 right-6 left-6 h-px -translate-y-1/2" style={{ backgroundColor: accentTint(accent, 30) }} />
        {STAGES.map((stage, i) => {
          const Icon = stage.icon;
          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: i * 0.1, ease: easePremium }}
              className="relative z-10 flex flex-col items-center gap-2"
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-full border-2"
                style={{ borderColor: stroke, backgroundColor: accentTint(accent, 18) }}
              >
                <Icon className="h-4.5 w-4.5" style={{ color: stroke }} aria-hidden />
              </span>
              <span className="text-caption text-foreground-secondary font-medium">{t(`mockups.automation.stages.${stage.id}`)}</span>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5, ease: easePremium }}
        className="glass w-full max-w-sm rounded-xl px-4 py-3"
      >
        <p className="text-caption text-foreground-secondary mb-2 font-semibold tracking-wide uppercase">
          {t("mockups.automation.exampleLabel")}
        </p>
        <p className="text-body-sm text-foreground">{t("mockups.automation.exampleText")}</p>
      </motion.div>
    </div>
  );
}
