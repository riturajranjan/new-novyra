"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { AnimatePresence, motion, type Transition, type Variants } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems, type NavAccent, type NavItem, type NavLeaf } from "@/content/nav";

const menuEase: Transition["ease"] = [0.22, 1, 0.36, 1];

const panelVariants: Variants = {
  hidden: { opacity: 0, y: -6, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.22, ease: menuEase, staggerChildren: 0.028, delayChildren: 0.02 },
  },
  exit: {
    opacity: 0,
    y: -4,
    scale: 0.99,
    transition: { duration: 0.16, ease: menuEase },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -4 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.18, ease: menuEase } },
};

const ACCENT_VAR: Record<NavAccent, string> = {
  blue: "var(--color-brand-blue)",
  purple: "var(--color-brand-purple)",
  cyan: "var(--color-brand-cyan)",
  pink: "var(--color-brand-pink)",
  emerald: "var(--color-brand-emerald)",
  amber: "var(--color-brand-amber)",
};

/** Panel width per dropdown — mega-menu size follows information
 * complexity rather than one shared size for every trigger: Services (6
 * items, two groups) gets the widest panel, Industries (6 flat items)
 * a medium one, About (4 items, single column) the narrowest. */
const MENU_WIDTH: Record<string, string> = {
  services: "w-170", // 680px
  industries: "w-135", // 540px
  about: "w-115", // 460px
};

function isItemActive(item: NavItem, pathname: string) {
  if (pathname === item.href || pathname.startsWith(`${item.href}/`)) return true;
  return item.children?.some((c) => pathname.startsWith(c.href.split("#")[0])) ?? false;
}

/** Icon-led row — Services and Industries. Compact by design: a single
 * description line (never two), a 40px icon chip, ~56–64px total height
 * depending on whether a description is present at all. */
function MenuRow({
  leaf,
  title,
  description,
  onNavigate,
}: {
  leaf: NavLeaf;
  title: string;
  description?: string;
  onNavigate: () => void;
}) {
  const Icon = leaf.icon;
  return (
    <Link
      href={leaf.href}
      role="menuitem"
      onClick={onNavigate}
      style={{ "--row-accent": ACCENT_VAR[leaf.accent] } as CSSProperties}
      className={cn(
        "menu-row group grid grid-cols-[40px_minmax(0,1fr)_20px] items-center gap-3 rounded-[14px] p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue",
        description ? "min-h-16" : "min-h-13",
      )}
    >
      <span className="menu-row-icon flex h-10 w-10 items-center justify-center rounded-full">
        <Icon className="h-4 w-4" style={{ color: ACCENT_VAR[leaf.accent] }} aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-body-sm font-semibold text-foreground">{title}</span>
        {description ? (
          <span className="mt-0.5 line-clamp-1 text-caption text-foreground-secondary">{description}</span>
        ) : null}
      </span>
      <ArrowRight className="menu-row-arrow h-3.5 w-3.5 justify-self-end text-foreground-secondary" aria-hidden />
    </Link>
  );
}

/** Numbered row — About only. No icon chip, no glow: a small tinted
 * numeral instead, so the smallest dropdown also reads as visually the
 * lightest, not just narrower. */
