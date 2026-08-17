"use client";

import { Building2, Compass, Send, SquareCode } from "lucide-react";
import { Container } from "@/components/ui/container";
import { FooterBackground } from "@/components/footer/footer-background";
import { BrandBlock } from "@/components/footer/brand-block";
import { ContactBlock } from "@/components/footer/contact-block";
import { FooterNavColumn } from "@/components/footer/footer-nav-column";
import { FooterIndustriesColumn } from "@/components/footer/footer-industries-column";
import { FooterValues } from "@/components/footer/footer-values";
import { FooterBottom } from "@/components/footer/footer-bottom";
import { footerColumns } from "@/content/footer";

const explore = footerColumns.find((c) => c.id === "explore")!;
const services = footerColumns.find((c) => c.id === "services")!;
const company = footerColumns.find((c) => c.id === "company")!;

/** The site's closing scene — brand / explore / services / industries /
 * company / connect, a compact value strip, then a thin bottom bar. No CTA
 * panel here: the site's one closing CTA lives in
 * `components/sections/contact-cta.tsx` (a dedicated section directly
 * above the footer) so there aren't two consecutive "let's build
 * something" panels back to back. Lives in the root layout (like the
 * navbar), so it appears on every page. */
export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden py-12 sm:py-14" style={{ backgroundColor: "#03050d" }}>
      <FooterBackground />

      <Container size="wide" className="flex flex-col gap-6">
        <div
          className="relative isolate flex flex-col gap-8 overflow-hidden rounded-[20px] border p-6 sm:p-8"
          style={{ borderColor: "rgba(255,255,255,0.08)", backgroundColor: "#07101f" }}
        >
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-[1.25fr_0.8fr_0.8fr_0.8fr_0.8fr_1.15fr] lg:gap-x-6">
            <div className="col-span-2 sm:col-span-3 lg:col-span-1">
              <BrandBlock />
            </div>
            <FooterNavColumn column={explore} index={0} icon={Compass} />
            <FooterNavColumn column={services} index={1} icon={SquareCode} />
            <FooterIndustriesColumn />
            <FooterNavColumn column={company} index={3} icon={Building2} />
            <div className="col-span-2 sm:col-span-1">
              <ContactBlock icon={Send} />
            </div>
          </div>

          <FooterValues />
          <FooterBottom />
        </div>
      </Container>
    </footer>
  );
}
