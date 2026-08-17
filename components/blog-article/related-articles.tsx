import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getPostForArticle, getRelatedArticles, type Article } from "@/content/blog-articles";
import { accentStroke, accentTint } from "@/lib/accent";

interface RelatedArticlesProps {
  slug: string;
}

/** Up to 3 real related articles — same category first, then shared
 * tags, then most recent (see getRelatedArticles). Never padded with
 * invented entries: if fewer than 3 real matches exist, fewer render. */
export async function RelatedArticles({ slug }: RelatedArticlesProps) {
  const related = getRelatedArticles(slug, 3);
  if (related.length === 0) return null;

  const t = await getTranslations("blogArticle.related");

  return (
    <div className="flex flex-col gap-3">
      <span className="text-[11px] font-semibold tracking-[0.14em] text-white/35 uppercase">{t("heading")}</span>
      <div className="flex flex-col gap-1">
        {related.map((article) => (
          <RelatedCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}

async function RelatedCard({ article }: { article: Article }) {
  const t = await getTranslations("blog");
  const tArticle = await getTranslations("blogArticle");
  const post = getPostForArticle(article);
  if (!post) return null;
  const stroke = accentStroke[post.accent];

  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group flex items-center gap-3 rounded-lg py-2.5 transition-colors duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
    >
      <span
        aria-hidden
        className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg"
        style={{ backgroundImage: `linear-gradient(155deg, ${accentTint(post.accent, 32)}, #0a0e1c 75%)` }}
      >
        <span className="absolute inset-0 opacity-40" style={{ backgroundImage: `radial-gradient(60% 60% at 30% 20%, ${stroke}, transparent 70%)` }} />
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-[10.5px] font-semibold tracking-[0.08em] uppercase" style={{ color: stroke }}>
          {t(`categories.${post.category}`)}
        </span>
        <h4 className="line-clamp-2 text-[13.5px] leading-[1.3] font-semibold text-white/85 transition-colors duration-base group-hover:text-white">
          {t(`posts.${article.slug}.title`)}
        </h4>
        <span className="text-[11px] text-white/40">
          {tArticle("readingProgress.minRead", { count: article.readTimeMinutes })}
        </span>
      </div>

      <ArrowUpRight
        className="h-3.5 w-3.5 shrink-0 text-white/35 transition-transform duration-fast group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
        aria-hidden
      />
    </Link>
  );
}
