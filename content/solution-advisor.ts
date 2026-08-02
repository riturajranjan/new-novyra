import type { LucideIcon } from "lucide-react";
import {
  Award,
  Globe,
  LayoutDashboard,
  LineChart,
  Lightbulb,
  Megaphone,
  Palette,
  Rocket,
  Rows3,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Sprout,
  Target,
  TrendingUp,
  UserCog,
  Workflow,
} from "lucide-react";

/** Structural identity only — id + icon. Every label/description/badge/
 * timeline string lives in messages/{locale}/advisor.json, keyed by `id`,
 * so this file doesn't change per locale. `id` is also what drives
 * selection state in the advisor components (translated label text can't
 * be used as a stable key or identity — it differs per locale). */
export interface AdvisorOptionMeta {
  id: string;
  icon: LucideIcon;
}

/** Fully-formed option with translated text, built at render time by
 * mapping an `AdvisorOptionMeta` through `useTranslations("advisor")`. This
 * is the shape every advisor component (GoalPathway, StageTimeline,
 * SolutionCard, AdvisorOptionRow, SolutionSelector) already expects. */
export interface AdvisorOption extends AdvisorOptionMeta {
  label: string;
  description: string;
  /** Short at-a-glance badge — only populated for Step 1/2 options. */
  badge?: string;
  /** Approximate timeline range — only populated for Step 1/2 options; the
   * roadmap result later refines this per project stage. */
  timeline?: string;
}

/** Step 1 — what the visitor wants to build. Every option maps back to one
 * of Novyra's five real service lines, never an invented offering. */
/** Five entry points mapping to Novyra's real service lines — not eight,
 * since three of the original eight (Hospital Platform, School ERP, CRM
 * System) were industry-specific dressings of the same underlying service
 * (saas-development) presented as if they were separate off-the-shelf
 * products. They're still reachable as industry examples inside the SaaS
 * Product recommendation itself, just not as competing top-level buttons. */
export const needOptions: AdvisorOptionMeta[] = [
  { id: "business-website", icon: Globe },
  { id: "ecommerce", icon: ShoppingCart },
  { id: "saas-product", icon: LayoutDashboard },
  { id: "branding", icon: Palette },
  { id: "digital-marketing", icon: Megaphone },
];

/** Step 2 — the outcome that matters most right now. Used to surface a
 * relevant focus note on the result, not to change which service is
 * recommended. */
export const goalOptions: AdvisorOptionMeta[] = [
  { id: "generate-leads", icon: Target },
  { id: "sell-online", icon: ShoppingBag },
  { id: "automate-operations", icon: Workflow },
  { id: "launch-mvp", icon: Rocket },
  { id: "improve-brand", icon: Sparkles },
  { id: "manage-customers", icon: UserCog },
  { id: "improve-seo", icon: LineChart },
  { id: "scale-product", icon: TrendingUp },
];

export type StageId = "idea" | "starting" | "growing" | "scaling" | "established";

/** Step 3 — where the business is today. Shifts the estimated-timeline
 * range only. */
export const stageOptions: (AdvisorOptionMeta & { id: StageId })[] = [
  { id: "idea", icon: Lightbulb },
  { id: "starting", icon: Sprout },
  { id: "growing", icon: TrendingUp },
  { id: "scaling", icon: Rows3 },
  { id: "established", icon: Award },
];

/** Which phrasing template the estimated timeline uses — only
 * "digital-marketing" uses the "to launch" variant. Structural only; the
 * actual template text ("{range} weeks" / "{range} weeks to launch") lives
 * in messages under `timelineTemplates`. */
export type TimelineUnit = "weeks" | "weeksToLaunch";

interface NeedRecommendation {
  serviceId: string;
  /** Ordered list of roadmap phase ids — stable slugs (never containing a
   * "." so they're safe as next-intl message-path segments), looked up in
   * messages under `roadmapPhases.<id>.title` / `.description`. */
  roadmap: string[];
  /** Numeric week range only (e.g. "3–4") — the unit word is translated
   * separately via `timelineUnit` + `timelineTemplates`. */
  timelineByStage: Record<StageId, string>;
  timelineUnit: TimelineUnit;
}

/** The recommendation engine — needId -> serviceId, roadmap phase ids, and
 * timeline ranges. This mapping (which need produces which service/roadmap/
 * timeline) is the part that must never change; only the display text that
 * used to live inline here has moved to messages/{locale}/advisor.json
 * under `recommendations.<needId>`. */
