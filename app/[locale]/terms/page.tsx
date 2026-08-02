import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/legal/legal-page";
import { companyInfo } from "@/content/footer";

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: TermsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.terms.meta" });
  const path = `/${locale}/terms`;

  return {
    title: t("title"),
    description: t("description"),
    robots: { index: true, follow: true },
    alternates: {
      canonical: path,
      languages: { en: "/en/terms", hi: "/hi/terms", "x-default": "/en/terms" },
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

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalPage page="terms" locale={locale} />;
}
