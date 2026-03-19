"use client";

import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = [
  { label: "추천", href: "/feed/recommended" },
  { label: "뉴스", href: "/feed/news" },
] as const;

export function FeedSubNav() {
  const router   = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex w-12 shrink-0 flex-col items-center border-r border-[var(--tds-border-default)] bg-[var(--tds-surface-base)] pt-3 gap-1">
      {TABS.map(({ label, href }) => {
        const active = pathname.startsWith(href.split("/").slice(0, 3).join("/"));
        return (
          <button
            key={label}
            onClick={() => router.push(href)}
            className={cn(
              "w-full py-2 text-[11px] font-medium transition-colors",
              active
                ? "font-semibold text-[var(--tds-text-primary)]"
                : "text-[var(--tds-text-tertiary)] hover:text-[var(--tds-text-secondary)]",
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
