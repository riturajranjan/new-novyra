"use client";

import { ArrowUpRight, Code2, Target, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { RippleLink } from "@/components/ui/ripple-link";

const principleIcons: Record<string, LucideIcon> = {
  "product-thinking": Target,
  "engineering-discipline": Code2,
  "designed-to-perform": TrendingUp,
};

const principleIds = ["product-thinking", "engineering-discipline", "designed-to-perform"] as const;

/** A compact horizontal proof strip under the project grid — three
 * principles, thin dividers, small outline icons, and "View all work"
 * anchored at the far right (moved here from the header, which is now
 * centered and has no room for a CTA). Not another card section: ~100-
 * 110px tall total. */
export function SelectedWorkPrinciples() {
  const t = useTranslations("caseStudies.principles");
  const tStage = useTranslations("caseStudies.stage");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "150px" }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-6 border-t border-white/[0.08] pt-6 lg:flex-row lg:items-center lg:gap-8"
    >
      <div className="flex flex-col gap-1.5 lg:max-w-[200px] lg:shrink-0">
        <span className="text-[11px] font-semibold tracking-[0.14em] text-white/45 uppercase">{t("eyebrow")}</span>
        <p className="text-[15px] leading-snug font-semibold text-white/90">{t("heading")}</p>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-white/[0.08]">
        {principleIds.map((id, i) => {
          const Icon = principleIcons[id];
          return (
            <div key={id} className="flex items-start gap-3 lg:px-6 lg:first:pl-0">
              <Icon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand-blue" aria-hidden />
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-semibold text-white/35 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[14px] font-semibold text-white">{t(`items.${id}.title`)}</span>
                <span className="text-[12.5px] leading-snug" style={{ color: "rgba(220,225,235,0.58)" }}>
                  {t(`items.${id}.description`)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <RippleLink
        href="/work"
        className="group before:bg-gradient-brand relative inline-flex w-fit shrink-0 items-center gap-1.5 self-start text-[13px] font-semibold text-foreground-secondary before:absolute before:-bottom-0.5 before:left-0 before:h-px before:w-full before:origin-left before:scale-x-0 before:transition-transform before:duration-300 hover:text-foreground hover:before:scale-x-100 lg:self-center"
      >
        {tStage("viewAllCta")}
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
      </RippleLink>
    </motion.div>
  );
}
