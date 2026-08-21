"use client";

import { useRef } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Container } from "@/components/ui/container";
import { RippleLink } from "@/components/ui/ripple-link";
import { buttonVariants } from "@/components/ui/button";
import { PricingHeroBackground } from "@/components/pricing/pricing-hero-background";
import { PricingHeroVisual } from "@/components/pricing/pricing-hero-visual";
import { companyInfo } from "@/content/footer";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

/** The Pricing page's hero — same split-screen composition, background
 * grammar and scoped-GSAP text entrance as the About/Services heroes, but
 * deliberately compact (~420–540px on desktop, not a near-full-viewport
 * hero): this page's real content — the plan cards — starts soon after.
 * Reuses the page's existing `pricing.eyebrow`/`heading`/`description`
 * copy (previously rendered inside the pricing section itself) rather
 * than duplicating new hero-only copy. */
export function PricingHero() {
  const t = useTranslations("pricing");
  const tCommon = useTranslations("common");
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const whatsappHref = companyInfo.whatsapp;

  useGSAP(
    () => {
      if (reduceMotion) return;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-pricing-hero-eyebrow]", { opacity: 0, yPercent: 60, duration: 0.32 })
        .from(
          "[data-pricing-hero-line]",
          { opacity: 0, yPercent: 105, filter: "blur(6px)", duration: 0.5, stagger: 0.07, ease: "power4.out" },
          "-=0.1",
        )
        .from("[data-pricing-hero-description]", { opacity: 0, y: 12, duration: 0.32 }, "-=0.18")
        .from("[data-pricing-hero-cta] > *", { opacity: 0, y: 10, scale: 0.98, duration: 0.28, stagger: 0.06 }, "-=0.14")
        .from("[data-pricing-hero-visual]", { opacity: 0, scale: 0.94, duration: 0.5 }, "-=0.28");
    },
    { scope: sectionRef, dependencies: [reduceMotion] },
  );

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-110 items-center overflow-hidden pt-22 pb-6 md:min-h-125 md:pt-26 md:pb-7 lg:min-h-135 lg:pb-8"
    >
      <PricingHeroBackground />

      <Container size="wide" className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8">
        <div className="flex flex-col items-center gap-4 text-center md:gap-5 lg:items-start lg:text-left">
          <span
            data-pricing-hero-eyebrow
            className="glass text-caption text-foreground-secondary inline-flex items-center rounded-pill px-4 py-2 font-semibold tracking-[0.12em] uppercase"
          >
            {t("eyebrow")}
          </span>

          <h1 className="max-w-140 text-[clamp(2.5rem,4.6vw,4.375rem)] leading-[1.05] font-semibold tracking-[-0.035em] text-foreground text-balance">
            <span className="block overflow-hidden">
              <span data-pricing-hero-line className="block">
                {t("heading.line1")}
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                data-pricing-hero-line
                className="block bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(90deg, #4F8CFF 0%, #6366F1 28%, #8B5CF6 58%, #D946EF 100%)",
                  filter: "drop-shadow(0 0 18px rgba(139, 92, 246, 0.22))",
                }}
              >
                {t("heading.highlight")}
              </span>
            </span>
          </h1>

          <p data-pricing-hero-description className="text-body-lg max-w-125 text-foreground-secondary text-pretty leading-[1.6]">
            {t("description")}
          </p>

          <div
            data-pricing-hero-cta
            className="flex w-full max-w-md flex-col items-center gap-3 min-[430px]:max-w-none min-[430px]:flex-row min-[430px]:items-start lg:items-start"
          >
            <RippleLink
              href="/contact"
              className={cn(buttonVariants({ variant: "gradient", size: "lg" }), "group w-full min-w-0 min-[430px]:w-auto min-[430px]:min-w-52.5")}
            >
              {tCommon("startProject")}
              <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-0.5" aria-hidden />
            </RippleLink>
            <RippleLink
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "group w-full min-w-0 min-[430px]:w-auto")}
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              {t("hero.secondaryCta")}
            </RippleLink>
          </div>
        </div>

        <div data-pricing-hero-visual className="hidden md:flex">
          <PricingHeroVisual />
        </div>
      </Container>
    </section>
  );
}
