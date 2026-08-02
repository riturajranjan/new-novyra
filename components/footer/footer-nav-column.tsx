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

/** One glass navigation column — Company / Services / Resources. */
export function FooterNavColumn({ column, index }: FooterNavColumnProps) {
  const t = useTranslations("footer.columns");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "150px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: easePremium }}
      className="border-border-subtle bg-surface/60 flex flex-col gap-3 rounded-xl border p-5 backdrop-blur-xl"
    >
      <h4 className="text-caption text-foreground-secondary font-semibold tracking-wide uppercase">
        {t(`${column.id}.title`)}
      </h4>
      {/* Long lists (Services, Resources) wrap into two columns so one
       * column never towers over its neighbors and blows the compact
       * height budget — but only in the `sm`-to-`lg` range, where the outer
       * grid is still 2-up and each column has real width to spare. From
       * `lg` on, the outer grid goes 4-up and this column's own share
       * shrinks too much for two sub-columns of "SaaS Development" /
       * "AI Development"-length labels to sit side by side without
       * touching, so it drops back to a single column there. `min-w-0` +
       * `break-words` are a second line of defense: without them a long
       * unbroken word (not just the whole label) can overflow its grid
       * track and bleed into the neighboring column regardless of gap. */}
      <ul
        className={cn(
          "gap-x-5 gap-y-2",
          column.links.length > 8 ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1" : "flex flex-col",
        )}
      >
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
