"use client";

import { useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { RippleLink } from "@/components/ui/ripple-link";
import { ContactHeroBackground } from "@/components/contact-page/contact-hero-background";
import { ContactConnectionVisual } from "@/components/contact-page/contact-connection-visual";
import { companyInfo } from "@/content/footer";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

const trustIds = ["quickResponse", "confidential"] as const;

/** The Contact page's hero — same scoped-GSAP text-reveal craft as the
 * About/Services/Industries heroes, its own concept (a Connection
 * System, not a capability network or an industry ecosystem). Compact:
 * content-driven height, not a forced viewport-height section. */
export function ContactHero() {
  const t = useTranslations("contact.hero");
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const whatsappHref = companyInfo.whatsapp;

  useGSAP(
    () => {
      if (reduceMotion) return;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-ct-eyebrow]", { opacity: 0, yPercent: 60, duration: 0.35 })
        .from(
          "[data-ct-line]",
          { opacity: 0, yPercent: 105, filter: "blur(6px)", duration: 0.55, stagger: 0.08, ease: "power4.out" },
          "-=0.12",
        )
        .from("[data-ct-description]", { opacity: 0, y: 14, duration: 0.35 }, "-=0.2")
        .from("[data-ct-trust] > *", { opacity: 0, y: 8, duration: 0.28, stagger: 0.05 }, "-=0.15")
        .from("[data-ct-cta] > *", { opacity: 0, y: 10, scale: 0.98, duration: 0.3, stagger: 0.06 }, "-=0.1")
        .from("[data-ct-visual]", { opacity: 0, scale: 0.94, duration: 0.6 }, "-=0.35");
    },
    { scope: sectionRef, dependencies: [reduceMotion] },
  );

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden pt-24 pb-12 md:pt-28 md:pb-16 lg:pb-20">
      <ContactHeroBackground />

      <Container size="wide" className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-8">
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <span
            data-ct-eyebrow
            className="glass text-caption text-foreground-secondary inline-flex items-center rounded-pill px-4 py-2 font-semibold tracking-[0.12em] uppercase"
          >
            {t("eyebrow")}
          </span>

          <h1 className="max-w-150 text-[clamp(2.75rem,4.6vw,4.5rem)] leading-[1.05] font-semibold tracking-[-0.04em] text-foreground text-balance">
            <span className="block overflow-hidden">
              <span data-ct-line className="block">
                {t("headingLine1")}
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                data-ct-line
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

          <p data-ct-description className="text-body-lg max-w-125 text-foreground-secondary text-pretty leading-[1.6]">
            {t("description")}
          </p>

          <div data-ct-trust className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:justify-start">
            {trustIds.map((id) => (
              <div key={id} className="flex items-center gap-2">
                <span className="bg-brand-blue/15 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  <span className="bg-brand-blue h-1.5 w-1.5 rounded-full shadow-[0_0_6px_1px_var(--color-brand-blue)]" />
                </span>
                <span className="text-caption text-foreground-secondary">
                  <span className="text-foreground font-semibold">{t(`trust.${id}.title`)}</span> — {t(`trust.${id}.description`)}
                </span>
              </div>
            ))}
          </div>

          <div data-ct-cta className="flex w-full max-w-md flex-col items-center gap-3 min-[430px]:max-w-none min-[430px]:flex-row min-[430px]:items-start lg:items-start">
            <RippleLink
              href="#project-form"
              className={cn(buttonVariants({ variant: "gradient", size: "lg" }), "group w-full min-w-0 min-[430px]:w-auto min-[430px]:min-w-52.5")}
            >
              {t("primaryCta")}
              <ArrowDown className="h-4 w-4 transition-transform duration-fast group-hover:translate-y-0.5" aria-hidden />
            </RippleLink>
            <RippleLink
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "group w-full min-w-0 min-[430px]:w-auto")}
            >
              {t("secondaryCta")}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </RippleLink>
          </div>
        </div>

        <div data-ct-visual className="flex">
          <ContactConnectionVisual />
        </div>
      </Container>
    </section>
  );
}
