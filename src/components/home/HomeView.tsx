"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import type { MarketStatusResponse } from "@/mocks/handlers/marketStatus";
import { StockRankList } from "./StockRankList";
import { MarketDataStrip } from "./MarketDataStrip";
import { StockPreviewCard } from "./StockPreviewCard";
import { TrendingCategoriesView } from "./TrendingCategoriesView";
import { InvestorTrendView } from "./InvestorTrendView";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const VIEW_TABS = [
  "실시간 차트",
  "지금 뜨는 카테고리",
  "국내 투자자 동향",
] as const;

const VIEW_TO_PARAM: Record<string, string> = {
  "실시간 차트": "realtime_chart",
  "지금 뜨는 카테고리": "trending_category",
  "국내 투자자 동향": "domestic_investor_trend",
};
const PARAM_TO_VIEW: Record<string, string> = {
  realtime_chart: "실시간 차트",
  trending_category: "지금 뜨는 카테고리",
  domestic_investor_trend: "국내 투자자 동향",
};
const MARKET_TABS = ["전체", "국내", "해외"] as const;
const SORT_TABS = [
  "토스증권 거래대금",
  "토스증권 거래량",
  "거래대금",
  "거래량",
  "급상승",
  "급하락",
] as const;
const TIME_TABS = [
  "실시간",
  "1일",
  "1주일",
  "1개월",
  "3개월",
  "6개월",
  "1년",
] as const;

