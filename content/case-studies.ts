import type { LucideIcon } from "lucide-react";
import { Baby, Building2, GraduationCap, Globe, HeartPulse, Landmark, LayoutDashboard, Plane, ShoppingCart, UtensilsCrossed } from "lucide-react";
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
   * composition instead of fabricating a screenshot. For a live-demo build
   * (see `demoUrl` below) this is a real, captured desktop screenshot of
   * that deployment, not an illustration. */
  image?: string;
  /** Real mobile-viewport screenshot, captured alongside `image` — only set
   * for live-demo builds. Used by the /work/[slug] case study page and
   * anywhere a project's mobile experience is shown. */
  mobileImage?: string;
  /** Public URL of a real, clickable, deployed build — set only for the
   * interactive concept demos (school/preschool/hospital website builds),
   * never for the abstract SaaS/ERP product explorations. Presence of this
   * field is what the UI uses to decide whether to show a "View Live Demo"
   * link and prioritize the build into the Featured slot — it's the
   * strongest form of proof Novyra currently has, real and clickable rather
   * than illustrative. */
  demoUrl?: string;
  /** Additional real screenshots of specific sections of the live demo
   * (beyond the hero `image`/`mobileImage` pair), shown in the case study
   * page's Experience gallery. `id` keys into
   * messages/{locale}/caseStudies.json under `builds.<id>.gallery.<id>` for
   * that shot's caption/alt text. Optional — only set for case studies that
   * have this deeper coverage; the Experience section simply doesn't render
   * this gallery when absent. */
  galleryImages?: { id: string; src: string }[];
  /** Whether this build's case study page shows an "Admission Journey"
   * section — the real, numbered journey the live demo itself presents
   * (verified from the deployment, e.g. Enquire → Visit → Apply →
   * Interaction → Admission), not an invented funnel. Step copy lives in
   * messages/{locale}/caseStudies.json under `builds.<id>.admissionJourney`. */
  hasAdmissionJourney?: boolean;
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
  // Interactive concept demos — real, deployed, clickable websites (not
  // abstract product illustrations like the builds above). Screenshots were
  // captured directly from each live deployment; technologies were verified
  // from each site's actual response markup, not guessed. See `demoUrl`'s
  // doc comment above for how these differ from the SaaS/ERP explorations.
  {
    id: "premium-school-website",
    category: "Education",
    techStack: ["Next.js", "React", "CSS"],
    icon: GraduationCap,
    accent: "purple",
    image: "/work/live/premium-school-website-desktop.webp",
    mobileImage: "/work/live/premium-school-website-mobile.webp",
    demoUrl: "https://school-1-delta-mauve.vercel.app/",
    galleryImages: [
      { id: "learning", src: "/work/live/premium-school-website-learning.webp" },
      { id: "academics", src: "/work/live/premium-school-website-academics.webp" },
      { id: "facilities", src: "/work/live/premium-school-website-facilities.webp" },
      { id: "admissions", src: "/work/live/premium-school-website-admissions.webp" },
      { id: "mobile", src: "/work/live/premium-school-website-admissions-mobile.webp" },
    ],
    hasAdmissionJourney: true,
  },
  {
    id: "admission-focused-school-website",
    category: "Education",
    techStack: ["Next.js", "React", "Tailwind CSS"],
    icon: GraduationCap,
    accent: "amber",
    image: "/work/live/admission-focused-school-website-desktop.webp",
    mobileImage: "/work/live/admission-focused-school-website-mobile.webp",
    demoUrl: "https://school-new02.vercel.app/",
  },
  {
    id: "preschool-website",
    category: "Education",
    techStack: ["React", "Vite", "Tailwind CSS"],
    icon: Baby,
    accent: "pink",
    image: "/work/live/preschool-website-desktop.webp",
    mobileImage: "/work/live/preschool-website-mobile.webp",
    demoUrl: "https://design1-wheat.vercel.app/",
  },
  {
    id: "modern-hospital-website",
    category: "Healthcare",
    techStack: ["Next.js", "React", "Tailwind CSS"],
    icon: HeartPulse,
    accent: "cyan",
    image: "/work/live/modern-hospital-website-desktop.webp",
    mobileImage: "/work/live/modern-hospital-website-mobile.webp",
    demoUrl: "https://hospital-chi-vert.vercel.app/",
  },
];

/** The six shown in the homepage's "Selected Work" grid (see
 * components/sections/case-studies.tsx), in display order. Leads with the
 * two real, live, screenshotted builds (a real website beats an abstract
 * SaaS illustration as proof), then the strongest of the remaining concept
 * explorations. Each has a real image under public/work/. The full set
 * lives on the dedicated /work page (app/[locale]/work/page.tsx), which
 * uses the original FeaturedConcept/ConceptCard components untouched — the
 * homepage stage uses its own separate components instead of modifying
 * those. */
export const homepageStageIds = [
  "premium-school-website",
  "modern-hospital-website",
  "ecommerce-platform",
  "travel-platform",
  "fintech-platform",
  "ai-saas-dashboard",
] as const;

/** Ids of builds with a full /work/[slug] case study page — every build
 * with a `demoUrl` gets one (see app/[locale]/work/[slug]/page.tsx). Kept
 * as an explicit derived list (not just "has demoUrl" inlined everywhere)
 * so the route's generateStaticParams and any "View Case Study" link both
 * read from one place. */
export const caseStudySlugs = conceptBuilds.filter((b) => b.demoUrl).map((b) => b.id);

/** Structural ids only — labels live in messages/{locale}/caseStudies.json
 * under `processSteps`, keyed by `id`. Same six stages, same order, as the
 * canonical process in content/process-steps.ts (see components/sections/
 * our-process.tsx) — this is a compact restatement of that one process,
 * not a second, different one. */
export const processStepIds = ["discovery", "strategy", "design", "development", "testing", "launch"] as const;

export type ProcessStepId = (typeof processStepIds)[number];

export const techStackBadges = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Prisma", "OpenAI", "AWS", "Vercel"];
