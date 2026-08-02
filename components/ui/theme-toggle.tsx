"use client";

import { Moon, Sun, MonitorSmartphone } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useIsMounted } from "@/lib/use-is-mounted";

const options = [
  { value: "light", key: "light", icon: Sun },
  { value: "system", key: "system", icon: MonitorSmartphone },
  { value: "dark", key: "dark", icon: Moon },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useIsMounted();
  const t = useTranslations("common.theme");

  return (
    <div
      role="radiogroup"
      aria-label={t("label")}
      className="glass inline-flex items-center gap-1 rounded-pill p-1"
    >
      {options.map(({ value, key, icon: Icon }) => {
        const active = mounted && theme === value;
        const label = t(key);
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            onClick={() => setTheme(value)}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-pill transition-colors duration-fast",
              active
                ? "bg-gradient-brand text-white"
                : "text-foreground-secondary hover:text-foreground",
            )}
          >
            <Icon className="h-4 w-4" />
          </button>
        );
      })}
    </div>
  );
}
