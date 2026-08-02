import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Briefcase,
  Code2,
  Compass,
  Crown,
  FileCode,
  LifeBuoy,
  Palette,
  Plug,
  Rocket,
  Rows3,
  ScrollText,
  ShieldCheck,
  Sparkles,
  TestTube2,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import type { AccentColor } from "@/content/hero-screens";

/** Structural ids only — every user-facing string (plan name/tagline/
 * features/cta, row & group titles, card copy, timeline/trust-strip labels)
 * lives in messages/{locale}/pricing.json, keyed by these same ids, so this
 * file doesn't change per locale. Ids are also what drives key props, Set
 * membership, and lookup logic in the pricing components — translated text
 * can't be used for any of that since it differs per locale. */
export type BillingMode = "project" | "retainer";

export const billingModes: { id: BillingMode }[] = [{ id: "project" }, { id: "retainer" }];

export interface PricingPlan {
  id: string;
  icon: LucideIcon;
  accent: AccentColor;
  featured?: boolean;
  /** Whether the spotlight shows a small label above the price (e.g.
   * "Starting From"). False for Enterprise, which prices as "Custom
   * Pricing" with no label above it — this used to be modeled as an
   * empty-string `priceLabel`; kept as an explicit boolean flag now that
   * the label's actual text lives in messages/{locale}/pricing.json, so
   * emptiness-as-a-flag can't accidentally become a truthy translated
   * string. */
  hasPriceLabel: boolean;
  price: Record<BillingMode, string>;
  priceSuffix: Record<BillingMode, string>;
  inheritsFrom?: string;
  /** Feature ids, not display text — text is looked up per plan at
   * `plans.<planId>.features.<featureId>` in messages/{locale}/pricing.json. */
  features: string[];
  ctaHref: string;
}

/** Retainer figures are placeholder monthly-equivalent estimates — the spec
 * only supplied project-based pricing, so these are a reasonable starting
 * point to edit once real retainer terms are set, not a claim already
 * committed to a client. */
export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    icon: Rocket,
    accent: "blue",
    hasPriceLabel: true,
    price: { project: "₹12,999", retainer: "₹7,999" },
    priceSuffix: { project: "+", retainer: "+/mo" },
    features: [
      "responsiveWebsite",
      "modernUiDesign",
      "mobileOptimized",
      "contactForms",
      "basicSeo",
      "cmsIntegration",
      "performanceOptimized",
      "googleAnalytics",
      "twoWeeksSupport",
    ],
    ctaHref: "/contact",
  },
  {
    id: "professional",
    icon: Sparkles,
    accent: "purple",
    featured: true,
    hasPriceLabel: true,
    price: { project: "₹24,999", retainer: "₹15,999" },
    priceSuffix: { project: "+", retainer: "+/mo" },
    inheritsFrom: "starter",
    features: [
      "premiumUiUx",
      "customDevelopment",
      "advancedSeo",
      "blogSystem",
      "dashboard",
      "apiIntegration",
      "aiFeatures",
      "authentication",
      "analyticsDashboard",
      "performanceOptimization",
      "securityHardening",
      "oneMonthSupport",
    ],
    ctaHref: "/contact",
  },
  {
    id: "business",
    icon: Briefcase,
    accent: "cyan",
    hasPriceLabel: true,
    price: { project: "₹49,999", retainer: "₹24,999" },
    priceSuffix: { project: "+", retainer: "+/mo" },
    inheritsFrom: "professional",
    features: [
      "crm",
      "erp",
      "automation",
      "aiIntegration",
      "paymentGateway",
      "notifications",
      "reports",
      "multiUserRoles",
      "cloudDeployment",
      "trainingSessions",
    ],
    ctaHref: "/contact",
  },
  {
    id: "enterprise",
    icon: Crown,
    accent: "amber",
    hasPriceLabel: false,
    price: { project: "Custom Pricing", retainer: "Custom Pricing" },
    priceSuffix: { project: "", retainer: "" },
    features: [
      "dedicatedTeam",
      "architecturePlanning",
      "enterpriseSecurity",
      "devOps",
      "monitoring",
      "slaSupport",
      "priorityDevelopment",
      "unlimitedScalability",
      "dedicatedProjectManager",
      "ongoingMaintenance",
    ],
    ctaHref: "/contact",
  },
];

