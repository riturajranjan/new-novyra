"use client";

import { motion } from "framer-motion";
import { BarChart3, CreditCard, HeartPulse, LayoutDashboard, ShieldCheck, Users } from "lucide-react";
import { GraduationCap } from "lucide-react";
import { useTranslations } from "next-intl";
import { accentStroke, accentTint } from "@/lib/accent";
import { easePremium } from "@/lib/motion";
import type { AccentColor } from "@/content/hero-screens";

const navItems = [
  { id: "dashboard", icon: LayoutDashboard },
  { id: "users", icon: Users },
  { id: "analytics", icon: BarChart3 },
  { id: "billing", icon: CreditCard },
  { id: "roles", icon: ShieldCheck },
];

const highlightIds = ["roleBasedAccess", "customReports", "realtimeAnalytics"] as const;

/** Generic module type only — never a client or company name. */
const modules = [
  { id: "crm", icon: Users },
  { id: "hospitalErp", icon: HeartPulse },
  { id: "schoolErp", icon: GraduationCap },
];

/** SaaS admin mockup — sidebar navigation, feature highlights, and the
 * generic platform module types Novyra builds on. No client names, no
 * fabricated figures — everything here is a category label. */
export function SaasMockup({ accent }: { accent: AccentColor }) {
  const t = useTranslations("services");
  return (
    <div className="grid h-full min-h-0 grid-cols-1 sm:grid-cols-4">
      <div className="border-border-subtle col-span-1 flex flex-row justify-around border-b p-2 sm:flex-col sm:justify-start sm:gap-1 sm:border-r sm:border-b-0 sm:p-3">
        {navItems.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            className={`flex items-center gap-2 rounded-md px-2 py-1.5 ${i === 0 ? "bg-foreground/5" : ""}`}
          >
            <item.icon
              className="h-3.5 w-3.5 shrink-0"
              style={{ color: i === 0 ? accentStroke[accent] : "var(--foreground-secondary)" }}
              aria-hidden
            />
            <span className="text-caption text-foreground-secondary hidden sm:inline">
              {t(`mockups.saas.nav.${item.id}`)}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="col-span-3 flex flex-col justify-center gap-4 p-3 sm:p-4">
        <div className="flex flex-wrap gap-1.5">
          {highlightIds.map((id, i) => (
            <motion.span
              key={id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 + i * 0.08, ease: easePremium }}
              className="text-caption rounded-full px-3 py-1 font-medium"
              style={{ backgroundColor: accentTint(accent, 12), color: accentTint(accent, 95) }}
            >
              {t(`mockups.saas.highlights.${id}`)}
            </motion.span>
          ))}
        </div>

        <div>
          <p className="text-caption text-foreground-secondary mb-2 font-medium tracking-[0.08em] uppercase">
            {t("mockups.saas.modulesTitle")}
          </p>
          <div className="grid grid-cols-3 gap-2">
            {modules.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.3 + i * 0.08, ease: easePremium }}
                className="border-border-subtle flex flex-col items-center gap-1.5 rounded-lg border px-2 py-3"
              >
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{ backgroundColor: accentTint(accent, 14) }}
                >
                  <m.icon className="h-4 w-4" style={{ color: accentStroke[accent] }} aria-hidden />
                </span>
                <span className="text-caption text-foreground-secondary truncate">
                  {t(`mockups.saas.modules.${m.id}`)}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
