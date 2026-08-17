"use client";

import { ArrowRight, CalendarClock } from "lucide-react";
import { useTranslations } from "next-intl";
import { Magnetic } from "@/components/ui/magnetic";
import { buttonVariants } from "@/components/ui/button";
import { RippleLink } from "@/components/ui/ripple-link";
import { cn } from "@/lib/utils";

/** Bottom glass CTA banner — the last nudge before a visitor leaves the
 * FAQ without reaching out. */
export function FaqTrustBanner() {
  const t = useTranslations("faq.trustBanner");
  const tCta = useTranslations("faq.ctas");

  return (
    <div className="glass-strong shadow-card relative flex flex-col items-center gap-5 overflow-hidden rounded-hero p-6 text-center sm:flex-row sm:justify-between sm:p-10 sm:text-left md:gap-6">
      <div
        aria-hidden
        className="bg-gradient-brand pointer-events-none absolute -inset-16 -z-10 rounded-full opacity-20 blur-3xl"
      />
      <div className="flex flex-col gap-2">
        <h3 className="text-title-lg text-foreground font-semibold">{t("heading")}</h3>
        <p className="text-body-sm text-foreground-secondary max-w-md">{t("description")}</p>
      </div>
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <Magnetic className="w-full sm:w-auto">
          <RippleLink
            href="/contact"
            className={cn(buttonVariants({ variant: "gradient", size: "lg" }), "group relative w-full overflow-hidden sm:w-auto")}
          >
            <span
              aria-hidden
              className="bg-gradient-shimmer pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-full"
            />
            {tCta("bookConsultation")}
            <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-0.5" aria-hidden />
          </RippleLink>
        </Magnetic>
        <Magnetic className="w-full sm:w-auto">
          <RippleLink href="/contact" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "group w-full sm:w-auto")}>
            <CalendarClock className="h-4 w-4" aria-hidden />
            {tCta("scheduleCall")}
          </RippleLink>
        </Magnetic>
      </div>
    </div>
  );
}
