import { blogPosts, type BlogPost } from "@/content/blog";

/** Structural data only — every piece of user-facing article text (chapter
 * titles, paragraphs, quotes, diagram labels…) lives in
 * messages/{locale}/blog-article.json under `articles.<slug>.chapters.<id>`,
 * resolved by the block's `key` at render time. This file only decides
 * WHAT KIND of content appears WHERE, never the words themselves — same
 * separation as content/pricing.ts and content/blog.ts. Re-keys off
 * `blogPosts` (id === slug) rather than duplicating category/accent, so the
 * homepage teaser and the article page can never drift out of sync. */

export type ContentBlock =
  | { type: "paragraph"; key: string }
  | { type: "subheading"; key: string }
  | { type: "bulletList"; key: string }
  | { type: "numberedList"; key: string }
  | { type: "quote"; key: string }
  | { type: "keyInsight"; key: string }
  | { type: "diagram"; key: string }
  | { type: "callout"; key: string }
  | { type: "cta"; key: string; href: string };

export interface ArticleChapter {
  /** Anchor id — also the table-of-contents entry and the `<h2 id>`. */
  id: string;
  titleKey: string;
  blocks: ContentBlock[];
}

export type AuthorId = "novyra-team";

export interface Article {
  slug: string;
  authorId: AuthorId;
  /** ISO date strings — no invented "X days ago" freshness signal, just the
   * real date rendered as-is. */
  publishedAt: string;
  updatedAt?: string;
  readTimeMinutes: number;
  tags: string[];
  chapters: ArticleChapter[];
}

export const articleAuthors: Record<AuthorId, { nameKey: string; roleKey: string }> = {
  "novyra-team": { nameKey: "authors.novyraTeam.name", roleKey: "authors.novyraTeam.role" },
};

