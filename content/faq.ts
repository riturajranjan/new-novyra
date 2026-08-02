import type { LucideIcon } from "lucide-react";
import { BadgeIndianRupee, Clock, ShieldCheck, Users } from "lucide-react";

export interface FaqStat {
  id: string;
  icon: LucideIcon;
}

/** Labels live in messages/{locale}/faq.json under `infoPanel.stats`,
 * keyed by `id`. */
export const faqPanelStats: FaqStat[] = [
  { id: "responseTime", icon: Clock },
  { id: "freeConsultation", icon: Users },
  { id: "dedicatedExperts", icon: ShieldCheck },
  { id: "noHiddenCharges", icon: BadgeIndianRupee },
];

export type FaqCategory =
  | "General"
  | "Pricing"
  | "Development"
  | "Support"
  | "SEO"
  | "AI"
  | "Integrations";

/** These values are stable ids used for filtering/comparison, not display
 * text — the visible tab label comes from messages/{locale}/faq.json
 * under `categories`, keyed by the same value. */
export const faqCategories: FaqCategory[] = [
  "General",
  "Pricing",
  "Development",
  "Support",
  "SEO",
  "AI",
  "Integrations",
];

export interface FaqEntry {
  id: string;
  category: Exclude<FaqCategory, "All">;
}

/** Structural data only — question/answer text lives in
 * messages/{locale}/faq.json under `entries`, keyed by `id`, so this file
 * doesn't change per locale. */
export const faqEntries: FaqEntry[] = [
  // General
  { id: "general-why-novyra", category: "General" },
  { id: "general-industries", category: "General" },
  { id: "general-process", category: "General" },
  { id: "general-international", category: "General" },
  { id: "general-nda", category: "General" },
  // Pricing
  { id: "pricing-cost", category: "Pricing" },
  { id: "pricing-custom", category: "Pricing" },
  { id: "pricing-consultation-free", category: "Pricing" },
  { id: "pricing-hidden-charges", category: "Pricing" },
  { id: "pricing-milestones", category: "Pricing" },
  { id: "pricing-upgrade", category: "Pricing" },
  // Development
  { id: "dev-tech-stack", category: "Development" },
  { id: "dev-responsive", category: "Development" },
  { id: "dev-custom-software", category: "Development" },
  { id: "dev-admin-dashboards", category: "Development" },
  { id: "dev-api-integrations", category: "Development" },
  // Support
  { id: "support-post-launch", category: "Support" },
  { id: "support-response-time", category: "Support" },
  { id: "support-maintain-existing", category: "Support" },
  { id: "support-monitoring", category: "Support" },
  { id: "support-new-features", category: "Support" },
  // SEO
  { id: "seo-included", category: "SEO" },
  { id: "seo-google", category: "SEO" },
  { id: "seo-speed", category: "SEO" },
  { id: "seo-ongoing", category: "SEO" },
  { id: "seo-migration", category: "SEO" },
  // AI
  { id: "ai-integrate", category: "AI" },
  { id: "ai-models", category: "AI" },
  { id: "ai-automate", category: "AI" },
  { id: "ai-saas", category: "AI" },
  { id: "ai-secure", category: "AI" },
  // Integrations
  { id: "integrations-payment", category: "Integrations" },
  { id: "integrations-crm-erp", category: "Integrations" },
  { id: "integrations-analytics", category: "Integrations" },
  { id: "integrations-notifications", category: "Integrations" },
  { id: "integrations-apis", category: "Integrations" },
];
