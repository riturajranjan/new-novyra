import type { LucideIcon } from "lucide-react";
import { Building2, GraduationCap, Globe, HeartPulse, Landmark, LayoutDashboard, Plane, ShoppingCart, UtensilsCrossed } from "lucide-react";
import type { AccentColor } from "@/content/hero-screens";

export type CaseStudyFilter = "All" | "Healthcare" | "Education" | "Business" | "SaaS" | "eCommerce" | "CRM" | "AI" | "Travel" | "Finance";

/** These values are stable ids used for filtering/comparison, not display
 * text — the visible filter label comes from messages/{locale}/caseStudies.json
 * under `filters`, keyed by the same value. */
export const filters: CaseStudyFilter[] = [
  "All",
  "Healthcare",
  "Education",
  "Business",
  "SaaS",
  "eCommerce",
  "CRM",
  "Travel",
  "Finance",
  "AI",
];

export interface ConceptBuild {
  id: string;
  category: Exclude<CaseStudyFilter, "All">;
  techStack: string[];
  icon: LucideIcon;
  accent: AccentColor;
  /** Real image asset path under public/work/ (e.g. "/work/education.png"),
   * rendered via next/image in components/case-studies/project-visual.tsx.
   * Left unset for concept builds that don't have one yet, in which case
   * that component falls back to an honestly-abstract embedded
   * composition instead of fabricating a screenshot. */
  image?: string;
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
    image: "/work/healthcare.png",
  },
  {
    id: "school-erp",
    category: "Education",
    techStack: ["Next.js", "Node.js", "PostgreSQL"],
    icon: GraduationCap,
    accent: "purple",
    image: "/work/education.png",
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
    image: "/work/professional-services.png",
  },
  {
    id: "ecommerce-platform",
    category: "eCommerce",
    techStack: ["Next.js", "Node.js", "PostgreSQL"],
    icon: ShoppingCart,
    accent: "amber",
    image: "/work/commerce.png",
  },
  {
    id: "travel-platform",
    category: "Travel",
    techStack: ["Next.js", "Node.js", "PostgreSQL"],
    icon: Plane,
    accent: "emerald",
    image: "/work/travel.png",
  },
  {
    id: "fintech-platform",
    category: "Finance",
    techStack: ["Next.js", "Node.js", "PostgreSQL"],
    icon: Landmark,
    accent: "blue",
    image: "/work/finance.png",
  },
];

/** The six shown in the homepage's "Selected Work" grid (see
 * components/sections/case-studies.tsx), in display order: Education,
 * Healthcare, Retail & eCommerce, Travel & Hospitality, Finance,
 * Professional Services/SaaS. Each has a real image under public/work/.
 * The full nine (these six plus restaurant-website, real-estate-crm,
 * business-website) live on the dedicated /work page
 * (app/[locale]/work/page.tsx), which uses the original FeaturedConcept/
 * ConceptCard components untouched — the homepage stage uses its own
 * separate components instead of modifying those. */
export const homepageStageIds = [
  "school-erp",
  "hospital-platform",
  "ecommerce-platform",
  "travel-platform",
  "fintech-platform",
  "ai-saas-dashboard",
] as const;

/** Structural ids only — labels live in messages/{locale}/caseStudies.json
 * under `processSteps`, keyed by `id`. Same six stages, same order, as the
 * canonical process in content/process-steps.ts (see components/sections/
 * our-process.tsx) — this is a compact restatement of that one process,
 * not a second, different one. */
export const processStepIds = ["discovery", "strategy", "design", "development", "testing", "launch"] as const;

export type ProcessStepId = (typeof processStepIds)[number];

export const techStackBadges = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Prisma", "OpenAI", "AWS", "Vercel"];
