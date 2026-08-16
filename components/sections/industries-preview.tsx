"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { RippleLink } from "@/components/ui/ripple-link";
import { buttonVariants } from "@/components/ui/button";
import { IndustryVisual } from "@/components/industries/industry-visual";
import { IndustriesBackground } from "@/components/industries/industries-background";
import { industries } from "@/content/industries";
import { accentStroke } from "@/lib/accent";
import { cn } from "@/lib/utils";

const total = industries.length;

/** Industries as an interactive navigator, not a card grid — an editorial
 * left column (sticky via native CSS, no JS scroll-pinning) alongside a
 * hoverable row list and a floating abstract visual that swaps per active
 * industry. Mobile drops the row-list/sticky geometry for a horizontal
 * chip selector driving the same shared state. */
export function IndustriesPreview() {
  const t = useTranslations("industries.home");
  const tItems = useTranslations("industries.items");
  const [activeIndex, setActiveIndex] = useState(0);
  const active = industries[activeIndex];

  return (
    <section id="industries" className="relative isolate scroll-mt-24 overflow-hidden py-14 md:py-18">
      <IndustriesBackground />
      <Container>
        {/* mobile / tablet */}
        <div className="flex flex-col gap-6 lg:hidden">
          <div className="flex flex-col gap-3">
            <span className="text-gradient-brand text-sm font-semibold uppercase tracking-[0.14em]">{t("eyebrow")}</span>
            <h2 className="text-headline text-foreground text-balance font-semibold">{t("heading")}</h2>
          </div>

          <div className="-mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {industries.map((industry, i) => (
              <button
                key={industry.id}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "text-caption shrink-0 snap-start rounded-pill border px-3.5 py-2 font-semibold whitespace-nowrap transition-colors duration-fast",
                  i === activeIndex
                    ? "border-transparent text-white"
                    : "border-border-subtle text-foreground-secondary",
                )}
                style={i === activeIndex ? { backgroundColor: accentStroke[industry.accent] } : undefined}
              >
                {String(i + 1).padStart(2, "0")} {tItems(`${industry.id}.title`)}
              </button>
            ))}
          </div>

          <div className="aspect-[4/3] w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full w-full"
              >
                <IndustryVisual layout={active.layout} accent={active.accent} label={tItems(`${active.id}.title`)} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col gap-1.5">
            <h3 className="text-title-lg text-foreground font-semibold">{tItems(`${active.id}.title`)}</h3>
            <p className="text-body-sm text-foreground-secondary">{tItems(`${active.id}.descriptor`)}</p>
          </div>

          <RippleLink href="/industries" className={cn(buttonVariants({ variant: "outline", size: "md" }), "group w-fit")}>
            {t("viewAllCta")}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-fast group-hover:translate-x-0.5" aria-hidden />
          </RippleLink>
        </div>

        {/* desktop */}
        <div className="hidden lg:grid lg:grid-cols-[2fr_2fr_1.3fr] lg:items-start lg:gap-8">
          <div className="sticky top-28 flex flex-col gap-5 self-start">
            <span className="text-gradient-brand text-sm font-semibold uppercase tracking-[0.14em]">{t("eyebrow")}</span>
            <h2 className="text-display-lg text-foreground text-balance font-semibold">{t("heading")}</h2>
            <p className="text-body text-foreground-secondary max-w-sm text-pretty">{t("description")}</p>
            <RippleLink href="/industries" className="group text-body-sm inline-flex w-fit items-center gap-1.5 font-semibold text-foreground">
              {t("viewAllCta")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-fast group-hover:translate-x-1" aria-hidden />
            </RippleLink>
            <span className="text-caption text-foreground-secondary/60 font-medium tabular-nums">
              {String(activeIndex + 1).padStart(2, "0")} — {String(total).padStart(2, "0")}
            </span>
          </div>

          <nav aria-label={t("listAriaLabel")} className="border-border-subtle flex flex-col border-t">
            {industries.map((industry, i) => {
              const isActive = i === activeIndex;
              return (
                <RippleLink
                  key={industry.id}
                  href="/industries"
                  onMouseEnter={() => setActiveIndex(i)}
                  onFocus={() => setActiveIndex(i)}
                  className={cn(
                    "group border-border-subtle relative flex items-center gap-4 border-b py-4 pl-3 transition-[opacity,padding] duration-300",
                    isActive ? "opacity-100" : "opacity-55 hover:opacity-90",
                  )}
                >
                  <span
                    className="absolute top-0 left-0 h-full w-0.5 origin-top scale-y-0 transition-transform duration-300"
                    style={{ backgroundColor: accentStroke[industry.accent], transform: isActive ? "scaleY(1)" : undefined }}
                    aria-hidden
                  />
                  <span className="text-caption text-foreground-secondary/60 font-semibold tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className={cn("text-title font-semibold transition-colors duration-300", isActive ? "text-foreground" : "text-foreground-secondary")}>
                      {tItems(`${industry.id}.title`)}
                    </span>
                    <span className="text-caption text-foreground-secondary/70 truncate">{tItems(`${industry.id}.descriptor`)}</span>
                  </div>
                  <ArrowRight
                    className={cn(
                      "h-4 w-4 shrink-0 text-foreground-secondary transition-transform duration-300",
                      isActive && "translate-x-2",
                    )}
                    aria-hidden
                  />
                </RippleLink>
              );
            })}
          </nav>

          <div className="sticky top-28 aspect-[4/5] self-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="h-full w-full"
                style={{ transform: "perspective(1200px) rotateY(-4deg)" }}
              >
                <IndustryVisual layout={active.layout} accent={active.accent} label={tItems(`${active.id}.title`)} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
