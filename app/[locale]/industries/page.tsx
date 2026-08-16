import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { IndustriesGrid } from "@/components/industries/industries-grid";
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
      <IndustriesGrid />
    </main>
  );
}
