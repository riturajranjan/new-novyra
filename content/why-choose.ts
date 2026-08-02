import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Braces,
  Cloud,
  Gauge,
  Headset,
  Layers,
  LayoutDashboard,
  LifeBuoy,
  Palette,
  Search,
  Server,
  Settings2,
  Shield,
  Sparkles,
  Workflow,
} from "lucide-react";
import type { AccentColor } from "@/content/hero-screens";

export interface CapabilityChip {
  id: string;
  icon: LucideIcon;
  accent: AccentColor;
}

/** How the team is actually structured, not a generic skills list.
 * Structural data only — the label text lives in
 * messages/{locale}/whyChoose.json under `capabilityChips.<id>`. */
export const capabilityChips: CapabilityChip[] = [
  { id: "ui-ux", icon: Palette, accent: "purple" },
  { id: "frontend", icon: Braces, accent: "blue" },
  { id: "backend", icon: Server, accent: "cyan" },
  { id: "ai-automation", icon: Sparkles, accent: "emerald" },
  { id: "seo", icon: Search, accent: "blue" },
  { id: "cloud", icon: Cloud, accent: "cyan" },
  { id: "qa", icon: Settings2, accent: "amber" },
  { id: "project-management", icon: Workflow, accent: "pink" },
  { id: "api-development", icon: BarChart3, accent: "purple" },
  { id: "analytics", icon: BarChart3, accent: "emerald" },
];

export interface FeatureCard {
  id: string;
  icon: LucideIcon;
  accent: AccentColor;
  /** Out of 6 grid columns — controls the bento asymmetry. */
  span: number;
  /** Whether this card has a metric badge — the label/value text itself
   * lives in messages/{locale}/whyChoose.json under `featureCards.<id>`. */
  hasMetric?: boolean;
}

/** Every metric here is a technical standard the team builds to, never a
 * claimed historical track record — Novyra doesn't have a client history to
 * cite yet, so nothing here implies one. Structural data only — title,
 * description, bullets, and metric text all live in
 * messages/{locale}/whyChoose.json, keyed by `id`. */
export const featureCards: FeatureCard[] = [
  { id: "seo-architecture", icon: Search, accent: "blue", span: 3 },
  { id: "performance", icon: Gauge, accent: "cyan", span: 3, hasMetric: true },
  { id: "custom-ui", icon: Palette, accent: "purple", span: 2 },
  { id: "cms-dashboard", icon: LayoutDashboard, accent: "amber", span: 2, hasMetric: true },
  { id: "ai-integrations", icon: Sparkles, accent: "emerald", span: 2 },
  { id: "post-launch", icon: LifeBuoy, accent: "pink", span: 6 },
];

export interface FeatureStripItem {
  id: string;
  icon: LucideIcon;
  accent: AccentColor;
}

/** Real capability statements — never a fabricated project count, client
 * satisfaction score, or years-in-business claim. Structural data only —
 * label/detail text lives in messages/{locale}/whyChoose.json under
 * `featureStrip.<id>`. */
export const featureStrip: FeatureStripItem[] = [
  { id: "full-stack-engineering", icon: Layers, accent: "blue" },
  { id: "ai-powered-development", icon: Sparkles, accent: "purple" },
  { id: "enterprise-architecture", icon: Shield, accent: "emerald" },
  { id: "long-term-partnership", icon: Headset, accent: "amber" },
];

export interface TechItem {
  name: string;
  color: string;
}

export interface TechCategory {
  id: string;
  icon: LucideIcon;
  items: TechItem[];
}

/** Grouped by discipline rather than one long list. Colors approximate
 * each technology's real brand mark; Next.js and Vercel use a neutral
 * gray rather than pure white so the badge stays visible in light theme
 * too — their real identity is monochrome, not colored. */
export const techCategories: TechCategory[] = [
  {
    id: "frontend",
    icon: Braces,
    items: [
      { name: "React", color: "#22D3EE" },
      { name: "Next.js", color: "#94A3B8" },
      { name: "TypeScript", color: "#3B82F6" },
      { name: "JavaScript", color: "#EAB308" },
      { name: "HTML5", color: "#F97316" },
      { name: "Tailwind CSS", color: "#38BDF8" },
      { name: "Framer Motion", color: "#A78BFA" },
    ],
  },
  {
    id: "backend",
    icon: Server,
    items: [
      { name: "Node.js", color: "#22C55E" },
      { name: "GraphQL", color: "#EC4899" },
      { name: "REST API", color: "#6366F1" },
      { name: "Express.js", color: "#94A3B8" },
    ],
  },
  {
    id: "database",
    icon: Layers,
    items: [
      { name: "PostgreSQL", color: "#3B82F6" },
      { name: "MongoDB", color: "#22C55E" },
      { name: "MySQL", color: "#F97316" },
      { name: "Redis", color: "#EF4444" },
    ],
  },
  {
    id: "cloud-devops",
    icon: Cloud,
    items: [
      { name: "AWS", color: "#F97316" },
      { name: "Docker", color: "#2563EB" },
      { name: "Vercel", color: "#94A3B8" },
      { name: "GitHub Actions", color: "#8B5CF6" },
    ],
  },
  {
    id: "ai",
    icon: Sparkles,
    items: [
      { name: "OpenAI", color: "#94A3B8" },
      { name: "Vercel AI SDK", color: "#A78BFA" },
    ],
  },
];

export interface TrustMetric {
  id: string;
}

/** Only verifiable facts — a real headcount of technologies/disciplines
 * and a real engineering standard (Lighthouse target), never a claimed
 * project count, client-satisfaction score, or uptime figure Novyra has
 * no data to back. Structural data only — label/value text lives in
 * messages/{locale}/whyChoose.json under `trustMetrics.<id>`. */
export const trustMetrics: TrustMetric[] = [
  { id: "engineering-disciplines" },
  { id: "lighthouse-target" },
  { id: "typescript-codebase" },
];

/** Honest, capability-based badges only — no invented project counts or
 * years-in-business claims. Structural data only — label text lives in
 * messages/{locale}/whyChoose.json under `heroBadges.<id>`. */
export const heroBadges = ["ai-powered", "enterprise-grade"];

/** `label` here is a stable internal identifier only (used for nothing but
 * uniqueness) — it is never rendered, so it is intentionally not moved to
 * messages. Only `initials` render on screen, and those are short role
 * abbreviations (UX/FE/BE/QA), not sentences, so they stay as-is too. */
export const teamRoles: { id: string; initials: string; accent: AccentColor }[] = [
  { id: "design", initials: "UX", accent: "purple" },
  { id: "frontend", initials: "FE", accent: "blue" },
  { id: "backend", initials: "BE", accent: "cyan" },
  { id: "qa", initials: "QA", accent: "amber" },
];
