"use client";

import { forwardRef, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { MobileNavDrawer } from "@/components/layout/mobile-nav-drawer";

const lineTransition = { duration: 0.24, ease: [0.4, 0, 0.2, 1] as const };

const MenuButton = forwardRef<HTMLButtonElement, { open: boolean; onClick: () => void }>(function MenuButton(
  { open, onClick },
  ref,
) {
  const t = useTranslations("common");
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      ref={ref}
      type="button"
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-controls="mobile-nav-drawer"
      aria-label={open ? t("closeMenu") : t("openMenu")}
      onClick={onClick}
      whileHover={reduceMotion ? undefined : { scale: 1.04 }}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.15 }}
      className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1128]"
      style={{
        backgroundImage: "linear-gradient(145deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))",
        border: "1px solid rgba(255,255,255,0.14)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.14), 0 0 0 0 transparent",
      }}
    >
      <span className="relative flex h-4 w-[18px] flex-col justify-between">
        <motion.span
          animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
          transition={lineTransition}
          className="h-[1.5px] w-full origin-center rounded-full bg-white"
        />
        <motion.span
          animate={open ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.15 }}
          className="h-[1.5px] w-full rounded-full bg-white"
        />
        <motion.span
          animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
          transition={lineTransition}
          className="h-[1.5px] w-full origin-center rounded-full bg-white"
        />
      </span>
    </motion.button>
  );
});

/** Compact floating glass header for mobile/tablet — entirely separate
 * from the desktop bar (see navbar.tsx), so this can be its own product-
 * like "command panel" entry point rather than a shrunk-down version of
 * the desktop header. Owns the drawer's open state since the trigger and
 * the drawer are one interaction unit. */
export function MobileHeader() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <header style={{ paddingTop: "env(safe-area-inset-top)" }} className="fixed inset-x-0 top-0 z-100 lg:hidden">
        <div className="mx-4 mt-3">
          <div
            className="flex h-[68px] items-center justify-between rounded-[26px] px-4"
            style={{
              backgroundImage: "linear-gradient(145deg, rgba(9,16,40,0.90), rgba(13,21,51,0.82))",
              backdropFilter: "blur(12px) saturate(140%)",
              WebkitBackdropFilter: "blur(12px) saturate(140%)",
              border: "1px solid rgba(255,255,255,0.09)",
              boxShadow: "0 14px 45px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            <Link href="/" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-md" onClick={() => setOpen(false)}>
              <span className="hidden min-[375px]:block">
                <Image src="/logo.png" alt="Novyra Technologies" width={120} height={40} className="h-8 w-auto" priority />
              </span>
              <span className="flex items-center gap-2 min-[375px]:hidden">
                <span className="bg-gradient-brand flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white">
                  N
                </span>
                <span className="text-body-sm font-semibold text-white">Novyra</span>
              </span>
            </Link>

            <MenuButton ref={triggerRef} open={open} onClick={() => setOpen((v) => !v)} />
          </div>
        </div>
      </header>

      <MobileNavDrawer open={open} onClose={() => setOpen(false)} triggerRef={triggerRef} />
    </>
  );
}
