"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useIsMounted } from "@/lib/use-is-mounted";

interface StickySidebarProps {
  children: ReactNode;
  /** Vertical clearance from the viewport top while pinned — matches the
   * floating navbar + reading-progress bar height. */
  topOffset?: number;
  className?: string;
}

type Mode = "flow" | "pinned" | "bottom";

/** A `position: sticky` stand-in for use inside `app/[locale]/template.tsx`'s
 * subtree: that root wrapper keeps a non-`none` `filter` on its resting
 * state (see its own comment), which makes it the containing block for
 * every `position: fixed`/`sticky` descendant — so neither actually
 * tracks the real viewport from in here (confirmed via a live scroll
 * test: the aside moved in exact lockstep with the page instead of
 * pinning). Three states instead: `flow` (normal document position, the
 * common case and the only one during SSR), `pinned` (portaled to
 * `document.body` as real `position: fixed`, escaping the filtered
 * ancestor, anchored to the column's own left/width), and `bottom`
 * (`position: absolute` against the nearest `[data-sticky-bounds]`
 * ancestor once that container's own bottom is about to arrive, so the
 * sidebar settles there instead of sailing past the article into the
 * closing CTA). Absolute positioning against a nearby ancestor is
 * unaffected by the far-off filtered ancestor — only `fixed` needs the
 * portal escape hatch. */
export function StickySidebar({ children, topOffset = 128, className }: StickySidebarProps) {
  const triggerRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<Mode>("flow");
  const [viewportRect, setViewportRect] = useState<{ left: number; width: number } | null>(null);
  const [relativeRect, setRelativeRect] = useState<{ left: number; width: number } | null>(null);
  const [boundsEl, setBoundsEl] = useState<HTMLElement | null>(null);
  const mounted = useIsMounted();

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 64rem)"); // Tailwind `lg`
    let frame: number | null = null;
    let naturalHeight = 0;

    function measure() {
      const trigger = triggerRef.current;
      const bounds = trigger?.closest<HTMLElement>("[data-sticky-bounds]");
      if (!trigger || !bounds || !mq.matches) {
        setMode("flow");
        return;
      }
      setBoundsEl((prev) => (prev === bounds ? prev : bounds));

      const triggerRect = trigger.getBoundingClientRect();
      if (triggerRect.height > 0) naturalHeight = triggerRect.height;

      const boundsRect = bounds.getBoundingClientRect();

      if (boundsRect.top > topOffset) {
        setMode("flow");
        return;
      }

      const spaceBelowPin = boundsRect.bottom - topOffset;
      if (spaceBelowPin < naturalHeight) {
        setMode("bottom");
        setRelativeRect({ left: triggerRect.left - boundsRect.left, width: triggerRect.width });
      } else {
        setMode("pinned");
        setViewportRect({ left: triggerRect.left, width: triggerRect.width });
      }
    }

    function onScroll() {
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        measure();
        frame = null;
      });
    }

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    mq.addEventListener("change", measure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mq.removeEventListener("change", measure);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [topOffset]);

  return (
    <aside ref={triggerRef} className={className}>
      {mode === "flow" ? children : null}

      {mode === "pinned" && viewportRect && mounted
        ? createPortal(
            <div className="fixed z-30" style={{ top: topOffset, left: viewportRect.left, width: viewportRect.width }}>
              {children}
            </div>,
            document.body,
          )
        : null}

      {mode === "bottom" && boundsEl && relativeRect && mounted
        ? createPortal(
            <div className="absolute bottom-0" style={{ left: relativeRect.left, width: relativeRect.width }}>
              {children}
            </div>,
            boundsEl,
          )
        : null}
    </aside>
  );
}