function NumberedMenuRow({
  leaf,
  index,
  title,
  description,
  onNavigate,
}: {
  leaf: NavLeaf;
  index: number;
  title: string;
  description: string;
  onNavigate: () => void;
}) {
  const stroke = ACCENT_VAR[leaf.accent];
  return (
    <Link
      href={leaf.href}
      role="menuitem"
      onClick={onNavigate}
      style={{ "--row-accent": stroke } as CSSProperties}
      className="menu-row group grid min-h-13 grid-cols-[28px_minmax(0,1fr)_20px] items-center gap-3 rounded-[14px] p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
    >
      <span
        className="flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-bold tabular-nums"
        style={{ borderColor: "color-mix(in oklab, var(--row-accent) 40%, transparent)", color: stroke }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-body-sm font-semibold text-foreground">{title}</span>
        <span className="mt-0.5 line-clamp-1 text-caption text-foreground-secondary">{description}</span>
      </span>
      <ArrowRight className="menu-row-arrow h-3.5 w-3.5 justify-self-end text-foreground-secondary" aria-hidden />
    </Link>
  );
}

export function NavDesktop() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const navRef = useRef<HTMLUListElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const activeItem = navItems.find((item) => isItemActive(item, pathname));
  const displayKey = hoveredKey ?? activeItem?.id ?? null;

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpenKey(null);
  }

  useEffect(() => {
    if (!openKey) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenKey(null);
        triggerRefs.current[openKey!]?.focus();
      }
    }

    function onPointerDown(e: PointerEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenKey(null);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openKey]);

  function scheduleClose() {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    closeTimeout.current = setTimeout(() => setOpenKey(null), 150);
  }

  function cancelClose() {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
  }

  function onMenuKeyDown(e: React.KeyboardEvent) {
    if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(e.key)) return;
    const focusables = panelRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]');
    if (!focusables || focusables.length === 0) return;
    e.preventDefault();
    const list = Array.from(focusables);
    const currentIndex = list.indexOf(document.activeElement as HTMLElement);
    let nextIndex = currentIndex;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") nextIndex = (currentIndex + 1 + list.length) % list.length;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") nextIndex = (currentIndex - 1 + list.length) % list.length;
    list[nextIndex]?.focus();
  }

  return (
    <ul
      ref={navRef}
      className="relative hidden items-center gap-1 lg:flex"
      onMouseLeave={() => setHoveredKey(null)}
    >
      {navItems.map((item) => {
        const hasChildren = Boolean(item.children?.length);
        const isOpen = openKey === item.id;
        const isDisplayed = displayKey === item.id;
        const label = t(`${item.id}.label`);
        const isServices = item.id === "services";
        const isAbout = item.id === "about";

        return (
          <li
            key={item.id}
            className="relative"
            onMouseEnter={() => {
              setHoveredKey(item.id);
              if (hasChildren) {
                cancelClose();
                setOpenKey(item.id);
              }
            }}
            onMouseLeave={() => {
              if (hasChildren) scheduleClose();
            }}
          >
            {/* One dominant active/hover signal — a thin gradient underline
                — plus the label's own color shift to brand violet. No pill
                background, no border, no glow ring competing with it. */}
            {isDisplayed ? (
              <motion.span
                layoutId="nav-active-underline"
                aria-hidden
                className="bg-gradient-brand absolute inset-x-3 bottom-0.5 h-0.5 rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            ) : null}

            {hasChildren ? (
              <button
                ref={(el) => {
                  triggerRefs.current[item.id] = el;
                }}
                type="button"
                aria-haspopup="menu"
                aria-expanded={isOpen}
                aria-controls={`nav-panel-${item.id}`}
                onClick={() => setOpenKey((k) => (k === item.id ? null : item.id))}
                className={cn(
                  "flex items-center gap-1 rounded-pill px-4 py-2 text-body-sm font-medium transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isDisplayed ? "text-gradient-brand" : "text-foreground hover:text-gradient-brand",
                )}
              >
                {label}
                <ChevronDown
                  className={cn("h-3.5 w-3.5 transition-transform duration-fast", isOpen && "rotate-180")}
                  aria-hidden
                />
              </button>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  "block rounded-pill px-4 py-2 text-body-sm font-medium transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isDisplayed ? "text-gradient-brand" : "text-foreground hover:text-gradient-brand",
                )}
              >
                {label}
              </Link>
            )}

            {hasChildren ? (
              <AnimatePresence>
                {isOpen ? (
                  <motion.div
                    variants={panelVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                    className={cn(
                      "absolute top-full z-120 pt-3",
                      isServices ? "left-1/2 -translate-x-1/2" : "left-0",
                    )}
                  >
                    <div
                      id={`nav-panel-${item.id}`}
                      ref={panelRef}
                      role="menu"
                      aria-label={`${label} menu`}
                      onKeyDown={onMenuKeyDown}
                      style={{
                        background: "var(--mega-menu-bg)",
                        border: "1px solid var(--mega-menu-border)",
                        boxShadow: "var(--mega-menu-shadow)",
                        backdropFilter: "blur(30px) saturate(150%)",
                        WebkitBackdropFilter: "blur(30px) saturate(150%)",
                      }}
                      className={cn(
                        "relative isolate max-w-[calc(100vw-3rem)] overflow-hidden rounded-[22px] p-4",
                        MENU_WIDTH[item.id],
                      )}
                    >
                      <span
                        aria-hidden
                        className="bg-noise pointer-events-none absolute inset-0 -z-10 opacity-[0.05] mix-blend-overlay"
                      />
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 -z-10 hidden dark:block"
                        style={{
                          background:
                            "radial-gradient(120% 90% at 50% 0%, transparent 55%, rgba(0,0,0,0.3) 100%)",
                        }}
                      />

                      <div className="mb-2.5 flex items-baseline justify-between gap-4 px-1">
                        <span className="text-[11px] font-semibold tracking-[0.16em] text-foreground-secondary/70 uppercase">
                          {label}
                        </span>
                        <span className="text-caption text-foreground-secondary/60">
                          {t(`${item.id}.helper`)}
                        </span>
                      </div>

                      {isServices ? (
                        <div className="grid grid-cols-2 gap-x-3 gap-y-3">
                          {(["build", "improve"] as const).map((group) => (
                            <div key={group} className="flex flex-col gap-1.5">
                              <span className="px-1 text-[11px] font-semibold tracking-[0.14em] text-foreground-secondary/60 uppercase">
                                {t(`services.groups.${group}`)}
                              </span>
                              <div className="flex flex-col gap-0.5">
                                {item.children!
                                  .filter((child) => child.group === group)
                                  .map((child) => (
                                    <motion.div key={child.id} variants={itemVariants}>
                                      <MenuRow
                                        leaf={child}
                                        title={t(`${item.id}.children.${child.id}.label`)}
                                        description={t(`${item.id}.children.${child.id}.description`)}
                                        onNavigate={() => setOpenKey(null)}
                                      />
                                    </motion.div>
                                  ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : isAbout ? (
                        <div className="flex flex-col gap-0.5">
                          {item.children!.map((child, i) => (
                            <motion.div key={child.id} variants={itemVariants}>
                              <NumberedMenuRow
                                leaf={child}
                                index={i}
                                title={t(`${item.id}.children.${child.id}.label`)}
                                description={t(`${item.id}.children.${child.id}.description`)}
                                onNavigate={() => setOpenKey(null)}
                              />
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-2">
                          {item.children!.map((child) => (
                            <motion.div key={child.id} variants={itemVariants}>
                              <MenuRow
                                leaf={child}
                                title={t(`${item.id}.children.${child.id}.label`)}
                                onNavigate={() => setOpenKey(null)}
                              />
                            </motion.div>
                          ))}
                        </div>
                      )}

                      <motion.div
                        variants={itemVariants}
                        className="border-border-subtle/60 mt-2.5 flex items-center justify-between gap-3 border-t pt-2.5"
                      >
                        {item.secondaryAction ? (
                          <>
                            <Link
                              href={item.href}
                              role="menuitem"
                              onClick={() => setOpenKey(null)}
                              className="inline-flex items-center gap-1.5 rounded-pill bg-white/3 px-3 py-1.5 text-caption font-semibold text-foreground-secondary transition-colors duration-200 hover:bg-white/[0.07] hover:text-foreground"
                            >
                              {t(`${item.id}.exploreAll`)}
                              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                            </Link>
                            <Link
                              href={item.secondaryAction.href}
                              role="menuitem"
                              onClick={() => setOpenKey(null)}
                              className="inline-flex items-center gap-1.5 rounded-pill bg-white/3 px-3 py-1.5 text-caption font-semibold text-foreground-secondary transition-colors duration-200 hover:bg-white/[0.07] hover:text-foreground"
                            >
                              {t(`${item.id}.getRecommendation`)}
                              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                            </Link>
                          </>
                        ) : (
                          <Link
                            href={item.href}
                            role="menuitem"
                            onClick={() => setOpenKey(null)}
                            className="ml-auto inline-flex items-center gap-1.5 rounded-pill bg-white/3 px-3 py-1.5 text-caption font-semibold text-foreground-secondary transition-colors duration-200 hover:bg-white/[0.07] hover:text-foreground"
                          >
                            {t(`${item.id}.explore`)}
                            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                          </Link>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
