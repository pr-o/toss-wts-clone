"use client";

import { useQuery } from "@tanstack/react-query";
import { Moon, Sun, Search } from "lucide-react";
import { useThemeStore } from "@/stores/themeStore";
import { formatChange, formatPrice, getPriceDirection, cn } from "@/lib/utils";
import type { MarketIndex } from "@/types/stock";

async function fetchIndices(): Promise<MarketIndex[]> {
  const res = await fetch("/api/indices");
  return res.json();
}

export function TopBar() {
  const { theme, toggle } = useThemeStore();
  const { data: indices = [] } = useQuery({ queryKey: ["indices"], queryFn: fetchIndices });

  return (
    <header className="flex h-10 items-center gap-0 border-b border-[var(--tds-border-default)] bg-[var(--tds-surface-elevated)] px-3 text-xs">
      {/* Logo */}
      <div className="mr-4 flex items-center gap-1.5 shrink-0">
        <span className="font-bold text-[var(--tds-text-brand)] text-sm">토스증권</span>
      </div>

      {/* Index pills */}
      <div className="flex flex-1 items-center gap-3 overflow-x-auto">
        {indices.map((idx) => {
          const dir = getPriceDirection(idx.changeRate);
          return (
            <div key={idx.id} className="flex shrink-0 items-center gap-1.5">
              <span className="text-[var(--tds-text-secondary)]">{idx.name}</span>
              <span className="font-medium tabular-nums">{formatPrice(idx.value)}</span>
              <span className={cn("tabular-nums", {
                "text-[var(--tds-text-rise)]": dir === "rise",
                "text-[var(--tds-text-fall)]": dir === "fall",
                "text-[var(--tds-text-tertiary)]": dir === "flat",
              })}>
                {formatChange(idx.changeRate)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Right actions */}
      <div className="ml-4 flex items-center gap-2 shrink-0">
        <button className="flex h-7 items-center gap-1.5 rounded px-2 text-[var(--tds-text-secondary)] hover:bg-[var(--tds-surface-overlay)] hover:text-[var(--tds-text-primary)]">
          <Search size={14} />
          <span>종목 검색</span>
        </button>
        <button
          onClick={toggle}
          className="flex h-7 w-7 items-center justify-center rounded text-[var(--tds-text-secondary)] hover:bg-[var(--tds-surface-overlay)]"
          aria-label="테마 변경"
        >
          {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div>
    </header>
  );
}
