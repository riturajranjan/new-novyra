"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/lib/motion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "150px" }}
      variants={fadeInUp}
      className={cn(
        "flex flex-col gap-6",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span className="text-gradient-brand text-[12px] font-semibold tracking-[0.14em] uppercase sm:text-[13px] sm:tracking-[0.16em]">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-headline sm:text-display-lg font-semibold text-foreground text-balance">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "text-body-lg text-foreground-secondary max-w-[840px] text-pretty",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
