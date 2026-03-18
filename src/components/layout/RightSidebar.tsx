"use client";

import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { useWatchlistStore } from "@/stores/watchlistStore";
import { usePanelStore } from "@/stores/panelStore";
import { formatChange, formatPrice, getPriceDirection, cn } from "@/lib/utils";
import type { Stock } from "@/types/stock";

async function fetchStocks(): Promise<Stock[]> {
  const res = await fetch("/api/stocks");
  return res.json();
}

export function RightSidebar() {
  const { symbols } = useWatchlistStore();
  const setActiveSymbol = usePanelStore((s) => s.setActiveSymbol);
  const { data: stocks = [] } = useQuery({ queryKey: ["stocks"], queryFn: fetchStocks });

  const watchlistStocks = stocks.filter((s) => symbols.includes(s.symbol));

  return (
    <aside className="flex w-60 flex-col border-l border-[var(--tds-border-default)] bg-[var(--tds-surface-sidebar)]">
      <div className="flex items-center gap-1.5 border-b border-[var(--tds-border-default)] px-3 py-2">
        <Star size={13} className="text-[var(--tds-text-brand)]" />
        <span className="text-xs font-medium text-[var(--tds-text-primary)]">관심종목</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        {watchlistStocks.map((stock) => {
          const dir = getPriceDirection(stock.changeRate);
          return (
            <button
              key={stock.symbol}
              onClick={() => setActiveSymbol(stock.symbol)}
              className="flex w-full items-center justify-between px-3 py-2 text-left transition-colors hover:bg-[var(--tds-surface-overlay)]"
            >
              <div>
                <div className="text-xs font-medium text-[var(--tds-text-primary)]">{stock.name}</div>
                <div className="text-[10px] text-[var(--tds-text-tertiary)]">{stock.symbol}</div>
              </div>
              <div className="text-right">
                <div className="text-xs font-medium tabular-nums text-[var(--tds-text-primary)]">
                  {formatPrice(stock.price)}
                </div>
                <div className={cn("text-[10px] tabular-nums", {
                  "text-[var(--tds-text-rise)]": dir === "rise",
                  "text-[var(--tds-text-fall)]": dir === "fall",
                  "text-[var(--tds-text-tertiary)]": dir === "flat",
                })}>
                  {formatChange(stock.changeRate)}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
