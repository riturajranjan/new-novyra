"use client";

import { CreditCard, FileCode, ScrollText, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

const items = [
  { key: "priceNote.oneTimePayment", icon: CreditCard },
  { key: "priceNote.noHiddenCharges", icon: ShieldCheck },
  { key: "priceNote.finalPricingScope", icon: ScrollText },
  { key: "trustStrip.sourceCodeOwnership", icon: FileCode },
] as const;

/** One compact, bullet-separated assurance line — not another glass card.
 * Reuses copy that already exists elsewhere on the page (the spotlight's
 * price notes, the mid-page trust strip's source-code line) rather than
 * inventing new commercial claims, just surfaced once more, briefly, right
 * before the page moves on to process/FAQ content. */
export function PricingAssuranceStrip() {
  const t = useTranslations("pricing");

  return (
    <div className="mx-auto flex w-full max-w-[1240px] flex-wrap items-center justify-center gap-x-6 gap-y-2.5 py-1 text-center">
      {items.map((item, i) => (
        <span key={item.key} className="flex items-center gap-4">
          {i > 0 ? <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" aria-hidden /> : null}
          <span className="text-caption flex items-center gap-1.5 font-medium text-white/55">
            <item.icon className="text-brand-blue h-3.5 w-3.5" aria-hidden />
            {t(item.key)}
          </span>
        </span>
      ))}
    </div>
  );
}