export function HomeView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const viewTab =
    PARAM_TO_VIEW[searchParams.get("ranking-type") ?? ""] ?? "실시간 차트";
  const setViewTab = (tab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const param = VIEW_TO_PARAM[tab];
    if (param === "realtime_chart") params.delete("ranking-type");
    else params.set("ranking-type", param);
    router.replace(`?${params.toString()}`);
  };
  const [marketTab, setMarketTab] = useState<string>("전체");
  const [sortTab, setSortTab] = useState<string>("토스증권 거래대금");
  const [timeTab, setTimeTab] = useState<string>("실시간");
  const [hideRisky, setHideRisky] = useState(false);
  const [focusedSymbol, setFocusedSymbol] = useState<string>("000660");

  const { data: marketStatus } = useQuery<MarketStatusResponse>({
    queryKey: ["market-status"],
    queryFn: () => fetch("/api/market-status").then((r) => r.json()),
    refetchInterval: 60_000,
  });

  return (
    <div className="flex flex-col">
      {/* ── Market session indicators ── */}
      <div className="flex shrink-0 items-center gap-5 border-b border-[var(--tds-border-default)] px-4 py-2">
        {[marketStatus?.domestic, marketStatus?.overseas].map((session, i) => {
          if (!session) return (
            <div key={i} className="h-3 w-24 animate-pulse rounded bg-[var(--tds-surface-overlay)]" />
          );
          return (
            <span key={i} className="flex items-center gap-1.5 text-xs text-[var(--tds-text-secondary)]">
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  session.isOpen ? "bg-[var(--tds-text-rise)]" : "bg-[var(--tds-text-tertiary)]"
                )}
              />
              {session.label}
            </span>
          );
        })}
      </div>

      {/* Market data strip — spans full width to the sidebar */}
      <MarketDataStrip />

      {/* ── Body: stock list (left) + community area (right) ── */}
      <div className="flex flex-1">
        {/* Stock list column */}
        <div className={cn(
          "flex flex-col border-r border-[var(--tds-border-default)]",
          viewTab === "실시간 차트" ? "w-[960px] shrink-0" : "flex-1",
        )}>
          {/* Sticky controls: view tabs + filter chips + column headers */}
          <div className="sticky top-11 z-30 bg-[var(--tds-surface-base)]">
          {/* View tabs */}
          <div className="border-b border-[var(--tds-border-default)] px-4 py-2">
            <Tabs value={viewTab} onValueChange={setViewTab}>
              <TabsList className="h-auto gap-0 rounded-lg bg-[var(--tds-surface-overlay)] p-0.5">
                {VIEW_TABS.map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="rounded-md px-2 py-1 text-[11px] text-[var(--tds-text-tertiary)] data-active:bg-[var(--tds-surface-base)] data-active:font-medium data-active:text-[var(--tds-text-primary)] data-active:shadow-sm"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Filter chip row — only shown for the stock list view */}
          <div
            className={`flex shrink-0 items-center gap-1 overflow-x-auto border-b border-[var(--tds-border-default)] px-4 py-1.5 scrollbar-none ${viewTab !== "실시간 차트" ? "invisible h-0 overflow-hidden py-0" : ""}`}
          >
            {/* Market tabs — segmented control */}
            <Tabs
              value={marketTab}
              onValueChange={setMarketTab}
              className="shrink-0 flex-row gap-0 mr-2"
            >
              <TabsList className="h-auto gap-0 rounded-lg bg-[var(--tds-surface-overlay)] p-0.5">
                {MARKET_TABS.map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="rounded-md px-2 py-1 text-[11px] text-[var(--tds-text-tertiary)] data-active:bg-[var(--tds-surface-base)] data-active:font-medium data-active:text-[var(--tds-text-primary)] data-active:shadow-sm"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Sort tabs */}
            <Tabs
              value={sortTab}
              onValueChange={setSortTab}
              className="shrink-0 flex-row gap-0"
            >
              <TabsList className="h-auto gap-0 rounded-lg bg-[var(--tds-surface-overlay)] p-0.5">
                {SORT_TABS.map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="rounded-md px-2 py-1 text-[11px] text-[var(--tds-text-tertiary)] data-active:bg-[var(--tds-surface-base)] data-active:font-medium data-active:text-[var(--tds-text-primary)] data-active:shadow-sm"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <Separator orientation="vertical" className="mx-1 h-3 bg-[var(--tds-border-default)]" />

            {/* Time tabs */}
            <Tabs
              value={timeTab}
              onValueChange={setTimeTab}
              className="shrink-0 flex-row gap-0"
            >
              <TabsList className="h-auto gap-0 rounded-lg bg-[var(--tds-surface-overlay)] p-0.5">
                {TIME_TABS.map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="rounded-md px-2 py-1 text-[11px] text-[var(--tds-text-tertiary)] data-active:bg-[var(--tds-surface-base)] data-active:font-medium data-active:text-[var(--tds-text-primary)] data-active:shadow-sm"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <Separator orientation="vertical" className="mx-1 h-3 bg-[var(--tds-border-default)]" />
            <Button
              size="xs"
              onClick={() => setHideRisky(!hideRisky)}
              className={cn(
                `shrink-0 gap-1 rounded-full px-2.5 py-1 text-[11px] transition-colors`,
                hideRisky
                  ? "bg-[var(--tds-text-brand)] text-white hover:bg-[var(--tds-text-brand)]"
                  : "bg-[var(--tds-surface-overlay)] text-[var(--tds-text-secondary)] hover:bg-[var(--tds-surface-overlay)]"
              )}
            >
              <span
                className={`h-2 w-2 rounded-full ${hideRisky ? "bg-white" : "bg-[var(--tds-text-brand)]"}`}
              />
              투자위험 주식 숨기기
            </Button>
          </div>

          {/* Column headers — sticky with the controls, only for 실시간 차트 */}
          {viewTab === "실시간 차트" && (
            <div className="grid grid-cols-[32px_28px_36px_1fr_100px_86px_70px_120px] items-center gap-2 border-b border-[var(--tds-border-default)] px-3 py-1.5 text-[12px] text-[var(--tds-text-tertiary)]">
              <span />
              <span>순위</span>
              <span />
              <span>종목명</span>
              <span className="text-right">현재가</span>
              <span className="text-right">
                {timeTab === "실시간" || timeTab === "1일" ? "등락률" : `${timeTab} 수익률`}
              </span>
              <span className="text-right">거래대금 순</span>
              <span className="text-center">토스증권 거래 비율 ⓘ</span>
            </div>
          )}
          </div>{/* end sticky controls */}

          {viewTab === "실시간 차트" ? (
            <StockRankList
              onFocus={setFocusedSymbol}
              focusedSymbol={focusedSymbol}
              marketFilter={marketTab}
              sortBy={sortTab}
              timeFrame={timeTab}
            />
          ) : viewTab === "지금 뜨는 카테고리" ? (
            <TrendingCategoriesView />
          ) : (
            <InvestorTrendView />
          )}
        </div>

        {viewTab === "실시간 차트" && (
          <div className="sticky top-11 self-start flex-1 h-[calc(100vh-44px-28px)] overflow-y-auto bg-[var(--tds-surface-base)]">
            <StockPreviewCard symbol={focusedSymbol} />
          </div>
        )}
      </div>
    </div>
  );
}
