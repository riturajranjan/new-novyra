"use client";

import { useEffect, useRef, useState, useTransition, type RefObject } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import {
  animate,
  AnimatePresence,
  motion,
  useDragControls,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, ChevronRight, Monitor, Moon, Sparkles, Sun } from "lucide-react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { registerModalClosed, registerModalOpen } from "@/lib/modal-registry";
import { navItems, type NavItem, type NavLeaf } from "@/content/nav";

interface MobileNavDrawerProps {
  open: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}

const WHATSAPP_HREF = "https://wa.me/917903724407";

function stripHash(href: string) {
  return href.split("#")[0];
}

/** One premium "command item" row — a direct link or an accordion trigger.
 * `isActive` drives the left gradient bar + tinted glass background; it's
 * never the only signal (icon color and text weight shift too). */
function NavRow({
  icon: Icon,
  label,
  isActive,
  ...rest
}: {
  icon: NavItem["icon"];
  label: string;
  isActive: boolean;
} & (
  | { as: "link"; href: string; onClick: () => void }
  | { as: "button"; expanded: boolean; onClick: () => void; controls: string }
)) {
  const content = (
    <>
      {isActive ? (
        <motion.span
          layoutId="mobile-nav-active-bar"
          className="bg-gradient-brand absolute top-2 bottom-2 left-0 w-0.75 rounded-full"
          transition={{ type: "spring", stiffness: 400, damping: 36 }}
        />
      ) : null}
      <span className="flex h-10 w-10 items-center justify-center">
        <Icon className={cn("h-5.5 w-5.5", isActive ? "text-white" : "text-white/65")} aria-hidden />
      </span>
      <span className={cn("truncate text-[17px]", isActive ? "font-semibold text-white" : "font-medium text-white/85")}>
        {label}
      </span>
      {rest.as === "button" ? (
        <ChevronRight
          className={cn("h-4.5 w-4.5 text-white/35 transition-transform duration-200", rest.expanded && "rotate-90")}
          aria-hidden
        />
      ) : (
        <ChevronRight className="h-4.5 w-4.5 text-white/25" aria-hidden />
      )}
    </>
  );

  const className = cn(
    "relative grid min-h-[54px] w-full items-center gap-3 rounded-[17px] px-3.5 text-left transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue",
    "[grid-template-columns:40px_minmax(0,1fr)_24px]",
    isActive ? "border border-[rgba(124,92,255,0.22)] bg-[rgba(92,92,255,0.10)]" : "border border-transparent hover:bg-white/4",
  );

  if (rest.as === "link") {
    return (
      <Link href={rest.href} onClick={rest.onClick} aria-current={isActive ? "page" : undefined} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-expanded={rest.expanded}
      aria-controls={rest.controls}
      onClick={rest.onClick}
      className={className}
    >
      {content}
    </button>
  );
}

/** Nested submenu — a thin guide line + a small dot per item rather than
 * repeating the parent row's full icon+chip treatment, so it reads as
 * "inside" the accordion, not a second list of equal-weight rows. */
function SubMenuRow({ item, child, i, pathname, onNavigate }: { item: NavItem; child: NavLeaf; i: number; pathname: string; onNavigate: () => void }) {
  const t = useTranslations("nav");
  const isActive = pathname === stripHash(child.href);

  return (
    <motion.li initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.22, delay: i * 0.025, ease: "easeOut" }}>
      <Link
        href={child.href}
        onClick={onNavigate}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "relative flex min-h-12 items-center gap-2.5 rounded-lg py-2 pl-7.25 pr-3 text-[15px] transition-colors duration-150",
          isActive ? "bg-white/6 font-semibold text-white" : "font-medium text-white/60 hover:bg-white/4 hover:text-white/90",
        )}
      >
        <span
          aria-hidden
          className="absolute left-4.75 h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ backgroundColor: isActive ? "var(--color-brand-blue)" : "rgba(255,255,255,0.25)" }}
        />
        <span className="truncate">{t(`${item.id}.children.${child.id}.label`)}</span>
      </Link>
    </motion.li>
  );
}

