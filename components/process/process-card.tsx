"use client";

import { useRef, type PointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useTranslations } from "next-intl";
import { accentStroke, accentTint } from "@/lib/accent";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { ProcessStep } from "@/content/process-steps";

interface ProcessCardProps {
  step: ProcessStep;
  /** Entrance direction — cards above the rail drop in, cards below rise
   * in, reinforcing the alternating layout. */
  from?: "above" | "below";
  className?: string;
  /** Notifies the parent timeline so this step's rail node can light up in
   * sync with the card, even though they live in separate grid rows. */
  onActiveChange?: (active: boolean) => void;
}

/** Wide, short, frosted-glass process card — real translucency via a
 * theme-reactive gradient fill + backdrop blur, a soft top reflection, an
 * always-on ambient glow that brightens on hover, a large gradient step
 * numeral, and (mouse only, never touch) a subtle 3D tilt. Height is
 * `min-height` only, so longer copy or an extra wrapped chip grows the
 * card instead of clipping or overflowing its slot. */
export function ProcessCard({ step, from = "above", className, onActiveChange }: ProcessCardProps) {
  const t = useTranslations("process.steps");
  const reduceMotion = useReducedMotion();
  const Icon = step.icon;
  const deliverables = t.raw(`${step.id}.deliverables`) as string[];
  const stroke = accentStroke[step.accent];
  const numberGradient = `linear-gradient(135deg, ${stroke}, color-mix(in oklab, ${stroke} 45%, white))`;
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 150, damping: 20, mass: 0.5 });
  const springTiltY = useSpring(tiltY, { stiffness: 150, damping: 20, mass: 0.5 });

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || e.pointerType !== "mouse") return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltY.set(px * 4);
    tiltX.set(py * -4);
  }

  function handlePointerLeave() {
    tiltX.set(0);
    tiltY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onHoverStart={() => onActiveChange?.(true)}
      onHoverEnd={() => onActiveChange?.(false)}
      initial={{ opacity: 0, y: from === "above" ? 20 : -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "150px" }}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.4, ease: easePremium }}
      style={{
        rotateX: reduceMotion ? 0 : springTiltX,
        rotateY: reduceMotion ? 0 : springTiltY,
        transformPerspective: 1200,
        backgroundImage: "var(--process-card-bg)",
        borderColor: "var(--process-card-border)",
        boxShadow: "var(--process-card-shadow)",
      }}
      className={cn(
        "group relative isolate flex min-h-[240px] w-full flex-col gap-4 overflow-hidden rounded-[30px] border p-5",
        "min-[1200px]:min-h-[290px] min-[1200px]:gap-[18px] min-[1200px]:p-7",
        "backdrop-blur-[30px] backdrop-saturate-[1.4] transition-[backdrop-filter,box-shadow] duration-[400ms] ease-out group-hover:backdrop-blur-[38px]",
        className,
      )}
    >
      {/* always-on ambient glow, brightens on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] blur-3xl transition-opacity duration-[400ms] ease-out"
        style={{ backgroundColor: accentTint(step.accent, 22), opacity: 0.35 }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] opacity-0 blur-3xl transition-opacity duration-[400ms] ease-out group-hover:opacity-100"
        style={{ backgroundColor: accentTint(step.accent, 26) }}
      />
      {/* soft top reflection */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/12 to-transparent"
      />
      {/* hover light sweep */}
      <span
        aria-hidden
        className="bg-gradient-shimmer pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-[600ms] ease-out group-hover:translate-x-full"
      />
      {/* thin accent border glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[30px] opacity-0 transition-opacity duration-[400ms] ease-out group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 0 1px ${accentTint(step.accent, 60)}` }}
      />

      <div className="flex items-start justify-between gap-4">
        <span
          className="text-display-lg leading-none font-semibold"
          style={{ backgroundImage: numberGradient, backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent" }}
        >
          {step.number}
        </span>
        <motion.span
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "150px" }}
          transition={{ duration: 0.4, delay: 0.15, ease: easePremium }}
          className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 backdrop-blur-sm transition-transform duration-[400ms] ease-out group-hover:rotate-[8deg] group-hover:scale-110"
          style={{ backgroundColor: accentTint(step.accent, 18) }}
        >
          <span aria-hidden className="absolute -inset-2 -z-10 rounded-2xl blur-lg" style={{ backgroundColor: accentTint(step.accent, 35) }} />
          <Icon className="h-6 w-6" style={{ color: stroke }} aria-hidden />
        </motion.span>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-title text-foreground font-semibold tracking-wide uppercase">{t(`${step.id}.title`)}</h3>
        <p className="text-body-sm text-foreground-secondary">{t(`${step.id}.description`)}</p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "150px" }}
        transition={{ staggerChildren: 0.06, delayChildren: 0.25 }}
        className="mt-auto flex flex-wrap gap-2"
      >
        {deliverables.map((item) => (
          <motion.span
            key={item}
            variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.3, ease: easePremium }}
            className="text-[14px] border-border-subtle text-foreground-secondary/80 hover:text-foreground-secondary flex w-fit max-w-full items-center gap-1.5 rounded-full border bg-white/[0.04] px-3 py-1.5 leading-tight break-normal whitespace-normal backdrop-blur-sm transition-[color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_16px_-4px_var(--chip-glow)]"
            style={{ ["--chip-glow" as string]: accentTint(step.accent, 45) }}
          >
            <span
              aria-hidden
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: stroke, boxShadow: `0 0 6px 1px ${accentTint(step.accent, 60)}` }}
            />
            {item}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}
