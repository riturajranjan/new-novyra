import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { getArticleBySlug, getPostForArticle } from "@/content/blog-articles";
import { routing } from "@/i18n/routing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Novyra Technologies";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const ACCENT_HEX: Record<string, string> = {
  blue: "#3b82f6",
  purple: "#8b5cf6",
  cyan: "#06b6d4",
  pink: "#ec4899",
  emerald: "#22c55e",
  amber: "#f59e0b",
};

/** A programmatically generated branded card — dark navy, an accent
 * gradient bar keyed to the article's category color, the category
 * label, the real headline, and the Novyra wordmark. No fabricated
 * photography, no invented client screenshot. */
export default async function OpengraphImage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);
  const post = article ? getPostForArticle(article) : undefined;
  const t = await getTranslations({ locale, namespace: "blog" });
  const title = article ? t(`posts.${slug}.title`) : "Novyra Technologies";
  const category = post ? t(`categories.${post.category}`) : "";
  const accentColor = post ? (ACCENT_HEX[post.accent] ?? ACCENT_HEX.blue) : ACCENT_HEX.blue;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#05070f",
          backgroundImage: `radial-gradient(700px 500px at 85% 0%, ${accentColor}33, transparent), radial-gradient(600px 500px at 0% 100%, #8b5cf633, transparent)`,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 44, height: 6, borderRadius: 3, backgroundColor: accentColor, display: "flex" }} />
          <span style={{ fontSize: 22, color: "rgba(255,255,255,0.5)", letterSpacing: 2, textTransform: "uppercase" }}>{category}</span>
        </div>

        <div style={{ display: "flex", fontSize: 58, lineHeight: 1.15, fontWeight: 700, color: "white", maxWidth: 980 }}>{title}</div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              fontWeight: 700,
              color: "white",
              backgroundImage: "linear-gradient(135deg, #3b82f6, #8b5cf6 55%, #ec4899)",
            }}
          >
            N
          </div>
          <span style={{ fontSize: 24, color: "white", fontWeight: 600 }}>Novyra Technologies</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
