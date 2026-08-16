import type { LucideIcon } from "lucide-react";
import { Briefcase, GraduationCap, HeartPulse, Landmark, Plane, ShoppingCart } from "lucide-react";
import type { AccentColor, ScreenLayout } from "@/content/hero-screens";

export interface Industry {
  id: string;
  icon: LucideIcon;
  accent: AccentColor;
  /** Which abstract skeleton composition `IndustryVisual` renders for this
   * industry — reuses the same layout vocabulary as content/hero-screens.ts
   * rather than a separate type, so every "illustrative UI" preview across
   * the site draws from one shared set of shapes. */
  layout: ScreenLayout;
}

/** Shared between the homepage's compact industries preview and the full
 * /industries page — same six industries, same ids; the page renders fuller
 * copy for each while the homepage shows the short one-line version.
 * Structural data only — title/outcome/descriptor text lives in
 * messages/{locale}/industries.json under `items.<id>`. */
export const industries: Industry[] = [
  { id: "education", icon: GraduationCap, accent: "blue", layout: "content" },
  { id: "healthcare", icon: HeartPulse, accent: "cyan", layout: "dashboard" },
  { id: "retail-ecommerce", icon: ShoppingCart, accent: "emerald", layout: "grid" },
  { id: "travel-hospitality", icon: Plane, accent: "amber", layout: "content" },
  { id: "finance", icon: Landmark, accent: "purple", layout: "chart" },
  { id: "professional-services", icon: Briefcase, accent: "pink", layout: "kanban" },
];
