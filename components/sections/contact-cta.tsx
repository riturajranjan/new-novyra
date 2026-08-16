"use client";

import { Container } from "@/components/ui/container";
import { ContactCtaBackground } from "@/components/contact-cta/contact-cta-background";
import { HeroGlassCard } from "@/components/contact-cta/hero-glass-card";

/** The final conversion section before the footer — one compact, premium
 * glass panel (heading, description, two real CTAs, ambient glow) rather
 * than a long stack of quick-contact/value-card/info-panel blocks. Those
 * real contact channels (mailto/tel/WhatsApp/address) still live in the
 * footer, so nothing is lost — this section just stops repeating them. */
export function ContactCta() {
  return (
    <section id="contact" className="relative isolate scroll-mt-24 overflow-hidden py-12 md:py-14 lg:py-16">
      <ContactCtaBackground />

      <Container size="wide">
        <HeroGlassCard />
      </Container>
    </section>
  );
}
