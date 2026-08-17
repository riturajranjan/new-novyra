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
import { WorkHeroBackground } from "@/components/work/work-hero-background";
import { WorkProductStack } from "@/components/work/work-product-stack";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

/** The Work page's hero — same scoped-GSAP text-reveal craft as the
 * other rebuilt heroes, its own concept (a cinematic Product Stack, not
 * a network/ecosystem visual). The concept disclosure lives here once,
 * near the bottom of the hero, so individual projects below only need a
 * small "Concept Project" tag instead of repeating the full framing. */
export function WorkHero() {
  const t = useTranslations("work.hero");
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reduceMotion) return;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-wk-eyebrow]", { opacity: 0, yPercent: 60, duration: 0.35 })
        .from(
          "[data-wk-line]",
          { opacity: 0, yPercent: 105, filter: "blur(6px)", duration: 0.55, stagger: 0.08, ease: "power4.out" },
          "-=0.12",
        )
        .from("[data-wk-description]", { opacity: 0, y: 14, duration: 0.35 }, "-=0.2")
        .from("[data-wk-cta] > *", { opacity: 0, y: 10, scale: 0.98, duration: 0.3, stagger: 0.06 }, "-=0.15")
        .from("[data-wk-disclosure]", { opacity: 0, y: 8, duration: 0.3 }, "-=0.1")
        .from("[data-wk-visual]", { opacity: 0, scale: 0.94, duration: 0.6 }, "-=0.4");
    },
    { scope: sectionRef, dependencies: [reduceMotion] },
  );

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden pt-24 pb-14 md:pt-28 md:pb-16 lg:pb-20">
      <WorkHeroBackground />

      <Container size="wide" className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-8">
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <span
            data-wk-eyebrow
            className="glass text-caption text-foreground-secondary inline-flex items-center rounded-pill px-4 py-2 font-semibold tracking-[0.12em] uppercase"
          >
            {t("eyebrow")}
          </span>

          <h1 className="max-w-150 text-[clamp(2.75rem,4.8vw,4.5rem)] leading-[1.05] font-semibold tracking-[-0.04em] text-foreground text-balance">
            <span className="block overflow-hidden">
              <span data-wk-line className="block">
                {t("headingLine1")}
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                data-wk-line
                className="block bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(90deg, #4F8CFF 0%, #6366F1 28%, #8B5CF6 58%, #D946EF 100%)",
                  filter: "drop-shadow(0 0 18px rgba(139, 92, 246, 0.22))",
                }}
              >
                {t("headingLine2")}
              </span>
            </span>
          </h1>

          <p data-wk-description className="text-body-lg max-w-125 text-foreground-secondary text-pretty leading-[1.6]">
            {t("description")}
          </p>

          <div data-wk-cta className="flex w-full max-w-md flex-col items-center gap-3 min-[430px]:max-w-none min-[430px]:flex-row min-[430px]:items-start lg:items-start">
            <RippleLink
              href="#project-filter"
              className={cn(buttonVariants({ variant: "gradient", size: "lg" }), "group w-full min-w-0 min-[430px]:w-auto min-[430px]:min-w-52.5")}
            >
              {t("primaryCta")}
              <ArrowDown className="h-4 w-4 transition-transform duration-fast group-hover:translate-y-0.5" aria-hidden />
            </RippleLink>
            <RippleLink href="/contact" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "group w-full min-w-0 min-[430px]:w-auto")}>
              {t("secondaryCta")}
              <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-0.5" aria-hidden />
            </RippleLink>
          </div>

          <p data-wk-disclosure className="text-caption max-w-125 text-white/35">{t("disclosure")}</p>
        </div>

        <div data-wk-visual className="flex">
          <WorkProductStack />
        </div>
      </Container>
    </section>
  );
}
