import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { companyInfo } from "@/content/footer";
import { Hero } from "@/components/sections/hero";
import { WhatWeDo } from "@/components/sections/what-we-do";
import { IndustriesPreview } from "@/components/sections/industries-preview";
import { TrustedPartner } from "@/components/sections/trusted-partner";
import { CaseStudies } from "@/components/sections/case-studies";
import { PricingTeaser } from "@/components/sections/pricing-teaser";
import { ContactCta } from "@/components/sections/contact-cta";
import { OurProcess } from "@/components/sections/our-process";

const SITE_URL = "https://novyratech.in";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const title = t("title");
  const description = t("description");
  const path = `/${locale}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: { en: "/en", hi: "/hi", "x-default": "/en" },
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: companyInfo.name,
      locale,
      type: "website",
      images: [
        { url: "/logo.png", width: 512, height: 512, alt: companyInfo.name },
      ],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: ["/logo.png"],
    },
  };
}

/** Compact homepage: hero → what we do (4 categories, detail on /services)
 * → industries (6, detail on /industries) → why Novyra (4 differentiators)
 * → recent projects (concept work, detail on /work) → pricing teaser
 * (detail on /pricing) → final CTA. Everything long-form — the full
 * services explorer, the solution advisor, the process timeline, the full
 * pricing table, and the searchable FAQ — moved to dedicated pages instead
 * of stacking on the homepage. No Trust Strip or Testimonials section:
 * Novyra has no real client logos or quotes yet, and this rebuild doesn't
 * fabricate them. */
export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Same real, already-public facts as the About page's Organization
  // schema (see app/[locale]/about/page.tsx) — no invented founding date,
  // headcount, or awards.
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: companyInfo.name,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    email: companyInfo.email,
    telephone: companyInfo.phone,
  };

  return (
    <main className="relative w-full max-w-full min-w-0 flex-1 overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Hero />
      <WhatWeDo />
      <IndustriesPreview />
      <TrustedPartner />
      <CaseStudies />
      <OurProcess />
      <PricingTeaser />
      <ContactCta />
    </main>
  );
}
