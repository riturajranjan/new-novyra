"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Cloud, Code2, Database, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { accentStroke, accentTint } from "@/lib/accent";
import dashboardPreview from "@/public/hero2.png";

const IMAGE_SIZES = "(max-width: 1024px) 88vw, 640px";

/** Two tech-adjacent icons, positioned just inside the image's own edges
 * (never a negative offset that would spill into the gap toward the left
 * content column) — decorative only (aria-hidden). `hideBelow` trims the
 * set down on tablet, per the "keep only 2 on tablet" rule. */
const FLOATING_ICONS = [
  { icon: Database, accent: "purple" as const, top: "68%", left: "1%", size: 32, duration: 8, delay: 1.4, hideBelow: "lg" as const },
  { icon: Cloud, accent: "blue" as const, top: "80%", left: "86%", size: 34, duration: 7.5, delay: 0.7, hideBelow: "md" as const },
];

/** The hero's centerpiece — the real, provided product-dashboard image,
 * used exactly as given (no redraw, no recreation). Every effect here lives
 * *around* the image (ambient glow, a glass reflection echo, a small set of
 * floating capability icons, two edge trust badges) — the `<Image>` itself
 * only ever gets a `drop-shadow` filter, never a recolor/crop/edit of its
 * pixels. Deliberately no purely-ornamental motion (no particle sparkles,
 * no orbit ring) — every element here carries real meaning (a capability or
 * a trust signal), not just movement for its own sake. Sized to stay
 * clearly smaller than the left content column so it supports the pitch
 * instead of dominating it. */
export function HeroImageShowcase() {
  const t = useTranslations("hero");
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto flex w-full max-w-105 items-center justify-center py-6 md:max-w-130 lg:mx-0 lg:ml-auto lg:max-w-165 xl:max-w-185">
      {/* Ambient lighting: a restrained blue/purple/pink glow so the image
          reads as sitting inside the scene rather than pasted on top of it. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-brand-blue absolute top-[8%] left-[4%] h-56 w-56 rounded-full opacity-[0.22] blur-[90px]" />
        <div className="bg-brand-purple absolute top-[2%] right-[6%] h-64 w-64 rounded-full opacity-[0.22] blur-[100px]" />
        <div className="bg-brand-pink absolute bottom-[6%] left-1/3 h-52 w-52 rounded-full opacity-[0.16] blur-[90px]" />
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-0">
        {FLOATING_ICONS.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              className={`absolute hidden items-center justify-center rounded-2xl backdrop-blur-md ${item.hideBelow === "md" ? "md:flex" : "lg:flex"}`}
              style={{
                top: item.top,
                left: item.left,
                width: item.size,
                height: item.size,
                background: accentTint(item.accent, 16),
                border: `1px solid ${accentTint(item.accent, 40)}`,
                boxShadow: `0 10px 24px -10px ${accentTint(item.accent, 55)}`,
              }}
              animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: item.duration, repeat: Infinity, ease: "easeInOut", delay: item.delay }}
            >
              <Icon className="h-[45%] w-[45%]" style={{ color: accentStroke[item.accent] }} />
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="relative z-10 w-full"
        animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src={dashboardPreview}
          alt={t("imageAlt")}
          preload
          sizes={IMAGE_SIZES}
          placeholder="blur"
          className="h-auto w-full object-contain drop-shadow-[0_35px_70px_rgba(0,0,0,0.5)]"
        />

        {/* Edge-attached chips — anchored directly to the image's own
            corners (never floating disconnected in the surrounding space)
            so they read as part of the platform, not stray decoration. */}
        <motion.div
          aria-hidden
          className="absolute -bottom-3 -left-3 z-30 hidden h-10 w-10 items-center justify-center rounded-2xl backdrop-blur-xl sm:-bottom-4 sm:-left-4 sm:h-11 sm:w-11 md:flex"
          style={{
            background: "linear-gradient(155deg, rgba(255,255,255,0.14), rgba(255,255,255,0.03))",
            border: `1px solid ${accentTint("emerald", 45)}`,
            boxShadow: `0 12px 30px -10px ${accentTint("emerald", 55)}, inset 0 1px 0 rgba(255,255,255,0.16)`,
          }}
          animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <ShieldCheck className="h-1/2 w-1/2" style={{ color: accentStroke.emerald }} />
        </motion.div>

        <motion.div
          aria-hidden
          className="absolute -top-3 -right-3 z-30 hidden h-10 w-10 items-center justify-center rounded-2xl backdrop-blur-xl sm:-top-4 sm:-right-4 sm:h-11 sm:w-11 lg:flex"
          style={{
            background: "linear-gradient(155deg, rgba(255,255,255,0.14), rgba(255,255,255,0.03))",
            border: `1px solid ${accentTint("cyan", 45)}`,
            boxShadow: `0 12px 30px -10px ${accentTint("cyan", 55)}, inset 0 1px 0 rgba(255,255,255,0.16)`,
          }}
          animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        >
          <Code2 className="h-1/2 w-1/2" style={{ color: accentStroke.cyan }} />
        </motion.div>

        {/* Glass-reflection echo — the same asset, flipped and faded beneath
            it, never a modification of the source file itself. */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-full overflow-hidden">
          <Image
            src={dashboardPreview}
            alt=""
            sizes={IMAGE_SIZES}
            className="h-auto w-full translate-y-[-6%] scale-y-[-1] object-contain opacity-40 blur-[2px]"
            style={{
              maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.55), transparent 55%)",
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.55), transparent 55%)",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
