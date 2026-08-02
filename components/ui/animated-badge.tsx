import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedBadgeProps {
  children: ReactNode;
  className?: string;
  dotColor?: "blue" | "purple" | "cyan" | "pink" | "emerald";
}

const dotColorMap: Record<NonNullable<AnimatedBadgeProps["dotColor"]>, string> = {
  blue: "bg-brand-blue",
  purple: "bg-brand-purple",
  cyan: "bg-brand-cyan",
  pink: "bg-brand-pink",
  emerald: "bg-brand-emerald",
};

export function AnimatedBadge({
  children,
  className,
  dotColor = "blue",
}: AnimatedBadgeProps) {
  return (
    <span
      className={cn(
        "glass inline-flex items-center gap-2 rounded-pill px-4 py-1.5 text-caption font-medium text-foreground-secondary",
        className,
      )}
    >
      <span className="relative flex h-2 w-2">
        <span
          className={cn(
            "absolute inline-flex h-full w-full animate-glow-pulse rounded-full",
            dotColorMap[dotColor],
          )}
        />
        <span
          className={cn("relative inline-flex h-2 w-2 rounded-full", dotColorMap[dotColor])}
        />
      </span>
      {children}
    </span>
  );
}
