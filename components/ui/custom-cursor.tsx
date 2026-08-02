"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useCanHover } from "@/lib/use-can-hover";

type CursorState = "default" | "button" | "cta" | "close" | "select" | "input" | "card" | "link" | "image" | "video";

/** Priority-ordered: the first matching ancestor wins. `data-cursor` is the
 * escape hatch for elements that need a specific state a generic selector
 * can't express (e.g. the popup's close button, which is a `<button>` but
 * shouldn't read as generic "button"). `.bg-gradient-brand.rounded-pill` is
 * exactly the class pair `buttonVariants({ variant: "gradient" })` emits —
 * reading it lets the cursor recognize every existing pill-shaped primary
 * CTA sitewide without any component needing a new attribute. */
const STATE_SELECTORS: { state: CursorState; selector: string }[] = [
  { state: "video", selector: "video, [data-cursor='video']" },
  { state: "image", selector: "img, [data-cursor='image']" },
  { state: "close", selector: "[data-cursor='close']" },
  { state: "cta", selector: ".bg-gradient-brand.rounded-pill, [data-cursor='cta']" },
  { state: "select", selector: "select, [data-cursor='select']" },
  { state: "input", selector: "input, textarea, [data-cursor='input']" },
  { state: "button", selector: "button, [role='button'], [role='tab'], [role='radio'], [data-cursor='button']" },
  { state: "card", selector: ".glass, .glass-strong, [data-cursor='card']" },
  { state: "link", selector: "a" },
];

interface StateConfig {
  ringScale: number;
  ringRotate?: number;
  ringColor?: string;
  ringGlow?: string;
  dotScale?: number;
  hideDot?: boolean;
  label?: string;
}

const STATE_CONFIG: Record<CursorState, StateConfig> = {
  default: { ringScale: 1 },
  button: { ringScale: 1.4 },
  cta: { ringScale: 1.35, ringColor: "var(--color-brand-purple)", ringGlow: "0 0 22px -4px var(--color-brand-purple)" },
  close: { ringScale: 1.3, label: "Close" },
  select: { ringScale: 1.15, label: "Select" },
  // Shrinks and drops the dot rather than growing — the point is to stay
  // out of the way of the native text caret, not to draw attention.
  input: { ringScale: 0.45, hideDot: true },
  card: { ringScale: 1.5, ringRotate: 12, ringColor: "var(--color-brand-purple)" },
  link: { ringScale: 0.55 },
  image: { ringScale: 1.8, label: "View" },
  video: { ringScale: 1.8, label: "Play" },
};

/** Premium two-part custom cursor (glass ring + gradient dot) that replaces
 * the system cursor on desktop only. Entirely skipped — never mounted,
 * never hides the native cursor — when there's no fine/hover-capable
 * pointer (touch/mobile) or `prefers-reduced-motion` is set.
 *
 * z-[9999] is deliberate: this must outrank every overlay in the app,
 * including the lead popup (z-[910]). It's a sibling of the popup in
 * layout.tsx, not a descendant, so no portal is needed — stacking is purely
 * a matter of this number being the highest one in use anywhere. */
export function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const canHover = useCanHover();
  const enabled = canHover && !reduceMotion;
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 });
  const dotX = useSpring(x, { stiffness: 500, damping: 32, mass: 0.4 });
  const dotY = useSpring(y, { stiffness: 500, damping: 32, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("has-custom-cursor");

    function handleMove(e: PointerEvent) {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    }
    function handleLeave() {
      setVisible(false);
    }
    function handleOver(e: PointerEvent) {
      if (e.pointerType !== "mouse") return;
      const target = e.target as Element | null;
      for (const { state: candidate, selector } of STATE_SELECTORS) {
        if (target?.closest(selector)) {
          setState(candidate);
          return;
        }
      }
      setState("default");
    }

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerover", handleOver);
    document.documentElement.addEventListener("pointerleave", handleLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerover", handleOver);
      document.documentElement.removeEventListener("pointerleave", handleLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const config = STATE_CONFIG[state];
  const hasLabel = Boolean(config.label);

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-sm md:flex"
        style={{
          x: ringX,
          y: ringY,
          scale: config.ringScale,
          rotate: config.ringRotate ?? 0,
          borderColor: config.ringColor ?? "rgba(255,255,255,0.4)",
          boxShadow: config.ringGlow,
          opacity: visible ? 0.4 : 0,
        }}
        transition={{ scale: { duration: 0.25, ease: "easeOut" }, rotate: { duration: 0.3, ease: "easeOut" } }}
      >
        {hasLabel ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-foreground bg-surface/80 rounded-full px-1.5 py-0.5 text-[9px] font-semibold tracking-wide uppercase"
          >
            {config.label}
          </motion.span>
        ) : null}
      </motion.div>
      <motion.div
        aria-hidden
        className="bg-gradient-brand shadow-glow-blue pointer-events-none fixed top-0 left-0 z-[9999] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
        style={{
          x: dotX,
          y: dotY,
          opacity: visible && !hasLabel && !config.hideDot ? 1 : 0,
        }}
        animate={state === "cta" ? { scale: [1, 1.35, 1] } : { scale: config.dotScale ?? (state === "link" ? 0.6 : 1) }}
        transition={state === "cta" ? { duration: 1.1, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
      />
    </>
  );
}
