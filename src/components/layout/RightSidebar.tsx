"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  TrendingUp, Heart, Clock, Activity,
  MessageSquare, LayoutPanelLeft, Settings,
  ChevronDown, ChevronRight, MoreHorizontal,
} from "lucide-react";
import { useWatchlistStore } from "@/stores/watchlistStore";
import { usePanelStore } from "@/stores/panelStore";
import { formatChange, formatPrice, getPriceDirection, cn } from "@/lib/utils";
import type { Stock } from "@/types/stock";

async function fetchStocks(): Promise<Stock[]> {
  const res = await fetch("/api/stocks");
  return res.json();
}

/* ── outer nav items ──────────────────────────────────────────── */
const MAIN_NAV = [
  { id: "my-invest", label: "내 투자",  icon: TrendingUp },
  { id: "watchlist", label: "관심",     icon: Heart },
  { id: "recent",    label: "최근 본",  icon: Clock },
  { id: "realtime",  label: "실시간",   icon: Activity },
] as const;

const UTIL_NAV = [
  { id: "opinion", label: "의견",    icon: MessageSquare },
  { id: "layout",  label: "화면 편집", icon: LayoutPanelLeft },
  { id: "setting", label: "설정",    icon: Settings },
] as const;

type MainNavId = (typeof MAIN_NAV)[number]["id"];

const ORDER_TABS = ["대기", "완료", "조건주문"] as const;
type OrderTab = (typeof ORDER_TABS)[number];

/* ── inner panels ─────────────────────────────────────────────── */