export type CompareValue = true | false | string;

export interface CompareRow {
  id: string;
  values: Record<string, CompareValue>;
}

/** String-valued cells double as translation-lookup flags now — the
 * `Cell` renderer just checks `typeof value === "string"` and looks up
 * `compareRows.<row.id>.values.<planId>` in messages/{locale}/pricing.json;
 * the actual string kept here is never rendered directly, only used to
 * distinguish a translatable cell from a plain boolean one. */
export const compareRows: CompareRow[] = [
  { id: "responsiveDesign", values: { starter: true, professional: true, business: true, enterprise: true } },
  { id: "seo", values: { starter: "Basic", professional: "Advanced", business: "Advanced", enterprise: "Advanced" } },
  { id: "cms", values: { starter: true, professional: true, business: true, enterprise: true } },
  { id: "dashboard", values: { starter: false, professional: true, business: true, enterprise: true } },
  { id: "aiIntegration", values: { starter: false, professional: "Basic", business: true, enterprise: true } },
  { id: "paymentGateway", values: { starter: false, professional: false, business: true, enterprise: true } },
  { id: "apiSupport", values: { starter: false, professional: true, business: true, enterprise: true } },
  { id: "analytics", values: { starter: "Basic", professional: "Advanced", business: true, enterprise: true } },
  { id: "performance", values: { starter: true, professional: true, business: true, enterprise: true } },
  { id: "security", values: { starter: false, professional: "Hardened", business: true, enterprise: "Enterprise-Grade" } },
  { id: "hostingAssistance", values: { starter: false, professional: false, business: true, enterprise: true } },
  { id: "maintenance", values: { starter: "2 Weeks", professional: "1 Month", business: "1 Month", enterprise: "Ongoing" } },
  { id: "training", values: { starter: false, professional: false, business: true, enterprise: true } },
];

export interface TimelineStep {
  id: string;
  icon: LucideIcon;
}

export const pricingTimeline: TimelineStep[] = [
  { id: "discovery", icon: Compass },
  { id: "planning", icon: Rows3 },
  { id: "design", icon: Palette },
  { id: "development", icon: Code2 },
  { id: "testing", icon: TestTube2 },
  { id: "launch", icon: Rocket },
  { id: "support", icon: LifeBuoy },
];

export interface ValueCard {
  id: string;
  icon: LucideIcon;
  accent: AccentColor;
}

export const valueCards: ValueCard[] = [
  { id: "transparentPricing", icon: Wallet, accent: "blue" },
  { id: "scalablePackages", icon: TrendingUp, accent: "purple" },
  { id: "dedicatedTeam", icon: Users, accent: "cyan" },
  { id: "postLaunchSupport", icon: LifeBuoy, accent: "amber" },
];

/** Presentational-only grouping over each plan's existing `features` array
 * — categorizes the same feature ids for the spotlight's scannable layout
 * without touching the underlying feature data itself. Every feature id
 * across all four plans is mapped explicitly; anything missed falls back to
 * "Engineering" rather than being silently dropped. */
export type FeatureCategory = "Design" | "Engineering" | "Integrations" | "AI" | "Security" | "Growth" | "Support";

export const FEATURE_CATEGORY_ORDER: { category: FeatureCategory; icon: LucideIcon }[] = [
  { category: "Design", icon: Palette },
  { category: "Engineering", icon: Code2 },
  { category: "Integrations", icon: Plug },
  { category: "AI", icon: Bot },
  { category: "Security", icon: ShieldCheck },
  { category: "Growth", icon: TrendingUp },
  { category: "Support", icon: LifeBuoy },
];

