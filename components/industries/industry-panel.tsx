"use client";

import { type KeyboardEvent } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { RippleLink } from "@/components/ui/ripple-link";
import { IndustryPanelVisual } from "@/components/industries/industry-panel-visual";
import type { Industry } from "@/content/industries";
import { accentTint } from "@/lib/accent";
import { cn } from "@/lib/utils";

interface IndustryPanelProps {
  industry: Industry;
  index: number;
  total: number;
  isActive: boolean;
  onActivate: (index: number) => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/** One panel of the desktop expanding rail — a narrow vertical strip when
 * collapsed (number, vertical title, plus icon, dimmed background), a wide
 * image-led editorial panel when active. Panels never reorder; only their
 * flex-basis animates (via Framer's `layout`), so clicking a collapsed
 * panel expands it in place. */
export function IndustryPanel({ industry, index, total, isActive, onActivate }: IndustryPanelProps) {
  const t = useTranslations("industries.items");
  const tHome = useTranslations("industries.home");
  const reduceMotion = useReducedMotion();
  const number = String(index + 1).padStart(2, "0");
  const title = t(`${industry.id}.title`);

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onActivate(index);
    }
  }

  return (
    <motion.div
      layout
      transition={{ duration: reduceMotion ? 0.01 : 0.65, ease: EASE }}
      className="relative overflow-hidden border transition-colors duration-[350ms]"
      style={{
        flex: isActive ? "6 1 0%" : "0 0 80px",
        minWidth: isActive ? 320 : 78,
        borderRadius: 6,
        borderColor: isActive ? "rgba(120,150,255,0.16)" : "rgba(255,255,255,0.08)",
        boxShadow: isActive
          ? "inset 0 1px 0 rgba(255,255,255,0.035), 0 18px 60px rgba(0,0,0,0.14)"
          : undefined,
      }}
    >
      <IndustryPanelVisual industry={industry} priority={index === 0} />

      <AnimatePresence initial={false} mode="wait">
        {isActive ? (
          <motion.div
            key="active"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="group/active absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(600px circle at 72% 38%, ${accentTint(industry.accent, 8)}, transparent 65%), linear-gradient(90deg, rgba(5,8,18,0.96) 0%, rgba(5,8,18,0.82) 38%, rgba(5,8,18,0.36) 70%, rgba(5,8,18,0.16) 100%)`,
            }}
          >
            <div className="absolute top-5 right-5 text-[12px] font-medium text-white/40 tabular-nums sm:top-7 sm:right-7">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={number}
                  initial={reduceMotion ? false : { opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: 6 }}
                  transition={{ duration: 0.25 }}
                  className="inline-block"
                >
                  {number}
                </motion.span>
              </AnimatePresence>
              {" / "}
              {String(total).padStart(2, "0")}
            </div>

            <div className="flex h-full flex-col justify-end p-6 sm:p-8 lg:p-10">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
                className="flex max-w-lg flex-col gap-3"
              >
                <span className="text-[12px] font-semibold tracking-[0.14em] text-white/[0.62] uppercase">
                  {number} / {title}
                </span>
                <h3
                  className="max-w-[650px] font-semibold text-white"
                  style={{ fontSize: "clamp(2.125rem, 3vw, 3rem)", lineHeight: 1.07, fontWeight: 600 }}
                >
                  {t(`${industry.id}.headline`)}
                </h3>
                <p
                  className="max-w-[640px] text-[15px] sm:text-[16px]"
                  style={{ color: "rgba(225,230,240,0.72)", lineHeight: 1.65 }}
                >
                  {t(`${industry.id}.description`)}
                </p>

                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 pt-1">
                  {(t.raw(`${industry.id}.capabilities`) as string[]).map((cap, i) => (
                    <span key={cap} className="flex items-center gap-2.5">
                      {i > 0 ? <span className="text-white/25">·</span> : null}
                      <span
                        className={cn(
                          "text-[12.5px] transition-colors duration-300",
                          i === 0 ? "font-medium text-brand-blue" : "text-white/48 group-hover/active:text-white/65",
                        )}
                      >
                        {cap}
                      </span>
                    </span>
                  ))}
                </div>

                <motion.span
                  aria-hidden
                  initial={reduceMotion ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
                  className="bg-gradient-brand mt-2 h-0.5 w-20 origin-left"
                />
              </motion.div>
            </div>

            <RippleLink
              href={industry.href}
              aria-label={tHome("exploreLabel", { industry: title })}
              className="group/cta absolute right-5 bottom-5 flex items-center gap-3 sm:right-7 sm:bottom-7"
            >
              <span className="hidden text-[13px] font-semibold text-white/70 transition-colors duration-300 group-hover/cta:text-white lg:inline">
                {tHome("exploreLabel", { industry: title })}
              </span>
              <span className="border-white/[0.24] flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-[350ms] group-hover/cta:border-brand-blue group-hover/cta:bg-brand-blue/15">
                <ArrowUpRight
                  className="h-4.5 w-4.5 text-white/85 transition-transform duration-[350ms] group-hover/cta:translate-x-[3px] group-hover/cta:-translate-y-[3px] group-hover/cta:text-white"
                  aria-hidden
                />
              </span>
            </RippleLink>
          </motion.div>
        ) : (
          <motion.div
            key="collapsed"
            role="button"
            tabIndex={0}
            aria-label={title}
            onClick={() => onActivate(index)}
            onKeyDown={handleKeyDown}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="group absolute inset-0 flex cursor-pointer flex-col items-center justify-between py-6 outline-none"
          >
            <div
              aria-hidden
              className="absolute inset-0 -z-10 brightness-[.44] saturate-[.75] transition-[filter] duration-500 group-hover:brightness-[.6] group-hover:saturate-[.95] group-focus-visible:brightness-[.6]"
            >
              <IndustryPanelVisual industry={industry} />
              <div className="absolute inset-0 bg-[#050814]/25" />
            </div>

            <span className="text-[12px] font-semibold text-white/[0.45] transition-colors duration-[350ms] group-hover:text-brand-blue">
              {number}.
            </span>

            <span
              className="text-[15px] font-semibold tracking-[0.1em] text-white/[0.72] uppercase transition-[color,transform] duration-[350ms] group-hover:-translate-y-1 group-hover:text-white"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              {title}
            </span>

            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 transition-colors duration-[350ms] group-hover:border-brand-blue">
              <Plus className="h-3.5 w-3.5 text-white/70 transition-colors duration-[350ms] group-hover:text-brand-blue" aria-hidden />
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
