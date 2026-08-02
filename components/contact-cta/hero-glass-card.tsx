"use client";

import { useRef, type PointerEvent } from "react";
import { ArrowRight, CalendarClock, FileText } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Magnetic } from "@/components/ui/magnetic";
import { buttonVariants } from "@/components/ui/button";
import { RippleLink } from "@/components/ui/ripple-link";
import { GlassOrb } from "@/components/contact-cta/glass-orb";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** The centerpiece of the section — one large floating glass card with a
 * gradient border, a breathing aurora glow, and a cursor-following
 * highlight, holding the three primary conversion actions. */
export function HeroGlassCard() {
  const t = useTranslations("contact.heroCard");
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const highlight = useMotionTemplate`radial-gradient(480px circle at ${mouseX}% ${mouseY}%, color-mix(in oklab, var(--color-brand-blue) 14%, transparent), transparent 70%)`;

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "150px" }}
      animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
      transition={
        reduceMotion
          ? { duration: 0.6, ease: easePremium }
          : { y: { duration: 6, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.6, ease: easePremium } }
      }
      className="relative overflow-hidden rounded-[36px] p-[1px]"
      style={{
        backgroundImage:
          "linear-gradient(135deg, color-mix(in oklab, var(--color-brand-blue) 70%, transparent), color-mix(in oklab, var(--color-brand-purple) 55%, transparent), color-mix(in oklab, var(--color-brand-cyan) 70%, transparent))",
      }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-24 -z-20 rounded-full blur-3xl"
        style={{ backgroundColor: "color-mix(in oklab, var(--color-brand-purple) 22%, transparent)" }}
        animate={reduceMotion ? undefined : { opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 35px = the 36px outer gradient-border wrapper's radius minus the
          1px inset, keeping the inner and outer corners concentric.
          Documented exception to the radius scale. */}
      <div className="bg-surface/85 relative flex flex-col items-center gap-6 rounded-[35px] p-6 text-center backdrop-blur-2xl sm:px-14 sm:py-16">
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ backgroundImage: highlight }} />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 rounded-t-[35px] bg-gradient-to-b from-white/10 to-transparent" />

        <GlassOrb />

        <div className="flex flex-col items-center gap-3">
          <h3 className="text-headline sm:text-display-lg text-foreground font-semibold text-balance">{t("title")}</h3>
          <p className="text-body sm:text-body-lg text-foreground-secondary max-w-xl text-pretty">{t("description")}</p>
        </div>

        <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
          <Magnetic className="w-full sm:w-auto">
            <RippleLink
              href="/contact"
              className={cn(buttonVariants({ variant: "gradient", size: "lg" }), "group relative w-full overflow-hidden sm:w-auto")}
            >
              <span
                aria-hidden
                className="bg-gradient-shimmer pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-full"
              />
              {t("bookConsultation")}
              <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-0.5" aria-hidden />
            </RippleLink>
          </Magnetic>
          <Magnetic className="w-full sm:w-auto">
            <RippleLink href="/contact" className={cn(buttonVariants({ variant: "glass", size: "lg" }), "w-full sm:w-auto")}>
              <FileText className="h-4 w-4" aria-hidden />
              {t("requestQuote")}
            </RippleLink>
          </Magnetic>
          <Magnetic className="w-full sm:w-auto">
            <RippleLink href="/contact" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto")}>
              <CalendarClock className="h-4 w-4" aria-hidden />
              {t("scheduleCall")}
            </RippleLink>
          </Magnetic>
        </div>
      </div>
    </motion.div>
  );
}
