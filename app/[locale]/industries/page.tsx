import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { IndustriesHero } from "@/components/sections/industries-hero";
import { IndustriesExplorer } from "@/components/sections/industries-explorer";
import { HowWeThink } from "@/components/sections/how-we-think";
import { IndustrySpotlights } from "@/components/sections/industry-spotlights";
import { IndustriesCapabilityRail } from "@/components/sections/industries-capability-rail";
import { IndustriesCta } from "@/components/sections/industries-cta";
import { companyInfo } from "@/content/footer";

const SITE_URL = "https://novyratech.in";

interface IndustriesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: IndustriesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "industries.meta" });
  const path = `/${locale}/industries`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: path,
      languages: { en: "/en/industries", hi: "/hi/industries", "x-default": "/en/industries" },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: path,
      siteName: companyInfo.name,
      locale,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: t("title"),
      description: t("description"),
    },
  };
}

/** "Where Novyra creates value" — six sections, each its own environment:
 * IndustriesHero (01, an asymmetric Industry Ecosystem visual — scattered,
 * differently-shaped environment tiles, not the Services hexagon or the
 * About pentagon) → IndustriesExplorer (02, a vertical numbered nav
 * driving one large canvas with a genuinely distinct visual per industry)
 * → HowWeThink (03, a compact Industry → Workflow → Friction → System →
 * Outcome chain across three real scenarios) → IndustrySpotlights (04,
 * Education/Healthcare/Retail in editorial depth) → IndustriesCapabilityRail
 * (05, a thin bridge to the real Services page) → IndustriesCta (06, the
 * page's one conversion moment, immediately before the shared Footer —
 * no second redundant CTA). */
export default async function IndustriesPage({ params }: IndustriesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "industries" });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("breadcrumb.home"), item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: t("breadcrumb.current"), item: `${SITE_URL}/${locale}/industries` },
    ],
  };

  return (
    <main className="relative w-full max-w-full min-w-0 flex-1 overflow-x-clip">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <IndustriesHero />
      <IndustriesExplorer />
      <HowWeThink />
      <IndustrySpotlights />
      <IndustriesCapabilityRail />
      <IndustriesCta />
    </main>
  );
}
