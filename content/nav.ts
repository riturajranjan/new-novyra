import type { LucideIcon } from "lucide-react";
import {
  AppWindow,
  BadgePercent,
  Blocks,
  Boxes,
  Building2,
  CircleHelp,
  Code2,
  Mail,
  Megaphone,
  Newspaper,
  Package,
  Palette,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

export type NavAccent = "blue" | "purple" | "cyan" | "pink" | "emerald";

export interface NavLeaf {
  id: string;
  href: string;
  icon: LucideIcon;
  accent: NavAccent;
}

export interface NavSecondaryAction {
  id: string;
  href: string;
}

export interface NavItem {
  id: string;
  href: string;
  icon: LucideIcon;
  children?: NavLeaf[];
  secondaryAction?: NavSecondaryAction;
}

/** Structural data only — every label/description/title/cta string lives in
 * messages/{locale}/nav.json, keyed by `id`, so this file doesn't change
 * per locale. `id` is also what drives active/hover/open state in the nav
 * components (translated `label` text can't be used as a stable key or
 * identity — it differs per locale). */
export const navItems: NavItem[] = [
  {
    id: "about",
    href: "/about",
    icon: Building2,
    children: [
      { id: "aboutUs", href: "/about#about-us", icon: Building2, accent: "blue" },
      { id: "mission", href: "/about#mission", icon: Target, accent: "purple" },
      { id: "whyChooseUs", href: "/about#why-choose-us", icon: Sparkles, accent: "cyan" },
      { id: "faq", href: "/about#faq", icon: CircleHelp, accent: "pink" },
    ],
  },
  {
    id: "services",
    href: "/services",
    icon: Code2,
    children: [
      { id: "webDesign", href: "/services/web-design-development", icon: Code2, accent: "blue" },
      { id: "digitalMarketing", href: "/services/digital-marketing", icon: Megaphone, accent: "pink" },
      { id: "webApplications", href: "/services/web-applications", icon: AppWindow, accent: "cyan" },
      { id: "graphicDesign", href: "/services/graphic-design", icon: Palette, accent: "purple" },
      { id: "saasDevelopment", href: "/services/saas-development", icon: Boxes, accent: "emerald" },
    ],
    secondaryAction: { id: "getRecommendation", href: "/contact" },
  },
  { id: "solutions", href: "/solutions", icon: Blocks },
  { id: "products", href: "/products", icon: Package },
  { id: "pricing", href: "/pricing", icon: BadgePercent },
  { id: "blog", href: "/blog", icon: Newspaper },
  { id: "clients", href: "/clients", icon: Users },
  { id: "contact", href: "/contact", icon: Mail },
];
