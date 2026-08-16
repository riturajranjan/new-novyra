"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { FooterColumn } from "@/content/footer";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface FooterNavColumnProps {
  column: FooterColumn;
  index: number;
}

/** One borderless editorial nav column — Explore / Company / Services. */
export function FooterNavColumn({ column, index }: FooterNavColumnProps) {
  const t = useTranslations("footer.columns");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "150px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: easePremium }}
      className="flex flex-col gap-3"
    >
      <h4 className="text-caption text-foreground-secondary font-semibold tracking-wide uppercase">
        {t(`${column.id}.title`)}
      </h4>
      <ul className="flex flex-col gap-2">
        {column.links.map((link) => {
          const label = t(`${column.id}.links.${link.id}`);
          return link.disabled ? (
            <li key={link.id} className="min-w-0">
              <span className="text-body-sm text-foreground-secondary/50 block cursor-not-allowed break-words">
                {label}
              </span>
            </li>
          ) : (
            <li key={link.id} className="min-w-0">
              <Link
                href={link.href}
                className={cn(
                  "text-body-sm text-foreground-secondary hover:text-foreground relative inline-block break-words transition-colors duration-fast",
                  "hover:before:bg-gradient-brand before:absolute before:-bottom-0.5 before:left-0 before:h-px before:w-0 before:transition-[width] before:duration-base hover:before:w-full",
                )}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}
