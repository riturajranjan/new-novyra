import type { AccentColor } from "@/content/hero-screens";

// Temporary homepage insight content.
// Replace with CMS/API-backed articles when the Blog system is implemented.
//
// Structural data only — title/description text lives in
// messages/{locale}/blog.json under `posts.<id>`, and category labels live
// under `categories.<category>`. No /blog page or individual article
// routes exist yet, so these are deliberately NOT linked to real URLs —
// see components/blog/insight-row.tsx and featured-insight.tsx, which
// render the "read" affordance as a non-navigating visual element rather
// than a link to a route that doesn't exist.
export interface BlogPost {
  id: string;
  category: "engineering" | "aiAutomation" | "webDevelopment" | "productDesign";
  accent: AccentColor;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  { id: "scaling-saas-beyond-mvp", category: "engineering", accent: "blue", featured: true },
  { id: "ai-value-in-workflows", category: "aiAutomation", accent: "cyan" },
  { id: "modern-website-performance", category: "webDevelopment", accent: "purple" },
  { id: "designing-around-user-problems", category: "productDesign", accent: "pink" },
];
