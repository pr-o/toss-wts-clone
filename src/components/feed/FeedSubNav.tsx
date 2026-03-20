"use client";

import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
          <Button
            key={label}
            variant="ghost"
            onClick={() => router.push(href)}
            className={cn(
              "h-auto w-full rounded-none py-2 text-[11px] font-medium transition-colors",
              active
                ? "font-semibold text-[var(--tds-text-primary)]"
                : "text-[var(--tds-text-tertiary)] hover:text-[var(--tds-text-secondary)]",
            )}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
}
