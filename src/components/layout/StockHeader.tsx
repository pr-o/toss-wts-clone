"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Heart, Star, LayoutPanelLeft } from "lucide-react";
import { usePanelStore } from "@/stores/panelStore";
import { useWatchlistStore } from "@/stores/watchlistStore";
import { cn, formatChange, formatPrice, getPriceDirection } from "@/lib/utils";
import type { Stock } from "@/types/stock";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

async function fetchStock(symbol: string): Promise<Stock> {
  const res = await fetch(`/api/stocks/${symbol}`);
  return res.json();
}

const DETAIL_TABS = [
  { id: "chart",     label: "차트·호가" },
  { id: "info",      label: "종목정보" },
  { id: "news",      label: "뉴스·공시" },
  { id: "trades",    label: "거래현황" },
  { id: "community", label: "커뮤니티" },
] as const;

type DetailTabId = (typeof DETAIL_TABS)[number]["id"];

export function StockHeader({ symbol: symbolProp }: { symbol?: string }) {
  const activeSymbol = usePanelStore((s) => s.activeSymbol);
  const symbol = symbolProp ?? activeSymbol;
  const { has, add, remove } = useWatchlistStore();
  const [activeTab, setActiveTab] = useState<DetailTabId>("chart");
  const isWatched = has(symbol);

  const { data: stock } = useQuery({
    queryKey: ["stock", symbol],
    queryFn: () => fetchStock(symbol),
    refetchInterval: 5_000,
  });

  if (!stock) return <div className="h-[88px] shrink-0 border-b border-[var(--tds-border-default)]" />;

  const dir = getPriceDirection(stock.changeRate);
  const changeColor = {
    "text-[var(--tds-text-rise)]": dir === "rise",
    "text-[var(--tds-text-fall)]": dir === "fall",
    "text-[var(--tds-text-tertiary)]": dir === "flat",
  };

  const stats = [
    { label: "1일 최고", value: formatPrice(stock.high) },
    { label: "1일 최저", value: formatPrice(stock.low) },
    { label: "52주 최고", value: formatPrice(Math.round(stock.high * 1.35)) },
    { label: "52주 최저", value: formatPrice(Math.round(stock.low * 0.65)) },
  ];

  return (
    <div className="shrink-0 border-b border-[var(--tds-border-default)] bg-[var(--tds-surface-base)]">
      {/* Top row: symbol info + stats + actions */}
      <div className="flex items-start justify-between px-4 pt-3 pb-2">
        {/* Left: name + price */}
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Badge
              variant="secondary"
              className="rounded bg-[var(--tds-surface-overlay)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--tds-text-secondary)]"
            >
              {stock.market}
            </Badge>
            <span className="text-sm font-semibold text-[var(--tds-text-primary)]">{stock.name}</span>
            <span className="text-xs text-[var(--tds-text-tertiary)]">{stock.symbol}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold tabular-nums text-[var(--tds-text-primary)]">
              {formatPrice(stock.price)}
              <span className="text-sm font-normal text-[var(--tds-text-tertiary)]">원</span>
            </span>
            <span className={cn("text-xs tabular-nums", changeColor)}>
              어제보다 {stock.change > 0 ? "+" : ""}{formatPrice(stock.change)}원 ({Math.abs(stock.changeRate).toFixed(2)}%)
            </span>
          </div>
        </div>

        {/* Right: stats + action icons */}
        <div className="flex items-start gap-4">
          {/* 1일/52주 stats */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-right text-[11px]">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center justify-end gap-1.5">
                <span className="text-[var(--tds-text-tertiary)]">{s.label}</span>
                <span className="tabular-nums font-medium text-[var(--tds-text-primary)]">{s.value}</span>
              </div>
            ))}
          </div>
          {/* Watchlist + heart */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => isWatched ? remove(symbol) : add(symbol)}
              className={cn(
                "rounded-full transition-colors hover:bg-[var(--tds-surface-overlay)]",
                isWatched ? "text-yellow-400" : "text-[var(--tds-text-tertiary)]"
              )}
            >
              <Star size={15} fill={isWatched ? "currentColor" : "none"} />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              className="rounded-full text-[var(--tds-text-tertiary)] hover:bg-[var(--tds-surface-overlay)]"
            >
              <Heart size={15} />
            </Button>
          </div>
        </div>
      </div>

      {/* Tab row */}
      <div className="flex items-center justify-between border-t border-[var(--tds-border-default)] px-4">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as DetailTabId)}>
          <TabsList
            variant="line"
            className="h-auto gap-0 rounded-none bg-transparent p-0"
          >
            {DETAIL_TABS.map(({ id, label }) => (
              <TabsTrigger
                key={id}
                value={id}
                className="relative h-auto rounded-none px-3 py-2 text-xs transition-colors data-active:font-semibold data-active:text-[var(--tds-text-primary)] data-active:shadow-none data-active:bg-transparent after:bg-[var(--tds-text-primary)]"
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 text-[11px] text-[var(--tds-text-tertiary)] hover:bg-[var(--tds-surface-overlay)] hover:text-[var(--tds-text-secondary)]"
        >
          <LayoutPanelLeft size={12} />
          <span>화면 편집</span>
        </Button>
      </div>
    </div>
  );
}
