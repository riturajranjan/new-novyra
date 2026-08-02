"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { MessageCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { whatsappHref } from "@/content/lead-popup";
import type { EnquiryFieldValues } from "@/lib/validation/enquiry";
import { cn } from "@/lib/utils";

interface LeadPopupSuccessProps {
  onContinue: () => void;
  values: EnquiryFieldValues;
}

/** One tasteful confetti burst — a handful of small colored pieces flung
 * outward and fading, not a screen-covering cannon. Fires once on mount
 * (this component only ever mounts after a successful submit) and never
 * repeats. */
const confettiPieces = [
  { x: -70, rotate: -50, color: "var(--color-brand-blue)", delay: 0 },
  { x: 55, rotate: 40, color: "var(--color-brand-purple)", delay: 0.04 },
  { x: -25, rotate: 70, color: "var(--color-brand-pink)", delay: 0.08 },
  { x: 80, rotate: -30, color: "var(--color-brand-cyan)", delay: 0.02 },
  { x: -90, rotate: 20, color: "var(--color-brand-emerald)", delay: 0.14 },
  { x: 15, rotate: -70, color: "var(--color-brand-amber)", delay: 0.06 },
  { x: -45, rotate: 90, color: "var(--color-brand-blue)", delay: 0.11 },
  { x: 95, rotate: 55, color: "var(--color-brand-pink)", delay: 0.17 },
];

/** Replaces the form in place once an enquiry is submitted, rather than
 * just closing the popup — confirms receipt and gives a next step (keep
 * browsing, or jump straight to WhatsApp) instead of leaving the visitor
 * wondering whether anything happened. */
export function LeadPopupSuccess({ onContinue, values }: LeadPopupSuccessProps) {
  const t = useTranslations("leadPopup.success");
  const tPopup = useTranslations("leadPopup");
  const tService = useTranslations("leadPopup.form.service.options");
  const tBudget = useTranslations("leadPopup.form.budget.options");
  const reduceMotion = useReducedMotion();
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Accessibility: focus moves onto the success state as soon as it
  // mounts, since it replaces the form the visitor was just focused in.
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const whatsappUrl = useMemo(() => {
    const message = tPopup("whatsappMessageTemplate", {
      service: tService(values.service),
      name: values.name,
      budget: tBudget(values.budget),
    });
    return `${whatsappHref}?text=${encodeURIComponent(message)}`;
  }, [tPopup, tService, tBudget, values]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="relative flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center sm:p-[34px]"
    >
      {!reduceMotion
        ? confettiPieces.map((p, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="pointer-events-none absolute top-1/3 left-1/2 h-2 w-2 rounded-sm"
              style={{ backgroundColor: p.color }}
              initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
              animate={{ opacity: 0, x: p.x, y: 90, rotate: p.rotate * 2, scale: 0.6 }}
              transition={{ duration: 1.1, delay: p.delay, ease: "easeOut" }}
            />
          ))
        : null}

      <motion.span
        className="text-5xl"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.15 }}
        aria-hidden
      >
        🎉
      </motion.span>

      <div className="flex flex-col gap-2">
        <h2 ref={headingRef} tabIndex={-1} id="lead-popup-heading" className="text-title-lg font-semibold text-white outline-none">
          {t("title")}
        </h2>
        <p id="lead-popup-description" className="text-body-sm max-w-[320px] text-white/60 text-pretty">
          {t("message")}
        </p>
      </div>

      <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center">
        <button type="button" onClick={onContinue} className={cn(buttonVariants({ variant: "glass", size: "lg" }), "w-full sm:w-auto")}>
          {t("continueBrowsing")}
        </button>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "gradient", size: "lg" }), "w-full sm:w-auto")}
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          {tPopup("whatsappChat")}
        </a>
      </div>
    </motion.div>
  );
}
