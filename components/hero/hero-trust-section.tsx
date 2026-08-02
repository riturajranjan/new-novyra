"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { heroTrustItems } from "@/content/hero";
import { accentStroke, accentTint } from "@/lib/accent";

/** A compact two-column grid of honest capability claims beneath the CTAs —
 * never a star rating or fake review, just what Novyra actually does. Mount
 * entrance is driven by the hero's GSAP timeline (targeting `> *`), so this
 * only owns the hover interaction. */
export function HeroTrustSection() {
  const t = useTranslations("hero.trust.items");
  const reduceMotion = useReducedMotion();

  return (
    <div
      data-hero-trust
      className="mt-1 hidden md:grid grid-cols-1 gap-2 min-[430px]:grid-cols-2 sm:gap-2.5">
      {heroTrustItems.map((item) => {
        const Icon = item.icon;
        return (
          <motion.span
            key={item.id}
            whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{ ["--pill-border" as string]: accentTint(item.accent, 40) }}
            className="glass text-caption text-foreground-secondary inline-flex min-h-10 items-center gap-2 rounded-pill px-3 py-1.5 font-medium transition-colors duration-base hover:border-(--pill-border)">
            <span
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
              style={{ background: accentTint(item.accent, 18) }}>
              <Icon
                className="h-3 w-3"
                style={{ color: accentStroke[item.accent] }}
                aria-hidden
              />
            </span>
            {t(item.id)}
          </motion.span>
        );
      })}
    </div>
  );
}
