import { getTranslations } from "next-intl/server";
import { ArticleBlock } from "@/components/blog-article/article-block";
import type { ArticleChapter } from "@/content/blog-articles";
import type { AccentColor } from "@/content/hero-screens";
import { accentStroke } from "@/lib/accent";

interface ArticleSectionProps {
  chapter: ArticleChapter;
  index: number;
  slug: string;
  accent: AccentColor;
}

/** One numbered chapter — "01 / Architecture First" — followed by its
 * content blocks. `scroll-mt` keeps the heading clear of the sticky
 * reading-progress bar when the TOC scrolls to it. */
export async function ArticleSection({ chapter, index, slug, accent }: ArticleSectionProps) {
  const t = await getTranslations("blogArticle");

  return (
    <section id={chapter.id} className="flex scroll-mt-36 flex-col gap-4">
      <div className="flex flex-col gap-1">
        <span className="font-mono text-[13px] font-semibold tracking-[0.1em]" style={{ color: accentStroke[accent] }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <h2 className="text-[32px] leading-[1.2] font-semibold tracking-[-0.015em] text-white sm:text-[38px]">
          {t(`articles.${slug}.${chapter.titleKey}`)}
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        {chapter.blocks.map((block, i) => (
          <ArticleBlock key={i} block={block} slug={slug} accent={accent} />
        ))}
      </div>
    </section>
  );
}
