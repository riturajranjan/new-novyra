import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactHero } from "@/components/contact-page/contact-hero";
import { ContactWorkspace } from "@/components/contact-page/contact-workspace";
import { ContactProcess } from "@/components/contact-page/contact-process";
import { ContactFinalCta } from "@/components/contact-page/contact-final-cta";
import { companyInfo } from "@/content/footer";

const SITE_URL = "https://novyratech.in";

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.meta" });
  const path = `/${locale}/contact`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: path,
      languages: { en: "/en/contact", hi: "/hi/contact", "x-default": "/en/contact" },
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

/** The dedicated Contact page — "Starting a digital project with
 * Novyra," four compact sections: ContactHero (01, a Connection System
 * visual — Idea/Design/Build/Launch orbiting a breathing Novyra mark) →
 * ContactWorkspace (02, the real project form + a direct-contact panel,
 * one composition rather than a grid of cards) → ContactProcess (03, a
 * connected four-step timeline, no cards) → ContactFinalCta (04, a
 * compact strip, not another giant gradient block) → the shared Footer,
 * rendered once in the locale layout. */
export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "contact" });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("breadcrumb.home"), item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: t("breadcrumb.current"), item: `${SITE_URL}/${locale}/contact` },
    ],
  };

  return (
    <main className="relative w-full max-w-full min-w-0 flex-1 overflow-x-clip">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ContactHero />
      <ContactWorkspace />
      <ContactProcess />
      <ContactFinalCta />
    </main>
  );
}
