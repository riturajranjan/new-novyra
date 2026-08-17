"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowDown, ArrowRight } from "lucide-react";
import { registerStickyBarHidden, registerStickyBarVisible } from "@/lib/sticky-bar-registry";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { RippleLink } from "@/components/ui/ripple-link";
import { ServicesHeroBackground } from "@/components/services/services-hero-background";
import { ServiceDetailBackground } from "@/components/services/service-detail-background";
import { CapabilityArchitecture } from "@/components/services/capability-architecture";
import { ServiceRail } from "@/components/services/service-rail";
import { ServicePreview } from "@/components/services/service-preview";
import { ServiceDetails } from "@/components/services/service-details";
import { serviceCategories } from "@/content/service-categories";
import { easePremium } from "@/lib/motion";
import { useIsMounted } from "@/lib/use-is-mounted";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

/** Sections 01 + 02 — hero ("what Novyra can build," a Capability
 * Architecture visual) and the interactive service explorer beneath it.
 * One component owns `activeId` because the rail and the editorial
 * canvas below it stay in lockstep; the two are still visually and
 * structurally distinct sections (own background, own scroll anchor).
 * Text entrance uses the same scoped-GSAP-timeline technique as the
 * About hero — same craft, different composition and copy. */
export function ServicesHero() {
  const t = useTranslations("services");
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState(serviceCategories[0].id);
  const activeCategory = serviceCategories.find((c) => c.id === activeId) ?? serviceCategories[0];

  const previewRef = useRef<HTMLDivElement>(null);
  const previewInView = useInView(previewRef, { margin: "-40% 0px -40% 0px" });
  const mounted = useIsMounted();

  useEffect(() => {
    if (!previewInView) return;
    registerStickyBarVisible();
    return () => registerStickyBarHidden();
  }, [previewInView]);

  useGSAP(
    () => {
      if (reduceMotion) return;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-svc-eyebrow]", { opacity: 0, yPercent: 60, duration: 0.35 })
        .from(
          "[data-svc-line]",
          { opacity: 0, yPercent: 105, filter: "blur(6px)", duration: 0.55, stagger: 0.08, ease: "power4.out" },
          "-=0.12",
        )
        .from("[data-svc-description]", { opacity: 0, y: 14, duration: 0.35 }, "-=0.2")
        .from("[data-svc-cta] > *", { opacity: 0, y: 10, scale: 0.98, duration: 0.3, stagger: 0.06 }, "-=0.15")
        .from("[data-svc-visual]", { opacity: 0, scale: 0.94, duration: 0.6 }, "-=0.3");
    },
    { scope: sectionRef, dependencies: [reduceMotion] },
  );

  return (
    <>
      <section
        ref={sectionRef}
        id="services"
        className="relative isolate flex min-h-[78svh] items-center overflow-hidden pt-24 pb-10 md:min-h-[82svh] md:pt-28 md:pb-12 lg:min-h-[84svh]"
      >
        <ServicesHeroBackground />

        <Container size="wide" className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8">
          <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
            <span
              data-svc-eyebrow
              className="glass text-caption text-foreground-secondary inline-flex items-center rounded-pill px-4 py-2 font-semibold tracking-[0.12em] uppercase"
            >
              {t("hero.eyebrow")}
            </span>

            <h1 className="max-w-165 text-[clamp(2.75rem,5.2vw,4.8rem)] leading-[1.02] font-semibold tracking-[-0.04em] text-foreground text-balance">
              <span className="block overflow-hidden">
                <span data-svc-line className="block">
                  {t("hero.headingLine1")}
                </span>
              </span>
              <span className="block overflow-hidden">
                <span data-svc-line className="block">
                  {t("hero.headingLine2")}
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  data-svc-line
                  className="block bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #4F8CFF 0%, #6366F1 28%, #8B5CF6 58%, #D946EF 100%)",
                    filter: "drop-shadow(0 0 18px rgba(139, 92, 246, 0.22))",
                  }}
                >
                  {t("hero.headingLine3")}
                </span>
              </span>
            </h1>

            <p data-svc-description className="text-body-lg max-w-140 text-foreground-secondary text-pretty leading-[1.6]">
              {t("hero.description")}
            </p>

            <div data-svc-cta className="flex w-full max-w-md flex-col items-center gap-3 min-[430px]:max-w-none min-[430px]:flex-row min-[430px]:items-start lg:items-start">
              <RippleLink
                href="#service-explorer"
                className={cn(buttonVariants({ variant: "gradient", size: "lg" }), "group w-full min-w-0 min-[430px]:w-auto min-[430px]:min-w-52.5")}
              >
                {t("hero.primaryCta")}
                <ArrowDown className="h-4 w-4 transition-transform duration-fast group-hover:translate-y-0.5" aria-hidden />
              </RippleLink>
              <RippleLink
                href="/services#advisor"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "group w-full min-w-0 min-[430px]:w-auto")}
              >
                {t("hero.secondaryCta")}
                <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-0.5" aria-hidden />
              </RippleLink>
            </div>
          </div>

          <div data-svc-visual className="flex">
            <CapabilityArchitecture />
          </div>
        </Container>
      </section>

      <section id="service-explorer" className="relative isolate scroll-mt-24 overflow-hidden py-14 md:py-18 lg:py-24">
        <ServiceDetailBackground />

        <Container className="flex flex-col gap-10 md:gap-14">
          <div className="flex flex-col gap-4">
            <span className="text-caption inline-flex w-fit items-center gap-2 font-mono font-medium tracking-[0.2em] text-white/40 uppercase">
              <span className="h-px w-6 bg-white/25" aria-hidden />
              {t("explorer.eyebrow")}
            </span>
            <h2
              className="max-w-2xl font-bold text-balance text-white"
              style={{ fontSize: "clamp(34px, 4vw, 54px)", lineHeight: 1.1, letterSpacing: "-0.025em" }}
            >
              {t("explorer.heading")}
            </h2>
            <p className="text-body text-white/55 max-w-lg">{t("explorer.description")}</p>
          </div>

          <div className="flex flex-col gap-8 md:gap-10">
            <ServiceRail categories={serviceCategories} activeId={activeId} onSelect={setActiveId} />

            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,56%)_minmax(0,44%)] lg:gap-12">
              <ServiceDetails category={activeCategory} />
              <div ref={previewRef} className="min-w-0">
                <ServicePreview category={activeCategory} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {mounted
        ? createPortal(
            <AnimatePresence>
              {previewInView ? (
                <motion.div
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 80, opacity: 0 }}
                  transition={{ duration: 0.3, ease: easePremium }}
                  className="glass-strong shadow-card-hover fixed inset-x-3 bottom-3 z-40 flex items-center justify-between gap-3 rounded-2xl p-3 lg:hidden"
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: "color-mix(in oklab, var(--color-brand-blue) 16%, transparent)" }}
                    >
                      <activeCategory.icon className="text-brand-blue h-4.5 w-4.5" aria-hidden />
                    </span>
                    <span className="text-body-sm text-foreground truncate font-semibold">
                      {t(`categories.${activeCategory.id}.label`)}
                    </span>
                  </div>
                  <RippleLink href="/#contact" className={cn(buttonVariants({ variant: "gradient", size: "md" }), "shrink-0")}>
                    {t("details.requestQuote")}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </RippleLink>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
