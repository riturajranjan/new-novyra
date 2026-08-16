"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { footerValues } from "@/content/footer";
import { accentStroke, accentTint } from "@/lib/accent";
import { easePremium } from "@/lib/motion";

/** The footer's compact value strip — four items integrated directly into
 * the footer (no card shells), separated by thin vertical dividers on
 * desktop and a 2×2 grid on mobile. Distinct data/copy from the homepage
 * Trusted Partner section's differentiators, which stays untouched. */
export function FooterValues() {
  const t = useTranslations("footer.values");

  return (
    <div className="border-border-subtle grid grid-cols-1 gap-6 border-t py-6 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-7 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/[0.07]">
      {footerValues.map((value, i) => {
        const Icon = value.icon;
        const stroke = accentStroke[value.accent];
        return (
          <motion.div
            key={value.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "150px" }}
            transition={{ duration: 0.4, delay: i * 0.06, ease: easePremium }}
            className="flex items-start gap-3 lg:px-6 lg:first:pl-0 lg:last:pr-0"
          >
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border text-[11px] font-semibold text-white/60"
              style={{ borderColor: accentTint(value.accent, 30), backgroundColor: accentTint(value.accent, 5) }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex min-w-0 flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: stroke }} aria-hidden />
                <span className="text-body-sm text-foreground font-semibold">{t(`${value.id}.title`)}</span>
              </div>
              <p className="text-caption text-foreground-secondary leading-snug text-pretty">{t(`${value.id}.description`)}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
