"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { RippleLink } from "@/components/ui/ripple-link";
import { IndustryPanel } from "@/components/industries/industry-panel";
import { IndustryPanelVisual } from "@/components/industries/industry-panel-visual";
import { IndustriesBackground } from "@/components/industries/industries-background";
import { industries } from "@/content/industries";
import { cn } from "@/lib/utils";

const total = industries.length;
const EASE = [0.22, 1, 0.36, 1] as const;

/** Industries as a compact horizontal expanding-panel rail (>=1100px) —
 * one wide image-led active panel plus five narrow vertical panels that
 * expand in place on click, panels never reordering. Below 1100px this
 * collapses to a horizontal tab strip over a single active card instead of
 * squeezing the same geometry into a cramped tablet width. One shared data
 * source (`content/industries.ts` + `messages/{locale}/industries.json`)
 * drives both. */
export function IndustriesPreview() {
  const t = useTranslations("industries.home");
  const tItems = useTranslations("industries.items");
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = industries[activeIndex];

  return (
    <section id="industries" className="relative isolate scroll-mt-24 overflow-hidden py-14 md:py-16 lg:py-20">
      <IndustriesBackground />
      <Container size="wide" className="flex flex-col gap-9 md:gap-11">
        <div className="flex flex-col items-start gap-4 text-left md:items-center md:text-center">
          <span className="text-gradient-brand text-[13px] font-bold tracking-[0.16em] uppercase">{t("eyebrow")}</span>
          <h2
            className="text-headline sm:text-display-lg font-semibold text-foreground text-balance"
            
          >
            {t("heading")}
          </h2>
          <p className="text-foreground-secondary max-w-[840px] text-pretty" style={{ fontSize: "17px", lineHeight: 1.6 }}>
            {t("description")}
          </p>
          <RippleLink
            href="/industries"
            className="group before:bg-gradient-brand relative mt-1 inline-flex w-fit items-center gap-1.5 text-[15px] font-semibold text-white before:absolute before:-bottom-0.5 before:left-0 before:h-px before:w-full before:origin-left before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100"
          >
            {t("viewAllCta")}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </RippleLink>
        </div>

        {/* desktop — expanding panel rail */}
        <div className="hidden min-[1100px]:flex min-[1100px]:h-[460px] min-[1100px]:gap-2">
          {industries.map((industry, i) => (
            <IndustryPanel
              key={industry.id}
              industry={industry}
              index={i}
              total={total}
              isActive={activeIndex === i}
              onActivate={setActiveIndex}
            />
          ))}
        </div>

        {/* mobile / tablet — horizontal tabs + single active card */}
        <div className="flex flex-col gap-4 min-[1100px]:hidden">
          <div className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {industries.map((industry, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={industry.id}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "shrink-0 border-b-2 px-3 py-2 text-[13px] font-semibold whitespace-nowrap transition-colors duration-300",
                    isActive ? "border-brand-blue text-foreground" : "border-transparent text-foreground-secondary/60",
                  )}
                >
                  {String(i + 1).padStart(2, "0")} {tItems(`${industry.id}.title`)}
                </button>
              );
            })}
          </div>

          <div className="relative h-[420px] w-full overflow-hidden rounded-xl sm:h-[440px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="absolute inset-0"
              >
                <IndustryPanelVisual industry={active} priority={activeIndex === 0} />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(0deg, rgba(5,8,18,0.96) 0%, rgba(5,8,18,0.86) 45%, rgba(5,8,18,0.3) 100%)",
                  }}
                />
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.08, ease: EASE }}
                  className="absolute inset-x-0 bottom-0 flex flex-col gap-2.5 p-5 sm:p-7"
                >
                  <span className="text-[11px] font-semibold tracking-[0.14em] text-white/50 uppercase">
                    {String(activeIndex + 1).padStart(2, "0")} / {tItems(`${active.id}.title`)}
                  </span>
                  <h3 className="text-[22px] leading-[1.15] font-semibold text-white sm:text-[26px]">
                    {tItems(`${active.id}.headline`)}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-white/60 sm:text-[14px]">{tItems(`${active.id}.description`)}</p>
                  <p className="text-[12px] text-white/40">{(tItems.raw(`${active.id}.capabilities`) as string[]).join(" · ")}</p>
                  <RippleLink
                    href={active.href}
                    className="group/cta mt-1 inline-flex w-fit items-center gap-1.5 text-[13px] font-semibold text-brand-blue"
                  >
                    {t("exploreLabel", { industry: tItems(`${active.id}.title`) })}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" aria-hidden />
                  </RippleLink>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
