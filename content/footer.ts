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
  { id: "bookConsultation", icon: Sparkles, href: "/#contact", variant: "gradient" },
  { id: "scheduleCall", icon: CalendarClock, href: "/#contact", variant: "glass" },
  { id: "whatsapp", icon: MessageCircle, href: "https://wa.me/917903724407", variant: "outline" },
];

export const companyInfo = {
  name: "Novyra Technologies",
  email: "hello@novyratech.in",
  phone: "+91 7903724407",
  whatsapp: "https://wa.me/917903724407",
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

/** Every link here is either a real page or an in-page anchor to a section
 * that actually exists on the homepage — the site has no standalone
 * `/services`, `/solutions`, or `/blog` routes, so this column no longer
 * pretends otherwise. Labels live in messages/{locale}/footer.json under
 * `columns.{id}.links.{linkId}`. */
export const footerColumns: FooterColumn[] = [
  {
    id: "company",
    links: [
      { id: "about", href: "/about" },
      { id: "process", href: "/#process" },
      { id: "work", href: "/work" },
      { id: "contact", href: "/#contact" },
    ],
  },
  {
    id: "services",
    links: [
      { id: "websites", href: "/#services" },
      { id: "webApplications", href: "/#services" },
      { id: "saasProducts", href: "/#services" },
      { id: "automationAi", href: "/#services" },
      { id: "digitalGrowth", href: "/#services" },
      { id: "brandDesign", href: "/#services" },
    ],
  },
  {
    id: "resources",
    links: [
      { id: "pricing", href: "/#pricing" },
      { id: "faq", href: "/#faq" },
      { id: "privacyPolicy", href: "/privacy" },
      { id: "termsConditions", href: "/terms" },
    ],
  },
];

export interface SocialLink {
  id: "linkedin" | "github" | "instagram" | "facebook" | "x" | "youtube";
  href: string;
  disabled?: boolean;
}

/** Only the platforms with a real, live profile are listed — a link that
 * resolves to "#" is exactly the kind of dead promise this rebuild removes
 * elsewhere. Add the rest back once a real company profile exists for
 * them; don't guess a URL in the meantime. Platform names are proper nouns
 * (LinkedIn, GitHub) and intentionally not translated. */
export const socialLinks: SocialLink[] = [
  { id: "linkedin", href: "https://linkedin.com/in/rranjan01" },
  { id: "github", href: "https://github.com/riturajranjan" },
];

export const legalLinks: FooterLink[] = [
  { id: "privacyPolicy", href: "/privacy" },
  { id: "terms", href: "/terms" },
];
