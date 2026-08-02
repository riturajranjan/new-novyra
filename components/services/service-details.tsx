"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CircleCheck, Clock, Sparkles, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { accentStroke, accentTint } from "@/lib/accent";
import { buttonVariants } from "@/components/ui/button";
import { easePowerOut, easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { RippleLink } from "@/components/ui/ripple-link";
import type { AccentColor } from "@/content/hero-screens";
import type { ServiceCategory } from "@/content/service-categories";

const trustIds = ["freeConsultation", "transparentPricing", "sourceCodeOwnership"] as const;

function ChipList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item, i) => (
        <motion.span
          key={item}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.04, ease: easePremium }}
          className="border-border-subtle text-caption text-foreground rounded-full border px-2.5 py-1"
        >
          {item}
        </motion.span>
      ))}
    </div>
  );
}

/** A light, chrome-free label+content group — no card, no border — used
 * for "Perfect For" and "Technologies". Deliberately less visually heavy
 * than the deliverables block below so the two don't compete for
 * attention: this is context, that's the answer. */
function LightGroup({ label, icon: Icon, accent, children }: { label: string; icon: LucideIcon; accent: AccentColor; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-caption text-foreground-secondary flex items-center gap-1.5 font-semibold tracking-wide uppercase">
        <Icon className="h-3.5 w-3.5" style={{ color: accentStroke[accent] }} aria-hidden />
        {label}
      </p>
      {children}
    </div>
  );
}

/** Right rail — description, a light "Perfect For / Technologies" pair,
 * one strong "Deliverables" block (with timeline folded in as a compact
 * pill, not its own section), and the two engagement actions. This is the
 * natural end of the panel's own reading order — hierarchy over
 * fragmentation: four equal boxes used to compete for the same amount of
 * attention regardless of what actually mattered most. */
export function ServiceDetails({ category }: { category: ServiceCategory }) {
  const t = useTranslations("services");
  const bestFor = t.raw(`categories.${category.id}.bestFor`) as string[];
  const deliverables = t.raw(`categories.${category.id}.deliverables`) as string[];
  const stroke = accentStroke[category.accent];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={category.id}
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -18 }}
        transition={{ duration: 0.32, ease: easePowerOut }}
        className="flex flex-col gap-6"
      >
        <div>
          <p className="text-title-lg text-foreground font-semibold tracking-tight">
            {t(`categories.${category.id}.label`)}
          </p>
          <p className="text-body-sm text-foreground-secondary mt-2">{t(`categories.${category.id}.description`)}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <LightGroup label={t("details.perfectFor")} icon={Sparkles} accent={category.accent}>
            <ChipList items={bestFor} />
          </LightGroup>

          <LightGroup label={t("details.technologies")} icon={Wrench} accent={category.accent}>
            <ChipList items={category.technologies} />
          </LightGroup>
        </div>

        {/* Deliverables — the strongest block on the panel: bigger
            padding, a brighter tint, and a layered shadow (soft ambient +
            inset top highlight) so it reads as sitting slightly above the
            surface, not just outlined. Timeline is reduced to a compact
            pill in its header rather than a section of its own. */}
        <div
          className="flex flex-col gap-4 rounded-xl border p-5"
          style={{
            borderColor: accentTint(category.accent, 32),
            backgroundColor: accentTint(category.accent, 7),
            boxShadow: `0 12px 32px -16px ${accentTint(category.accent, 35)}, inset 0 1px 0 rgba(255,255,255,0.5)`,
          }}
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-body-sm font-semibold tracking-wide uppercase" style={{ color: stroke }}>
              {t("details.deliverables")}
            </p>
            <span
              className="text-caption flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 font-medium text-foreground"
              style={{ backgroundColor: accentTint(category.accent, 16) }}
            >
              <Clock className="h-3 w-3" style={{ color: stroke }} aria-hidden />
              {t(`categories.${category.id}.timeline`)}
            </span>
          </div>

          <ul className="grid grid-cols-1 gap-x-4 gap-y-2.5 min-[420px]:grid-cols-2">
            {deliverables.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04, ease: easePremium }}
                className="text-body-sm text-foreground flex items-center gap-2 font-medium"
              >
                <CircleCheck className="h-3.5 w-3.5 shrink-0" style={{ color: stroke }} aria-hidden />
                <span className="truncate">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* CTA — its own dedicated glass container rather than a plain
            border-top strip, so the panel's closing action reads as one
            more deliberate module instead of an afterthought tacked below
            the content. */}
        <div className="border-border-subtle bg-surface/50 flex flex-col gap-3.5 rounded-xl border p-4">
          <div className="grid grid-cols-1 gap-2.5 min-[1200px]:grid-cols-2">
            <RippleLink
              href="/#contact"
              className={cn(buttonVariants({ variant: "gradient", size: "md" }), "group min-h-[46px] w-full min-w-0 px-3 text-[14px]")}
            >
              <span className="min-w-0 truncate">{t("details.requestQuote")}</span>
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-fast group-hover:translate-x-0.5" aria-hidden />
            </RippleLink>
            <RippleLink
              href={category.cta.href}
              className={cn(buttonVariants({ variant: "outline", size: "md" }), "min-h-[46px] w-full min-w-0 px-3 text-[14px]")}
            >
              <span className="min-w-0 truncate">{t(`categories.${category.id}.cta`)}</span>
            </RippleLink>
          </div>

          <div className="border-border-subtle flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t pt-3.5">
            {trustIds.map((id) => (
              <span key={id} className="text-caption text-foreground-secondary flex items-center gap-1.5 font-medium">
                <CircleCheck className="text-brand-emerald h-3.5 w-3.5 shrink-0" aria-hidden />
                {t(`details.trust.${id}`)}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
