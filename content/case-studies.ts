import type { LucideIcon } from "lucide-react";
import { Building2, Globe, GraduationCap, HeartPulse, LayoutDashboard, UtensilsCrossed } from "lucide-react";
import type { AccentColor } from "@/content/hero-screens";

export type CaseStudyFilter = "All" | "Healthcare" | "Education" | "Business" | "SaaS" | "eCommerce" | "CRM" | "AI";

/** These values are stable ids used for filtering/comparison, not display
 * text — the visible filter label comes from messages/{locale}/caseStudies.json
 * under `filters`, keyed by the same value. */
export const filters: CaseStudyFilter[] = ["All", "Healthcare", "Education", "Business", "SaaS", "eCommerce", "CRM", "AI"];

export interface ConceptBuild {
  id: string;
  category: Exclude<CaseStudyFilter, "All">;
  techStack: string[];
  icon: LucideIcon;
  accent: AccentColor;
}

/** Structural data only — industryLabel/title/description/highlights/timeline
 * text lives in messages/{locale}/caseStudies.json under `builds`, keyed by
 * `id`, so this file doesn't change per locale. `techStack` entries are
 * product/technology names (Next.js, PostgreSQL, etc.) and are intentionally
 * not translated.
 *
 * These are concept explorations, not completed client engagements —
 * Novyra is a new studio without a real project history to cite yet, so
 * nothing here claims a real client, a real measured outcome, or a real
 * launch date. Timelines match the same estimates already used in the
 * Solution Advisor for consistency. */
export const conceptBuilds: ConceptBuild[] = [
  {
    id: "hospital-platform",
    category: "Healthcare",
    techStack: ["Next.js", "Node.js", "PostgreSQL"],
    icon: HeartPulse,
    accent: "cyan",
  },
  {
    id: "school-erp",
    category: "Education",
    techStack: ["Next.js", "Node.js", "PostgreSQL"],
    icon: GraduationCap,
    accent: "emerald",
  },
  {
    id: "restaurant-website",
    category: "Business",
    techStack: ["Next.js", "Tailwind CSS"],
    icon: UtensilsCrossed,
    accent: "amber",
  },
  {
    id: "real-estate-crm",
    category: "CRM",
    techStack: ["Next.js", "Node.js", "PostgreSQL"],
    icon: Building2,
    accent: "purple",
  },
  {
    id: "business-website",
    category: "Business",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    icon: Globe,
    accent: "blue",
  },
  {
    id: "ai-saas-dashboard",
    category: "SaaS",
    techStack: ["Next.js", "Node.js", "OpenAI", "PostgreSQL"],
    icon: LayoutDashboard,
    accent: "pink",
  },
];

/** Structural ids only — labels live in messages/{locale}/caseStudies.json
 * under `processSteps`, keyed by `id`. The generic delivery process every
 * concept (and every real project) would move through — not a specific
 * historical timeline for a specific past client. */
export const processStepIds = ["discovery", "design", "development", "testing", "launch", "growth"] as const;

export type ProcessStepId = (typeof processStepIds)[number];

export const techStackBadges = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Prisma", "OpenAI", "AWS", "Vercel"];
