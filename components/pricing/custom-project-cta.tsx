"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { buttonVariants } from "@/components/ui/button";
import { RippleLink } from "@/components/ui/ripple-link";
import { companyInfo } from "@/content/footer";
import { cn } from "@/lib/utils";

/** SaaS, ERP, CRM, HRMS, AI, and other complex builds don't fit a fixed
 * package — this sits between the comparison table and the timeline as its
 * own custom-scope panel rather than being forced into the Enterprise
 * card. */
export function CustomProjectCta() {
  const t = useTranslations("pricing.customProject");
  const whatsappHref = companyInfo.whatsapp;
  const isExternal = whatsappHref.startsWith("http");

  return (
    <div className="glass-strong shadow-card relative flex flex-col items-center gap-6 overflow-hidden rounded-hero p-8 text-center sm:flex-row sm:justify-between sm:p-10 sm:text-left">
      <div
        aria-hidden
        className="bg-gradient-brand pointer-events-none absolute -inset-16 -z-10 rounded-full opacity-20 blur-3xl"
      />
      <div className="flex flex-col gap-2">
        <span className="text-gradient-brand text-caption font-semibold tracking-wide uppercase">{t("eyebrow")}</span>
        <h3 className="text-title-lg text-foreground font-semibold">{t("heading")}</h3>
        <p className="text-body-sm text-foreground-secondary max-w-md">{t("description")}</p>
      </div>
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <RippleLink
          href="/#contact"
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
