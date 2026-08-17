"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Container } from "@/components/ui/container";
import { AuthorBadge } from "@/components/blog-article/author-badge";
import { ArticleHeroBackground } from "@/components/blog-article/article-hero-background";
import { ArticleHeroVisual } from "@/components/blog-article/article-hero-visual";
import type { Article } from "@/content/blog-articles";
import type { BlogPost } from "@/content/blog";
import { accentStroke } from "@/lib/accent";

gsap.registerPlugin(useGSAP);

interface ArticleHeroProps {
  article: Article;
  post: BlogPost;
  edition: number;
  publishedLabel: string;
}

/** The editorial split hero — same scoped-GSAP text-reveal craft as
 * every other rebuilt hero on the site, its own concept (an abstract
 * SaaS console rather than a network/ecosystem visual). `<header>` wraps
 * the textual content so the page's single `<h1>` lives inside the
 * `<article>` landmark it belongs to. */
export function ArticleHero({ article, post, edition, publishedLabel }: ArticleHeroProps) {
  const t = useTranslations("blog");
  const tArticle = useTranslations("blogArticle");
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stroke = accentStroke[post.accent];
  const firstTag = article.tags[0];

  useGSAP(
    () => {
      if (reduceMotion) return;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-art-eyebrow]", { opacity: 0, yPercent: 60, duration: 0.35 })
        .from("[data-art-line]", { opacity: 0, yPercent: 105, filter: "blur(6px)", duration: 0.55, stagger: 0.08, ease: "power4.out" }, "-=0.12")
        .from("[data-art-description]", { opacity: 0, y: 14, duration: 0.35 }, "-=0.2")
        .from("[data-art-meta] > *", { opacity: 0, y: 10, duration: 0.3, stagger: 0.06 }, "-=0.15")
        .from("[data-art-visual]", { opacity: 0, scale: 0.95, duration: 0.6 }, "-=0.4");
    },
    { scope: sectionRef, dependencies: [reduceMotion] },
  );

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden pt-24 pb-12 md:pt-28 md:pb-14">
      <ArticleHeroBackground accent={post.accent} />

      <Container size="wide" className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12">
        <header className="flex flex-col gap-5">
          <div data-art-eyebrow className="flex flex-wrap items-center gap-2.5">
            <span className="text-[11px] font-semibold tracking-[0.16em] uppercase" style={{ color: stroke }}>
              {t(`categories.${post.category}`)}
              {firstTag ? ` / ${tArticle(`tags.${firstTag}`)}` : ""}
            </span>
            <span className="h-3 w-px bg-white/15" aria-hidden />
            <span className="text-[11px] font-mono font-medium tracking-[0.1em] text-white/35 uppercase">
              No. {String(edition).padStart(2, "0")}
            </span>
          </div>

          <h1 className="max-w-160 text-[clamp(2.5rem,4.6vw,4.25rem)] leading-[1.06] font-semibold tracking-[-0.03em] text-balance text-foreground">
            <span className="block overflow-hidden">
              <span data-art-line className="block">
                {t(`posts.${article.slug}.title`)}
              </span>
            </span>
          </h1>

          <p data-art-description className="text-body-lg max-w-125 text-foreground-secondary text-pretty leading-[1.65]">
            {t(`posts.${article.slug}.description`)}
          </p>

          <div data-art-meta className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-2">
            <AuthorBadge authorId={article.authorId} />
            <span className="h-8 w-px bg-white/10" aria-hidden />
            <div className="flex flex-col leading-tight">
              <span className="text-[11px] text-white/35">{tArticle("details.published")}</span>
              <span className="text-[13px] font-medium text-white/80">{publishedLabel}</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[11px] text-white/35">{tArticle("details.readTime")}</span>
              <span className="text-[13px] font-medium text-white/80">
                {tArticle("readingProgress.minRead", { count: article.readTimeMinutes })}
              </span>
            </div>
          </div>
        </header>

        <div data-art-visual>
          <ArticleHeroVisual accent={post.accent} />
        </div>
      </Container>
    </section>
  );
}