export const articles: Article[] = [
  {
    slug: "scaling-saas-beyond-mvp",
    authorId: "novyra-team",
    publishedAt: "2026-05-16",
    updatedAt: "2026-05-20",
    readTimeMinutes: 8,
    tags: ["architecture", "saas", "scaling", "performance"],
    chapters: [
      {
        id: "architecture-first",
        titleKey: "chapters.architectureFirst.title",
        blocks: [
          { type: "paragraph", key: "chapters.architectureFirst.p1" },
          { type: "paragraph", key: "chapters.architectureFirst.p2" },
          { type: "keyInsight", key: "chapters.architectureFirst.insight" },
          { type: "bulletList", key: "chapters.architectureFirst.list" },
        ],
      },
      {
        id: "product-boundaries",
        titleKey: "chapters.productBoundaries.title",
        blocks: [
          { type: "paragraph", key: "chapters.productBoundaries.p1" },
          { type: "subheading", key: "chapters.productBoundaries.sub1" },
          { type: "paragraph", key: "chapters.productBoundaries.p2" },
          { type: "bulletList", key: "chapters.productBoundaries.list" },
        ],
      },
      {
        id: "data-layer",
        titleKey: "chapters.dataLayer.title",
        blocks: [
          { type: "paragraph", key: "chapters.dataLayer.p1" },
          { type: "diagram", key: "chapters.dataLayer.diagram" },
          { type: "paragraph", key: "chapters.dataLayer.p2" },
          { type: "quote", key: "chapters.dataLayer.quote" },
        ],
      },
      {
        id: "performance",
        titleKey: "chapters.performance.title",
        blocks: [
          { type: "paragraph", key: "chapters.performance.p1" },
          { type: "numberedList", key: "chapters.performance.list" },
          { type: "callout", key: "chapters.performance.callout" },
        ],
      },
      {
        id: "scaling-strategy",
        titleKey: "chapters.scalingStrategy.title",
        blocks: [
          { type: "paragraph", key: "chapters.scalingStrategy.p1" },
          { type: "subheading", key: "chapters.scalingStrategy.sub1" },
          { type: "paragraph", key: "chapters.scalingStrategy.p2" },
          { type: "cta", key: "chapters.scalingStrategy.cta", href: "/services" },
        ],
      },
      {
        id: "key-takeaways",
        titleKey: "chapters.keyTakeaways.title",
        blocks: [
          { type: "numberedList", key: "chapters.keyTakeaways.list" },
          { type: "paragraph", key: "chapters.keyTakeaways.closing" },
        ],
      },
    ],
  },
  {
    slug: "ai-value-in-workflows",
    authorId: "novyra-team",
    publishedAt: "2026-06-04",
    readTimeMinutes: 6,
    tags: ["ai", "automation", "operations"],
    chapters: [
      {
        id: "the-real-opportunity",
        titleKey: "chapters.theRealOpportunity.title",
        blocks: [
          { type: "paragraph", key: "chapters.theRealOpportunity.p1" },
          { type: "paragraph", key: "chapters.theRealOpportunity.p2" },
          { type: "keyInsight", key: "chapters.theRealOpportunity.insight" },
        ],
      },
      {
        id: "where-it-fits",
        titleKey: "chapters.whereItFits.title",
        blocks: [
          { type: "paragraph", key: "chapters.whereItFits.p1" },
          { type: "bulletList", key: "chapters.whereItFits.list" },
        ],
      },
      {
        id: "avoiding-complexity",
        titleKey: "chapters.avoidingComplexity.title",
        blocks: [
          { type: "paragraph", key: "chapters.avoidingComplexity.p1" },
          { type: "quote", key: "chapters.avoidingComplexity.quote" },
          { type: "callout", key: "chapters.avoidingComplexity.callout" },
        ],
      },
      {
        id: "getting-started",
        titleKey: "chapters.gettingStarted.title",
        blocks: [
          { type: "paragraph", key: "chapters.gettingStarted.p1" },
          { type: "numberedList", key: "chapters.gettingStarted.list" },
          { type: "cta", key: "chapters.gettingStarted.cta", href: "/contact" },
        ],
      },
    ],
  },
  {
    slug: "modern-website-performance",
    authorId: "novyra-team",
    publishedAt: "2026-06-22",
    readTimeMinutes: 7,
    tags: ["performance", "webDevelopment", "seo"],
    chapters: [
      {
        id: "beyond-the-visual-layer",
        titleKey: "chapters.beyondVisualLayer.title",
        blocks: [
          { type: "paragraph", key: "chapters.beyondVisualLayer.p1" },
          { type: "paragraph", key: "chapters.beyondVisualLayer.p2" },
          { type: "keyInsight", key: "chapters.beyondVisualLayer.insight" },
        ],
      },
      {
        id: "the-delivery-path",
        titleKey: "chapters.theDeliveryPath.title",
        blocks: [
          { type: "paragraph", key: "chapters.theDeliveryPath.p1" },
          { type: "diagram", key: "chapters.theDeliveryPath.diagram" },
          { type: "paragraph", key: "chapters.theDeliveryPath.p2" },
        ],
      },
      {
        id: "what-actually-moves-the-needle",
        titleKey: "chapters.whatMovesTheNeedle.title",
        blocks: [
          { type: "paragraph", key: "chapters.whatMovesTheNeedle.p1" },
          { type: "bulletList", key: "chapters.whatMovesTheNeedle.list" },
          { type: "callout", key: "chapters.whatMovesTheNeedle.callout" },
        ],
      },
      {
        id: "closing-thoughts",
        titleKey: "chapters.closingThoughts.title",
        blocks: [{ type: "paragraph", key: "chapters.closingThoughts.p1" }],
      },
    ],
  },
  {
    slug: "designing-around-user-problems",
    authorId: "novyra-team",
    publishedAt: "2026-07-09",
    readTimeMinutes: 6,
    tags: ["productDesign", "ux", "strategy"],
    chapters: [
      {
        id: "start-with-the-workflow",
        titleKey: "chapters.startWithTheWorkflow.title",
        blocks: [
          { type: "paragraph", key: "chapters.startWithTheWorkflow.p1" },
          { type: "paragraph", key: "chapters.startWithTheWorkflow.p2" },
        ],
      },
      {
        id: "features-are-not-value",
        titleKey: "chapters.featuresAreNotValue.title",
        blocks: [
          { type: "paragraph", key: "chapters.featuresAreNotValue.p1" },
          { type: "keyInsight", key: "chapters.featuresAreNotValue.insight" },
          { type: "bulletList", key: "chapters.featuresAreNotValue.list" },
        ],
      },
      {
        id: "designing-with-constraints",
        titleKey: "chapters.designingWithConstraints.title",
        blocks: [
          { type: "paragraph", key: "chapters.designingWithConstraints.p1" },
          { type: "quote", key: "chapters.designingWithConstraints.quote" },
        ],
      },
      {
        id: "bringing-it-together",
        titleKey: "chapters.bringingItTogether.title",
        blocks: [
          { type: "paragraph", key: "chapters.bringingItTogether.p1" },
          { type: "cta", key: "chapters.bringingItTogether.cta", href: "/work" },
        ],
      },
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getPostForArticle(article: Article): BlogPost | undefined {
  return blogPosts.find((p) => p.id === article.slug);
}

/** Same category first, then shared tags, then most recent — every result
 * is a real article from the dataset above, never padded with invented
 * entries. Caps at 3 per the article page's Related Articles panel. */
export function getRelatedArticles(slug: string, max = 3): Article[] {
  const current = getArticleBySlug(slug);
  const currentPost = current ? getPostForArticle(current) : undefined;
  if (!current || !currentPost) return [];

  const candidates = articles
    .filter((a) => a.slug !== slug)
    .map((a) => {
      const post = getPostForArticle(a);
      const sameCategory = post && currentPost && post.category === currentPost.category ? 1 : 0;
      const sharedTags = a.tags.filter((tag) => current.tags.includes(tag)).length;
      return { article: a, sameCategory, sharedTags };
    })
    .sort((a, b) => {
      if (a.sameCategory !== b.sameCategory) return b.sameCategory - a.sameCategory;
      if (a.sharedTags !== b.sharedTags) return b.sharedTags - a.sharedTags;
      return new Date(b.article.publishedAt).getTime() - new Date(a.article.publishedAt).getTime();
    });

  return candidates.slice(0, max).map((c) => c.article);
}