function MyInvestPanel() {
  const [investOpen, setInvestOpen] = useState(true);
  const [orderOpen,  setOrderOpen]  = useState(true);
  const [orderTab,   setOrderTab]   = useState<OrderTab>("대기");

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* 기본계좌 */}
      <div className="shrink-0 border-b border-[var(--tds-border-default)] px-3 pt-3 pb-2">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-[var(--tds-text-primary)]">기본계좌</span>
          <div className="flex items-center gap-0.5 text-[var(--tds-text-tertiary)]">
            <button className="rounded p-0.5 hover:bg-[var(--tds-surface-overlay)]"><MoreHorizontal size={12} /></button>
            <button className="rounded p-0.5 hover:bg-[var(--tds-surface-overlay)]"><ChevronRight size={12} /></button>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 rounded-lg bg-[var(--tds-surface-overlay)] px-2 py-1.5">
            <div className="mb-0.5 text-[10px] text-[var(--tds-text-tertiary)]">원화</div>
            <div className="font-semibold tabular-nums text-[var(--tds-text-primary)]">0원</div>
          </div>
          <div className="flex-1 rounded-lg bg-[var(--tds-surface-overlay)] px-2 py-1.5">
            <div className="mb-0.5 text-[10px] text-[var(--tds-text-tertiary)]">달러</div>
            <div className="font-semibold tabular-nums text-[var(--tds-text-primary)]">$0.00</div>
          </div>
        </div>
      </div>

      {/* 내 투자 */}
      <div className="flex flex-1 flex-col overflow-hidden border-b border-[var(--tds-border-default)]">
        <button
          onClick={() => setInvestOpen((o) => !o)}
          className="flex shrink-0 items-center justify-between px-3 py-2 hover:bg-[var(--tds-surface-overlay)]"
        >
          <span className="text-[11px] font-semibold text-[var(--tds-text-primary)]">내 투자</span>
          <ChevronDown size={13} className={cn("text-[var(--tds-text-tertiary)] transition-transform", investOpen ? "" : "-rotate-90")} />
        </button>
        {investOpen && (
          <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-3 py-6 text-center">
            <div className="mb-2 h-12 w-12 rounded-xl bg-[var(--tds-surface-overlay)]" />
            <span className="text-[11px] text-[var(--tds-text-tertiary)]">보유 종목이 없어요</span>
          </div>
        )}
      </div>

      {/* 주문내역 */}
      <div className="shrink-0">
        <button
          onClick={() => setOrderOpen((o) => !o)}
          className="flex w-full items-center justify-between px-3 py-2 hover:bg-[var(--tds-surface-overlay)]"
        >
          <span className="text-[11px] font-semibold text-[var(--tds-text-primary)]">주문내역</span>
          <ChevronDown size={13} className={cn("text-[var(--tds-text-tertiary)] transition-transform", orderOpen ? "" : "-rotate-90")} />
        </button>
        {orderOpen && (
          <>
            <div className="flex gap-1.5 border-t border-[var(--tds-border-default)] px-3 py-2">
              {ORDER_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setOrderTab(tab)}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[10px] transition-colors",
                    orderTab === tab
                      ? "bg-[var(--tds-surface-overlay)] font-semibold text-[var(--tds-text-primary)]"
                      : "text-[var(--tds-text-tertiary)] hover:text-[var(--tds-text-secondary)]"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 px-3 pb-4 pt-1 text-[11px] text-[var(--tds-text-tertiary)]">
              <div className="h-6 w-6 rounded-full bg-[var(--tds-surface-overlay)]" />
              {orderTab === "대기" && "대기중인 주문이 없어요"}
              {orderTab === "완료" && "완료된 주문이 없어요"}
              {orderTab === "조건주문" && "조건주문이 없어요"}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function WatchlistPanel() {
  const { symbols } = useWatchlistStore();
  const setActiveSymbol = usePanelStore((s) => s.setActiveSymbol);
  const { data: stocks = [] } = useQuery({ queryKey: ["stocks"], queryFn: fetchStocks, refetchInterval: 5_000 });
  const watchlistStocks = stocks.filter((s) => symbols.includes(s.symbol));

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="shrink-0 border-b border-[var(--tds-border-default)] px-3 py-2">
        <span className="text-[11px] font-semibold text-[var(--tds-text-primary)]">관심종목</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        {watchlistStocks.length === 0 ? (
          <div className="flex h-full items-center justify-center px-3 text-center text-[11px] text-[var(--tds-text-tertiary)]">
            관심 종목을 추가해보세요
          </div>
        ) : (
          watchlistStocks.map((stock) => {
            const dir = getPriceDirection(stock.changeRate);
            return (
              <button
                key={stock.symbol}
                onClick={() => setActiveSymbol(stock.symbol)}
                className="flex w-full items-center justify-between px-3 py-2.5 text-left transition-colors hover:bg-[var(--tds-surface-overlay)]"
              >
                <div className="min-w-0">
                  <div className="truncate text-[12px] font-semibold text-[var(--tds-text-primary)]">{stock.name}</div>
                  <div className="text-[10px] text-[var(--tds-text-tertiary)]">{stock.symbol}</div>
                </div>
                <div className="ml-2 shrink-0 text-right">
                  <div className="tabular-nums text-[12px] text-[var(--tds-text-primary)]">{formatPrice(stock.price)}</div>
                  <div className={cn("tabular-nums text-[11px]", {
                    "text-[var(--tds-text-rise)]": dir === "rise",
                    "text-[var(--tds-text-fall)]": dir === "fall",
                    "text-[var(--tds-text-tertiary)]": dir === "flat",
                  })}>
                    {formatChange(stock.changeRate)}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

function EmptyPanel({ label }: { label: string }) {
  return (
    <div className="flex h-full items-center justify-center text-[11px] text-[var(--tds-text-tertiary)]">
      {label}
    </div>
  );
}

/* ── main component ───────────────────────────────────────────── */

export function RightSidebar() {
  const [activeId, setActiveId] = useState<MainNavId>("my-invest");

  return (
    <div className="flex h-full shrink-0 border-l border-[var(--tds-border-default)] text-xs">

      {/* Inner content panel */}
      <div className="flex w-[220px] flex-col overflow-hidden bg-[var(--tds-surface-sidebar)]">
        {activeId === "my-invest" && <MyInvestPanel />}
        {activeId === "watchlist" && <WatchlistPanel />}
        {activeId === "recent"    && <EmptyPanel label="최근 본 종목이 없어요" />}
        {activeId === "realtime"  && <EmptyPanel label="실시간 종목이 없어요" />}
      </div>

      {/* Outer nav rail */}
      <div className="flex w-12 shrink-0 flex-col items-center border-l border-[var(--tds-border-default)] bg-[var(--tds-surface-sidebar)] py-2">
        {/* Main nav buttons */}
        <div className="flex flex-col items-center gap-0.5">
          {MAIN_NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveId(id)}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-lg px-1 py-2 w-10 transition-colors",
                activeId === id
                  ? "text-[var(--tds-text-brand)]"
                  : "text-[var(--tds-text-tertiary)] hover:text-[var(--tds-text-secondary)] hover:bg-[var(--tds-surface-overlay)]"
              )}
            >
              <Icon size={16} />
              <span className="text-[9px] leading-none">{label}</span>
            </button>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Utility nav buttons */}
        <div className="flex flex-col items-center gap-0.5">
          {UTIL_NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className="flex flex-col items-center gap-0.5 rounded-lg px-1 py-2 w-10 text-[var(--tds-text-tertiary)] transition-colors hover:text-[var(--tds-text-secondary)] hover:bg-[var(--tds-surface-overlay)]"
            >
              <Icon size={16} />
              <span className="text-[9px] leading-none">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
