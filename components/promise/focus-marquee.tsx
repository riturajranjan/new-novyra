"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { focusAreas } from "@/content/our-promise";

/** A scrolling strip of industries the team designs and builds for —
 * replaces a company-logo marquee, since there are no real client logos to
 * show yet. Framed explicitly as a focus statement, not a client roster. */
export function FocusMarquee() {
  const t = useTranslations("promise");
  const reduceMotion = useReducedMotion();
  const loop = [...focusAreas, ...focusAreas];

  return (
    <div className="flex flex-col gap-4">
      <p className="text-caption text-foreground-secondary text-center font-semibold tracking-wide uppercase">
        {t("focusMarquee.heading")}
      </p>
      <div
        className="relative overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <motion.div
          className="flex w-max items-center gap-3"
          animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={reduceMotion ? undefined : { duration: 24, repeat: Infinity, ease: "linear" }}
        >
          {loop.map((area, i) => {
            const Icon = area.icon;
            return (
              <span
                key={`${area.id}-${i}`}
                className="border-border-subtle bg-surface/60 text-foreground-secondary flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-body-sm font-medium"
              >
                <Icon className="h-4 w-4" aria-hidden />
                {t(`focusAreas.${area.id}`)}
              </span>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
