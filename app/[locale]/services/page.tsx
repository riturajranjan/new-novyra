import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ServicesHero } from "@/components/sections/services-hero";
import { SolutionAdvisor } from "@/components/sections/solution-advisor";
import { ServicesProcess } from "@/components/sections/services-process";
import { SelectedServiceWork } from "@/components/sections/selected-service-work";
import { ServicesPrinciples } from "@/components/sections/services-principles";
import { ServicesCta } from "@/components/sections/services-cta";
import { companyInfo } from "@/content/footer";

const SITE_URL = "https://novyratech.in";

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services.meta" });
  const path = `/${locale}/services`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: path,
      languages: {
        en: "/en/services",
        hi: "/hi/services",
        "x-default": "/en/services",
      },
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

/** The "Capability Architecture" — seven visible sections, each with its
 * own background and identity rather than one reused hero/CTA/card
 * template: ServicesHero (01 capability-orbit hero + 02 editorial service
 * explorer, one component since both key off the same selected category)
 * → SolutionAdvisor (03, reframed copy + a live "solution map" trail —
 * same guided-recommendation logic underneath) → ServicesProcess (04, the
 * real six-step build process, own interactive rail with an evolving
 * product-story visual, distinct from the homepage's Our Process) →
 * SelectedServiceWork (05, one large project at a time, 3 real concept
 * builds) → ServicesPrinciples (06, four honest working principles) →
 * ServicesCta (07, this page's own closing action) → the site's shared
 * Footer, rendered once in the locale layout. */
export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "services" });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("breadcrumb.home"),
        item: `${SITE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("breadcrumb.current"),
        item: `${SITE_URL}/${locale}/services`,
      },
    ],
  };

  return (
    <main className="relative w-full max-w-full min-w-0 flex-1 overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServicesHero />
      <SolutionAdvisor />
      <ServicesProcess />
      <SelectedServiceWork />
      <ServicesPrinciples />
      <ServicesCta />
    </main>
  );
}
