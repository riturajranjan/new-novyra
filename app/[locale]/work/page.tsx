import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { WorkShowcase } from "@/components/work/work-showcase";
import { companyInfo } from "@/content/footer";

const SITE_URL = "https://novyratech.in";

interface WorkPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "work.meta" });
  const path = `/${locale}/work`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: path,
      languages: { en: "/en/work", hi: "/hi/work", "x-default": "/en/work" },
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

export default async function WorkPage({ params }: WorkPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "work" });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("breadcrumb.home"), item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: t("breadcrumb.current"), item: `${SITE_URL}/${locale}/work` },
    ],
  };

  return (
    <main className="relative w-full max-w-full min-w-0 flex-1 overflow-x-clip">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <WorkShowcase />
    </main>
  );
}
