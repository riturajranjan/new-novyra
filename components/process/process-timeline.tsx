"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { useTranslations } from "next-intl";
import { ProcessCard } from "@/components/process/process-card";
import { ProcessDot } from "@/components/process/process-dot";
import { accentStroke, accentTint } from "@/lib/accent";
import { cn } from "@/lib/utils";
import { processSteps, type ProcessStep } from "@/content/process-steps";

/** Short accent-colored tick bridging a card to the desktop rail —
 * decorative and `aria-hidden`, gated to `min-[1200px]` on the same
 * element rather than existing only inside a desktop-only copy of the
 * step, so hiding it below that breakpoint never touches real content. */
function CardConnector({ step, isActive }: { step: ProcessStep; isActive: boolean }) {
  const stroke = accentStroke[step.accent];
  return (
    <motion.span
      aria-hidden
      className="hidden h-8 w-px shrink-0 min-[1200px]:block"
      animate={{ backgroundColor: stroke, boxShadow: isActive ? `0 0 10px 1px ${accentTint(step.accent, 60)}` : "0 0 0 0 transparent" }}
      transition={{ duration: 0.3 }}
    />
  );
}

/** Mobile-only numbered icon + connecting guide line — also decorative/
 * `aria-hidden`, gated the same way (`min-[768px]:hidden`) on the same
 * element rather than a separate mobile-only render of the step. */
function MobileConnector({ step, isLast }: { step: ProcessStep; isLast: boolean }) {
  const Icon = step.icon;
  return (
    <div aria-hidden className="relative flex shrink-0 flex-col items-center min-[768px]:hidden">
      {!isLast ? <span className="bg-border-subtle absolute top-9 bottom-[-20px] left-1/2 w-px -translate-x-1/2" /> : null}
      <span
        className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2"
        style={{ borderColor: accentStroke[step.accent], backgroundColor: accentTint(step.accent, 14) }}
      >
        <Icon className="h-4 w-4" style={{ color: accentStroke[step.accent] }} />
      </span>
    </div>
  );
}

/** The process section's own layout — one set of six `ProcessCard`s that
 * reflows with CSS Grid alone: a vertical list on mobile, a simple 2-col
 * grid on tablet, and three wide alternating columns around a central rail
 * at `1200px`+ (`grid-auto-flow: column` naturally places step 1/2 in
 * column 1, 3/4 in column 2, 5/6 in column 3 — the same pairing the old
 * three-column layout hand-built).
 *
 * This used to be three separate `.map()` calls over all six steps — one
 * per breakpoint tier, each a full copy of every step's title,
 * description, and deliverable chips, with two of the three tiers always
 * `hidden` at any given width. Only the genuinely decorative, always-
 * `aria-hidden` bits (the rail SVG, the dots, the mobile connector line)
 * are still breakpoint-gated; the cards themselves render exactly once. */
export function ProcessTimeline() {
  const t = useTranslations("process");
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  function makeActiveHandler(id: string) {
    return (active: boolean) => setActiveId((current) => (active ? id : current === id ? null : current));
  }

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Desktop rail — purely decorative, positioned at the grid's
          vertical midline via absolute positioning instead of being
          sandwiched in DOM order between two separate row `.map()`s. */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-0 hidden h-16 max-w-[1380px] -translate-y-1/2 min-[1200px]:mx-auto min-[1200px]:block min-[1200px]:right-0 min-[1200px]:left-0">
        <svg
          aria-hidden
          viewBox="0 0 100 4"
          preserveAspectRatio="none"
          className="absolute inset-x-0 top-1/2 h-1 w-full -translate-y-1/2"
        >
          <defs>
            <linearGradient id="process-rail-gradient" x1="0" y1="0" x2="1" y2="0">
              {processSteps.map((step, i) => (
                <stop key={step.id} offset={`${(i / (processSteps.length - 1)) * 100}%`} stopColor={accentStroke[step.accent]} />
              ))}
            </linearGradient>
            <linearGradient id="process-rail-pulse" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="50%" stopColor="white" stopOpacity="0.9" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="0" y1="2" x2="100" y2="2" stroke="var(--border-subtle)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <motion.line
            x1="0"
            y1="2"
            x2="100"
            y2="2"
            stroke="url(#process-rail-gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: reduceMotion ? 1 : scrollYProgress }}
          />
          {!reduceMotion ? (
            <motion.rect
              y="0"
              width="18"
              height="4"
              fill="url(#process-rail-pulse)"
              animate={{ x: [-18, 100] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          ) : null}
        </svg>
        <div className="relative grid h-full grid-cols-6 items-center">
          {processSteps.map((step, i) => (
            <div key={step.id} className="flex justify-center">
              <ProcessDot
                scrollYProgress={scrollYProgress}
                threshold={i / (processSteps.length - 1)}
                accent={step.accent}
                reduceMotion={Boolean(reduceMotion)}
                isActive={activeId === step.id}
              />
            </div>
          ))}
        </div>
      </div>

      <ol
        aria-label={t("timelineAriaLabel")}
        className={cn(
          "relative z-10 mx-auto grid max-w-[1380px] grid-cols-1 gap-5",
          "min-[768px]:grid-cols-2",
          "min-[1200px]:grid-cols-3 min-[1200px]:grid-rows-2 min-[1200px]:items-center min-[1200px]:gap-x-7 min-[1200px]:gap-y-16",
          "min-[1200px]:[grid-auto-flow:column]",
        )}
      >
        {processSteps.map((step, i) => {
          const isTop = i % 2 === 0;
          return (
            <li
              key={step.id}
              className={cn(
                "flex items-start gap-4",
                "min-[1200px]:flex-col min-[1200px]:items-center min-[1200px]:gap-0",
                !isTop && "min-[1200px]:flex-col-reverse",
              )}
            >
              <MobileConnector step={step} isLast={i === processSteps.length - 1} />
              <ProcessCard
                step={step}
                from={isTop ? "above" : "below"}
                className="max-w-none min-w-0 flex-1 min-[1200px]:w-full min-[1200px]:flex-none"
                onActiveChange={makeActiveHandler(step.id)}
              />
              <CardConnector step={step} isActive={activeId === step.id} />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
