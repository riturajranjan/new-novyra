"use client";

import { useRef } from "react";
import { Sparkles } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useTranslations } from "next-intl";
import { pricingPlans } from "@/content/pricing";
import { accentStroke, accentTint } from "@/lib/accent";
import { easePremium } from "@/lib/motion";

const visualPlans = pricingPlans.filter((p) => p.id !== "enterprise");

/** Fixed per-plan depth placement — Starter tucked upper-left and furthest
 * back, Business tucked lower-right and furthest back, Professional
 * centered, largest and closest to the viewer. No connecting lines: depth
 * (translateZ), overlap, scale and light stand in for the connection
 * instead. */
const LAYOUT: Record<
  string,
  { top: string; left: string; width: string; rotateY: number; rotateX: number; z: number; scale: number; delay: number }
> = {
  starter: { top: "2%", left: "0%", width: "58%", rotateY: -10, rotateX: 5, z: -40, scale: 0.86, delay: 0 },
  professional: { top: "22%", left: "21%", width: "68%", rotateY: 0, rotateX: 0, z: 40, scale: 1, delay: 0.2 },
  business: { top: "46%", left: "38%", width: "58%", rotateY: 10, rotateX: -5, z: -20, scale: 0.88, delay: 0.1 },
};

function StackCard({
  plan,
  pointerX,
  pointerY,
}: {
  plan: (typeof visualPlans)[number];
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
}) {
  const t = useTranslations("pricing");
  const tVisual = useTranslations("pricing.heroVisual");
  const layout = LAYOUT[plan.id];
  const featured = Boolean(plan.featured);
  const stroke = accentStroke[plan.accent];

  // Layers further from the viewer (lower z) parallax less — a real depth
  // cue, not every card moving by the same amount.
  const depthFactor = 0.4 + (layout.z + 40) / 80;
  const rotateY = useTransform(pointerX, (v) => layout.rotateY + v * 6 * depthFactor);
  const rotateX = useTransform(pointerY, (v) => layout.rotateX - v * 6 * depthFactor);

  return (
    <motion.div
      className="absolute flex flex-col gap-3 rounded-2xl p-4"
      style={{
        top: layout.top,
        left: layout.left,
        width: layout.width,
        zIndex: 20 + layout.z,
        transformStyle: "preserve-3d",
        transformPerspective: 1200,
        rotateY,
        rotateX,
        scale: layout.scale,
        translateZ: layout.z,
        background: featured ? "rgba(255,255,255,0.075)" : "rgba(255,255,255,0.045)",
        border: `1px solid ${featured ? accentTint(plan.accent, 38) : "rgba(255,255,255,0.10)"}`,
        backdropFilter: "blur(20px) saturate(150%)",
        WebkitBackdropFilter: "blur(20px) saturate(150%)",
        boxShadow: featured
          ? `0 30px 70px -20px ${accentTint(plan.accent, 55)}, inset 0 1px 0 rgba(255,255,255,0.12)`
          : `0 18px 44px -22px rgba(0,0,0,0.55)`,
      }}
      initial={{ opacity: 0, y: 30, scale: layout.scale * 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: layout.scale }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: layout.delay, ease: easePremium }}
    >
      {featured ? (
        <span
          className="absolute -top-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold whitespace-nowrap text-white shadow-[0_6px_16px_-4px_rgba(139,92,246,0.65)]"
          style={{ backgroundImage: "linear-gradient(90deg, #6366F1, #A855F7)" }}
        >
          <Sparkles className="h-2.5 w-2.5" aria-hidden />
          {t("popular")}
        </span>
      ) : null}

      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: accentTint(plan.accent, 20) }}>
          <plan.icon className="h-3.5 w-3.5" style={{ color: stroke }} aria-hidden />
        </span>
        <span className="text-body-sm truncate font-semibold text-white">{t(`plans.${plan.id}.name`)}</span>
      </div>

      <p className="leading-none font-semibold text-white" style={{ fontSize: featured ? "1.5rem" : "1.125rem" }}>
        {plan.price.project}
        <span className="text-caption font-medium text-white/45">{plan.priceSuffix.project}</span>
      </p>

      <span className="text-caption truncate" style={{ color: accentTint(plan.accent, 85) }}>
        {tVisual(plan.id)}
      </span>
    </motion.div>
  );
}

/** The Pricing hero's right-side visual — a cohesive "pricing stack": three
 * plan cards positioned with real depth (translateZ/rotateY/rotateX, CSS
 * transforms only) instead of a flat fan of interchangeable rectangles.
 * Professional sits centered, largest and closest to the viewer; Starter
 * and Business sit behind it, upper-left and lower-right. No literal
 * connecting lines — an illuminated platform glow and a faint orbital ring
 * underneath do the connecting instead. A very light pointer-parallax
 * tilts the whole stack on desktop; reduced-motion drops both the
 * parallax and the entrance animation and renders the final layout
 * directly. */
export function PricingHeroVisual() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pointerX = useSpring(rawX, { stiffness: 120, damping: 20 });
  const pointerY = useSpring(rawY, { stiffness: 120, damping: 20 });

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative mx-auto aspect-4/5 w-full max-w-90 md:max-w-100 lg:max-w-110"
      style={{ perspective: 1200 }}
    >
      {/* Illuminated platform beneath the stack, standing in for a literal
          connector — the light itself implies the three cards belong
          together. */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[6%] left-1/2 h-16 w-[70%] -translate-x-1/2 rounded-[50%]"
        style={{
          background: "radial-gradient(closest-side, color-mix(in oklab, var(--color-brand-purple) 45%, transparent), transparent 75%)",
          filter: "blur(18px)",
        }}
      />
      <svg aria-hidden viewBox="0 0 200 200" className="pointer-events-none absolute inset-0 h-full w-full opacity-25">
        <ellipse cx="100" cy="150" rx="78" ry="22" fill="none" stroke="url(#orbit-gradient)" strokeWidth="1" strokeDasharray="2 5" />
        <defs>
          <linearGradient id="orbit-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-brand-blue)" />
            <stop offset="50%" stopColor="var(--color-brand-purple)" />
            <stop offset="100%" stopColor="var(--color-brand-cyan)" />
          </linearGradient>
        </defs>
      </svg>

      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-brand-blue absolute top-[4%] left-[2%] h-36 w-36 rounded-full opacity-20 blur-[85px]" />
        <div className="bg-brand-purple absolute top-[30%] left-[30%] h-44 w-44 rounded-full opacity-25 blur-[95px]" />
        <div className="bg-brand-cyan absolute right-[2%] bottom-[4%] h-36 w-36 rounded-full opacity-18 blur-[85px]" />
      </div>

      {visualPlans.map((plan) => (
        <StackCard key={plan.id} plan={plan} pointerX={pointerX} pointerY={pointerY} />
      ))}
    </div>
  );
}
