import type { LucideIcon } from "lucide-react";
import { AppWindow, Blocks, BadgePercent, Boxes, Building2, Code2, Globe, Mail, Megaphone, Package, Palette, Sparkles } from "lucide-react";

export type NavAccent = "blue" | "purple" | "cyan" | "pink" | "emerald";

export interface NavLeaf {
  id: string;
  href: string;
  icon: LucideIcon;
  accent: NavAccent;
  /** Only meaningful on the "services" item's children — splits the mega
   * menu into the "Build" and "Improve" groups the site's positioning is
   * built around (see components/sections/why-choose-novyra.tsx and the
   * homepage service-line cards). Every other dropdown renders as one flat
   * list regardless of this field. */
  group?: "build" | "improve";
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
 * identity — it differs per locale).
 *
 * The site is one long homepage plus a dedicated `/about` page — there are
 * no standalone `/services`, `/pricing`, `/blog`, `/clients`, `/products`,
 * or `/solutions` routes. Every href below is either a real page or an
 * in-page anchor (`/#id`) to a section that actually exists; there is
 * nothing here that resolves to a 404. Blog and Clients are intentionally
 * absent — there's no blog content and no client roster yet, and a nav
 * entry pointing at either would be exactly the kind of unearned claim
 * this rebuild removes. Add them back once there's something real to
 * link to. */
export const navItems: NavItem[] = [
  {
    id: "services",
    href: "/#services",
    icon: Code2,
    children: [
      { id: "websites", href: "/#services", icon: Globe, accent: "blue", group: "build" },
      { id: "webApplications", href: "/#services", icon: AppWindow, accent: "cyan", group: "build" },
      { id: "saasProducts", href: "/#services", icon: Boxes, accent: "emerald", group: "build" },
      { id: "automationAi", href: "/#services", icon: Sparkles, accent: "purple", group: "improve" },
      { id: "digitalGrowth", href: "/#services", icon: Megaphone, accent: "pink", group: "improve" },
      { id: "brandDesign", href: "/#services", icon: Palette, accent: "blue", group: "improve" },
    ],
    secondaryAction: { id: "getRecommendation", href: "/#advisor" },
  },
  { id: "work", href: "/work", icon: Package },
  { id: "process", href: "/#process", icon: Blocks },
  { id: "pricing", href: "/#pricing", icon: BadgePercent },
  {
    id: "about",
    href: "/about",
    icon: Building2,
    children: [
      { id: "aboutUs", href: "/about#about-us", icon: Building2, accent: "blue" },
      { id: "mission", href: "/about#mission", icon: Sparkles, accent: "purple" },
      { id: "whyChooseUs", href: "/about#why-choose-us", icon: Boxes, accent: "cyan" },
      { id: "faq", href: "/#faq", icon: AppWindow, accent: "pink" },
    ],
  },
  { id: "contact", href: "/#contact", icon: Mail },
];
