"use client";

import { useRef, type PointerEvent } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useTranslations } from "next-intl";
import { accentStroke, accentTint } from "@/lib/accent";
import { easePowerOut, easePremium } from "@/lib/motion";
import type { ServiceCategory, ServiceVisual } from "@/content/service-categories";
import type { AccentColor } from "@/content/hero-screens";
import { WebsiteMockup } from "@/components/services/mockups/website-mockup";
import { DevMockup } from "@/components/services/mockups/dev-mockup";
import { SaasMockup } from "@/components/services/mockups/saas-mockup";
import { AutomationMockup } from "@/components/services/mockups/automation-mockup";
import { MarketingMockup } from "@/components/services/mockups/marketing-mockup";
import { DesignMockup } from "@/components/services/mockups/design-mockup";

const visualMap: Record<ServiceVisual, (accent: AccentColor) => React.JSX.Element> = {
  website: (accent) => <WebsiteMockup accent={accent} />,
  development: (accent) => <DevMockup accent={accent} />,
  saas: (accent) => <SaasMockup accent={accent} />,
  automation: (accent) => <AutomationMockup accent={accent} />,
  marketing: (accent) => <MarketingMockup accent={accent} />,
  design: (accent) => <DesignMockup accent={accent} />,
};

/** The large central preview — a live, category-specific interface mockup
 * with a restrained pointer-tilt, a soft ambient glow that morphs to the
 * active accent, and a glass reflection sheen. Content swaps with a
 * fade + slide + scale so it reads as a morph, not a hard cut. */
export function ServicePreview({ category }: { category: ServiceCategory }) {
  const t = useTranslations("services");
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 120, damping: 20, mass: 0.5 });
  const springTiltY = useSpring(tiltY, { stiffness: 120, damping: 20, mass: 0.5 });

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || e.pointerType !== "mouse") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltY.set(px * 5);
    tiltX.set(py * -5);
  }

  function handlePointerLeave() {
    tiltX.set(0);
    tiltY.set(0);
  }

  const Icon = category.icon;
  const stroke = accentStroke[category.accent];

  return (
    <div style={{ perspective: 1600 }} className="min-w-0">
      <motion.div
        id={`service-panel-${category.id}`}
        role="tabpanel"
        aria-labelledby={`service-tab-${category.id}`}
        ref={ref}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        animate={{ backgroundImage: `linear-gradient(135deg, ${accentTint(category.accent, 34)}, rgba(255,255,255,0.08), ${accentTint(category.accent, 15)})` }}
        whileHover={reduceMotion ? undefined : { y: -4 }}
        transition={{ backgroundImage: { duration: 0.6, ease: easePremium }, y: { duration: 0.25, ease: "easeOut" } }}
        style={{
          rotateX: reduceMotion ? 0 : springTiltX,
          rotateY: reduceMotion ? 0 : springTiltY,
          transformPerspective: 1600,
          ["--preview-glow" as string]: accentTint(category.accent, 34),
        }}
        className="group relative isolate rounded-hero p-px shadow-card transition-shadow duration-slow ease-soft hover:shadow-[0_32px_80px_-24px_var(--preview-glow)]"
      >
        {/* A wide, soft radial glow — distinct from the tighter blur-3xl
            block glow below — so the preview reads as sitting in its own
            pool of light rather than just having a colored blob behind it. */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-24 -z-20 rounded-[4rem]"
          animate={{ backgroundImage: `radial-gradient(closest-side, ${accentTint(category.accent, 16)}, transparent)` }}
          transition={{ duration: 0.8, ease: easePremium }}
        />

        {/* Same accent gradient the active nav tab's border uses — the
            preview visibly belongs to whichever service is selected,
            rather than a neutral frame that happens to sit next to it. */}
        <div
          className="glass-strong relative isolate flex flex-col overflow-hidden rounded-hero"
          style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -1px 0 rgba(0,0,0,0.08)" }}
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-16 -z-10 rounded-[3rem] blur-3xl"
            animate={{ backgroundColor: accentTint(category.accent, 13) }}
            transition={{ duration: 0.8, ease: easePremium }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-white/12 to-transparent"
          />

          <div className="border-border-subtle relative z-10 flex items-center gap-3 border-b px-6 py-4">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-slow"
              style={{ backgroundColor: accentTint(category.accent, 12) }}
            >
              <Icon className="h-5 w-5" style={{ color: stroke }} aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-body-sm text-foreground truncate font-semibold">
                {t(`categories.${category.id}.label`)}
              </p>
              <p className="text-caption text-foreground-secondary truncate">
                {t(`categories.${category.id}.subtitle`)}
              </p>
            </div>
          </div>

          {/* Switching services slides the preview horizontally — no scale,
              rotation, or bounce — so it reads as changing tabs in a
              product, not an "arrival" effect. The card itself (this
              wrapper, its size, border, glow) never animates; only this
              inner content swaps. */}
          <div className="relative h-[clamp(360px,38vw,500px)] overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -28 }}
                transition={{ duration: 0.32, ease: easePowerOut }}
                className="h-full"
              >
                {visualMap[category.visual](category.accent)}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
