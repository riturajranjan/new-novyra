"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface ArticleShareProps {
  url: string;
  title: string;
}

const LINKEDIN_ICON_PATH =
  "M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.1 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05C19.5 8 21 10.13 21 14.05V23h-4v-8.03c0-1.92-.03-4.38-2.67-4.38-2.68 0-3.09 2.09-3.09 4.25V23h-4V8z";
const X_ICON_PATH =
  "M18.9 1.5h3.68l-8.04 9.19L24 22.5h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.5h7.59l5.24 6.93L18.9 1.5zm-1.3 18.9h2.04L6.5 3.48H4.3L17.6 20.4z";

/** Only two networks (LinkedIn, X) plus copy-link — matches what the spec
 * asked for rather than a generic six-icon share row. Copy-link gives
 * real keyboard/screen-reader feedback via a text swap, not just a toast. */
export function ArticleShare({ url, title }: ArticleShareProps) {
  const t = useTranslations("blogArticle.share");
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can be unavailable (older browsers, insecure
      // context) — silently no-op rather than throwing in the UI.
    }
  }

  const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const xHref = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;

  return (
    <div className="flex flex-col gap-3">
      <span className="text-[11px] font-semibold tracking-[0.14em] text-white/35 uppercase">{t("heading")}</span>
      <div className="flex items-center gap-2">
        <a
          href={linkedInHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("linkedin")}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors duration-base hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
            <path d={LINKEDIN_ICON_PATH} />
          </svg>
        </a>
        <a
          href={xHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("x")}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors duration-base hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
            <path d={X_ICON_PATH} />
          </svg>
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className="flex h-8 items-center gap-1.5 rounded-full border border-white/10 px-3 text-[12px] font-medium text-white/60 transition-colors duration-base hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
        >
          {copied ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Link2 className="h-3.5 w-3.5" aria-hidden />}
          {copied ? t("linkCopied") : t("copyLink")}
        </button>
      </div>
    </div>
  );
}
