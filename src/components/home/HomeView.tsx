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
import { Button } from "@/components/ui/button";
import { FilterTabs } from "./FilterTabs";
import {
  VIEW_REALTIME,
  VIEW_TRENDING,
  VIEW_INVESTOR,
  VIEW_TABS,
  MARKET_ALL,
  MARKET_TABS,
  SORT_TOSS_AMOUNT,
  SORT_TABS,
  TIME_REALTIME,
  TIME_TABS,
} from "./homeConstants";

const VIEW_TO_PARAM: Record<string, string> = {
  [VIEW_REALTIME]: "realtime_chart",
  [VIEW_TRENDING]: "trending_category",
  [VIEW_INVESTOR]: "domestic_investor_trend",
};
const PARAM_TO_VIEW: Record<string, string> = {
  realtime_chart: VIEW_REALTIME,
  trending_category: VIEW_TRENDING,
  domestic_investor_trend: VIEW_INVESTOR,
};

export function HomeView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const viewTab =
    PARAM_TO_VIEW[searchParams.get("ranking-type") ?? ""] ?? VIEW_REALTIME;
  const setViewTab = (tab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const param = VIEW_TO_PARAM[tab];
    if (param === VIEW_TO_PARAM[VIEW_REALTIME]) params.delete("ranking-type");
    else params.set("ranking-type", param);
    router.replace(`?${params.toString()}`);
  };
  const [marketTab, setMarketTab] = useState<string>(MARKET_ALL);
  const [sortTab, setSortTab] = useState<string>(SORT_TOSS_AMOUNT);
  const [timeTab, setTimeTab] = useState<string>(TIME_REALTIME);
  const [hideRisky, setHideRisky] = useState(false);
  const [focusedSymbol, setFocusedSymbol] = useState<string>("000660");

  const { data: marketStatus } = useQuery<MarketStatusResponse>({
    queryKey: ["market-status"],
    queryFn: () => fetch("/api/market-status").then((r) => r.json()),
    refetchInterval: 60_000,
  });

  return (
    <div className="flex flex-col">
      <div className="flex shrink-0 items-center gap-5 border-b border-[var(--tds-border-default)] px-4 py-2">
        {[marketStatus?.domestic, marketStatus?.overseas].map((session, i) => {
          if (!session)
            return (
              <div
                key={i}
                className="h-3 w-24 animate-pulse rounded bg-[var(--tds-surface-overlay)]"
              />
            );
          return (
            <span
              key={i}
              className="flex items-center gap-1.5 text-xs text-[var(--tds-text-secondary)]"
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  session.isOpen
                    ? "bg-[var(--tds-text-rise)]"
                    : "bg-[var(--tds-text-tertiary)]",
                )}
              />
              {session.label}
            </span>
          );
        })}
      </div>

      <MarketDataStrip />

      <div className="sticky top-11 z-30 bg-[var(--tds-surface-base)]">
        <div className="border-b border-[var(--tds-border-default)] px-4 py-2">
          <FilterTabs
            value={viewTab}
            onValueChange={setViewTab}
            options={VIEW_TABS}
          />
        </div>

        {/* Filter row: hidden (but kept in DOM) when not on 실시간 차트 to avoid layout shift */}
        <div
          className={`flex  shrink-0 items-center gap-1 overflow-x-auto border-b border-[var(--tds-border-default)] px-4 py-1.5 scrollbar-none ${viewTab !== VIEW_REALTIME ? "invisible h-0 overflow-hidden py-0" : ""}`}
        >
          <FilterTabs
            value={marketTab}
            onValueChange={setMarketTab}
            options={MARKET_TABS}
            className="mr-2"
            responsive
          />
          <FilterTabs
            value={sortTab}
            onValueChange={setSortTab}
            options={SORT_TABS}
            className="mr-2"
          />
          <FilterTabs
            value={timeTab}
            onValueChange={setTimeTab}
            options={TIME_TABS}
            className="mr-1"
            responsive
          />

          <Button
            size="xs"
            onClick={() => setHideRisky(!hideRisky)}
            className={cn(
              `cursor-pointer shrink-0 gap-1 rounded-full px-2.5 py-1 text-[11px] transition-colors`,
              hideRisky
                ? "bg-[var(--tds-text-brand)] text-white hover:bg-[var(--tds-text-brand)]"
                : "bg-[var(--tds-surface-overlay)] text-[var(--tds-text-secondary)] hover:bg-[var(--tds-surface-overlay)]",
            )}
          >
            <span
              className={`h-2 w-2 rounded-full ${hideRisky ? "bg-white" : "bg-[var(--tds-text-brand)]"}`}
            />
            투자위험 주식 숨기기
          </Button>
        </div>
      </div>

      <div className="flex flex-1">
        <div
          className={cn(
            "flex flex-col border-r border-[var(--tds-border-default)] ",
            viewTab === VIEW_REALTIME ? "min-w-0 flex-[3]" : "flex-1",
          )}
        >
          {viewTab === VIEW_REALTIME ? (
            <StockRankList
              onFocus={setFocusedSymbol}
              focusedSymbol={focusedSymbol}
              marketFilter={marketTab}
              sortBy={sortTab}
              timeFrame={timeTab}
            />
          ) : viewTab === VIEW_TRENDING ? (
            <TrendingCategoriesView />
          ) : (
            <InvestorTrendView />
          )}
        </div>

        {viewTab === VIEW_REALTIME && (
          <div className="hidden xl:block sticky top-11 self-start flex-1 min-w-90 bg-[var(--tds-surface-base)]">
            <StockPreviewCard symbol={focusedSymbol} />
          </div>
        )}
      </div>
    </div>
  );
}
