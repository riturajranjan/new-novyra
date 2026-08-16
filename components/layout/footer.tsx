"use client";

import { Container } from "@/components/ui/container";
import { FooterBackground } from "@/components/footer/footer-background";
import { FooterWordmark } from "@/components/footer/footer-wordmark";
import { FooterCta } from "@/components/footer/footer-cta";
import { BrandBlock } from "@/components/footer/brand-block";
import { ContactBlock } from "@/components/footer/contact-block";
import { FooterNavColumn } from "@/components/footer/footer-nav-column";
import { FooterBottom } from "@/components/footer/footer-bottom";
import { footerColumns } from "@/content/footer";

/** The site's closing scene, in three layers — a compact CTA, an editorial
 * nav grid (no card shells), and a thin bottom bar — with a huge low-
 * opacity "NOVYRA" wordmark as the brand signature. Deliberately not one
 * giant glass-strong card: thin `border-t` dividers between layers instead,
 * so the footer reads as a distinct closing experience rather than another
 * bordered container like the sections above it. Lives in the root layout
 * (like the navbar), so it appears on every page. */
export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden pt-14 pb-8 sm:pt-16">
      <FooterBackground />
      <FooterWordmark />

      <Container className="flex flex-col gap-8">
        <FooterCta />

        <div className="border-border-subtle grid grid-cols-1 gap-8 border-t pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div className="flex flex-col gap-8 sm:col-span-2 lg:col-span-1">
            <BrandBlock />
            <ContactBlock />
          </div>
          {footerColumns.map((column, i) => (
            <FooterNavColumn key={column.id} column={column} index={i} />
          ))}
        </div>

        <FooterBottom />
      </Container>
    </footer>
  );
}
