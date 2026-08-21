"use client";

import { Bot, Cloud, Database, ArrowRight, MessageCircle, Workflow } from "lucide-react";
import { useTranslations } from "next-intl";
import { buttonVariants } from "@/components/ui/button";
import { RippleLink } from "@/components/ui/ripple-link";
import { TechnicalGrid } from "@/components/visual-backgrounds/technical-grid";
import { SignalNode } from "@/components/visual-backgrounds/signal-node";
import { companyInfo } from "@/content/footer";
import { cn } from "@/lib/utils";

/** Technical category names, not translated — same convention as
 * techStackBadges/serviceCategories.technologies elsewhere (proper nouns
 * for products/technologies stay in English across locales). */
const capabilities = [
  { label: "SaaS", icon: Cloud },
  { label: "ERP / CRM", icon: Database },
  { label: "Automation", icon: Workflow },
  { label: "AI", icon: Bot },
];

/** SaaS, ERP, CRM, HRMS, AI, and other complex builds don't fit a fixed
 * package — this sits between the plan cards and the timeline as its own
 * custom-scope strip rather than being forced into a fourth pricing card.
 * Deliberately reads as a different surface from the plan cards: a faint
 * technical grid + a few signal points instead of a flat glass panel, so
 * "custom scope" doesn't visually compete with the three fixed packages. */
export function CustomProjectCta() {
  const t = useTranslations("pricing.customProject");
  const whatsappHref = companyInfo.whatsapp;
  const isExternal = whatsappHref.startsWith("http");

  return (
    <div className="relative isolate flex flex-col items-center gap-6 overflow-hidden rounded-hero border border-white/8 p-6 text-center sm:flex-row sm:items-center sm:justify-between sm:p-8 sm:text-left">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ backgroundColor: "#0a0912" }}>
        <TechnicalGrid opacity={0.06} size={44} mask="radial-gradient(80% 90% at 20% 50%, black, transparent)" />
        <div className="bg-brand-purple pointer-events-none absolute -inset-16 -z-10 rounded-full opacity-[0.14] blur-3xl" />
        <SignalNode x="12%" y="24%" color="var(--color-brand-blue)" delay="0.4s" />
        <SignalNode x="28%" y="68%" color="var(--color-brand-purple)" delay="1.6s" />
        <SignalNode x="82%" y="30%" color="var(--color-brand-cyan)" delay="2.4s" />
      </div>

      <div className="flex flex-col items-center gap-3 sm:items-start">
        <span className="text-gradient-brand text-caption font-semibold tracking-wide uppercase">{t("eyebrow")}</span>
        <h3 className="text-title-lg text-foreground font-semibold">{t("heading")}</h3>
        <p className="text-body-sm text-foreground-secondary max-w-md">{t("description")}</p>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 sm:justify-start">
          {capabilities.map((cap) => (
            <span
              key={cap.label}
              className="text-caption flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-medium text-white/65"
            >
              <cap.icon className="text-brand-purple h-3 w-3" aria-hidden />
              {cap.label}
            </span>
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <RippleLink
          href="/contact"
          className={cn(buttonVariants({ variant: "gradient", size: "lg" }), "group relative w-full overflow-hidden sm:w-auto")}
        >
          <span
            aria-hidden
            className="bg-gradient-shimmer pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-full"
          />
          {t("primaryCta")}
          <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-0.5" aria-hidden />
        </RippleLink>
        <RippleLink
          href={whatsappHref}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "group w-full sm:w-auto")}
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          {t("secondaryCta")}
        </RippleLink>
      </div>
    </div>
  );
}
