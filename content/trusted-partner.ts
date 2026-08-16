import type { LucideIcon } from "lucide-react";
import { Compass, Handshake, Layers, Palette } from "lucide-react";
import type { AccentColor } from "@/content/hero-screens";

export interface Differentiator {
  id: string;
  icon: LucideIcon;
  accent: AccentColor;
}

/** The four differentiators behind the homepage's "Trusted Partner" section
 * — structural data only, title/description text lives in
 * messages/{locale}/trustedPartner.json under `items.<id>`. */
export const differentiators: Differentiator[] = [
  { id: "product-first-thinking", icon: Compass, accent: "blue" },
  { id: "design-engineering-together", icon: Palette, accent: "purple" },
  { id: "built-to-scale", icon: Layers, accent: "cyan" },
  { id: "long-term-partnership", icon: Handshake, accent: "amber" },
];
