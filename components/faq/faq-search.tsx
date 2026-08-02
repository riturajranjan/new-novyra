"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";

interface FaqSearchProps {
  value: string;
  onChange: (value: string) => void;
}

/** Glass search bar with an animated focus glow, a search icon, and a clear
 * button that appears once there's a query. */
export function FaqSearch({ value, onChange }: FaqSearchProps) {
  const t = useTranslations("faq.search");
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      <motion.div
        aria-hidden
        className="from-brand-blue/50 via-brand-purple/50 to-brand-blue/50 pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-r opacity-0 blur-md"
        animate={{ opacity: focused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <div className="border-border-subtle bg-surface/70 relative flex items-center gap-3 rounded-2xl border px-4 py-3 backdrop-blur-xl md:px-5 md:py-4">
        <Search className="text-foreground-secondary h-4.5 w-4.5 shrink-0" aria-hidden />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={t("placeholder")}
          aria-label={t("placeholder")}
          // 16px below (not the `text-body-sm` token) on mobile only: iOS Safari
          // auto-zooms on focus for any input under 16px. Documented exception.
          className="text-[16px] sm:text-body-sm text-foreground placeholder:text-foreground-secondary/70 w-full bg-transparent outline-none"
        />
        {value ? (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label={t("clearAriaLabel")}
            className="text-foreground-secondary hover:text-foreground shrink-0 transition-colors duration-fast"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        ) : null}
      </div>
    </div>
  );
}
