"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Container } from "@/components/ui/container";
import { Magnetic } from "@/components/ui/magnetic";
import { RippleLink } from "@/components/ui/ripple-link";
import { buttonVariants } from "@/components/ui/button";
import { HeroBackground } from "@/components/hero/hero-background";
import { HeroBadge } from "@/components/hero/hero-badge";
import { HeroTrustSection } from "@/components/hero/hero-trust-section";
import { HeroWorkflowVisual } from "@/components/hero/hero-workflow-visual";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

/** The site's primary hero — a 56/44 split between the pitch (badge,
 * headline, CTAs, honest trust signals) and the provided static
 * product-dashboard image, kept deliberately smaller than the content so it
 * supports the copy rather than competing with it. Text entrance is driven
 * by one scoped GSAP timeline; Framer Motion is reserved for hover/idle
 * interactions (magnetic buttons, badge/trust hover, the image's ambient
 * float, and the scroll-linked headline parallax below) so the two engines
 * never touch the same element. Scrolling past the section fades the
 * headline and drifts the background. */
export function Hero() {
  const t = useTranslations("hero");
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const headlineOpacity = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [1, 1, 0.3],
  );
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -36]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  useGSAP(
    () => {
      // `.from()` captures each element's already-rendered (SSR-visible)
      // state as the implicit end target, so reduced-motion users simply
      // see that state with no tween — no `gsap.set` needed.
      if (reduceMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from("[data-hero-badge]", { opacity: 0, y: 14, duration: 0.4 })
        .from(
          "[data-hero-line]",
          {
            opacity: 0,
            yPercent: 105,
            filter: "blur(6px)",
            duration: 0.6,
            stagger: 0.08,
            ease: "power4.out",
          },
          "-=0.15",
        )
        .from(
          "[data-hero-description]",
          { opacity: 0, y: 16, duration: 0.4 },
          "-=0.25",
        )
        .from(
          "[data-hero-cta] > *",
          { opacity: 0, y: 12, scale: 0.98, duration: 0.35, stagger: 0.07 },
          "-=0.2",
        )
        .from(
          "[data-hero-trust] > *",
          { opacity: 0, y: 8, duration: 0.3, stagger: 0.04 },
          "-=0.15",
        )
        .from(
          "[data-hero-image]",
          {
            opacity: 0,
            x: 30,
            scale: 0.97,
            duration: 0.65,
            ease: "power3.out",
          },
          "-=0.35",
        );

      // Slow, subtle background-position drift on the gradient word — kept
      // to opacity/background-position only, never font-size/letter-spacing/
      // width, and never touching a property Framer Motion also animates.
      gsap.to("[data-hero-gradient-word]", {
        backgroundPosition: "-200% 0",
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: sectionRef, dependencies: [reduceMotion] },
  );

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-140 w-full max-w-full overflow-hidden md:min-h-160">
      <motion.div
        className="absolute inset-0 -z-10"
        style={reduceMotion ? undefined : { y: bgY }}>
        <HeroBackground />
      </motion.div>

      <Container
        size="wide"
        className="grid grid-cols-1 items-center gap-10 pt-28 pb-16 lg:grid-cols-[minmax(0,1.222fr)_minmax(0,1fr)] lg:gap-8 lg:pt-30 lg:pb-16 xl:gap-9">
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <HeroBadge />

          <motion.div
            style={
              reduceMotion
                ? undefined
                : { opacity: headlineOpacity, y: headlineY }
            }>
            <h1 className="max-w-175 text-[clamp(3.625rem,5.2vw,5.125rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-foreground">
              <span className="block overflow-hidden">
                <span data-hero-line className="block">
                  {t("headline.before")}
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  data-hero-line
                  data-hero-gradient-word
                  className="block bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #4F8CFF 0%, #7559FF 42%, #A855F7 72%, #EC4899 100%)",
                    backgroundSize: "220% auto",
                  }}>
                  {t("headline.highlight")}
                </span>
              </span>
              <span className="block overflow-hidden">
                <span data-hero-line className="block">
                  {t("headline.after")}
                </span>
              </span>
            </h1>
          </motion.div>

          <p
            data-hero-description
            className="text-body-lg text-foreground-secondary dark:text-[rgba(226,232,240,0.86)] max-w-152.5 text-pretty leading-[1.65]">
            {t("description")}
          </p>

          <div
            data-hero-cta
            className="flex w-full max-w-md flex-col items-stretch gap-3.5 min-[430px]:max-w-none min-[430px]:flex-row min-[430px]:flex-wrap min-[430px]:items-center min-[430px]:justify-center lg:justify-start">
            <div className="w-full min-[430px]:w-auto">
              <Magnetic className="w-full min-[430px]:w-auto">
                <RippleLink
                  href="/#contact"
                  className={cn(
                    buttonVariants({ variant: "gradient", size: "lg" }),
                    "group min-h-13 w-full min-w-0 transition-[transform,box-shadow] duration-base ease-soft hover:scale-[1.015] hover:shadow-[0_14px_32px_-10px_rgba(99,102,241,0.5)] min-[430px]:w-auto min-[430px]:min-w-52.5",
                  )}>
                  {t("cta.primary")}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-1"
                    aria-hidden
                  />
                </RippleLink>
              </Magnetic>
            </div>
            <div className="w-full min-[430px]:w-auto">
              <Magnetic className="w-full min-[430px]:w-auto">
                <RippleLink
                  href="/#process"
                  className={cn(
                    buttonVariants({ variant: "glass", size: "lg" }),
                    "group min-h-13 w-full min-w-0 transition-[transform,box-shadow] duration-base ease-soft hover:scale-[1.015] hover:shadow-card-hover min-[430px]:w-auto min-[430px]:min-w-55",
                  )}>
                  {t("cta.secondary")}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-1"
                    aria-hidden
                  />
                </RippleLink>
              </Magnetic>
            </div>
          </div>

          <HeroTrustSection />
        </div>

        <div
          data-hero-image
          className="w-full hidden md:flex lg:justify-self-end xl:-translate-x-4">
          <HeroWorkflowVisual />
        </div>
      </Container>
    </section>
  );
}
