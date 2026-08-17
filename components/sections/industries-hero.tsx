"use client";

import { useRef } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { RippleLink } from "@/components/ui/ripple-link";
import { IndustriesHeroBackground } from "@/components/industries/industries-hero-background";
import { IndustryEcosystemVisual } from "@/components/industries/industry-ecosystem-visual";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

/** The Industries hero — "where Novyra creates value," an asymmetric
 * 45/55 split (About was ~1.05/0.95, Services ~1.05/0.95 too; this one
 * leans further right to give the scattered ecosystem visual more room).
 * Same scoped-GSAP text-reveal technique as the other two hero pages,
 * different copy, different visual concept (an Industry Ecosystem, not a
 * capability network or a product-ecosystem pentagon). */
export function IndustriesHero() {
  const t = useTranslations("industries.hero");
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reduceMotion) return;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-ind-eyebrow]", { opacity: 0, yPercent: 60, duration: 0.35 })
        .from(
          "[data-ind-line]",
          { opacity: 0, yPercent: 105, filter: "blur(6px)", duration: 0.55, stagger: 0.08, ease: "power4.out" },
          "-=0.12",
        )
        .from("[data-ind-description]", { opacity: 0, y: 14, duration: 0.35 }, "-=0.2")
        .from("[data-ind-cta] > *", { opacity: 0, y: 10, scale: 0.98, duration: 0.3, stagger: 0.06 }, "-=0.15")
        .from("[data-ind-visual]", { opacity: 0, scale: 0.94, duration: 0.6 }, "-=0.3");
    },
    { scope: sectionRef, dependencies: [reduceMotion] },
  );

  return (
    <section
      ref={sectionRef}
      id="industries"
      className="relative isolate flex min-h-[78svh] items-center overflow-hidden pt-24 pb-10 md:min-h-[82svh] md:pt-28 md:pb-12 lg:min-h-[84svh]"
    >
      <IndustriesHeroBackground />

      <Container size="wide" className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-8">
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <span
            data-ind-eyebrow
            className="glass text-caption text-foreground-secondary inline-flex items-center rounded-pill px-4 py-2 font-semibold tracking-[0.12em] uppercase"
          >
            {t("eyebrow")}
          </span>

          <h1 className="max-w-155 text-[clamp(2.75rem,5vw,4.6rem)] leading-[1.04] font-semibold tracking-[-0.04em] text-foreground text-balance">
            <span className="block overflow-hidden">
              <span data-ind-line className="block">
                {t("headingLine1")}
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                data-ind-line
                className="block bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(90deg, #4F8CFF 0%, #6366F1 28%, #8B5CF6 58%, #D946EF 100%)",
                  filter: "drop-shadow(0 0 18px rgba(139, 92, 246, 0.22))",
                }}
              >
                {t("headingLine2")}
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-ind-line className="block">
                {t("headingLine3")}
              </span>
            </span>
          </h1>

          <p data-ind-description className="text-body-lg max-w-130 text-foreground-secondary text-pretty leading-[1.6]">
            {t("description")}
          </p>

          <div data-ind-cta className="flex w-full max-w-md flex-col items-center gap-3 min-[430px]:max-w-none min-[430px]:flex-row min-[430px]:items-start lg:items-start">
            <RippleLink
              href="#industry-explorer"
              className={cn(buttonVariants({ variant: "gradient", size: "lg" }), "group w-full min-w-0 min-[430px]:w-auto min-[430px]:min-w-52.5")}
            >
              {t("primaryCta")}
              <ArrowDown className="h-4 w-4 transition-transform duration-fast group-hover:translate-y-0.5" aria-hidden />
            </RippleLink>
            <RippleLink
              href="/#contact"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "group w-full min-w-0 min-[430px]:w-auto")}
            >
              {t("secondaryCta")}
              <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-0.5" aria-hidden />
            </RippleLink>
          </div>
        </div>

        <div data-ind-visual className="flex">
          <IndustryEcosystemVisual />
        </div>
      </Container>
    </section>
  );
}
