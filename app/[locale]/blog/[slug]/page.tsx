import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BlogArticlePage } from "@/components/blog-article/blog-article-page";
import { articles, getArticleBySlug, getPostForArticle } from "@/content/blog-articles";
import { routing } from "@/i18n/routing";
import { companyInfo } from "@/content/footer";

const SITE_URL = "https://novyratech.in";

interface ArticlePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => articles.map((article) => ({ locale, slug: article.slug })));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const t = await getTranslations({ locale, namespace: "blog" });
  const title = t(`posts.${slug}.title`);
  const description = t(`posts.${slug}.description`);
  const path = `/${locale}/blog/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: { en: `/en/blog/${slug}`, hi: `/hi/blog/${slug}`, "x-default": `/en/blog/${slug}` },
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: companyInfo.name,
      locale,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      authors: [companyInfo.name],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  setRequestLocale(locale);

  const post = getPostForArticle(article);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: "blog" });
  const title = t(`posts.${slug}.title`);
  const description = t(`posts.${slug}.description`);
  const url = `${SITE_URL}/${locale}/blog/${slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image: `${SITE_URL}/${locale}/blog/${slug}/opengraph-image`,
    author: { "@type": "Organization", name: companyInfo.name, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: companyInfo.name,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("section.eyebrow"), item: `${SITE_URL}/${locale}#insights` },
      { "@type": "ListItem", position: 2, name: title, item: url },
    ],
  };

  return (
    <main className="relative w-full max-w-full min-w-0 flex-1 overflow-x-clip">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <BlogArticlePage article={article} locale={locale} />
    </main>
  );
}
