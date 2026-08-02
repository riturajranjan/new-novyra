"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { floatingIcons } from "@/content/lead-popup";
import { cn } from "@/lib/utils";

interface LeadPopupIllustrationProps {
  className?: string;
}

const particles = [
  { top: "18%", left: "25%", delay: 0 },
  { top: "70%", left: "72%", delay: 1.1 },
  { top: "45%", left: "50%", delay: 0.6 },
];

/** The popup's left-side visual — never a stock photo. Kept deliberately
 * minimal: one small floating glass "dashboard" card, four capability
 * chips (website / AI / hospital / growth), one aurora wash, one short
 * heading — no grid overlay or particle field competing for attention in
 * what's now a narrower 38% column. */
export function LeadPopupIllustration({ className }: LeadPopupIllustrationProps) {
  const t = useTranslations("leadPopup.illustration");
  const reduceMotion = useReducedMotion();

  return (
    <div className={cn("relative isolate flex-col items-center justify-center overflow-hidden p-6", className)}>
      <div aria-hidden className="bg-gradient-aurora animate-aurora pointer-events-none absolute inset-0 -z-10 opacity-[0.28]" />

      {!reduceMotion
        ? particles.map((p, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="pointer-events-none absolute h-1 w-1 rounded-full bg-white/60"
              style={{ top: p.top, left: p.left }}
              animate={{ opacity: [0.15, 0.6, 0.15], scale: [0.8, 1.25, 0.8] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
            />
          ))
        : null}

      <motion.div
        className="relative z-10 mx-auto flex h-28 w-40 flex-col gap-1.5 rounded-2xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur-xl"
        style={{ boxShadow: "0 16px 48px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)" }}
        animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div aria-hidden className="flex items-center gap-1.5">
          <span className="bg-brand-pink/70 h-1.5 w-1.5 rounded-full" />
          <span className="bg-brand-blue/70 h-1.5 w-1.5 rounded-full" />
          <span className="bg-brand-emerald/70 h-1.5 w-1.5 rounded-full" />
        </div>
        <div aria-hidden className="flex flex-1 flex-col gap-1.5 pt-1">
          <div className="h-1.5 w-3/4 rounded-full bg-white/15" />
          <div className="h-1.5 w-1/2 rounded-full bg-white/10" />
          <div className="mt-auto grid grid-cols-3 gap-1">
            <div className="bg-brand-blue/20 h-6 rounded-md" />
            <div className="bg-brand-purple/20 h-6 rounded-md" />
            <div className="bg-brand-cyan/20 h-6 rounded-md" />
          </div>
        </div>
      </motion.div>

      {floatingIcons.map((item) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.id}
            aria-hidden
            className="absolute z-20 flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.08] px-2.5 py-1.5 backdrop-blur-md"
            style={{ top: item.top, left: item.left, boxShadow: "0 6px 18px rgba(0,0,0,0.25)" }}
            animate={reduceMotion ? undefined : { y: [0, -item.bob, 0], rotate: [0, 2, 0] }}
            transition={{ duration: item.duration, delay: item.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon className="h-3 w-3 text-white/85" />
            <span className="text-[9px] font-medium whitespace-nowrap text-white/80">{t(`icons.${item.id}`)}</span>
          </motion.div>
        );
      })}

      <motion.p
        className="text-caption relative z-10 mt-5 max-w-[190px] text-center font-semibold text-white"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
      >
        {t("heading")}
      </motion.p>
    </div>
  );
}
