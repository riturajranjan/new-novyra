import type { LucideIcon } from "lucide-react";
import { Bot, Boxes, Globe, LayoutDashboard, Megaphone, Palette } from "lucide-react";
import type { AccentColor } from "@/content/hero-screens";

export type WhatWeDoSide = "left" | "right";

export interface WhatWeDoCategory {
  id: string;
  icon: LucideIcon;
  accent: AccentColor;
  side: WhatWeDoSide;
  href: string;
}

/** The homepage's compact "what we do" summary — six categories arranged
 * as a hub-and-spoke (3 left / 3 right, feeding into a central "Services"
 * hub), each linking to the full interactive explorer on /services rather
 * than repeating its depth here. Structural data only — title/description
 * text lives in messages/{locale}/services.json under `homeCategories.<id>`. */
export const whatWeDoCategories: WhatWeDoCategory[] = [
  { id: "website-design-development", icon: Globe, accent: "blue", side: "left", href: "/services" },
  { id: "saas-web-applications", icon: LayoutDashboard, accent: "purple", side: "left", href: "/services" },
  { id: "ai-automation", icon: Bot, accent: "amber", side: "left", href: "/services" },
  { id: "digital-marketing", icon: Megaphone, accent: "pink", side: "right", href: "/services" },
  { id: "ui-ux-branding", icon: Palette, accent: "cyan", side: "right", href: "/services" },
  { id: "custom-business-software", icon: Boxes, accent: "emerald", side: "right", href: "/services" },
];
