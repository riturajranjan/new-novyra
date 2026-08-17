import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArticleCallout } from "@/components/blog-article/article-callout";
import { ArticleDiagram } from "@/components/blog-article/article-diagram";
import type { ContentBlock } from "@/content/blog-articles";
import type { AccentColor } from "@/content/hero-screens";
import { accentStroke } from "@/lib/accent";

interface ArticleBlockProps {
  block: ContentBlock;
  slug: string;
  accent: AccentColor;
}

/** Dispatches one content block to its typography/component treatment.
 * Every block resolves its text from `blogArticle.articles.<slug>.<key>`
 * — the article body lives entirely in messages/{locale}/blog-article.json,
 * never inline in this component. */
export async function ArticleBlock({ block, slug, accent }: ArticleBlockProps) {
  const t = await getTranslations("blogArticle");
  const path = `articles.${slug}.${block.key}`;

  switch (block.type) {
    case "paragraph":
      return <p className="text-[17px] leading-[1.7] text-white/75 sm:text-[18px]">{t(path)}</p>;

    case "subheading":
      return (
        <h3 className="mt-2 text-[24px] leading-[1.3] font-semibold tracking-[-0.01em] text-white sm:text-[28px]">{t(path)}</h3>
      );

    case "bulletList":
      return (
        <ul className="flex flex-col gap-2.5">
          {t.raw(path).map((item: string) => (
            <li key={item} className="flex items-start gap-3 text-[17px] leading-[1.65] text-white/75 sm:text-[18px]">
              <span aria-hidden className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: accentStroke[accent] }} />
              {item}
            </li>
          ))}
        </ul>
      );

    case "numberedList":
      return (
        <ol className="flex flex-col gap-2.5">
          {t.raw(path).map((item: string, i: number) => (
            <li key={item} className="flex items-start gap-3 text-[17px] leading-[1.65] text-white/75 sm:text-[18px]">
              <span className="mt-0.5 shrink-0 font-mono text-[13px] font-semibold tabular-nums" style={{ color: accentStroke[accent] }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {item}
            </li>
          ))}
        </ol>
      );

    case "quote":
      return (
        <blockquote
          className="my-2 border-l-2 py-1 pl-5 text-[19px] leading-[1.55] font-medium text-white/85 italic sm:text-[21px]"
          style={{ borderColor: "rgba(255,255,255,0.18)" }}
        >
          {t(path)}
        </blockquote>
      );

    case "keyInsight":
      return <ArticleCallout text={t(path)} variant="insight" label={t("keyInsightLabel")} accent={accent} />;

    case "callout":
      return <ArticleCallout text={t(path)} variant="note" label={t("noteLabel")} accent={accent} />;

    case "diagram":
      return <ArticleDiagram nodes={t.raw(path)} accent={accent} />;

    case "cta":
      return (
        <Link
          href={block.href}
          className="group my-2 flex items-center justify-between gap-4 rounded-xl border border-white/8 px-5 py-4 transition-colors duration-base hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
        >
          <span className="text-[15px] leading-snug font-medium text-white/85">{t(path)}</span>
          <ArrowUpRight
            className="h-4 w-4 shrink-0 text-white/50 transition-transform duration-fast group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
            aria-hidden
          />
        </Link>
      );

    default:
      return null;
  }
}
