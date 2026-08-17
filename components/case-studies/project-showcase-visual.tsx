"use client";

import { motion } from "framer-motion";
import { FlaskConical } from "lucide-react";
import { useTranslations } from "next-intl";
import { accentTint } from "@/lib/accent";
import { easePremium } from "@/lib/motion";
import type { AccentColor } from "@/content/hero-screens";

type Variant = "education" | "healthcare" | "saas";

const ROWS: Record<Variant, { left: string[]; right: string[] }> = {
  education: {
    left: ["Attendance", "Timetable", "Fee Status", "Assignments"],
    right: ["Admissions", "Staff Directory", "Reports", "Announcements"],
  },
  healthcare: {
    left: ["Patient Record", "Appointments", "Prescriptions", "Lab Results"],
    right: ["Ward Occupancy", "Staff Roster", "Billing", "Department Load"],
  },
  saas: {
    left: ["Workspace", "Members", "Usage", "Billing"],
    right: ["Tenant A", "Tenant B", "Tenant C", "+ New Tenant"],
  },
};

const LEFT_TITLE: Record<Variant, string> = {
  education: "Student & Parent View",
  healthcare: "Patient View",
  saas: "Admin Console",
};

const RIGHT_TITLE: Record<Variant, string> = {
  education: "Admin Console",
  healthcare: "Operations View",
  saas: "Tenant Directory",
};

/** A meaningful, domain-specific composition for the Selected Work
 * showcase — two honest interface panels side by side (the two real
 * audiences every one of these concept builds serves: the end user and
 * the operations/admin side), not a generic browser-chrome bar chart.
 * Still explicitly labeled "Concept" — nothing here claims to be a real
 * client screenshot. */
export function ProjectShowcaseVisual({ variant, accent }: { variant: Variant; accent: AccentColor }) {
  const t = useTranslations("caseStudies");
  const rows = ROWS[variant];

  return (
    <div className="border-border-subtle bg-surface/70 relative flex h-full w-full flex-col overflow-hidden rounded-2xl border backdrop-blur-md">
      <div className="border-border-subtle flex items-center justify-between border-b px-4 py-2.5">
        <span className="bg-foreground/5 text-foreground-secondary flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px]">
          {t("preview.label")}
        </span>
        <span className="border-brand-amber/50 bg-brand-amber/15 text-brand-amber inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold">
          <FlaskConical className="h-2.5 w-2.5" aria-hidden />
          {t("conceptBadge")}
        </span>
      </div>

      <div className="grid flex-1 grid-cols-2 divide-x divide-white/8">
        {([LEFT_TITLE, RIGHT_TITLE] as const).map((titleMap, col) => (
          <div key={col} className="flex flex-col gap-2.5 p-3.5 sm:p-4">
            <span className="text-caption text-foreground-secondary font-semibold tracking-wide uppercase">
              {titleMap[variant]}
            </span>
            <div className="flex flex-col gap-2">
              {(col === 0 ? rows.left : rows.right).map((label, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: col === 0 ? -6 : 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.06 + i * 0.05, ease: easePremium }}
                  className="flex items-center gap-2 rounded-lg border p-2"
                  style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: i === 0 ? accentTint(accent, 10) : "transparent" }}
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: accentTint(accent, i === 0 ? 90 : 55) }} />
                  <span className="text-caption text-foreground truncate">{label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
