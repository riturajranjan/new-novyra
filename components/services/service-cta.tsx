"use client";

import { ArrowRight, CircleCheck, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { buttonVariants } from "@/components/ui/button";
import { RippleLink } from "@/components/ui/ripple-link";
import { cn } from "@/lib/utils";

const trustIds = ["freeConsultation", "transparentPricing", "directDeveloperAccess"] as const;

/** Centered closing CTA for the services showcase — one shared action for
 * every service rather than a CTA repeated per-category, since by this
 * point in the section the visitor has already compared the options. */
export function ServiceCta() {
  const t = useTranslations("services");

  return (
    <div className="glass-strong shadow-card relative isolate flex flex-col items-center gap-5 overflow-hidden rounded-hero p-8 text-center sm:p-10">
      <div
        aria-hidden
        className="bg-gradient-brand pointer-events-none absolute -inset-16 -z-10 rounded-full opacity-20 blur-3xl"
      />
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-title-lg text-foreground font-semibold">{t("finalCta.heading")}</h3>
        <p className="text-body-sm text-foreground-secondary max-w-md">{t("finalCta.description")}</p>
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
          {t("finalCta.primaryCta")}
          <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-0.5" aria-hidden />
        </RippleLink>
        <RippleLink href="/contact" className={cn(buttonVariants({ variant: "glass", size: "lg" }), "w-full sm:w-auto")}>
          <MessageCircle className="h-4 w-4" aria-hidden />
          {t("finalCta.secondaryCta")}
        </RippleLink>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        {trustIds.map((id) => (
          <span key={id} className="text-caption text-foreground-secondary flex items-center gap-1.5 font-medium">
            <CircleCheck className="text-brand-emerald h-3.5 w-3.5 shrink-0" aria-hidden />
            {t(`finalCta.trust.${id}`)}
          </span>
        ))}
      </div>
    </div>
  );
}
