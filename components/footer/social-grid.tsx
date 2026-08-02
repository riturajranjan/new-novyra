"use client";

import { useRef, type PointerEvent } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { socialGlyphs } from "@/components/footer/social-icons";
import { socialLinks } from "@/content/footer";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Platform names are proper nouns/trademarks — intentionally shown the
 * same in every locale rather than translated. */
const socialNames: Record<(typeof socialLinks)[number]["id"], string> = {
  linkedin: "LinkedIn",
  github: "GitHub",
  instagram: "Instagram",
  facebook: "Facebook",
  x: "X (Twitter)",
  youtube: "YouTube",
};

function SocialCard({ link, index, label }: { link: (typeof socialLinks)[number]; index: number; label: string }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(50);
  const y = useMotionValue(50);
  const highlight = useMotionTemplate`radial-gradient(120px circle at ${x}% ${y}%, color-mix(in oklab, var(--color-brand-blue) 22%, transparent), transparent 70%)`;
  const Glyph = socialGlyphs[link.id];

  function handlePointerMove(e: PointerEvent<HTMLAnchorElement>) {
    if (reduceMotion || e.pointerType !== "mouse") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(((e.clientX - rect.left) / rect.width) * 100);
    y.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  if (link.disabled) {
    return (
      <span
        aria-disabled
        className="border-border-subtle bg-surface/40 text-foreground-secondary/40 flex h-10 w-10 shrink-0 cursor-not-allowed items-center justify-center rounded-xl border"
        title={label}
      >
        <Glyph className="h-4.5 w-4.5" aria-hidden />
      </span>
    );
  }

  return (
    <motion.a
      ref={ref}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      onPointerMove={handlePointerMove}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "150px" }}
      whileHover={{ y: -3, scale: 1.05 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: easePremium }}
      aria-label={label}
      className="group border-border-subtle bg-surface/60 relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border backdrop-blur-md transition-[box-shadow,border-color] duration-base hover:border-transparent hover:shadow-[0_0_16px_-4px_var(--color-brand-blue),0_0_0_1px_var(--color-brand-purple)]"
    >
      <motion.span aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: highlight }} />
      <Glyph className="text-foreground-secondary group-hover:text-foreground relative h-4.5 w-4.5 transition-colors duration-base" aria-hidden />
    </motion.a>
  );
}

/** Compact glass social row — mouse-follow light, a soft glow + gradient
 * edge on hover, and a disabled treatment for the one platform that isn't
 * live yet. */
export function SocialGrid() {
  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-2")}>
      {socialLinks.map((link, i) => (
        <SocialCard key={link.id} link={link} index={i} label={socialNames[link.id]} />
      ))}
    </div>
  );
}
