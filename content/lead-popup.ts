import type { LucideIcon } from "lucide-react";
import { Brain, Globe, HeartPulse, Rocket } from "lucide-react";

/** Structural ids only — every user-facing label lives in
 * messages/{locale}/leadPopup.json, keyed by these same ids. */
export const serviceOptionIds = [
  "businessWebsite",
  "webApplication",
  "saasDevelopment",
  "hospitalErp",
  "schoolErp",
  "crm",
  "digitalMarketing",
  "graphicDesign",
] as const;

export type ServiceOptionId = (typeof serviceOptionIds)[number];

export const budgetOptionIds = ["b25to50k", "b50kTo1L", "b1LTo3L", "b3LPlus"] as const;

export type BudgetOptionId = (typeof budgetOptionIds)[number];

export const trustPointIds = ["freeConsultation", "noHiddenCharges", "response24h"] as const;

export interface FloatingIcon {
  id: string;
  icon: LucideIcon;
  /** Position within the illustration panel, percent of its bounding box. */
  top: string;
  left: string;
  /** Idle float loop tuning — varied per icon so they drift out of phase. */
  bob: number;
  duration: number;
  delay: number;
}

/** Trimmed to four — website / AI / hospital / growth — a representative
 * spread rather than the full six-vertical list, so the chips stay legible
 * and can't crowd the (now narrower, 38%) illustration column. Positions
 * are kept well inset from the column's own edges so nothing bleeds into
 * the form next to it. */
export const floatingIcons: FloatingIcon[] = [
  { id: "website", icon: Globe, top: "8%", left: "8%", bob: 5, duration: 7, delay: 0 },
  { id: "ai", icon: Brain, top: "12%", left: "62%", bob: 6, duration: 8, delay: 0.5 },
  { id: "hospital", icon: HeartPulse, top: "74%", left: "60%", bob: 5, duration: 7.5, delay: 1 },
  { id: "growth", icon: Rocket, top: "78%", left: "8%", bob: 6, duration: 6.5, delay: 1.4 },
];

export const whatsappHref = "https://wa.me/917903724407";
