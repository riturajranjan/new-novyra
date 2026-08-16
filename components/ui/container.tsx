import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}

const sizeClasses: Record<NonNullable<ContainerProps["size"]>, string> = {
  narrow: "max-w-3xl",
  default: "max-w-7xl",
  wide: "max-w-[90rem]",
};

export function Container({
  as: Tag = "div",
  children,
  className,
  size = "default",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-4 min-[390px]:px-5 md:px-7 lg:px-10 xl:px-12",
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
