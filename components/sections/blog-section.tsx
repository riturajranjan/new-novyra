"use client";

import { Container } from "@/components/ui/container";
import { BlogBackground } from "@/components/blog/blog-background";
import { BlogHeader } from "@/components/blog/blog-header";
import { FeaturedInsight } from "@/components/blog/featured-insight";
import { InsightRow } from "@/components/blog/insight-row";
import { blogPosts } from "@/content/blog";

const featured = blogPosts.find((p) => p.featured) ?? blogPosts[0];
const secondary = blogPosts.filter((p) => p.id !== featured?.id).slice(0, 3);

/** "Editorial Insights Desk" — an asymmetric magazine composition (one
 * dominant featured story + up to three compact editorial rows) instead of
 * four equal cards. Zero-fake-posts rule: renders nothing if there's no
 * real post data, and never pads the secondary column with invented
 * entries beyond what `content/blog.ts` actually provides. */
export function BlogSection() {
  if (!featured) return null;

  return (
    <section id="insights" className="relative isolate scroll-mt-24 overflow-hidden py-12 md:py-14 lg:py-16">
      <BlogBackground />

      <Container size="wide" className="flex flex-col gap-8 md:gap-10">
        <BlogHeader />

        <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-[1fr_0.667fr]">
          <div className="min-h-[340px] lg:min-h-[420px]">
            <FeaturedInsight post={featured} />
          </div>

          {secondary.length > 0 ? (
            <div
              className="flex flex-col justify-center overflow-hidden rounded-2xl border px-5 sm:px-6"
              style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: "#0a0e1e" }}
            >
              {secondary.map((post, i) => (
                <InsightRow key={post.id} post={post} index={i + 1} />
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
