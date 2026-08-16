import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, MessageCircle } from "lucide-react";

export interface FooterCta {
  id: string;
  icon: LucideIcon;
  href: string;
  variant: "gradient" | "glass" | "outline";
}

/** The footer's compact CTA layer — two real actions, not three, matching
 * the homepage's other compact final-CTA pattern (mailto + WhatsApp).
 * Structural data only — labels live in messages/{locale}/footer.json,
 * keyed by `id`. */
export const footerCtas: FooterCta[] = [
  { id: "startProject", icon: ArrowUpRight, href: "mailto:hello@novyratech.in", variant: "gradient" },
  { id: "whatsapp", icon: MessageCircle, href: "https://wa.me/917903724407", variant: "outline" },
];

export const companyInfo = {
  name: "Novyra Technologies",
  email: "hello@novyratech.in",
  phone: "+91 7903724407",
  whatsapp: "https://wa.me/917903724407",
  location: "Muzaffarpur, Bihar, India",
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

/** Every link here is a real route or an in-page anchor to a section that
 * actually exists — curated on purpose (3 short columns, not a 30-link
 * sitemap dump). Labels live in messages/{locale}/footer.json under
 * `columns.{id}.links.{linkId}`. */
export const footerColumns: FooterColumn[] = [
  {
    id: "explore",
    links: [
      { id: "services", href: "/services" },
      { id: "industries", href: "/industries" },
      { id: "work", href: "/work" },
      { id: "pricing", href: "/pricing" },
    ],
  },
  {
    id: "company",
    links: [
      { id: "about", href: "/about" },
      { id: "contact", href: "/#contact" },
    ],
  },
  {
    id: "services",
    links: [
      { id: "webDevelopment", href: "/services" },
      { id: "saasDevelopment", href: "/services" },
      { id: "aiAutomation", href: "/services" },
      { id: "digitalGrowth", href: "/services" },
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
  { id: "cookies", href: "/cookies" },
  { id: "accessibility", href: "/accessibility" },
];
