"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Calendar, MessageCircle } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { buttonVariants } from "@/components/ui/button";
import { RippleLink } from "@/components/ui/ripple-link";
import { isAnyModalOpen, subscribeModalOpen } from "@/lib/modal-registry";
import { isStickyBarVisible, subscribeStickyBarVisible } from "@/lib/sticky-bar-registry";
import { cn } from "@/lib/utils";

const WHATSAPP_HREF = "https://wa.me/917903724407";

function getServerSnapshotFalse() {
  return false;
}

/** There's no direct "on-screen keyboard is open" API — a visual viewport
 * meaningfully shorter than the layout viewport is the standard proxy for
 * it, since the keyboard only shrinks the former. Falls back to never
 * hiding for this reason on browsers without `visualViewport`. */
function useKeyboardLikelyOpen() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    function onResize() {
      setOpen(window.innerHeight - vv!.height > 120);
    }
    onResize();
    vv.addEventListener("resize", onResize);
    return () => vv.removeEventListener("resize", onResize);
  }, []);

  return open;
}

/** Compact, persistent mobile/tablet-only conversion dock — a single glass
 * capsule with a wide "Book a Call" primary action and an icon-only
 * WhatsApp secondary action, rather than two separate large floating
 * buttons. Mounted once at the layout root (see app/[locale]/layout.tsx),
 * as a sibling of `{children}`, so it never needs the fixed-position portal
 * workaround the section-local sticky bars use (see pricing.tsx).
 *
 * Hides itself whenever something else already owns the same fixed
 * bottom-of-viewport real estate: the mobile nav drawer or lead popup
 * (`modal-registry`), a section-local contextual sticky bar like pricing's
 * plan spotlight or services' category bar (`sticky-bar-registry`), or the
 * on-screen keyboard. */
export function MobileConversionDock() {
  const t = useTranslations("mobileCta");
  const tCommon = useTranslations("common");
  const reduceMotion = useReducedMotion();

  const modalOpen = useSyncExternalStore(subscribeModalOpen, isAnyModalOpen, getServerSnapshotFalse);
  const stickyBarVisible = useSyncExternalStore(subscribeStickyBarVisible, isStickyBarVisible, getServerSnapshotFalse);
  const keyboardOpen = useKeyboardLikelyOpen();

  const visible = !modalOpen && !stickyBarVisible && !keyboardOpen;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: reduceMotion ? 0.15 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="glass-strong shadow-card-hover fixed z-40 flex items-center gap-2 rounded-full p-1.5 lg:hidden"
          style={{
            bottom: "calc(14px + env(safe-area-inset-bottom))",
            left: 16,
            right: 16,
          }}
        >
          <RippleLink href="/contact" className={cn(buttonVariants({ variant: "gradient", size: "md" }), "min-w-0 flex-1")}>
            <Calendar className="h-4 w-4 shrink-0" aria-hidden />
            <span className="truncate">{t("bookACall")}</span>
          </RippleLink>
          <RippleLink
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={tCommon("whatsapp")}
            className={cn(buttonVariants({ variant: "outline", size: "icon" }), "shrink-0 rounded-full")}
          >
            <MessageCircle className="h-4.5 w-4.5" aria-hidden />
          </RippleLink>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
