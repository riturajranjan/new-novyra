import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/** Larger, section-level glass surface (e.g. dashboard previews, feature panels). */
export function GlassPanel({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "glass-strong rounded-2xl shadow-card",
        "p-8 sm:p-10 lg:p-12",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
