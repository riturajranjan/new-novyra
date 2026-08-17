import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AboutHero } from "@/components/about/about-hero";
import { CompanyIntro } from "@/components/about/company-intro";
import { MissionVision } from "@/components/about/mission-vision";
import { CorePrinciples } from "@/components/about/core-principles";
import { FounderDirection } from "@/components/about/founder-direction";
import { FounderNote } from "@/components/about/founder-note";
import { AboutCapabilities } from "@/components/about/about-capabilities";
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

/** The About page — a compact 8-section story (hero → who we are → mission
 * & vision → principles → founder → founder's note → capabilities strip →
 * final CTA), assembled from components/about/*. Compressed from the
 * previous 11-section version: What We Build, Our Approach, Why Choose
 * Novyra, Industries, and Technology Philosophy were each a full section
 * duplicating content that already has a dedicated homepage section or
 * page (Services, Process, Industries) — they're now one compact
 * `AboutCapabilities` strip that links out instead of repeating. Every
 * section pulls its copy from messages/{locale}/about.json and its
 * structural data (icons, accents) from content/about.ts. Breadcrumb +
 * Organization JSON-LD use only real, already-public facts (name, url,
 * logo, email, phone from content/footer.ts) — no invented founding date,
 * headcount, or awards. */
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
      <CorePrinciples />
      <FounderDirection />
      <FounderNote />
      <AboutCapabilities />
      <AboutCta />
    </main>
  );
}
