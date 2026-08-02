import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function GlassCard({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "glass rounded-xl shadow-card transition-shadow duration-base ease-soft hover:shadow-card-hover",
        "p-6 sm:p-8",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
