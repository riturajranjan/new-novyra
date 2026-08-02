import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/legal/legal-page";
import { companyInfo } from "@/content/footer";

const SITE_URL = "https://novyratech.in";

interface AccessibilityPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AccessibilityPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.accessibility.meta" });
  const path = `/${locale}/accessibility`;

  return {
    title: t("title"),
    description: t("description"),
    robots: { index: true, follow: true },
    alternates: {
      canonical: path,
      languages: { en: "/en/accessibility", hi: "/hi/accessibility", "x-default": "/en/accessibility" },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: path,
      siteName: companyInfo.name,
      locale,
      type: "website",
      images: [{ url: "/logo.png", width: 512, height: 512, alt: companyInfo.name }],
    },
    twitter: {
      card: "summary",
      title: t("title"),
      description: t("description"),
      images: ["/logo.png"],
    },
  };
}

export default async function AccessibilityPage({ params }: AccessibilityPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "legal.accessibility.breadcrumb" });
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("home"), item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: t("current"), item: `${SITE_URL}/${locale}/accessibility` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <LegalPage page="accessibility" locale={locale} />
    </>
  );
}
