import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CaseStudyDetail } from "@/components/work/case-study-detail";
import { conceptBuilds, caseStudySlugs } from "@/content/case-studies";
import { routing } from "@/i18n/routing";
import { companyInfo } from "@/content/footer";

const SITE_URL = "https://novyratech.in";

interface CaseStudyPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => caseStudySlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const build = conceptBuilds.find((b) => b.id === slug && b.demoUrl);
  if (!build) return {};

  const t = await getTranslations({ locale, namespace: `caseStudies.builds.${slug}` });
  // A build can override the generated "<title> | Novyra Technologies"
  // pattern with an explicit metaTitle/metaDescription pair when the SEO
  // copy needs to differ from the on-page H1/description (e.g. appending
  // "Concept" for search intent) — falls back to the generated pattern
  // when absent so most builds don't need to set this.
  const title = t.has("metaTitle") ? t("metaTitle") : `${t("title")} | Novyra Technologies`;
  const description = t.has("metaDescription") ? t("metaDescription") : t("description");
  const path = `/${locale}/work/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: { en: `/en/work/${slug}`, hi: `/hi/work/${slug}`, "x-default": `/en/work/${slug}` },
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: companyInfo.name,
      locale,
      type: "article",
      images: build.image ? [{ url: `${SITE_URL}${build.image}` }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { locale, slug } = await params;
  const build = conceptBuilds.find((b) => b.id === slug && b.demoUrl);
  if (!build) notFound();

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "work" });
  const tBuild = await getTranslations({ locale, namespace: `caseStudies.builds.${slug}` });
  const url = `${SITE_URL}/${locale}/work/${slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("breadcrumb.home"), item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: t("breadcrumb.current"), item: `${SITE_URL}/${locale}/work` },
      { "@type": "ListItem", position: 3, name: tBuild.has("shortTitle") ? tBuild("shortTitle") : tBuild("title"), item: url },
    ],
  };

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: tBuild("title"),
    description: tBuild("description"),
    url,
    creator: { "@type": "Organization", name: companyInfo.name, url: SITE_URL },
    image: build.image ? `${SITE_URL}${build.image}` : undefined,
    keywords: build.techStack.join(", "),
  };

  return (
    <main className="relative w-full max-w-full min-w-0 flex-1 overflow-x-clip">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }} />
      <CaseStudyDetail slug={slug} />
    </main>
  );
}
