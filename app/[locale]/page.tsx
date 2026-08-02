import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { companyInfo } from "@/content/footer";
import { Hero } from "@/components/sections/hero";
import { OurPromise } from "@/components/sections/our-promise";
import { CoreServices } from "@/components/sections/core-services";
import { OurProcess } from "@/components/sections/our-process";
import { ServicesShowcase } from "@/components/sections/services-showcase";
import { SolutionAdvisor } from "@/components/sections/solution-advisor";
import { WhyChooseNovyra } from "@/components/sections/why-choose-novyra";
import { CaseStudies } from "@/components/sections/case-studies";
import { Pricing } from "@/components/sections/pricing";
import { Faq } from "@/components/sections/faq";
import { ContactCta } from "@/components/sections/contact-cta";

const SITE_URL = "https://novyratech.in";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const title = t("title");
  const description = t("description");
  const path = `/${locale}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: { en: "/en", hi: "/hi", "x-default": "/en" },
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

/** Homepage flow: hero → the honest operating promise → how a project
 * moves (process) → the interactive service explorer, with the solution
 * advisor right after it for anyone still unsure which service they need
 * → capabilities/technology → concept work → pricing → FAQ → contact.
 * Previously ordered services-first with the promise section buried after
 * case studies; this reads as one edited narrative instead — credibility
 * before the pitch, decision-support right where someone would want it. */
export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Same real, already-public facts as the About page's Organization
  // schema (see app/[locale]/about/page.tsx) — no invented founding date,
  // headcount, or awards.
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <Hero />
      <OurPromise />
      <CoreServices />
      <OurProcess />
      <ServicesShowcase />
      <SolutionAdvisor />
      <WhyChooseNovyra />
      <CaseStudies />
      <Pricing />
      <Faq />
      <ContactCta />
    </main>
  );
}
