"use client";

import { useRef, type CSSProperties, type HTMLAttributes, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

/** Glass card with a radial highlight that follows the pointer. Falls back to a static card without JS. */
export function SpotlightCard({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      className={cn(
        "glass group relative overflow-hidden rounded-xl p-6 shadow-card transition-shadow duration-base ease-soft hover:shadow-card-hover sm:p-8",
        className,
      )}
      style={{ "--spot-x": "50%", "--spot-y": "50%" } as CSSProperties}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-base group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--spot-x) var(--spot-y), color-mix(in oklab, var(--color-blue) 18%, transparent), transparent 70%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