/** Nested submenu — a thin guide line + a small dot per item rather than
 * repeating the parent row's full icon+chip treatment, so it reads as
 * "inside" the accordion, not a second list of equal-weight rows. The
 * "services" item's children additionally split into "Build"/"Improve"
 * sub-groups (a small uppercase label per group) — every other dropdown
 * (currently just "about") renders as one flat list. */
function SubMenu({ item, pathname, onNavigate }: { item: NavItem; pathname: string; onNavigate: () => void }) {
  const t = useTranslations("nav");
  const isServices = item.id === "services";

  return (
    <div className="relative py-1 pl-5.75">
      <span aria-hidden className="absolute top-0 bottom-0 left-5.75 w-px bg-white/10" />
      {isServices ? (
        <div className="flex flex-col gap-3">
          {(["build", "improve"] as const).map((group) => (
            <div key={group} className="flex flex-col gap-0.5">
              <span className="px-7.25 text-[11px] font-semibold tracking-[0.14em] text-white/40 uppercase">
                {t(`services.groups.${group}`)}
              </span>
              <ul className="flex flex-col gap-0.5">
                {item.children!
                  .filter((child) => child.group === group)
                  .map((child, i) => (
                    <SubMenuRow key={child.id} item={item} child={child} i={i} pathname={pathname} onNavigate={onNavigate} />
                  ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <ul className="flex flex-col gap-0.5">
          {item.children!.map((child, i) => (
            <SubMenuRow key={child.id} item={item} child={child} i={i} pathname={pathname} onNavigate={onNavigate} />
          ))}
        </ul>
      )}
    </div>
  );
}

function AccordionItem({
  item,
  isExpanded,
  onToggle,
  pathname,
  onNavigate,
}: {
  item: NavItem;
  isExpanded: boolean;
  onToggle: () => void;
  pathname: string;
  onNavigate: () => void;
}) {
  const t = useTranslations("nav");
  const hasActiveChild = item.children!.some((c) => pathname === stripHash(c.href));
  const isActive = pathname === item.href || hasActiveChild;

  return (
    <li>
      <NavRow
        as="button"
        icon={item.icon}
        label={t(`${item.id}.label`)}
        isActive={isActive}
        expanded={isExpanded}
        controls={`mobile-accordion-${item.id}`}
        onClick={onToggle}
      />
      <AnimatePresence initial={false}>
        {isExpanded ? (
          <motion.div
            id={`mobile-accordion-${item.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <motion.div initial={{ y: -6 }} animate={{ y: 0 }} transition={{ duration: 0.22, ease: "easeOut" }}>
              <SubMenu item={item} pathname={pathname} onNavigate={onNavigate} />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}

const themeOptions = [
  { value: "light", icon: Sun },
  { value: "system", icon: Monitor },
  { value: "dark", icon: Moon },
] as const;

/** Theme + language controls, restyled locally for this permanently-dark
 * drawer — the shared `ThemeToggle`/`LanguageSwitcher` components use
 * theme-reactive tokens (`text-foreground-secondary`, `glass`, ...) tuned
 * for surfaces that flip with the site's own light/dark setting. Since the
 * drawer is deliberately dark regardless of that setting (same move as the
 * lead popup and the pricing spotlight), reusing them as-is would risk the
 * exact dark-on-dark contrast bug found earlier on the pricing section;
 * hardcoded white/rgba values sidestep it entirely. */
function MobileControlDock() {
  const { theme, setTheme } = useTheme();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("common");
  const [, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-2">
      <div className="flex h-12 flex-1 items-center gap-1 rounded-full border border-white/10 bg-white/4 p-1">
        {themeOptions.map(({ value, icon: Icon }) => {
          const active = theme === value;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={active}
              aria-label={t(`theme.${value}`)}
              onClick={() => setTheme(value)}
              className={cn(
                "flex h-full flex-1 items-center justify-center rounded-full transition-colors duration-150",
                active ? "bg-gradient-brand text-white" : "text-white/45 hover:text-white/80",
              )}
            >
              <Icon className="h-4 w-4" aria-hidden />
            </button>
          );
        })}
      </div>

      <div className="flex h-12 shrink-0 items-center gap-1 rounded-full border border-white/10 bg-white/4 p-1">
        {routing.locales.map((code) => {
          const active = locale === code;
          return (
            <button
              key={code}
              type="button"
              aria-pressed={active}
              onClick={() => startTransition(() => router.replace(pathname, { locale: code }))}
              className={cn(
                "text-caption h-full rounded-full px-3 font-semibold transition-colors duration-150",
                active ? "bg-gradient-brand text-white" : "text-white/45 hover:text-white/80",
              )}
            >
              {code.toUpperCase()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** The floating navigation sheet + its backdrop. A single unit: sticky
 * brand header, a scrollable middle (accordions, direct links, the
 * recommendation card), and a sticky bottom control dock + CTAs — so the
 * header/footer never scroll away regardless of how long the nav list
 * gets. */
export function MobileNavDrawer({ open, onClose, triggerRef }: MobileNavDrawerProps) {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dragControls = useDragControls();
  const dragX = useMotionValue(0);

  useEffect(() => {
    if (!open) return;
    registerModalOpen();
    document.body.style.overflow = "hidden";
    const focusTimer = setTimeout(() => closeRef.current?.focus(), 50);

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        triggerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
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
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function handleNavigate() {
    onClose();
  }

  const recommendation = navItems.find((i) => i.secondaryAction)?.secondaryAction;

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.div
            aria-hidden
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-105 lg:hidden"
            style={{ backgroundColor: "rgba(2,6,18,0.52)", backdropFilter: "blur(18px) saturate(125%)", WebkitBackdropFilter: "blur(18px) saturate(125%)" }}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav-drawer"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={tCommon("siteNavigation")}
            initial={{ opacity: 0, scale: 0.96, y: 14, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.97, y: 10, filter: "blur(6px)" }}
            transition={{ duration: reduceMotion ? 0.15 : 0.36, ease: [0.22, 1, 0.36, 1] }}
            style={{
              x: dragX,
              top: "max(14px, calc(env(safe-area-inset-top) + 6px))",
              right: 14,
              height: "calc(100dvh - 28px)",
              width: "calc(100% - 28px)",
              maxWidth: 420,
              backgroundImage: "linear-gradient(155deg, rgba(7,12,30,0.97), rgba(12,18,44,0.94))",
              backdropFilter: "blur(30px) saturate(160%)",
              WebkitBackdropFilter: "blur(30px) saturate(160%)",
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow: "0 36px 100px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
            drag={reduceMotion ? false : "x"}
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ left: 0, right: 320 }}
            dragElastic={{ left: 0, right: 0.6 }}
            dragMomentum={false}
            onDragEnd={(_, info) => {
              if (info.offset.x > 90 || info.velocity.x > 600) {
                onClose();
              } else {
                animate(dragX, 0, { type: "spring", stiffness: 420, damping: 38 });
              }
            }}
            className="fixed z-110 flex flex-col overflow-hidden rounded-[32px] lg:hidden"
          >
            {/* Ambient reflection + noise — subtle, matching the site's
                established glass-panel language rather than a plain flat
                dark rectangle. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-60"
              style={{ backgroundImage: "radial-gradient(80% 100% at 30% 0%, rgba(59,130,246,0.16), transparent 70%)" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{ backgroundImage: "radial-gradient(60% 50% at 90% 100%, rgba(139,92,246,0.12), transparent 70%)" }}
            />
            <div aria-hidden className="bg-noise pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay" />

            {/* Drag handle — swipe-right-to-close only starts here, at the
                drawer's left edge, so it never fights vertical scrolling in
                the nav list below. */}
            {!reduceMotion ? (
              <div
                aria-hidden
                onPointerDown={(e) => dragControls.start(e)}
                className="absolute top-0 bottom-0 left-0 z-20 w-5 touch-none"
              />
            ) : null}

            {/* Sticky header */}
            <div className="relative z-10 flex items-center justify-between gap-3 border-b border-white/8 px-5 pt-5 pb-4">
              <div className="min-w-0">
                <Image src="/logo.png" alt="Novyra Technologies" width={110} height={40} className="h-7 w-auto" />
                {/* <p className="text-caption mt-1.5 font-medium tracking-wide text-white/40 uppercase">{tCommon("tagline")}</p> */}
              </div>
              <button
                ref={closeRef}
                type="button"
                aria-label={tCommon("closeMenu")}
                onClick={onClose}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors duration-150 hover:bg-white/9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
                </svg>
              </button>
            </div>
            {/* Scrollable nav — `min-h-0` is load-bearing: a flex child
                defaults to `min-height: auto`, which lets it grow to fit
                its content instead of respecting this column's fixed
                height, so `overflow-y-auto` never actually engages without
                it. */}
            <div className="relative z-10 min-h-0 flex-1 overflow-y-auto px-4 py-3 scrollbar-none [&::-webkit-scrollbar]:hidden">
              <ul className="flex flex-col gap-1">
                {navItems.map((item, i) => {
                  const hasChildren = Boolean(item.children?.length);
                  if (hasChildren) {
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: 0.05 + i * 0.03, ease: "easeOut" }}
                      >
                        <AccordionItem
                          item={item}
                          isExpanded={expandedKey === item.id}
                          onToggle={() => setExpandedKey((k) => (k === item.id ? null : item.id))}
                          pathname={pathname}
                          onNavigate={handleNavigate}
                        />
                      </motion.div>
                    );
                  }
                  return (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: 0.05 + i * 0.03, ease: "easeOut" }}
                    >
                      <NavRow
                        as="link"
                        icon={item.icon}
                        label={t(`${item.id}.label`)}
                        isActive={pathname === item.href}
                        href={item.href}
                        onClick={handleNavigate}
                      />
                    </motion.li>
                  );
                })}
              </ul>

              {recommendation ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3, ease: "easeOut" }}
                  className="mt-3 flex max-h-27.5 flex-col gap-2 rounded-2xl border border-white/8 bg-white/3 p-3.5"
                >
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-brand-blue" aria-hidden />
                    <p className="text-body-sm font-semibold text-white">{t("recommendationCard.title")}</p>
                  </div>
                  <p className="text-caption leading-snug text-white/55">{t("recommendationCard.body")}</p>
                  <Link
                    href={recommendation.href}
                    onClick={handleNavigate}
                    className="text-caption group flex items-center gap-1 font-semibold text-brand-blue"
                  >
                    {t("services.getRecommendation")}
                    <ArrowRight className="h-3 w-3 transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                </motion.div>
              ) : null}
            </div>

            {/* Sticky footer */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.35, ease: "easeOut" }}
              className="relative z-10 flex flex-col gap-3 border-t border-white/8 px-4 pt-3.5"
              style={{ paddingBottom: "max(14px, env(safe-area-inset-bottom))" }}
            >
              <MobileControlDock />

              <Link
                href="/contact"
                onClick={handleNavigate}
                className={cn(buttonVariants({ variant: "gradient", size: "lg" }), "group relative flex-col gap-0 overflow-hidden py-2.5!")}
              >
                <span
                  aria-hidden
                  className="bg-gradient-shimmer pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-full"
                />
                <span className="flex items-center gap-1.5">
                  {tCommon("startProject")}
                  <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden />
                </span>
                <span className="text-[11px] font-normal text-white/70">{tCommon("freeConsultationNote")}</span>
              </Link>

              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleNavigate}
                className="flex h-11 items-center justify-center gap-2 rounded-pill border border-white/12 text-body-sm font-medium text-white/85 transition-colors duration-150 hover:bg-white/5"
              >
                {tCommon("whatsapp")}
              </a>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
