"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useReducedMotion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { useLeadPopupTrigger } from "@/lib/use-lead-popup";
import { registerModalClosed, registerModalOpen } from "@/lib/modal-registry";
import { LeadPopupIllustration } from "@/components/lead-popup/lead-popup-illustration";
import { LeadPopupForm } from "@/components/lead-popup/lead-popup-form";
import { LeadPopupSuccess } from "@/components/lead-popup/lead-popup-success";
import type { EnquiryFieldValues } from "@/lib/validation/enquiry";
import { cn } from "@/lib/utils";

const POPUP_EASE = [0.22, 1, 0.36, 1] as const;

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: POPUP_EASE } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: POPUP_EASE } },
};

const panelVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 20, filter: "blur(8px)" },
  visible: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.45, ease: POPUP_EASE } },
  exit: { opacity: 0, scale: 0.97, y: 12, transition: { duration: 0.25, ease: POPUP_EASE } },
};

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])';

/** A premium, onboarding-style lead capture experience — not a traditional
 * newsletter popup. Lazy by construction: nothing here renders until
 * `useLeadPopupTrigger` flips `open`, and `AnimatePresence` un-mounts it
 * again after the exit animation. Mounted once, near the root, in
 * app/[locale]/layout.tsx, as a sibling of `<CustomCursor/>` — not a
 * descendant — so the cursor's z-[9999] can outrank this popup's z-[910]
 * purely by number, no portal required. */
export function LeadPopup() {
  const t = useTranslations("leadPopup");
  const { open, dismiss, markSubmitted } = useLeadPopupTrigger();
  const [submitted, setSubmitted] = useState(false);
  const [submittedValues, setSubmittedValues] = useState<EnquiryFieldValues | null>(null);
  const reduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(560px circle at ${mouseX}% ${mouseY}%, color-mix(in oklab, var(--color-brand-blue) 8%, transparent), transparent 70%)`;

  useEffect(() => {
    if (!open) return;
    registerModalOpen();
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const focusTimer = setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus();
    }, 50);

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        dismiss();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      clearTimeout(focusTimer);
      registerModalClosed();
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused.current?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  function handleSubmitSuccess(values: EnquiryFieldValues) {
    setSubmittedValues(values);
    setSubmitted(true);
    markSubmitted();
  }

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[900] flex items-end justify-center p-3 sm:items-center sm:p-6">
          {/* Backdrop — deliberately light: a radial tint, not a flat dark
              scrim, so the page behind stays faintly legible. */}
          <motion.div
            aria-hidden
            onClick={dismiss}
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at center, rgba(28,38,80,0.18), rgba(3,7,18,0.48))",
              backdropFilter: "blur(10px) saturate(115%)",
              WebkitBackdropFilter: "blur(10px) saturate(115%)",
            }}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-popup-heading"
            aria-describedby="lead-popup-description"
            onPointerMove={handlePointerMove}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              "relative isolate z-[910] w-full overflow-hidden rounded-t-[22px] sm:w-[min(920px,calc(100vw-48px))] sm:rounded-hero",
            )}
          >
            {/* Localized accent glows — three small corner lights, not one
                full-panel wash. Kept well under the spec's 0.24 opacity
                ceiling so the shell reads as dark glass first. */}
            <div aria-hidden className="pointer-events-none absolute -top-10 -left-10 -z-10 h-40 w-40 rounded-full bg-[var(--color-brand-purple)] opacity-[0.20] blur-[70px]" />
            <div aria-hidden className="pointer-events-none absolute -top-10 -right-10 -z-10 h-40 w-40 rounded-full bg-[var(--color-brand-pink)] opacity-[0.18] blur-[70px]" />
            <div aria-hidden className="pointer-events-none absolute -bottom-14 -left-10 -z-10 h-44 w-44 rounded-full bg-[var(--color-brand-blue)] opacity-[0.20] blur-[80px]" />

            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              className="relative flex max-h-[calc(100dvh-24px)] flex-col overflow-hidden sm:max-h-[min(720px,calc(100vh-48px))] sm:flex-row"
              style={{
                backgroundImage: "linear-gradient(145deg, rgba(18,22,45,0.88), rgba(26,20,55,0.78))",
                backdropFilter: "blur(32px) saturate(150%)",
                WebkitBackdropFilter: "blur(32px) saturate(150%)",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 30px 100px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.10)",
              }}
            >
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-50"
                style={{ background: spotlight }}
              />
              <div aria-hidden className="bg-noise pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay" />

              <motion.button
                type="button"
                onClick={dismiss}
                aria-label={t("closeAriaLabel")}
                data-cursor="close"
                whileHover={reduceMotion ? undefined : { scale: 1.06, rotate: 90 }}
                whileTap={{ scale: 0.94 }}
                transition={{ duration: 0.25, ease: POPUP_EASE }}
                className="glass absolute top-[18px] right-[18px] z-20 flex h-11 w-11 items-center justify-center rounded-full text-foreground transition-shadow duration-base hover:shadow-glow-blue"
              >
                <X className="h-4 w-4" aria-hidden />
              </motion.button>

              <LeadPopupIllustration className="hidden sm:flex sm:w-[38%]" />

              <div className="relative flex w-full flex-col overflow-y-auto sm:w-[62%] sm:min-h-0">
                <AnimatePresence mode="wait">
                  {submitted && submittedValues ? (
                    <LeadPopupSuccess key="success" onContinue={dismiss} values={submittedValues} />
                  ) : (
                    <LeadPopupForm key="form" onSuccess={handleSubmitSuccess} />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