const FEATURE_CATEGORY: Record<string, FeatureCategory> = {
  // Starter
  responsiveWebsite: "Design",
  modernUiDesign: "Design",
  mobileOptimized: "Design",
  contactForms: "Engineering",
  basicSeo: "Growth",
  cmsIntegration: "Engineering",
  performanceOptimized: "Engineering",
  googleAnalytics: "Growth",
  twoWeeksSupport: "Support",
  // Professional
  premiumUiUx: "Design",
  customDevelopment: "Engineering",
  advancedSeo: "Growth",
  blogSystem: "Engineering",
  dashboard: "Engineering",
  apiIntegration: "Integrations",
  aiFeatures: "AI",
  authentication: "Security",
  analyticsDashboard: "Growth",
  performanceOptimization: "Engineering",
  securityHardening: "Security",
  oneMonthSupport: "Support",
  // Business
  crm: "Engineering",
  erp: "Engineering",
  automation: "Engineering",
  aiIntegration: "AI",
  paymentGateway: "Integrations",
  notifications: "Integrations",
  reports: "Growth",
  multiUserRoles: "Engineering",
  cloudDeployment: "Engineering",
  trainingSessions: "Support",
  // Enterprise
  dedicatedTeam: "Support",
  architecturePlanning: "Engineering",
  enterpriseSecurity: "Security",
  devOps: "Engineering",
  monitoring: "Engineering",
  slaSupport: "Support",
  priorityDevelopment: "Engineering",
  unlimitedScalability: "Engineering",
  dedicatedProjectManager: "Support",
  ongoingMaintenance: "Support",
};

export interface FeatureGroup {
  category: FeatureCategory;
  icon: LucideIcon;
  /** Feature ids belonging to this group — display text is looked up per
   * plan at `plans.<planId>.features.<featureId>`. */
  items: string[];
}

/** Buckets a plan's feature id list into category groups (in a fixed
 * display order), dropping any category that has no matching items for
 * that plan. */
export function groupFeatures(features: string[]): FeatureGroup[] {
  const byCategory = new Map<FeatureCategory, string[]>();
  for (const feature of features) {
    const category = FEATURE_CATEGORY[feature] ?? "Engineering";
    byCategory.set(category, [...(byCategory.get(category) ?? []), feature]);
  }
  return FEATURE_CATEGORY_ORDER.filter(({ category }) => byCategory.has(category)).map(({ category, icon }) => ({
    category,
    icon,
    items: byCategory.get(category)!,
  }));
}

/** How many individual feature items to reveal before the spotlight's
 * "View all features" control — cuts along whole-group boundaries so a
 * group is never shown half-visible. Always shows at least the first group. */
export function splitFeatureGroups(groups: FeatureGroup[], maxVisible: number) {
  const visible: FeatureGroup[] = [];
  const overflow: FeatureGroup[] = [];
  let count = 0;
  for (const group of groups) {
    if (visible.length === 0 || count + group.items.length <= maxVisible) {
      visible.push(group);
      count += group.items.length;
    } else {
      overflow.push(group);
    }
  }
  const overflowCount = overflow.reduce((sum, g) => sum + g.items.length, 0);
  return { visible, overflow, overflowCount };
}

/** Presentational grouping over the existing `compareRows` — same row data,
 * organized into scannable categories for the collapsible comparison panel.
 * Every row id from `compareRows` is accounted for exactly once. */
export const compareGroups: { id: string; rowIds: string[] }[] = [
  { id: "essentials", rowIds: ["responsiveDesign", "cms", "performance"] },
  { id: "designAndDevelopment", rowIds: ["dashboard", "apiSupport"] },
  { id: "growthAndAnalytics", rowIds: ["seo", "analytics", "aiIntegration"] },
  { id: "advancedFeatures", rowIds: ["paymentGateway", "security", "hostingAssistance"] },
  { id: "supportAndDelivery", rowIds: ["maintenance", "training"] },
];

export interface TrustStripItem {
  id: string;
  icon: LucideIcon;
}

/** The compact strip below the comparison panel — distinct from the fuller
 * `valueCards` section further down the page; this is the short,
 * delivery-process version of the same trust story. */
export const pricingTrustStrip: TrustStripItem[] = [
  { id: "milestonePayments", icon: Wallet },
  { id: "sourceCodeOwnership", icon: FileCode },
  { id: "transparentScope", icon: ScrollText },
  { id: "postLaunchSupport", icon: LifeBuoy },
];
