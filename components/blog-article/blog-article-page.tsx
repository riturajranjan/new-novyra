import { getTranslations } from "next-intl/server";
import { ArticleHero } from "@/components/blog-article/article-hero";
import { ReadingProgress } from "@/components/blog-article/reading-progress";
import { ArticleTableOfContents, type TocItem } from "@/components/blog-article/article-table-of-contents";
import { ArticleConversionCard } from "@/components/blog-article/article-conversion-card";
import { ArticleShare } from "@/components/blog-article/article-share";
import { ArticleContent } from "@/components/blog-article/article-content";
import { ArticleBodyBackground } from "@/components/blog-article/article-body-background";
import { ArticleDetails } from "@/components/blog-article/article-details";
import { RelatedArticles } from "@/components/blog-article/related-articles";
import { ArticleCTA } from "@/components/blog-article/article-cta";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";
import { articles, getPostForArticle, type Article } from "@/content/blog-articles";

const SITE_URL = "https://novyratech.in";

interface BlogArticlePageProps {
  article: Article;
  locale: string;
}

/** The top-level composition for one article — hero, reading progress,
 * the 3-column reading layout (TOC + conversion + share / article body /
 * details + related), and the closing CTA. Server component; the only
 * client pieces are the hero (GSAP reveal), reading progress, TOC, and
 * share controls. */
export async function BlogArticlePage({ article, locale }: BlogArticlePageProps) {
  const post = getPostForArticle(article);
  if (!post) return null;

  const t = await getTranslations({ locale, namespace: "blog" });
  const tArticle = await getTranslations({ locale, namespace: "blogArticle" });

  const edition = articles.findIndex((a) => a.slug === article.slug) + 1;
  const publishedLabel = new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(new Date(article.publishedAt));

  const tocItems: TocItem[] = article.chapters.map((chapter) => ({
    id: chapter.id,
    title: tArticle(`articles.${article.slug}.${chapter.titleKey}`),
  }));

  const articleUrl = `${SITE_URL}/${locale}/blog/${article.slug}`;
  const articleTitle = t(`posts.${article.slug}.title`);

  return (
    <>
      <article>
        <ArticleHero article={article} post={post} edition={edition} publishedLabel={publishedLabel} />

        <div className="relative isolate overflow-hidden">
          <ArticleBodyBackground />

          <ReadingProgress targetId="article-content" minutes={article.readTimeMinutes} />

          <Container size="wide" className="py-10 md:py-12">
            <Link
              href="/#insights"
              className="mb-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-white/45 transition-colors duration-base hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
            >
              ← {tArticle("backToInsights")}
            </Link>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.72fr_2fr_0.78fr] lg:items-start lg:gap-8 xl:grid-cols-[220px_1fr_260px]">
              <aside className="flex flex-col gap-6 lg:sticky lg:top-32">
                <ArticleTableOfContents items={tocItems} accent={post.accent} />
                <ArticleConversionCard accent={post.accent} />
                <ArticleShare url={articleUrl} title={articleTitle} />
              </aside>

              <ArticleContent article={article} accent={post.accent} />

              <aside className="flex flex-col gap-6 lg:sticky lg:top-32">
                <ArticleDetails article={article} locale={locale} />
                <RelatedArticles slug={article.slug} />
              </aside>
            </div>
          </Container>
        </div>
      </article>

      <ArticleCTA />
    </>
  );
}
