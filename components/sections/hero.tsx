import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Magnetic } from "@/components/ui/magnetic";
import { RippleLink } from "@/components/ui/ripple-link";
import { buttonVariants } from "@/components/ui/button";
import { HeroBackground } from "@/components/hero/hero-background";
import { HeroBadge } from "@/components/hero/hero-badge";
import { HeroTrustSection } from "@/components/hero/hero-trust-section";
import { HeroWorkflowVisual } from "@/components/hero/hero-workflow-visual";
import { cn } from "@/lib/utils";

/** The site's primary hero — a 56/44 split between the pitch (badge,
 * headline, CTAs, honest trust signals) and Novyra's own delivery-workflow
 * visual. This is a Server Component: the above-the-fold HTML renders and
 * paints immediately, and the entrance is a pure-CSS reveal that plays at
 * first paint rather than a post-hydration JS timeline that would hide the
 * already-visible content and re-reveal it. The only client JS in the hero
 * is the two CTA interaction islands (Magnetic + RippleLink); every other
 * piece is server-rendered. All motion is disabled under
 * `prefers-reduced-motion` via the global rule in globals.css. */
export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative isolate min-h-140 w-full max-w-full overflow-hidden md:min-h-160">
      <div className="absolute inset-0 -z-10">
        <HeroBackground />
      </div>

      <Container
        size="wide"
        className="grid grid-cols-1 items-center gap-10 pt-28 pb-16 lg:grid-cols-[minmax(0,1.222fr)_minmax(0,1fr)] lg:gap-8 lg:pt-30 lg:pb-16 xl:gap-9">
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <HeroBadge />

          <h1 className="max-w-175 text-[clamp(3.625rem,5.2vw,5.125rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-foreground">
            <span className="block overflow-hidden">
              <span className="animate-hero-line block">
                {t("headline.before")}
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                className="animate-hero-word block bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #4F8CFF 0%, #7559FF 42%, #A855F7 72%, #EC4899 100%)",
                  backgroundSize: "220% auto",
                  animationDelay: "0.08s",
                }}>
                {t("headline.highlight")}
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                className="animate-hero-line block"
                style={{ animationDelay: "0.16s" }}>
                {t("headline.after")}
              </span>
            </span>
          </h1>

          <p
            className="animate-hero-fade text-body-lg text-foreground-secondary dark:text-[rgba(226,232,240,0.86)] max-w-152.5 text-pretty leading-[1.65]"
            style={{ animationDelay: "0.28s" }}>
            {t("description")}
          </p>

          <div
            className="animate-hero-fade flex w-full max-w-md flex-col items-stretch gap-3.5 min-[430px]:max-w-none min-[430px]:flex-row min-[430px]:flex-wrap min-[430px]:items-center min-[430px]:justify-center lg:justify-start"
            style={{ animationDelay: "0.36s" }}>
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
          className="animate-hero-fade w-full hidden md:flex lg:justify-self-end xl:-translate-x-4"
          style={{ animationDelay: "0.5s" }}>
          <HeroWorkflowVisual />
        </div>
      </Container>
    </section>
  );
}
