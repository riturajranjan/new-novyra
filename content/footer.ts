import type { LucideIcon } from "lucide-react";
import { CalendarClock, MessageCircle, Sparkles } from "lucide-react";

export interface FooterCta {
  id: string;
  icon: LucideIcon;
  href: string;
  variant: "gradient" | "glass" | "outline";
}

/** Structural data only — labels/descriptions live in
 * messages/{locale}/footer.json, keyed by `id`. */
export const footerCtas: FooterCta[] = [
  { id: "bookConsultation", icon: Sparkles, href: "/contact", variant: "gradient" },
  { id: "scheduleCall", icon: CalendarClock, href: "/contact", variant: "glass" },
  { id: "whatsapp", icon: MessageCircle, href: "https://wa.me/917903724407", variant: "outline" },
];

export const companyInfo = {
  name: "Novyra Technologies",
  email: "hello@novyratech.in",
  phone: "+91 7903724407",
};

export interface FooterLink {
  id: string;
  href: string;
  disabled?: boolean;
}

export interface FooterColumn {
  id: string;
  links: FooterLink[];
}

/** Links that already exist on this page use an in-page anchor so they
 * actually resolve today; links to pages that don't exist yet follow the
 * same future-route naming already established in content/nav.ts, so the
 * footer and the main nav stay architecturally consistent. Labels live in
 * messages/{locale}/footer.json under `columns.{id}.links.{linkId}`. */
export const footerColumns: FooterColumn[] = [
  {
    id: "company",
    links: [
      { id: "about", href: "/about" },
      { id: "solutions", href: "/solutions" },
      { id: "caseStudies", href: "/#case-studies" },
      { id: "pricing", href: "/#pricing" },
      { id: "blog", href: "/blog" },
      { id: "contact", href: "/#contact" },
      { id: "careers", href: "/careers", disabled: true },
    ],
  },
  {
    id: "services",
    links: [
      { id: "businessWebsites", href: "/services/business-websites" },
      { id: "webApplications", href: "/services/web-applications" },
      { id: "saasDevelopment", href: "/services/saas-development" },
      { id: "aiDevelopment", href: "/services/ai-development" },
      { id: "healthcareSolutions", href: "/services/healthcare-solutions" },
      { id: "schoolErp", href: "/services/school-erp" },
      { id: "hospitalErp", href: "/services/hospital-erp" },
      { id: "crmSystems", href: "/services/crm-systems" },
      { id: "digitalMarketing", href: "/services/digital-marketing" },
      { id: "uiUxDesign", href: "/services/ui-ux-design" },
      { id: "seoOptimization", href: "/services/seo-optimization" },
      { id: "websiteRedesign", href: "/services/website-redesign" },
    ],
  },
  {
    id: "resources",
    links: [
      { id: "faq", href: "/#faq" },
      { id: "projectProcess", href: "/#process" },
      { id: "technologyStack", href: "/#why-choose-novyra" },
      { id: "privacyPolicy", href: "/privacy" },
      { id: "termsConditions", href: "/terms" },
      { id: "cookiePolicy", href: "/cookies" },
      { id: "freeConsultation", href: "/#contact" },
      { id: "websiteAudit", href: "/audit" },
      { id: "roadmapPlanner", href: "/roadmap-planner" },
    ],
  },
];

export interface TechCapsule {
  name: string;
  color: string;
}

/** Trimmed to the 12 highest-signal technologies — the full stack lives in
 * Why Choose Novyra's Trusted Technologies grid, so the footer only needs a
 * quick-glance chip row, not the complete list. Technology/product names
 * are proper nouns and intentionally not translated. */
export const techCapsules: TechCapsule[] = [
  { name: "React", color: "#22D3EE" },
  { name: "Next.js", color: "#94A3B8" },
  { name: "TypeScript", color: "#3B82F6" },
  { name: "Node.js", color: "#22C55E" },
  { name: "Tailwind CSS", color: "#38BDF8" },
  { name: "Framer Motion", color: "#A78BFA" },
  { name: "PostgreSQL", color: "#3B82F6" },
  { name: "MongoDB", color: "#22C55E" },
  { name: "AWS", color: "#F97316" },
  { name: "Docker", color: "#2563EB" },
  { name: "Vercel", color: "#94A3B8" },
  { name: "OpenAI", color: "#94A3B8" },
];

export interface SocialLink {
  id: "linkedin" | "github" | "instagram" | "facebook" | "x" | "youtube";
  href: string;
  disabled?: boolean;
}

/** Real handles haven't been shared yet, so every link points to "#" for
 * now rather than guessing a URL — wire these up to the real profiles once
 * they exist. YouTube stays disabled per the spec's own "Coming Soon".
 * Platform names are proper nouns (LinkedIn, GitHub, ...) and intentionally
 * not translated; only the "(Coming Soon)" qualifier is localized, via
 * messages/{locale}/footer.json `social.youtubeComingSoon`. */
export const socialLinks: SocialLink[] = [
  { id: "linkedin", href: "#" },
  { id: "github", href: "#" },
  { id: "instagram", href: "#" },
  { id: "facebook", href: "#" },
  { id: "x", href: "#" },
  { id: "youtube", href: "#", disabled: true },
];

export const legalLinks: FooterLink[] = [
  { id: "privacyPolicy", href: "/privacy" },
  { id: "terms", href: "/terms" },
  { id: "cookies", href: "/cookies" },
  { id: "accessibility", href: "/accessibility" },
  { id: "sitemap", href: "/sitemap" },
];
