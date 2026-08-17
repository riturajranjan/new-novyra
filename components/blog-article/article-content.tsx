import { ArticleSection } from "@/components/blog-article/article-section";
import type { Article } from "@/content/blog-articles";
import type { AccentColor } from "@/content/hero-screens";

interface ArticleContentProps {
  article: Article;
  accent: AccentColor;
}

/** The chapter list — `id="article-content"` is the scroll target
 * ReadingProgress measures against. Not its own `<article>` tag: the
 * page's single `<article>` landmark wraps this alongside the hero, so
 * there's exactly one article/header per page. */
export function ArticleContent({ article, accent }: ArticleContentProps) {
  return (
    <div id="article-content" className="flex flex-col gap-10 sm:gap-12">
      {article.chapters.map((chapter, i) => (
        <ArticleSection key={chapter.id} chapter={chapter} index={i} slug={article.slug} accent={accent} />
      ))}
    </div>
  );
}
