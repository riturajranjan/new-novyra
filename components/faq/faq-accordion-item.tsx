"use client";

import { useRef, type PointerEvent } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import type { FaqEntry } from "@/content/faq";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface FaqAccordionItemProps {
  entry: FaqEntry;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

/** A floating glass accordion card — gradient border, cursor-reactive
 * highlight, and a plus-to-minus icon morph instead of a plain chevron. */
export function FaqAccordionItem({ entry, isOpen, onToggle, index }: FaqAccordionItemProps) {
  const t = useTranslations("faq.entries");
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const highlight = useMotionTemplate`radial-gradient(280px circle at ${mouseX}% ${mouseY}%, color-mix(in oklab, var(--color-brand-blue) 16%, transparent), transparent 70%)`;

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  const triggerId = `faq-trigger-${entry.id}`;
  const panelId = `faq-panel-${entry.id}`;

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "150px" }}
      transition={{ duration: 0.4, delay: reduceMotion ? 0 : index * 0.04, ease: easePremium }}
      className={cn(
        "group border-border-subtle bg-surface/70 relative overflow-hidden rounded-xl border backdrop-blur-2xl transition-colors duration-base",
        isOpen && "border-brand-blue/40",
      )}
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ backgroundImage: highlight }} />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-16 bg-gradient-to-b from-white/8 to-transparent" />

      <button
        type="button"
        id={triggerId}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-7 sm:py-6"
      >
        <span className="text-body sm:text-body-lg text-foreground font-semibold">{t(`${entry.id}.question`)}</span>
        <span className="border-border-subtle bg-surface relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border">
          <span className="bg-foreground absolute h-[1.5px] w-3.5 rounded-full" />
          <motion.span
            className="bg-foreground absolute h-[1.5px] w-3.5 rounded-full"
            initial={{ rotate: 90 }}
            animate={{ rotate: 90, scaleY: isOpen ? 0 : 1 }}
            transition={{ duration: 0.3, ease: easePremium }}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={triggerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: easePremium }}
            className="overflow-hidden"
          >
            <p className="text-body-sm sm:text-body text-foreground-secondary px-5 pb-[18px] sm:px-7 sm:pb-6">{t(`${entry.id}.answer`)}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
