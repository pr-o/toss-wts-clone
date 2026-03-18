"use client";

import { useState } from "react";
import { StockRankList } from "./StockRankList";
import { MarketDataStrip } from "./MarketDataStrip";

const VIEW_TABS = ["실시간 차트", "지금 뜨는 카테고리", "국내 투자자 동향"] as const;
const MARKET_TABS = ["전체", "국내", "해외"] as const;
const SORT_TABS  = ["토스증권 거래대금", "토스증권 거래량", "거래대금", "거래량", "급상승", "급하락"] as const;
const TIME_TABS  = ["실시간", "1일", "1주일", "1개월", "3개월", "6개월", "1년"] as const;

export function HomeView() {
  const [viewTab,   setViewTab]   = useState<string>("실시간 차트");
  const [marketTab, setMarketTab] = useState<string>("전체");
  const [sortTab,   setSortTab]   = useState<string>("토스증권 거래대금");
  const [timeTab,   setTimeTab]   = useState<string>("실시간");
  const [hideRisky, setHideRisky] = useState(false);
  const [focusedSymbol, setFocusedSymbol] = useState<string>("000660");

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* ── Main: market data + stock list ── */}
      <div className="flex w-full max-w-4xl flex-col overflow-hidden">

        {/* Market type tabs */}
        <div className="flex shrink-0 items-center gap-1 border-b border-[var(--tds-border-default)] px-4 pt-2">
          {(["국내 정규장", "해외 데이터마켓"] as const).map((tab) => (
            <button key={tab}
              className={`flex items-center gap-1 px-0 pb-2 text-xs mr-4 border-b-2 transition-colors ${tab === "국내 정규장" ? "border-[var(--tds-text-primary)] font-semibold text-[var(--tds-text-primary)]" : "border-transparent text-[var(--tds-text-tertiary)] hover:text-[var(--tds-text-secondary)]"}`}>
              {tab === "국내 정규장" && <span className="h-1.5 w-1.5 rounded-full bg-[var(--tds-text-rise)]" />}
              {tab}
            </button>
          ))}
        </div>

        {/* Market data strip */}
        <MarketDataStrip />

        {/* View tabs */}
        <div className="flex shrink-0 border-b border-[var(--tds-border-default)] px-4">
          {VIEW_TABS.map((tab) => (
            <button key={tab} onClick={() => setViewTab(tab)}
              className={`relative mr-4 pb-2 pt-2 text-xs transition-colors ${viewTab === tab ? "font-semibold text-[var(--tds-text-primary)]" : "text-[var(--tds-text-tertiary)] hover:text-[var(--tds-text-secondary)]"}`}>
              {tab}
              {viewTab === tab && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--tds-text-primary)]" />}
            </button>
          ))}
        </div>

        {/* Filter chip row */}
        <div className="flex shrink-0 items-center gap-1 overflow-x-auto border-b border-[var(--tds-border-default)] px-4 py-1.5 scrollbar-none">
          {/* Market filter */}
          <div className="flex shrink-0 gap-0.5 rounded-lg bg-[var(--tds-surface-overlay)] p-0.5 mr-2">
            {MARKET_TABS.map((tab) => (
              <button key={tab} onClick={() => setMarketTab(tab)}
                className={`rounded-md px-2 py-1 text-[11px] transition-colors ${marketTab === tab ? "bg-[var(--tds-surface-base)] font-medium text-[var(--tds-text-primary)] shadow-sm" : "text-[var(--tds-text-tertiary)]"}`}>
                {tab}
              </button>
            ))}
          </div>
          {/* Sort filter */}
          {SORT_TABS.map((tab) => (
            <button key={tab} onClick={() => setSortTab(tab)}
              className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] transition-colors ${sortTab === tab ? "bg-[var(--tds-fill-brand)] text-white" : "bg-[var(--tds-surface-overlay)] text-[var(--tds-text-secondary)] hover:bg-[var(--tds-surface-elevated)]"}`}>
              {tab}
            </button>
          ))}
          {/* Time filter */}
          <div className="mx-1 h-3 w-px bg-[var(--tds-border-default)] shrink-0" />
          {TIME_TABS.map((tab) => (
            <button key={tab} onClick={() => setTimeTab(tab)}
              className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] transition-colors ${timeTab === tab ? "bg-[var(--tds-fill-brand)] text-white" : "bg-[var(--tds-surface-overlay)] text-[var(--tds-text-secondary)] hover:bg-[var(--tds-surface-elevated)]"}`}>
              {tab}
            </button>
          ))}
          {/* Risky toggle */}
          <button onClick={() => setHideRisky(!hideRisky)}
            className={`ml-2 shrink-0 flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] transition-colors ${hideRisky ? "bg-[var(--tds-text-brand)] text-white" : "bg-[var(--tds-surface-overlay)] text-[var(--tds-text-secondary)]"}`}>
            <span className={`h-2 w-2 rounded-full ${hideRisky ? "bg-white" : "bg-[var(--tds-text-brand)]"}`} />
            투자위험 주식 숨기기
          </button>
        </div>

        {/* Stock ranking list */}
        <StockRankList onFocus={setFocusedSymbol} focusedSymbol={focusedSymbol} />
      </div>
    </div>
  );
}
