import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlowBorderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Border thickness in pixels. Default 1.5. */
  borderWidth?: number;
}

/** Wraps children in a soft animated gradient-glow border. */
export function GlowBorder({
  children,
  className,
  borderWidth = 1.5,
  ...props
}: GlowBorderProps) {
  return (
    <div className={cn("group relative isolate rounded-2xl", className)} {...props}>
      <div
        aria-hidden
        className="bg-gradient-brand absolute -inset-px -z-10 rounded-2xl opacity-70 blur-md transition-opacity duration-slow group-hover:opacity-100"
      />
      <div
        className="bg-gradient-brand rounded-2xl"
        style={{ padding: borderWidth }}
      >
        <div className="bg-surface rounded-[calc(1rem-1px)]">{children}</div>
      </div>
    </div>
  );
}
