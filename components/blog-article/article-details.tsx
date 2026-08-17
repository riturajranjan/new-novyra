import { getTranslations } from "next-intl/server";
import { AuthorBadge } from "@/components/blog-article/author-badge";
import type { Article } from "@/content/blog-articles";
import { getPostForArticle } from "@/content/blog-articles";

interface ArticleDetailsProps {
  article: Article;
  locale: string;
}

function formatDate(iso: string, locale: string) {
  return new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(new Date(iso));
}

function formatMinRead(minutes: number, locale: string) {
  return locale === "hi" ? `${minutes} मिनट` : `${minutes} min`;
}

/** The right-sidebar "Article Details" panel — real dates, a real read
 * time, the real category, and the (studio-level, not individually
 * bylined) author. Sticky alongside the article on desktop. */
export async function ArticleDetails({ article, locale }: ArticleDetailsProps) {
  const t = await getTranslations("blogArticle.details");
  const tBlog = await getTranslations("blog");
  const post = getPostForArticle(article);

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-white/8 p-4" style={{ backgroundColor: "rgba(255,255,255,0.015)" }}>
      <span className="text-[11px] font-semibold tracking-[0.14em] text-white/35 uppercase">{t("heading")}</span>

      <dl className="flex flex-col gap-3">
        {post ? (
          <div className="flex flex-col gap-0.5">
            <dt className="text-[11px] text-white/40">{t("category")}</dt>
            <dd className="text-[13.5px] font-medium text-white/85">{tBlog(`categories.${post.category}`)}</dd>
          </div>
        ) : null}

        <div className="flex flex-col gap-0.5">
          <dt className="text-[11px] text-white/40">{t("readTime")}</dt>
          <dd className="text-[13.5px] font-medium text-white/85">{formatMinRead(article.readTimeMinutes, locale)}</dd>
        </div>

        <div className="flex flex-col gap-0.5">
          <dt className="text-[11px] text-white/40">{t("published")}</dt>
          <dd className="text-[13.5px] font-medium text-white/85">{formatDate(article.publishedAt, locale)}</dd>
        </div>

        {article.updatedAt ? (
          <div className="flex flex-col gap-0.5">
            <dt className="text-[11px] text-white/40">{t("updated")}</dt>
            <dd className="text-[13.5px] font-medium text-white/85">{formatDate(article.updatedAt, locale)}</dd>
          </div>
        ) : null}
      </dl>

      <div className="border-t border-white/8 pt-3">
        <span className="mb-2 block text-[11px] text-white/40">{t("author")}</span>
        <AuthorBadge authorId={article.authorId} size="sm" />
      </div>
    </div>
  );
}
