"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/section-heading";
import { FaqAccordionItem } from "@/components/faq/faq-accordion-item";
import { faqEntries } from "@/content/faq";

const pricingFaqEntries = faqEntries.filter((entry) => entry.category === "Pricing");

/** A lean, 6-entry accordion — not the full searchable/tabbed Faq component
 * — reusing the same faqEntries/FaqAccordionItem the general FAQ uses
 * (messages/{locale}/faq.json `entries.<id>`), filtered to the "Pricing"
 * category so no new question/answer content is invented for this page. */
export function PricingFaq() {
  const t = useTranslations("pricing.faqSection");
  const [openId, setOpenId] = useState<string | null>(pricingFaqEntries[0]?.id ?? null);

  return (
    <div id="pricing-faq" className="scroll-mt-24 flex flex-col gap-8">
      <SectionHeading eyebrow={t("eyebrow")} title={t("heading")} description={t("description")} />
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3">
        {pricingFaqEntries.map((entry, i) => (
          <FaqAccordionItem
            key={entry.id}
            entry={entry}
            index={i}
            isOpen={openId === entry.id}
            onToggle={() => setOpenId((current) => (current === entry.id ? null : entry.id))}
          />
        ))}
      </div>
    </div>
  );
}
