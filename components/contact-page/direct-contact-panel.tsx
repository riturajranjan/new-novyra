"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { RippleLink } from "@/components/ui/ripple-link";
import { contactChannels } from "@/content/contact-page";
import { companyInfo } from "@/content/footer";
import { accentStroke, accentTint } from "@/lib/accent";
import { easePremium } from "@/lib/motion";

function channelHref(id: string): { href: string; external: boolean } {
  switch (id) {
    case "email":
      return { href: `mailto:${companyInfo.email}`, external: false };
    case "phone":
      return { href: `tel:${companyInfo.phone.replace(/\s+/g, "")}`, external: false };
    case "whatsapp":
      return { href: companyInfo.whatsapp, external: true };
    default:
      return { href: "#", external: false };
  }
}

function channelValue(id: string, t: (key: string) => string): string {
  switch (id) {
    case "email":
      return companyInfo.email;
    case "phone":
      return companyInfo.phone;
    case "whatsapp":
      return t("channels.whatsapp.value");
    default:
      return companyInfo.location;
  }
}

/** "Prefer a direct conversation?" — one unified panel with thin
 * separators (not four floating cards), each row a real, working action
 * (mailto / tel / the official WhatsApp link / a static location line),
 * closed with a subtle availability signal. */
export function DirectContactPanel() {
  const t = useTranslations("contact.workspace.connect");

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <h3 className="text-title-lg text-foreground font-semibold">{t("heading")}</h3>
        <p className="text-body-sm text-foreground-secondary">{t("description")}</p>
      </div>

      <div className="border-border-subtle overflow-hidden rounded-2xl border" style={{ backgroundColor: "rgba(8,13,28,0.72)" }}>
        {contactChannels.map((channel) => {
          const Icon = channel.icon;
          const stroke = accentStroke[channel.accent];
          const { href, external } = channelHref(channel.id);
          const value = channelValue(channel.id, t);
          const isLocation = channel.id === "location";

          const content = (
            <>
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-shadow duration-base group-hover:shadow-[0_0_16px_-2px_var(--row-accent)]"
                style={{ backgroundColor: accentTint(channel.accent, 14), ["--row-accent" as string]: stroke }}
              >
                <Icon className="h-4.5 w-4.5" style={{ color: stroke }} aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="text-caption text-foreground-secondary block font-medium tracking-wide uppercase">{t(`channels.${channel.id}.label`)}</span>
                <span className="text-body-sm text-foreground block truncate font-semibold">{value}</span>
              </span>
              {!isLocation ? (
                <ArrowRight className="h-4 w-4 shrink-0 text-white/30 transition-transform duration-fast group-hover:translate-x-1 group-hover:text-white/70" aria-hidden />
              ) : null}
            </>
          );

          const rowClass =
            "group flex items-center gap-3.5 border-t border-white/7 px-4 py-3.5 transition-colors duration-base first:border-t-0 hover:bg-white/[0.03]";

          return isLocation ? (
            <div key={channel.id} className={rowClass}>
              {content}
            </div>
          ) : (
            <RippleLink key={channel.id} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className={rowClass}>
              {content}
            </RippleLink>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: easePremium }}
        className="flex items-center gap-2.5"
      >
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="bg-brand-emerald absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" />
          <span className="bg-brand-emerald relative inline-flex h-2 w-2 rounded-full" />
        </span>
        <span className="text-caption text-foreground-secondary">
          <span className="text-foreground font-semibold">{t("availability.status")}</span> — {t("availability.note")}
        </span>
      </motion.div>
    </div>
  );
}
