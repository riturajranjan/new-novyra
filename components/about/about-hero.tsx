"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Container } from "@/components/ui/container";
import { Magnetic } from "@/components/ui/magnetic";
import { RippleLink } from "@/components/ui/ripple-link";
import { buttonVariants } from "@/components/ui/button";
import { AboutBackground } from "@/components/about/about-background";
import { AboutEcosystemVisual } from "@/components/about/about-ecosystem-visual";
import { heroTrustChips } from "@/content/about";
import { accentStroke, accentTint } from "@/lib/accent";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

/** The About page's hero — split screen: pitch copy (eyebrow, 3-line
 * headline with a gradient phrase, description, dual CTA, honest trust
 * chips) on the left, an abstract "Product Ecosystem" visual on the right
 * (no fabricated dashboard/metrics). Text entrance is one scoped GSAP
 * timeline, mirroring the homepage hero; Framer Motion is reserved for the
 * visual's own idle motion so the two engines never animate the same
 * element. */
export function AboutHero() {
  const t = useTranslations("about.hero");
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reduceMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from("[data-about-eyebrow]", { opacity: 0, yPercent: 60, duration: 0.35 })
        .from(
          "[data-about-line]",
          { opacity: 0, yPercent: 105, filter: "blur(6px)", duration: 0.55, stagger: 0.08, ease: "power4.out" },
          "-=0.12",
        )
        .from("[data-about-description]", { opacity: 0, y: 14, duration: 0.35 }, "-=0.2")
        .from("[data-about-cta] > *", { opacity: 0, y: 10, scale: 0.98, duration: 0.3, stagger: 0.06 }, "-=0.15")
        .from("[data-about-trust] > *", { opacity: 0, y: 8, duration: 0.28, stagger: 0.04 }, "-=0.12")
        .from("[data-about-visual]", { opacity: 0, x: 24, scale: 0.97, duration: 0.55 }, "-=0.3");
    },
    { scope: sectionRef, dependencies: [reduceMotion] },
  );

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[70svh] items-center overflow-hidden pt-24 pb-10 md:min-h-[76svh] md:pt-28 md:pb-12"
    >
      <AboutBackground variant="strong" />

      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-[-4%] -z-10 leading-none font-bold whitespace-nowrap text-white select-none"
        style={{
          fontSize: "clamp(140px, 16vw, 260px)",
          letterSpacing: "-0.06em",
          opacity: 0.03,
          transform: "translateY(-50%)",
        }}
      >
        NOVYRA
      </span>

      <Container
        size="wide"
        className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8"
      >
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <span
            data-about-eyebrow
            className="glass text-caption text-foreground-secondary inline-flex items-center rounded-pill px-4 py-2 font-semibold tracking-[0.12em] uppercase"
          >
            {t("eyebrow")}
          </span>

          <h1 className="max-w-175 text-[clamp(3.625rem,5.4vw,5.125rem)] leading-none font-semibold tracking-[-0.045em] text-foreground text-balance">
            <span className="block overflow-hidden">
              <span data-about-line className="block">
                {t("headline.before")}
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                data-about-line
                className="block bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #4F8CFF 0%, #6366F1 28%, #8B5CF6 58%, #D946EF 100%)",
                  filter: "drop-shadow(0 0 18px rgba(139, 92, 246, 0.22))",
                }}
              >
                {t("headline.highlight")}
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-about-line className="block">
                {t("headline.after")}
              </span>
            </span>
          </h1>

          <p
            data-about-description
            className="text-body-lg max-w-155 text-foreground-secondary text-pretty leading-[1.65]"
          >
            {t("description")}
          </p>

          <div data-about-cta className="flex w-full max-w-md flex-col items-center min-[430px]:max-w-none min-[430px]:items-start lg:items-start">
            <Magnetic className="w-full min-[430px]:w-auto">
              <RippleLink
                href="/#contact"
                className={cn(buttonVariants({ variant: "gradient", size: "lg" }), "group min-h-13 w-full min-w-0 min-[430px]:w-auto min-[430px]:min-w-52.5")}
              >
                {t("cta.primary")}
                <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-1" aria-hidden />
              </RippleLink>
            </Magnetic>
          </div>

          <div data-about-trust className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            {heroTrustChips.map((chip) => {
              const Icon = chip.icon;
              return (
                <span
                  key={chip.id}
                  className="glass text-caption text-foreground-secondary inline-flex min-h-9 items-center gap-2 rounded-pill px-3.5 font-medium"
                >
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                    style={{ background: accentTint(chip.accent, 18) }}
                  >
                    <Icon className="h-3 w-3" style={{ color: accentStroke[chip.accent] }} aria-hidden />
                  </span>
                  {t(`trust.${chip.id}`)}
                </span>
              );
            })}
          </div>
        </div>

        <div data-about-visual className="hidden md:flex">
          <AboutEcosystemVisual />
        </div>
      </Container>
    </section>
  );
}
