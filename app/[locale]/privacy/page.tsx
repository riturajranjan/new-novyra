import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/legal/legal-page";
import { companyInfo } from "@/content/footer";

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.privacy.meta" });
  const path = `/${locale}/privacy`;

  return {
    title: t("title"),
    description: t("description"),
    robots: { index: true, follow: true },
    alternates: {
      canonical: path,
      languages: { en: "/en/privacy", hi: "/hi/privacy", "x-default": "/en/privacy" },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: path,
      siteName: companyInfo.name,
      locale,
      type: "website",
    },
  };
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalPage page="privacy" locale={locale} />;
}
