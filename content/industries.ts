import type { LucideIcon } from "lucide-react";
import { Briefcase, GraduationCap, HeartPulse, Landmark, Plane, ShoppingCart } from "lucide-react";
import type { AccentColor } from "@/content/hero-screens";

export interface Industry {
  id: string;
  icon: LucideIcon;
  accent: AccentColor;
  href: string;
  /** TEMPORARY IMAGE — left unset. The brief asked for placeholder photos
   * pulled from two named reference agencies' live sites; that would mean
   * redistributing another company's copyrighted photography on Novyra's
   * own site, so none was copied — real or licensed images belong here
   * once available (e.g. "/industries/education.jpg", dropped into
   * public/industries/). Until then the panel renders a generated
   * gradient/texture placeholder instead — see
   * components/industries/industry-panel-visual.tsx. */
  image?: string;
}

/** Shared between the homepage's compact industries panel and the full
 * /industries page — same six industries, same ids; the page renders fuller
 * copy for each while the homepage shows the short version. Structural data
 * only — title/headline/description/capabilities text lives in
 * messages/{locale}/industries.json under `items.<id>`. */
export const industries: Industry[] = [
  { id: "education", icon: GraduationCap, accent: "blue", href: "/industries" },
  { id: "healthcare", icon: HeartPulse, accent: "cyan", href: "/industries" },
  { id: "retail-ecommerce", icon: ShoppingCart, accent: "emerald", href: "/industries" },
  { id: "travel-hospitality", icon: Plane, accent: "amber", href: "/industries" },
  { id: "finance", icon: Landmark, accent: "purple", href: "/industries" },
  { id: "professional-services", icon: Briefcase, accent: "pink", href: "/industries" },
];
