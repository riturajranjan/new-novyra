"use client";

import { Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { industries } from "@/content/industries";
import { easePremium } from "@/lib/motion";

/** The footer's Industries column — same six industries/routes as the
 * homepage Industries preview and the /industries page
 * (content/industries.ts), reusing their existing title translations
 * rather than duplicating that copy under footer.json. */
export function FooterIndustriesColumn() {
  const t = useTranslations("footer.columns");
  const tIndustries = useTranslations("industries.items");
  const title = t("industries.title");

  return (
    <motion.nav
      aria-label={title}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "150px" }}
      transition={{ duration: 0.5, delay: 0.16, ease: easePremium }}
      className="flex flex-col gap-3"
    >
      <h4 className="text-foreground-secondary flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.1em] uppercase sm:text-[13px]">
        <Briefcase className="text-brand-blue h-3.5 w-3.5 shrink-0" aria-hidden />
        {title}
      </h4>
      <ul className="flex flex-col gap-2.5">
        {industries.map((industry) => (
          <li key={industry.id} className="min-w-0">
            <Link
              href={industry.href}
              className="text-body-sm text-foreground-secondary hover:text-foreground focus-visible:ring-brand-blue relative inline-block rounded-sm break-words transition-colors duration-fast focus-visible:ring-2 focus-visible:outline-none [&:hover]:before:w-full before:absolute before:-bottom-0.5 before:left-0 before:h-px before:w-0 before:bg-gradient-brand before:transition-[width] before:duration-base"
            >
              {tIndustries(`${industry.id}.title`)}
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
