"use client";

import { useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface RippleLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
  target?: string;
  rel?: string;
  style?: CSSProperties;
}

let rippleId = 0;

/** A Link with a Material-style click ripple — purely a visual click
 * acknowledgment layered inside the existing button, no size/layout change. */
export function RippleLink({ href, className, children, target, rel, style }: RippleLinkProps) {
  const reduceMotion = useReducedMotion();
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  function handlePointerDown(e: PointerEvent<HTMLAnchorElement>) {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const id = rippleId++;
    setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
  }

  return (
    <Link href={href} target={target} rel={rel} style={style} className={cn("relative overflow-hidden", className)} onPointerDown={handlePointerDown}>
      {children}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            className="pointer-events-none absolute rounded-full bg-white/40"
            style={{ left: r.x, top: r.y, width: 12, height: 12, marginLeft: -6, marginTop: -6 }}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 18, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onAnimationComplete={() => setRipples((rs) => rs.filter((x) => x.id !== r.id))}
          />
        ))}
      </AnimatePresence>
    </Link>
  );
}
