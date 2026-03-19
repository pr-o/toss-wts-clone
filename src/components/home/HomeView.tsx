"use client";

import { useState } from "react";
import { StockRankList } from "./StockRankList";
import { MarketDataStrip } from "./MarketDataStrip";
import { StockPreviewCard } from "./StockPreviewCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const VIEW_TABS   = ["실시간 차트", "지금 뜨는 카테고리", "국내 투자자 동향"] as const;
const MARKET_TABS = ["전체", "국내", "해외"] as const;
const SORT_TABS   = ["토스증권 거래대금", "토스증권 거래량", "거래대금", "거래량", "급상승", "급하락"] as const;
const TIME_TABS   = ["실시간", "1일", "1주일", "1개월", "3개월", "6개월", "1년"] as const;

export function HomeView() {
  const [viewTab,   setViewTab]   = useState<string>("실시간 차트");
  const [marketTab, setMarketTab] = useState<string>("전체");
  const [sortTab,   setSortTab]   = useState<string>("토스증권 거래대금");
  const [timeTab,   setTimeTab]   = useState<string>("실시간");
  const [hideRisky, setHideRisky] = useState(false);
  const [focusedSymbol, setFocusedSymbol] = useState<string>("000660");

  return (
    <div className="flex flex-1 flex-col overflow-hidden">

      {/* ── Full-width: market type tabs + strip ── */}
      <div className="flex shrink-0 items-center gap-1 border-b border-[var(--tds-border-default)] px-4 pt-2">
        {(["국내 정규장", "해외 데이터마켓"] as const).map((tab) => (
          <button key={tab}
            className={`flex items-center gap-1 px-0 pb-2 text-xs mr-4 border-b-2 transition-colors ${tab === "국내 정규장" ? "border-[var(--tds-text-primary)] font-semibold text-[var(--tds-text-primary)]" : "border-transparent text-[var(--tds-text-tertiary)] hover:text-[var(--tds-text-secondary)]"}`}>
            {tab === "국내 정규장" && <span className="h-1.5 w-1.5 rounded-full bg-[var(--tds-text-rise)]" />}
            {tab}
          </button>
        ))}
      </div>

      {/* Market data strip — spans full width to the sidebar */}
      <MarketDataStrip />

      {/* ── Body: stock list (left) + community area (right) ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Stock list column */}
        <div className="flex w-[820px] shrink-0 flex-col overflow-hidden border-r border-[var(--tds-border-default)]">

          {/* View tabs */}
          <div className="shrink-0 border-b border-[var(--tds-border-default)] px-4 py-2">
            <Tabs value={viewTab} onValueChange={setViewTab}>
              <TabsList className="h-auto gap-0 rounded-lg bg-[var(--tds-surface-overlay)] p-0.5">
                {VIEW_TABS.map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="rounded-md px-2 py-1 text-[11px] text-[var(--tds-text-tertiary)] data-active:bg-[var(--tds-surface-base)] data-active:font-medium data-active:text-[var(--tds-text-primary)] data-active:shadow-sm"
                  >{tab}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Filter chip row — only shown for the stock list view */}
          <div className={`flex shrink-0 items-center gap-1 overflow-x-auto border-b border-[var(--tds-border-default)] px-4 py-1.5 scrollbar-none ${viewTab !== "실시간 차트" ? "hidden" : ""}`}>

            {/* Market tabs — segmented control */}
            <Tabs value={marketTab} onValueChange={setMarketTab} className="shrink-0 flex-row gap-0 mr-2">
              <TabsList className="h-auto gap-0 rounded-lg bg-[var(--tds-surface-overlay)] p-0.5">
                {MARKET_TABS.map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="rounded-md px-2 py-1 text-[11px] text-[var(--tds-text-tertiary)] data-active:bg-[var(--tds-surface-base)] data-active:font-medium data-active:text-[var(--tds-text-primary)] data-active:shadow-sm"
                  >{tab}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Sort tabs */}
            <Tabs value={sortTab} onValueChange={setSortTab} className="shrink-0 flex-row gap-0">
              <TabsList className="h-auto gap-0 rounded-lg bg-[var(--tds-surface-overlay)] p-0.5">
                {SORT_TABS.map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="rounded-md px-2 py-1 text-[11px] text-[var(--tds-text-tertiary)] data-active:bg-[var(--tds-surface-base)] data-active:font-medium data-active:text-[var(--tds-text-primary)] data-active:shadow-sm"
                  >{tab}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="mx-1 h-3 w-px shrink-0 bg-[var(--tds-border-default)]" />

            {/* Time tabs */}
            <Tabs value={timeTab} onValueChange={setTimeTab} className="shrink-0 flex-row gap-0">
              <TabsList className="h-auto gap-0 rounded-lg bg-[var(--tds-surface-overlay)] p-0.5">
                {TIME_TABS.map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="rounded-md px-2 py-1 text-[11px] text-[var(--tds-text-tertiary)] data-active:bg-[var(--tds-surface-base)] data-active:font-medium data-active:text-[var(--tds-text-primary)] data-active:shadow-sm"
                  >{tab}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="mx-1 h-3 w-px shrink-0 bg-[var(--tds-border-default)]" />
            <button onClick={() => setHideRisky(!hideRisky)}
              className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] transition-colors ${hideRisky ? "bg-[var(--tds-text-brand)] text-white" : "bg-[var(--tds-surface-overlay)] text-[var(--tds-text-secondary)]"}`}>
              <span className={`h-2 w-2 rounded-full ${hideRisky ? "bg-white" : "bg-[var(--tds-text-brand)]"}`} />
              투자위험 주식 숨기기
            </button>
          </div>

          {viewTab === "실시간 차트" ? (
            <StockRankList
              onFocus={setFocusedSymbol}
              focusedSymbol={focusedSymbol}
              marketFilter={marketTab}
              sortBy={sortTab}
              timeFrame={timeTab}
            />
          ) : (
            <div className="flex flex-1 items-center justify-center text-sm text-[var(--tds-text-tertiary)]">
              {viewTab}
            </div>
          )}
        </div>

        {/* Stock preview + community column */}
        <div className="flex flex-1 flex-col overflow-y-auto bg-[var(--tds-surface-base)]">
          <StockPreviewCard symbol={focusedSymbol} />
        </div>

      </div>
    </div>
  );
}
