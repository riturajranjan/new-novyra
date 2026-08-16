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

/** The four shown in the homepage's single-project "Selected Work" stage
 * (see components/sections/case-studies.tsx) — Education first (matches
 * the stage's default active project), then Healthcare, SaaS, Real Estate.
 * The full six, including these four, live on the dedicated /work page
 * (app/[locale]/work/page.tsx), which uses the original FeaturedConcept/
 * ConceptCard components untouched — the homepage stage uses its own
 * separate components instead of modifying those. */
export const homepageStageIds = ["school-erp", "hospital-platform", "ai-saas-dashboard", "real-estate-crm"] as const;

/** Structural ids only — labels live in messages/{locale}/caseStudies.json
 * under `processSteps`, keyed by `id`. Same six stages, same order, as the
 * canonical process in content/process-steps.ts (see components/sections/
 * our-process.tsx) — this is a compact restatement of that one process,
 * not a second, different one. */
export const processStepIds = ["discovery", "strategy", "design", "development", "testing", "launch"] as const;

export type ProcessStepId = (typeof processStepIds)[number];

export const techStackBadges = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Prisma", "OpenAI", "AWS", "Vercel"];
