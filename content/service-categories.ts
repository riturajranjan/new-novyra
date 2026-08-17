import type { LucideIcon } from "lucide-react";
import { Code, LayoutDashboard, LayoutTemplate, Megaphone, Palette, Sparkles } from "lucide-react";
import type { AccentColor } from "@/content/hero-screens";

export type ServiceVisual = "website" | "development" | "saas" | "automation" | "marketing" | "design";

/** Structural data only — every label/subtitle/description/bestFor/
 * keyBenefits/deliverables/timeline string lives in
 * messages/{locale}/services.json under `categories.<id>`, keyed by `id`, so
 * this file doesn't change per locale. `technologies` stays here rather than
 * in the message files: it's brand/tool names (Next.js, Figma, PostgreSQL...)
 * which per the translation guidelines are not translated. `id` is also what
 * drives active/selected state in the services components — translated text
 * can't be used as a stable key or identity since it differs per locale. */
export interface ServiceCategory {
  id: string;
  icon: LucideIcon;
  accent: AccentColor;
  /** Representative tools/stack for this service line — proper nouns, not translated. */
  technologies: string[];
  visual: ServiceVisual;
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "web-design",
    icon: LayoutTemplate,
    accent: "blue",
    technologies: ["Figma", "Next.js", "Tailwind CSS", "Framer Motion"],
    visual: "website",
  },
  {
    id: "web-development",
    icon: Code,
    accent: "cyan",
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    visual: "development",
  },
  {
    id: "saas-development",
    icon: LayoutDashboard,
    accent: "purple",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "REST/GraphQL APIs"],
    visual: "saas",
  },
  {
    id: "automation-ai",
    icon: Sparkles,
    accent: "amber",
    technologies: ["OpenAI", "Vercel AI SDK", "Node.js", "Webhooks"],
    visual: "automation",
  },
  {
    id: "digital-marketing",
    icon: Megaphone,
    accent: "pink",
    technologies: ["Google Ads", "Meta Ads Manager", "SEO Tooling", "Analytics"],
    visual: "marketing",
  },
  {
    id: "graphic-design",
    icon: Palette,
    accent: "emerald",
    technologies: ["Figma", "Adobe Illustrator", "Adobe Photoshop"],
    visual: "design",
  },
];

