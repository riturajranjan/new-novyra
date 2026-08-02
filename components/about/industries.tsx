"use client";

import { useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { industryItems, type IndustryItem } from "@/content/about";

const DEFAULT_ID = "healthcare";

/** Small fixed-magnitude nudge from a node's own position toward the
 * center (50, 50) — the "slight movement toward center" a selected node
 * gets, on top of its base absolute top/left placement. */
function centerNudge(left: number, top: number) {
  const dx = 50 - left;
  const dy = 50 - top;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  return { x: (dx / len) * 6, y: (dy / len) * 6 };
}

interface CenterPanelProps {
  id: string;
  item: IndustryItem;
  label: string;
  description: string;
  solutions: string[];
  solutionsLabel: string;
  exploreLabel: string;
}

/** The single source of truth for "what's currently shown" — one industry,
 * replaced via keyed AnimatePresence rather than ever appended to, so two
 * industries' copy can never render at once. Takes its own `id` because
 * the desktop constellation and the mobile/tablet grid each mount their
 * own copy (one is always `display:none` at any given width) — reusing
 * one hardcoded id across both would put two elements with the same id in
 * the DOM at once. */
function CenterPanel({ id, item, label, description, solutions, solutionsLabel, exploreLabel }: CenterPanelProps) {
  const Icon = item.icon;

  return (
    <div
      id={id}
      role="tabpanel"
      aria-live="polite"
      className="relative flex h-65 w-87.5 max-w-full flex-col overflow-hidden rounded-[34px] p-6"
      style={{
        background: "linear-gradient(145deg, rgba(255,255,255,0.085), rgba(255,255,255,0.022))",
        backdropFilter: "blur(28px) saturate(150%)",
        WebkitBackdropFilter: "blur(28px) saturate(150%)",
        border: "1px solid rgba(255,255,255,0.11)",
        boxShadow: "0 26px 80px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.10)",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.32, ease: "easeOut" }}
          className="flex h-full flex-col"
        >
          <div className="flex items-center gap-3">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl"
              style={{ background: `color-mix(in oklab, ${item.color} 18%, transparent)` }}
            >
              <Icon className="h-5 w-5" style={{ color: item.color }} aria-hidden />
            </span>
            <h3 className="text-title-lg font-semibold text-foreground">{label}</h3>
          </div>

          <p className="text-body-sm text-foreground-secondary mt-3 text-pretty">{description}</p>

          <div className="mt-3 flex flex-1 flex-col gap-1.5">
            <span className="text-foreground-secondary/60 text-[10px] font-semibold tracking-[0.12em] uppercase">
              {solutionsLabel}
            </span>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
              {solutions.map((solution) => (
                <li key={solution} className="text-caption text-foreground-secondary truncate">
                  {solution}
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/services"
            className="mt-3 inline-flex items-center gap-1.5 text-caption font-semibold"
            style={{ color: item.color }}
          >
            {exploreLabel}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/** Industries We Support — a compact "Industry Constellation": eight nodes
 * placed asymmetrically around a single center glass panel on desktop
 * (SVG connector lines behind, one pulse on selection change), collapsing
 * to a panel-on-top + grid selector below 1024px, and a two/one-column
 * grid on mobile (no radial layout, no connector lines below `lg`).
 *
 * State is deliberately minimal: `selectedId` is the one persisted
 * selection, `previewId` is an ephemeral hover/focus preview that falls
 * back to the selection on mouse-leave/blur. `displayId` derives which
 * industry is actually shown — never more than one at a time, and the
 * panel's content is replaced (keyed `AnimatePresence`), never appended to. */
export function Industries() {
  const t = useTranslations("about.industries");
  const reduceMotion = useReducedMotion();
  const tablistRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState(DEFAULT_ID);
  const [previewId, setPreviewId] = useState<string | null>(null);

  const displayId = previewId ?? selectedId;
  const displayItem = industryItems.find((item) => item.id === displayId) ?? industryItems[0];
  const selectedItem = industryItems.find((item) => item.id === selectedId) ?? industryItems[0];
  const solutions = t.raw(`items.${displayItem.id}.solutions`) as string[];

  function onTabListKeyDown(e: React.KeyboardEvent) {
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(e.key)) return;
    const tabs = tablistRef.current?.querySelectorAll<HTMLElement>('[role="tab"]');
    if (!tabs || tabs.length === 0) return;
    e.preventDefault();
    const list = Array.from(tabs);
    const currentIndex = list.indexOf(document.activeElement as HTMLElement);
    let nextIndex = currentIndex;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") nextIndex = (currentIndex + 1 + list.length) % list.length;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") nextIndex = (currentIndex - 1 + list.length) % list.length;
    list[nextIndex]?.focus();
  }

  function select(id: string) {
    setSelectedId(id);
    setPreviewId(null);
  }

  const panelProps = {
    item: displayItem,
    label: t(`items.${displayItem.id}.label`),
    description: t(`items.${displayItem.id}.description`),
    solutions,
    solutionsLabel: t("solutionsLabel"),
    exploreLabel: t("explore", { industry: t(`items.${displayItem.id}.label`) }),
  };

  return (
    <section className="relative isolate py-14 md:py-20">
      <Container className="flex flex-col gap-12 md:gap-16">
        <div className="mx-auto flex max-w-180 flex-col items-center gap-4 text-center">
          <span className="text-gradient-brand text-sm font-semibold tracking-[0.14em] uppercase">
            {t("eyebrow")}
          </span>
          <h2 className="text-headline sm:text-display-lg font-semibold tracking-[-0.03em] text-foreground text-balance">
            {t("titleLine1")}
            <br />
            {t("titleLine2")}
          </h2>
          <p className="text-body-lg text-foreground-secondary text-pretty">{t("description")}</p>
        </div>

        {/* Desktop (lg+): constellation */}
        <div
          ref={tablistRef}
          role="tablist"
          aria-label={t("tablistLabel")}
          onKeyDown={onTabListKeyDown}
          className="relative mx-auto hidden h-160 w-full max-w-300 lg:block"
        >
          <svg
            aria-hidden
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            {industryItems.map((item) => {
              const isActive = item.id === displayId;
              return (
                <line
                  key={item.id}
                  x1={50}
                  y1={50}
                  x2={parseFloat(item.left)}
                  y2={parseFloat(item.top)}
                  stroke={item.color}
                  strokeWidth={isActive ? 0.5 : 0.3}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  style={{ opacity: isActive ? 0.8 : 0.12, transition: "opacity 250ms ease, stroke-width 250ms ease" }}
                />
              );
            })}
            {!reduceMotion ? (
              <AnimatePresence>
                <motion.circle
                  key={selectedId}
                  r={1.1}
                  fill={selectedItem.color}
                  initial={{ cx: parseFloat(selectedItem.left), cy: parseFloat(selectedItem.top), opacity: 1 }}
                  animate={{ cx: 50, cy: 50, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </AnimatePresence>
            ) : null}
          </svg>

          {industryItems.map((item, i) => {
            const Icon = item.icon;
            const isSelected = item.id === selectedId;
            const nudge = centerNudge(parseFloat(item.left), parseFloat(item.top));
            return (
              <motion.button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls="industry-panel-desktop"
                tabIndex={isSelected ? 0 : -1}
                onClick={() => select(item.id)}
                onMouseEnter={() => setPreviewId(item.id)}
                onMouseLeave={() => setPreviewId(null)}
                onFocus={() => setPreviewId(item.id)}
                onBlur={() => setPreviewId(null)}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: isSelected ? 1.02 : 1 }}
                viewport={{ once: true, margin: "100px" }}
                animate={{
                  x: isSelected && !reduceMotion ? nudge.x : 0,
                  y: isSelected && !reduceMotion ? nudge.y : 0,
                  scale: isSelected ? 1.02 : 1,
                }}
                transition={{ duration: 0.3, delay: i * 0.05, ease: "easeOut" }}
                className="absolute z-10 flex w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-2xl px-3 py-3 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                style={{
                  top: item.top,
                  left: item.left,
                  background: isSelected
                    ? `color-mix(in oklab, ${item.color} 10%, rgba(255,255,255,0.035))`
                    : "rgba(255,255,255,0.035)",
                  backdropFilter: "blur(18px) saturate(140%)",
                  WebkitBackdropFilter: "blur(18px) saturate(140%)",
                  border: isSelected
                    ? `1px solid color-mix(in oklab, ${item.color} 60%, transparent)`
                    : "1px solid rgba(255,255,255,0.075)",
                  boxShadow: isSelected
                    ? `0 14px 34px -12px color-mix(in oklab, ${item.color} 55%, transparent)`
                    : undefined,
                }}
              >
                {isSelected ? (
                  <span
                    aria-hidden
                    className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full"
                    style={{ background: item.color }}
                  >
                    <Check className="h-3 w-3 text-white" />
                  </span>
                ) : null}
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full"
                  style={{ background: `color-mix(in oklab, ${item.color} ${isSelected ? 24 : 16}%, transparent)` }}
                >
                  <Icon className="h-4 w-4" style={{ color: item.color }} aria-hidden />
                </span>
                <span className="text-caption font-medium text-foreground whitespace-nowrap">
                  {t(`items.${item.id}.label`)}
                </span>
              </motion.button>
            );
          })}

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <CenterPanel id="industry-panel-desktop" {...panelProps} />
          </div>
        </div>

        {/* Below lg: panel on top, plain grid selector below (no radial layout, no connector lines) */}
        <div className="flex flex-col items-center gap-6 lg:hidden">
          <CenterPanel id="industry-panel-mobile" {...panelProps} />

          <div
            role="tablist"
            aria-label={t("tablistLabel")}
            className="grid w-full grid-cols-1 gap-3 min-[390px]:grid-cols-2 md:grid-cols-4"
          >
            {industryItems.map((item) => {
              const Icon = item.icon;
              const isSelected = item.id === selectedId;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls="industry-panel-mobile"
                  onClick={() => select(item.id)}
                  className="flex min-h-17 items-center gap-3 rounded-2xl px-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                  style={{
                    background: isSelected
                      ? `color-mix(in oklab, ${item.color} 10%, rgba(255,255,255,0.035))`
                      : "rgba(255,255,255,0.035)",
                    border: isSelected
                      ? `1px solid color-mix(in oklab, ${item.color} 60%, transparent)`
                      : "1px solid rgba(255,255,255,0.075)",
                  }}
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                    style={{ background: `color-mix(in oklab, ${item.color} 18%, transparent)` }}
                  >
                    <Icon className="h-4 w-4" style={{ color: item.color }} aria-hidden />
                  </span>
                  <span className="text-body-sm flex-1 text-left font-medium text-foreground">
                    {t(`items.${item.id}.label`)}
                  </span>
                  {isSelected ? <Check className="h-4 w-4 shrink-0" style={{ color: item.color }} aria-hidden /> : null}
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
