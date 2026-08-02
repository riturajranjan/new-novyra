import type { LucideIcon } from "lucide-react";
import { AppWindow, Globe, Megaphone, Palette, Sparkles } from "lucide-react";
import type { AccentColor } from "@/content/hero-screens";

export interface CoreServiceLine {
  id: string;
  icon: LucideIcon;
  accent: AccentColor;
}

/** The three primary service lines from the positioning brief — the ones
 * that get top billing in the homepage hierarchy. Structural data only —
 * title/description text lives in messages/{locale}/coreServices.json
 * under `lines.<id>`. */
export const coreServiceLines: CoreServiceLine[] = [
  { id: "websites", icon: Globe, accent: "blue" },
  { id: "webApps", icon: AppWindow, accent: "purple" },
  { id: "automation", icon: Sparkles, accent: "emerald" },
];

export interface SupportingService {
  id: string;
  icon: LucideIcon;
}

/** Digital marketing and brand design — real capabilities, but deliberately
 * shown smaller and after the three primary lines so they read as
 * supporting services, not equal competitors to the engineering work.
 * Label text lives in messages/{locale}/coreServices.json under
 * `supporting.<id>`. */
export const supportingServices: SupportingService[] = [
  { id: "digitalGrowth", icon: Megaphone },
  { id: "brandDesign", icon: Palette },
];
