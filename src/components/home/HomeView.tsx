"use client";

import { useState } from "react";
import { StockRankList } from "./StockRankList";
import { MarketDataStrip } from "./MarketDataStrip";
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

          {/* Filter chip row */}
          <div className="flex shrink-0 items-center gap-1 overflow-x-auto border-b border-[var(--tds-border-default)] px-4 py-1.5 scrollbar-none">

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

          <StockRankList onFocus={setFocusedSymbol} focusedSymbol={focusedSymbol} />
        </div>

        {/* Stock preview + community column */}
        <div className="flex flex-1 flex-col overflow-y-auto bg-[var(--tds-surface-base)] text-xs">

          {/* Stock preview card */}
          <div className="shrink-0 border-b border-[var(--tds-border-default)] p-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--tds-surface-overlay)] text-[11px] font-bold text-[var(--tds-text-primary)]">S</div>
              <div>
                <div className="font-semibold text-[var(--tds-text-primary)]">SK하이닉스</div>
                <div className="tabular-nums text-[var(--tds-text-rise)]">178,205원 +8.96%</div>
              </div>
            </div>
            {/* Mini chart placeholder */}
            <div className="flex h-28 w-full items-center justify-center rounded-lg bg-[var(--tds-surface-overlay)]">
              <span className="text-[10px] text-[var(--tds-text-tertiary)]">미니 차트</span>
            </div>
          </div>

          {/* 한 줄 요약 */}
          <div className="shrink-0 border-b border-[var(--tds-border-default)] px-4 py-3">
            <div className="mb-2 font-semibold text-[var(--tds-text-primary)]">한 줄 요약</div>
            {["SK하이닉스 영업실적 발표: 2025년 연간 영업이익 47조 2,063억원, 2026년까지 10% 증가", "유가증권 기업들의 이번 달 Top 10 종목에요"].map((text, i) => (
              <div key={i} className="mb-2 flex items-start gap-2">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--tds-surface-overlay)] text-[9px] font-bold text-[var(--tds-text-secondary)]">소</div>
                <div>
                  <p className="leading-relaxed text-[var(--tds-text-primary)]">{text}</p>
                  <span className="text-[10px] text-[var(--tds-text-tertiary)]">1일 전</span>
                </div>
              </div>
            ))}
          </div>

          {/* 커뮤니티 */}
          <div className="flex-1 px-4 py-3">
            <div className="mb-2 font-semibold text-[var(--tds-text-primary)]">커뮤니티</div>
            {[
              { name: "재테크고수투자자", time: "1분", color: "#3b82f6", content: "SK하이닉스 CXL 출하량 절반 수준 됩니다. 물론 여기에 들어가는 HBM 비중이 높아 2030년까지 지속 성장할 전망" },
              { name: "SK그룹 최대주주 출신", time: "5분", color: "#8b5cf6", content: "SK그룹 최대주주 출신으로서 SK하이닉스의 성장 가능성은 아직도 충분합니다" },
              { name: "고수투자자", time: "12분", color: "#10b981", content: "반도체 사이클 바닥 신호 포착됨. 지금이 저점 매수 타이밍" },
              { name: "주식왕", time: "18분", color: "#f59e0b", content: "5년 10배 간다. 이건 확실함" },
            ].map((post, i) => (
              <div key={i} className="mb-3 flex items-start gap-2">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: post.color }}>
                  {post.name[0]}
                </div>
                <div className="min-w-0">
                  <div className="mb-0.5 flex items-center gap-1.5">
                    <span className="font-semibold text-[var(--tds-text-primary)]">{post.name}</span>
                    <span className="text-[10px] text-[var(--tds-text-tertiary)]">{post.time}</span>
                  </div>
                  <p className="leading-relaxed text-[var(--tds-text-secondary)]">{post.content}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
