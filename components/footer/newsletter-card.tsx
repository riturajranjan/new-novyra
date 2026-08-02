"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Mail } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { buttonVariants } from "@/components/ui/button";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Compact horizontal newsletter signup — validates the email shape
 * client-side and shows a success state. There's no email service wired up
 * yet, so this only confirms the interaction works, the same stage every
 * other form on this site is currently at. Capped around 110–140px tall. */
export function NewsletterCard() {
  const t = useTranslations("footer.newsletter");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!EMAIL_PATTERN.test(email)) {
      setError(true);
      return;
    }
    setError(false);
    setSubmitted(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "150px" }}
      transition={{ duration: 0.5, ease: easePremium }}
      className="border-border-subtle bg-surface/60 flex flex-col justify-center gap-2 rounded-[20px] border p-4 backdrop-blur-xl"
    >
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: easePremium }}
            className="flex items-center gap-2 py-1.5"
          >
            <CheckCircle2 className="text-brand-emerald h-4 w-4 shrink-0" aria-hidden />
            <span className="text-body-sm text-foreground font-medium">{t("successMessage")}</span>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-col gap-2">
            <div>
              <h4 className="text-body-sm text-foreground font-semibold">{t("heading")}</h4>
              <p className="text-caption text-foreground-secondary">{t("description")}</p>
            </div>
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2 min-[430px]:flex-row">
              <div
                className={cn(
                  "border-border-subtle bg-surface/70 flex min-w-0 flex-1 items-center gap-2 rounded-xl border px-3 py-2 transition-colors duration-fast",
                  error && "border-red-500/50",
                )}
              >
                <Mail className="text-foreground-secondary h-3.5 w-3.5 shrink-0" aria-hidden />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(false);
                  }}
                  placeholder={t("emailPlaceholder")}
                  aria-invalid={error}
                  aria-label={t("emailAriaLabel")}
                  // 16px below (not the `text-body-sm` token) on mobile only: iOS Safari
                  // auto-zooms on focus for any input under 16px. Documented exception.
                  className="text-[16px] sm:text-body-sm text-foreground placeholder:text-foreground-secondary/70 w-full min-w-0 bg-transparent outline-none"
                />
              </div>
              <button type="submit" className={cn(buttonVariants({ variant: "gradient", size: "sm" }), "w-full shrink-0 min-[430px]:w-auto")}>
                {t("subscribe")}
              </button>
            </form>
            {error ? <p className="text-caption text-red-400">{t("errorMessage")}</p> : null}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
