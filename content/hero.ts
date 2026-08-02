import type { LucideIcon } from "lucide-react";
import { CircleCheckBig, Code2, ShieldCheck, Sparkles } from "lucide-react";
import type { AccentColor } from "@/content/hero-screens";

export interface HeroBadgeItem {
  id: string;
  accent: AccentColor;
}

/** The floating four-dot badge above the headline. Structural only — label
 * text lives in messages/{locale}/hero.json under `badge.items.<id>`. */
export const heroBadgeItems: HeroBadgeItem[] = [
  { id: "websites", accent: "blue" },
  { id: "webApps", accent: "purple" },
  { id: "automation", accent: "cyan" },
  { id: "ai", accent: "pink" },
];

export interface HeroTrustItem {
  id: string;
  icon: LucideIcon;
  accent: AccentColor;
}

/** Capability-based proof, never time/volume-based (no years-in-business,
 * no client/project counts) — Novyra has no history to cite yet, so trust
 * is earned through what the team actually builds. Label text lives in
 * messages/{locale}/hero.json under `trust.items.<id>`. */
export const heroTrustItems: HeroTrustItem[] = [
  { id: "nextjsSpecialists", icon: Code2, accent: "blue" },
  { id: "aiPoweredDevelopment", icon: Sparkles, accent: "pink" },
  { id: "enterpriseArchitecture", icon: ShieldCheck, accent: "emerald" },
  { id: "productionReady", icon: CircleCheckBig, accent: "purple" },
];
