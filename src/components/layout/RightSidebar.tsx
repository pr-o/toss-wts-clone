"use client";

import { useQuery } from "@tanstack/react-query";
import { Star, Clock, BarChart2, ChevronDown, ChevronRight, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useWatchlistStore } from "@/stores/watchlistStore";
import { usePanelStore } from "@/stores/panelStore";
import { formatChange, formatPrice, getPriceDirection, cn } from "@/lib/utils";
import type { Stock } from "@/types/stock";

async function fetchStocks(): Promise<Stock[]> {
  const res = await fetch("/api/stocks");
  return res.json();
}

const INVEST_TABS = [
  { id: "watchlist", label: "관심",   icon: Star },
  { id: "recent",    label: "최근 본", icon: Clock },
  { id: "realtime",  label: "실시간",  icon: BarChart2 },
] as const;

type InvestTabId = (typeof INVEST_TABS)[number]["id"];

export function RightSidebar() {
  const { symbols } = useWatchlistStore();
  const setActiveSymbol = usePanelStore((s) => s.setActiveSymbol);
  const { data: stocks = [] } = useQuery({ queryKey: ["stocks"], queryFn: fetchStocks });
  const [investTab, setInvestTab] = useState<InvestTabId>("watchlist");
  const [investOpen, setInvestOpen] = useState(true);

  const watchlistStocks = stocks.filter((s) => symbols.includes(s.symbol));

  return (
    <aside className="flex w-[220px] shrink-0 flex-col border-l border-[var(--tds-border-default)] bg-[var(--tds-surface-sidebar)] text-xs">

      {/* ── 기본계좌 header ────────────────────────────── */}
      <div className="border-b border-[var(--tds-border-default)] px-3 pt-3 pb-2">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-[var(--tds-text-primary)]">기본계좌</span>
          <div className="flex items-center gap-1 text-[var(--tds-text-tertiary)]">
            <button className="rounded p-0.5 hover:bg-[var(--tds-surface-overlay)]"><MoreHorizontal size={12} /></button>
            <button className="rounded p-0.5 hover:bg-[var(--tds-surface-overlay)]"><ChevronRight size={12} /></button>
          </div>
        </div>

        {/* 원화 / 달러 balance */}
        <div className="flex gap-3">
          <div className="flex-1">
            <div className="mb-0.5 text-[10px] text-[var(--tds-text-tertiary)]">원화</div>
            <div className="font-semibold tabular-nums text-[var(--tds-text-primary)]">0원</div>
          </div>
          <div className="w-px bg-[var(--tds-border-default)]" />
          <div className="flex-1">
            <div className="mb-0.5 text-[10px] text-[var(--tds-text-tertiary)]">달러</div>
            <div className="font-semibold tabular-nums text-[var(--tds-text-primary)]">$0.00</div>
          </div>
        </div>
      </div>

      {/* ── 내 투자 section ───────────────────────────── */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Section header */}
        <div className="flex items-center justify-between border-b border-[var(--tds-border-default)] px-3 py-2">
          <span className="text-[11px] font-semibold text-[var(--tds-text-primary)]">내 투자</span>
          <button
            onClick={() => setInvestOpen((o) => !o)}
            className="text-[var(--tds-text-tertiary)] hover:text-[var(--tds-text-secondary)]"
          >
            <ChevronDown
              size={13}
              className={cn("transition-transform", investOpen ? "" : "-rotate-90")}
            />
          </button>
        </div>

        {investOpen && (
          <>
            {/* Sub-tabs: 관심 / 최근 본 / 실시간 */}
            <div className="flex border-b border-[var(--tds-border-default)]">
              {INVEST_TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setInvestTab(id)}
                  className={cn(
                    "flex flex-1 flex-col items-center gap-0.5 py-2 transition-colors",
                    investTab === id
                      ? "text-[var(--tds-text-brand)]"
                      : "text-[var(--tds-text-tertiary)] hover:text-[var(--tds-text-secondary)]"
                  )}
                >
                  <Icon size={13} />
                  <span className="text-[10px]">{label}</span>
                  {investTab === id && (
                    <span className="absolute h-[2px] w-8 rounded-full bg-[var(--tds-text-brand)]" />
                  )}
                </button>
              ))}
            </div>

            {/* Stock list */}
            <div className="flex-1 overflow-y-auto">
              {investTab === "watchlist" && watchlistStocks.map((stock) => {
                const dir = getPriceDirection(stock.changeRate);
                return (
                  <button
                    key={stock.symbol}
                    onClick={() => setActiveSymbol(stock.symbol)}
                    className="flex w-full items-center justify-between px-3 py-2.5 text-left transition-colors hover:bg-[var(--tds-surface-overlay)]"
                  >
                    <div className="min-w-0">
                      <div className="truncate font-medium text-[var(--tds-text-primary)]">{stock.name}</div>
                      <div className="text-[10px] text-[var(--tds-text-tertiary)]">{stock.symbol}</div>
                    </div>
                    <div className="ml-2 shrink-0 text-right">
                      <div className="tabular-nums text-[var(--tds-text-primary)]">
                        {formatPrice(stock.price)}
                      </div>
                      <div className={cn("tabular-nums", {
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
              {investTab === "recent" && (
                <div className="px-3 py-6 text-center text-[10px] text-[var(--tds-text-tertiary)]">최근 본 종목이 없어요</div>
              )}
              {investTab === "realtime" && (
                <div className="px-3 py-6 text-center text-[10px] text-[var(--tds-text-tertiary)]">실시간 종목이 없어요</div>
              )}
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
