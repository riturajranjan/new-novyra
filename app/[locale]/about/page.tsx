import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AboutHero } from "@/components/about/about-hero";
import { CompanyIntro } from "@/components/about/company-intro";
import { MissionVision } from "@/components/about/mission-vision";
import { WhatWeBuild } from "@/components/about/what-we-build";
import { CorePrinciples } from "@/components/about/core-principles";
import { HowNovyraWorks } from "@/components/about/how-novyra-works";
import { AboutWhyChoose } from "@/components/about/about-why-choose";
import { Industries } from "@/components/about/industries";
import { TechPhilosophy } from "@/components/about/tech-philosophy";
import { FounderDirection } from "@/components/about/founder-direction";
import { AboutCta } from "@/components/about/about-cta";
import { companyInfo } from "@/content/footer";

const SITE_URL = "https://novyratech.in";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.meta" });

  const title = t("title");
  const description = t("description");
  const path = `/${locale}/about`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        en: "/en/about",
        hi: "/hi/about",
        "x-default": "/en/about",
      },
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: companyInfo.name,
      locale,
      type: "website",
      images: [{ url: "/logo.png", width: 512, height: 512, alt: companyInfo.name }],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: ["/logo.png"],
    },
  };
}

/** The About page — an 11-section product story (hero through final CTA),
 * assembled from components/about/*. Every section pulls its copy from
 * messages/{locale}/about.json and its structural data (icons, accents,
 * spans) from content/about.ts, matching the rest of the site's
 * content/message split. Breadcrumb + Organization JSON-LD use only real,
 * already-public facts (name, url, logo, email, phone from
 * content/footer.ts) — no invented founding date, headcount, or awards. */
export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "about" });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("breadcrumb.home"), item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: t("breadcrumb.current"), item: `${SITE_URL}/${locale}/about` },
    ],
  };

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <AboutHero />
      <CompanyIntro />
      <MissionVision />
      <WhatWeBuild />
      <CorePrinciples />
      <HowNovyraWorks />
      <AboutWhyChoose />
      <Industries />
      <TechPhilosophy />
      <FounderDirection />
      <AboutCta />
    </main>
  );
}