const recommendations: Record<string, NeedRecommendation> = {
  "business-website": {
    serviceId: "web-design",
    roadmap: [
      "brand-ux-planning",
      "premium-website-design",
      "nextjs-development",
      "lead-capture-setup",
      "seo-analytics-setup",
      "launch-support",
    ],
    timelineByStage: {
      idea: "3–4",
      starting: "3–5",
      growing: "4–5",
      scaling: "5–6",
      established: "5–7",
    },
    timelineUnit: "weeks",
  },
  ecommerce: {
    serviceId: "web-development",
    roadmap: [
      "catalog-ux-planning",
      "storefront-design",
      "nextjs-storefront-build",
      "payments-checkout",
      "order-management-setup",
      "launch-support",
    ],
    timelineByStage: {
      idea: "5–6",
      starting: "5–7",
      growing: "6–8",
      scaling: "8–10",
      established: "8–12",
    },
    timelineUnit: "weeks",
  },
  "saas-product": {
    serviceId: "saas-development",
    roadmap: [
      "product-architecture-planning",
      "core-platform-ux-design",
      "multi-tenant-development",
      "billing-onboarding-setup",
      "admin-dashboards",
      "launch-support",
    ],
    timelineByStage: {
      idea: "6–7",
      starting: "6–9",
      growing: "9–11",
      scaling: "11–14",
      established: "12–16",
    },
    timelineUnit: "weeks",
  },
  branding: {
    serviceId: "graphic-design",
    roadmap: ["brand-discovery", "logo-identity-design", "brand-guidelines", "collateral-templates", "handover-support"],
    timelineByStage: {
      idea: "2–3",
      starting: "2–3",
      growing: "3–4",
      scaling: "3–5",
      established: "4–6",
    },
    timelineUnit: "weeks",
  },
  "digital-marketing": {
    serviceId: "digital-marketing",
    roadmap: ["audit-strategy", "tracking-analytics-setup", "campaign-content-setup", "launch-optimisation", "monthly-reporting"],
    timelineByStage: {
      idea: "3–4",
      starting: "3–4",
      growing: "2–3",
      scaling: "4–5",
      established: "4–6",
    },
    timelineUnit: "weeksToLaunch",
  },
};

export type RoadmapStatusCategory = "planning" | "design" | "development" | "setup" | "launch";

/** One entry per unique roadmap phase id used across every recommendation —
 * just the category chip (a small closed set, reused across every service),
 * since the title/description text itself lives in messages under
 * `roadmapPhases.<id>`. Several phase ids repeat across services (e.g.
 * "launch-support"), so this is keyed by id rather than duplicated
 * per-service. */
const ROADMAP_PHASE_STATUS: Record<string, RoadmapStatusCategory> = {
  "brand-ux-planning": "planning",
  "premium-website-design": "design",
  "nextjs-development": "development",
  "lead-capture-setup": "setup",
  "seo-analytics-setup": "setup",
  "launch-support": "launch",
  "catalog-ux-planning": "planning",
  "storefront-design": "design",
  "nextjs-storefront-build": "development",
  "payments-checkout": "setup",
  "order-management-setup": "setup",
  "product-architecture-planning": "planning",
  "core-platform-ux-design": "design",
  "multi-tenant-development": "development",
  "billing-onboarding-setup": "setup",
  "admin-dashboards": "development",
  "brand-discovery": "planning",
  "logo-identity-design": "design",
  "brand-guidelines": "design",
  "collateral-templates": "development",
  "handover-support": "launch",
  "audit-strategy": "planning",
  "tracking-analytics-setup": "setup",
  "campaign-content-setup": "setup",
  "launch-optimisation": "launch",
  "monthly-reporting": "launch",
};

export function getRoadmapPhaseInfo(phaseId: string): { statusCategory: RoadmapStatusCategory } {
  return { statusCategory: ROADMAP_PHASE_STATUS[phaseId] ?? "planning" };
}

export interface AdvisorResult {
  serviceId: string;
  /** Echoes the inputs so the result component can look up the
   * corresponding display text (service name, insight, technology,
   * deliverables, focus) in messages without re-deriving them here. */
  needId: string;
  goalId: string;
  roadmap: string[];
  /** Numeric week range only (e.g. "3–4") — combine with `timelineUnit`
   * via messages' `timelineTemplates` to get the displayed phrase. */
  timeline: string;
  timelineUnit: TimelineUnit;
}

export function getRecommendation(needId: string, goalId: string, stageId: StageId): AdvisorResult | null {
  const rec = recommendations[needId];
  if (!rec) return null;
  return {
    serviceId: rec.serviceId,
    needId,
    goalId,
    roadmap: rec.roadmap,
    timeline: rec.timelineByStage[stageId],
    timelineUnit: rec.timelineUnit,
  };
}
