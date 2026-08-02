"use client";

import { motion } from "framer-motion";
import { Database, FileCode2, Rocket, Server, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { accentStroke, accentTint } from "@/lib/accent";
import { easePremium } from "@/lib/motion";
import type { AccentColor } from "@/content/hero-screens";

const codeLines: { indent: number; tokens: { text: string; tone: "keyword" | "string" | "plain" | "comment" }[] }[] = [
  { indent: 0, tokens: [{ text: "export function", tone: "keyword" }, { text: " Dashboard() {", tone: "plain" }] },
  { indent: 1, tokens: [{ text: "const", tone: "keyword" }, { text: " { data } = ", tone: "plain" }, { text: "useQuery", tone: "plain" }, { text: "(records)", tone: "string" }] },
  { indent: 1, tokens: [{ text: "return", tone: "keyword" }, { text: " <Panel>{data.map(row => (", tone: "plain" }] },
  { indent: 2, tokens: [{ text: "<Row key={row.id} {...row} />", tone: "string" }] },
  { indent: 1, tokens: [{ text: "))}</Panel>", tone: "plain" }] },
  { indent: 0, tokens: [{ text: "}", tone: "plain" }] },
];

const status = [
  { id: "api", icon: Server },
  { id: "database", icon: Database },
  { id: "cms", icon: FileCode2 },
  { id: "auth", icon: ShieldCheck },
  { id: "deployment", icon: Rocket },
];

const terminalLines = ["$ npm run build", "✓ Compiled successfully", "$ npm run deploy", "✓ Live at example-client-app.com"];

const toneClass: Record<"keyword" | "string" | "plain" | "comment", string> = {
  keyword: "text-brand-purple",
  string: "text-brand-emerald",
  plain: "text-foreground-secondary",
  comment: "text-foreground-secondary/50",
};

/** Code editor + service status + terminal mockup for the Web Development
 * service preview — covers API, database, CMS, auth, and deployment as
 * generic infrastructure states. Illustrative sample code, not real client
 * work. */
export function DevMockup({ accent }: { accent: AccentColor }) {
  const t = useTranslations("services");
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="grid min-h-0 flex-1 grid-cols-1 sm:grid-cols-5">
        <div className="border-border-subtle col-span-3 flex flex-col border-b sm:border-r sm:border-b-0">
          <div className="border-border-subtle flex items-center gap-1.5 border-b px-3 py-2">
            <span className="bg-foreground/10 text-caption text-foreground-secondary rounded-t-md px-2 py-1">
              dashboard.tsx
            </span>
          </div>
          <div className="flex-1 overflow-hidden px-3 py-2 font-mono text-[11px] leading-relaxed">
            {codeLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06, ease: easePremium }}
                style={{ paddingLeft: `${line.indent * 1}rem` }}
                className="whitespace-pre"
              >
                {line.tokens.map((token, j) => (
                  <span key={j} className={toneClass[token.tone]}>
                    {token.text}
                  </span>
                ))}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="col-span-2 flex flex-col justify-center gap-2 px-4 py-3">
          {status.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 + i * 0.08, ease: easePremium }}
              className="flex items-center gap-2"
            >
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
                style={{ backgroundColor: accentTint(accent, 14) }}
              >
                <s.icon className="h-3 w-3" style={{ color: accentStroke[accent] }} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-caption text-foreground truncate font-medium">
                  {t(`mockups.dev.status.${s.id}.label`)}
                </p>
                <p className="text-caption text-foreground-secondary truncate">
                  {t(`mockups.dev.status.${s.id}.state`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="border-border-subtle border-t px-3 py-2 font-mono text-[10px] leading-relaxed">
        {terminalLines.map((line, i) => (
          <motion.p
            key={line}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
            className={line.startsWith("✓") ? "text-brand-emerald" : "text-foreground-secondary"}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </div>
  );
}
