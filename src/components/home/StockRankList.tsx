"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { useWatchlistStore } from "@/stores/watchlistStore";
import { cn, formatChange, formatPrice, getPriceDirection } from "@/lib/utils";
import type { Stock } from "@/types/stock";

async function fetchStocks(): Promise<Stock[]> {
  const res = await fetch("/api/stocks");
  return res.json();
}

interface Props {
  focusedSymbol: string;
  onFocus: (symbol: string) => void;
}

function StockAvatar({ stock }: { stock: Stock }) {
  const bg = stock.avatarColor ?? "#6b7280";
  const label = stock.name.startsWith("KODEX")
    ? stock.name.includes("레버리지") ? "2x" : stock.name.includes("인버스2X") ? "2x" : "K"
    : stock.name[0];
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white" style={{ backgroundColor: bg }}>
      {label}
    </div>
  );
}

export function StockRankList({ focusedSymbol, onFocus }: Props) {
  const router = useRouter();
  const { has, add, remove } = useWatchlistStore();
  const { data: stocks = [] } = useQuery({ queryKey: ["stocks"], queryFn: fetchStocks, refetchInterval: 5_000 });

  const ranked = [...stocks]
    .filter((s) => s.rank !== undefined)
    .sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99));

  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Column headers */}
      <div className="grid shrink-0 grid-cols-[32px_28px_28px_1fr_100px_80px_70px_120px] items-center gap-1 border-b border-[var(--tds-border-default)] px-3 py-1.5 text-[10px] text-[var(--tds-text-tertiary)]">
        <span />
        <span />
        <span>순위</span>
        <span>종목명</span>
        <span className="text-right">현재가</span>
        <span className="text-right">등락률</span>
        <span className="text-right">거래대금 순</span>
        <span className="text-center">토스증권 거래 비율 ⓘ</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        {/* Time label */}
        <div className="px-3 py-1 text-[10px] text-[var(--tds-text-tertiary)]">
          순위 · 오늘 {timeStr} 기준
        </div>
        {ranked.map((stock) => {
          const dir = getPriceDirection(stock.changeRate);
          const watched = has(stock.symbol);
          const isFocused = stock.symbol === focusedSymbol;
          const buyRatio = stock.buyRatio ?? 50;
          return (
            <div
              key={stock.symbol}
              onClick={() => { onFocus(stock.symbol); }}
              onDoubleClick={() => router.push(`/stocks/${stock.symbol}/order`)}
              className={cn(
                "grid cursor-pointer grid-cols-[32px_28px_28px_1fr_100px_80px_70px_120px] items-center gap-1 px-3 py-2.5 text-xs transition-colors",
                isFocused ? "bg-[var(--tds-surface-overlay)]" : "hover:bg-[var(--tds-surface-elevated)]"
              )}
            >
              {/* Heart */}
              <button
                onClick={(e) => { e.stopPropagation(); watched ? remove(stock.symbol) : add(stock.symbol); }}
                className={cn("flex h-5 w-5 items-center justify-center rounded transition-colors",
                  watched ? "text-[var(--tds-text-rise)]" : "text-[var(--tds-border-strong)] hover:text-[var(--tds-text-secondary)]"
                )}
              >
                <Heart size={13} fill={watched ? "currentColor" : "none"} />
              </button>

              {/* Avatar */}
              <StockAvatar stock={stock} />

              {/* Rank */}
              <span className="font-medium text-[var(--tds-text-secondary)]">{stock.rank}</span>

              {/* Name */}
              <div className="min-w-0">
                <div className="truncate font-medium text-[var(--tds-text-primary)]">{stock.name}</div>
              </div>

              {/* Price */}
              <div className="text-right font-medium tabular-nums text-[var(--tds-text-primary)]">
                {formatPrice(stock.price)}원
              </div>

              {/* Change rate badge */}
              <div className="flex justify-end">
                <span className={cn(
                  "rounded px-1.5 py-0.5 text-[11px] font-medium tabular-nums",
                  dir === "rise" ? "bg-red-100 text-[var(--tds-text-rise)] dark:bg-red-950/40" :
                  dir === "fall" ? "bg-blue-100 text-[var(--tds-text-fall)] dark:bg-blue-950/40" :
                  "bg-[var(--tds-surface-overlay)] text-[var(--tds-text-tertiary)]"
                )}>
                  {stock.changeRate > 0 ? "+" : ""}{stock.changeRate.toFixed(2)}%
                </span>
              </div>

              {/* Trade volume */}
              <div className="text-right tabular-nums text-[var(--tds-text-secondary)]">
                {stock.tradeVolumeBillion ?? "–"}억원
              </div>

              {/* Buy/sell ratio bar */}
              <div className="flex items-center gap-1 text-[10px] tabular-nums">
                <span className="w-7 text-right text-[var(--tds-text-rise)]">{buyRatio}</span>
                <div className="flex flex-1 h-1.5 overflow-hidden rounded-full">
                  <div className="bg-[var(--tds-text-rise)] h-full transition-all" style={{ width: `${buyRatio}%` }} />
                  <div className="bg-[var(--tds-text-fall)] h-full flex-1" />
                </div>
                <span className="w-7 text-[var(--tds-text-fall)]">{100 - buyRatio}</span>
              </div>
            </div>
          );
        })}
        {/* Hint to double-click */}
        <div className="px-3 py-2 text-center text-[10px] text-[var(--tds-text-tertiary)]">
          종목을 더블클릭하면 상세 페이지로 이동해요
        </div>
      </div>
    </div>
  );
}
