"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Languages } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Language names are always shown in their own script regardless of the
 * current locale (a Hindi reader still sees "English", not a translated
 * word for it) — this is the standard convention for language pickers, not
 * a translatable string. */
const languageNames: Record<string, string> = { en: "English", hi: "हिंदी" };

/** Switches the active locale while staying on the current page — e.g.
 * `/hi/services` -> `/en/services`, never back to the homepage — by
 * reusing the current (locale-stripped) pathname from next-intl's
 * navigation helpers and asking its router to re-resolve it under the new
 * locale. `startTransition` keeps the swap from blocking the click
 * animation, and the locale itself (not local component state) is the
 * single source of truth, so the selected option always reflects reality
 * even after a refresh or a back/forward navigation. */
export function LanguageSwitcher() {
  const t = useTranslations("common.language");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function selectLocale(nextLocale: (typeof routing.locales)[number]) {
    setOpen(false);
    if (nextLocale === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("selectLanguage")}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "glass hover:border-brand-blue/40 flex h-11 items-center gap-1.5 rounded-pill px-3 text-body-sm font-medium text-foreground-secondary transition-colors duration-fast hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          isPending && "opacity-60",
        )}
      >
        <Languages className="h-4 w-4" aria-hidden />
        {locale.toUpperCase()}
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            role="listbox"
            aria-label={t("language")}
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.18, ease: easePremium }}
            className="glass-strong shadow-card absolute right-0 top-full mt-2 min-w-36 origin-top-right rounded-lg p-1"
          >
            {routing.locales.map((code) => (
              <button
                key={code}
                type="button"
                role="option"
                aria-selected={locale === code}
                onClick={() => selectLocale(code)}
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-3 py-2 text-body-sm transition-colors duration-fast",
                  locale === code
                    ? "text-gradient-brand font-semibold"
                    : "text-foreground-secondary hover:bg-foreground/5 hover:text-foreground",
                )}
              >
                {languageNames[code]}
              </button>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
