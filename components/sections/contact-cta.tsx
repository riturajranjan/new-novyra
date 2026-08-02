"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactCtaBackground } from "@/components/contact-cta/contact-cta-background";
import { HeroGlassCard } from "@/components/contact-cta/hero-glass-card";
import { QuickContactCard } from "@/components/contact-cta/quick-contact-card";
import { ValueCard } from "@/components/contact-cta/value-card";
import { ContactInfoPanel } from "@/components/contact-cta/contact-info-panel";
import { quickContactCards, contactValueCards } from "@/content/contact-cta";

/** The final conversion section before the footer — the most visually
 * elaborate section on the page by design. */
export function ContactCta() {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="relative isolate py-14 md:py-20">
      <ContactCtaBackground />

      <Container className="flex flex-col gap-10 md:gap-16">
        <div className="flex flex-col items-center gap-6">
          <SectionHeading
            eyebrow={t("sectionHeading.eyebrow")}
            title={t("sectionHeading.title")}
            description={t("sectionHeading.description")}
          />
        </div>

        <HeroGlassCard />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {quickContactCards.map((card, i) => (
            <QuickContactCard key={card.id} card={card} index={i} />
          ))}
        </div>

        <div className="flex flex-col gap-6 md:gap-8">
          <div className="flex flex-col items-center gap-2 text-center">
            <h3 className="text-title-lg text-foreground font-semibold">{t("whyContact.heading")}</h3>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {contactValueCards.map((card, i) => (
              <ValueCard key={card.id} card={card} index={i} />
            ))}
          </div>
        </div>

        <ContactInfoPanel />
      </Container>
    </section>
  );
}
