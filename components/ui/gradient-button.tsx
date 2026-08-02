import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
}

/** Primary CTA button: brand gradient fill + a slow shimmer sweep on hover. */
export function GradientButton({
  className,
  size = "md",
  children,
  ...props
}: GradientButtonProps) {
  return (
    <button
      className={cn(
        buttonVariants({ variant: "gradient", size }),
        "group relative isolate overflow-hidden",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className="bg-gradient-shimmer pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-slow group-hover:opacity-100 group-hover:animate-shimmer"
      />
      {children}
    </button>
  );
}
