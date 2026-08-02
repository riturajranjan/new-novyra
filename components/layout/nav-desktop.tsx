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
  hidden: { opacity: 0, y: -8, scale: 0.985, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.26, ease: menuEase, staggerChildren: 0.032, delayChildren: 0.02 },
  },
  exit: {
    opacity: 0,
    y: -5,
    scale: 0.99,
    filter: "blur(4px)",
    transition: { duration: 0.2, ease: menuEase },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: menuEase } },
};

const ACCENT_VAR: Record<NavAccent, string> = {
  blue: "var(--color-brand-blue)",
  purple: "var(--color-brand-purple)",
  cyan: "var(--color-brand-cyan)",
  pink: "var(--color-brand-pink)",
  emerald: "var(--color-brand-emerald)",
};

function isItemActive(item: NavItem, pathname: string) {
  if (pathname === item.href || pathname.startsWith(`${item.href}/`)) return true;
  return item.children?.some((c) => pathname.startsWith(c.href.split("#")[0])) ?? false;
}

function MenuRow({
  leaf,
  title,
  description,
  onNavigate,
}: {
  leaf: NavLeaf;
  title: string;
  description: string;
  onNavigate: () => void;
}) {
  const Icon = leaf.icon;
  return (
    <Link
      href={leaf.href}
      role="menuitem"
      onClick={onNavigate}
      style={{ "--row-accent": ACCENT_VAR[leaf.accent] } as CSSProperties}
      className="menu-row group grid min-h-21 grid-cols-[44px_minmax(0,1fr)_24px] items-center gap-3 rounded-[17px] p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
    >
      <span className="menu-row-icon flex h-11 w-11 items-center justify-center rounded-full">
        <Icon className="h-4.5 w-4.5" style={{ color: ACCENT_VAR[leaf.accent] }} aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block whitespace-nowrap text-body-sm font-semibold text-foreground">{title}</span>
        <span className="mt-0.5 line-clamp-2 text-caption text-foreground-secondary">{description}</span>
      </span>
      <ArrowRight className="menu-row-arrow h-4 w-4 justify-self-end text-foreground-secondary" aria-hidden />
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
        const label = t(`${item.id}.label`);
        const isServices = item.id === "services";

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
            {displayKey === item.id ? (
              <>
                <motion.div
                  layoutId="nav-active-pill"
                  className="absolute inset-0 -z-10 rounded-pill"
                  style={{
                    background: "rgba(124, 92, 255, 0.1)",
                    border: "1px solid rgba(139, 92, 246, 0.22)",
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
                <motion.span
                  layoutId="nav-active-underline"
                  aria-hidden
                  className="bg-gradient-brand absolute inset-x-3 bottom-0.5 h-0.5 rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              </>
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
                className="hover:text-gradient-brand flex items-center gap-1 rounded-pill px-4 py-2 text-body-sm font-medium text-foreground transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {label}
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-fast",
                    isOpen && "rotate-180",
                  )}
                  aria-hidden
                />
              </button>
            ) : (
              <Link
                href={item.href}
                className="hover:text-gradient-brand block rounded-pill px-4 py-2 text-body-sm font-medium text-foreground transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
                        "relative isolate max-w-[calc(100vw-3rem)] overflow-hidden rounded-[26px] p-5",
                        isServices ? "w-200" : "w-150",
                      )}
                    >
                      <span
                        aria-hidden
                        className="bg-noise pointer-events-none absolute inset-0 -z-10 opacity-[0.05] mix-blend-overlay"
                      />
                      <span
                        aria-hidden
                        className="bg-brand-blue/20 pointer-events-none absolute -top-16 -left-10 -z-10 h-40 w-40 rounded-full blur-[70px]"
                      />
                      <span
                        aria-hidden
                        className="bg-brand-purple/20 pointer-events-none absolute -right-10 -bottom-16 -z-10 h-40 w-40 rounded-full blur-[70px]"
                      />
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 -z-10 hidden dark:block"
                        style={{
                          background:
                            "radial-gradient(120% 90% at 50% 0%, transparent 55%, rgba(0,0,0,0.35) 100%)",
                        }}
                      />

                      <div className="mb-3 flex items-baseline justify-between gap-4 px-1">
                        <span className="text-[11px] font-semibold tracking-[0.16em] text-foreground-secondary/70 uppercase">
                          {label}
                        </span>
                        <span className="text-caption text-foreground-secondary/60">
                          {t(`${item.id}.helper`)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {item.children!.map((child) => (
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

                      <motion.div
                        variants={itemVariants}
                        className="border-border-subtle/60 mt-3 flex items-center justify-between gap-3 border-t pt-3"
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
