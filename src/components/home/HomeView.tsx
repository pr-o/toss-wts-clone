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
            <div className="flex shrink-0 gap-0.5 rounded-lg bg-[var(--tds-surface-overlay)] p-0.5 mr-2">
              {MARKET_TABS.map((tab) => (
                <button key={tab} onClick={() => setMarketTab(tab)}
                  className={`rounded-md px-2 py-1 text-[11px] transition-colors ${marketTab === tab ? "bg-[var(--tds-surface-base)] font-medium text-[var(--tds-text-primary)] shadow-sm" : "text-[var(--tds-text-tertiary)]"}`}>
                  {tab}
                </button>
              ))}
            </div>
            {SORT_TABS.map((tab) => (
              <button key={tab} onClick={() => setSortTab(tab)}
                className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] transition-colors ${sortTab === tab ? "bg-[var(--tds-fill-brand)] text-white" : "bg-[var(--tds-surface-overlay)] text-[var(--tds-text-secondary)] hover:bg-[var(--tds-surface-elevated)]"}`}>
                {tab}
              </button>
            ))}
            <div className="mx-1 h-3 w-px bg-[var(--tds-border-default)] shrink-0" />
            {TIME_TABS.map((tab) => (
              <button key={tab} onClick={() => setTimeTab(tab)}
                className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] transition-colors ${timeTab === tab ? "bg-[var(--tds-fill-brand)] text-white" : "bg-[var(--tds-surface-overlay)] text-[var(--tds-text-secondary)] hover:bg-[var(--tds-surface-elevated)]"}`}>
                {tab}
              </button>
            ))}
            <div className="mx-1 h-3 w-px bg-[var(--tds-border-default)] shrink-0" />
            <button onClick={() => setHideRisky(!hideRisky)}
              className={`shrink-0 flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] transition-colors ${hideRisky ? "bg-[var(--tds-text-brand)] text-white" : "bg-[var(--tds-surface-overlay)] text-[var(--tds-text-secondary)]"}`}>
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
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 shrink-0 rounded-full bg-[var(--tds-surface-overlay)] flex items-center justify-center text-[11px] font-bold text-[var(--tds-text-primary)]">S</div>
              <div>
                <div className="font-semibold text-[var(--tds-text-primary)]">SK하이닉스</div>
                <div className="text-[var(--tds-text-rise)] tabular-nums">178,205원 +8.96%</div>
              </div>
            </div>
            {/* Mini chart placeholder */}
            <div className="h-28 w-full rounded-lg bg-[var(--tds-surface-overlay)] flex items-center justify-center">
              <span className="text-[10px] text-[var(--tds-text-tertiary)]">미니 차트</span>
            </div>
          </div>

          {/* 한 줄 요약 */}
          <div className="shrink-0 border-b border-[var(--tds-border-default)] px-4 py-3">
            <div className="mb-2 font-semibold text-[var(--tds-text-primary)]">한 줄 요약</div>
            {["SK하이닉스 영업실적 발표: 2025년 연간 영업이익 47조 2,063억원, 2026년까지 10% 증가", "유가증권 기업들의 이번 달 Top 10 종목에요"].map((text, i) => (
              <div key={i} className="flex items-start gap-2 mb-2">
                <div className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-[var(--tds-surface-overlay)] flex items-center justify-center text-[9px] font-bold text-[var(--tds-text-secondary)]">소</div>
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
                <div className="h-6 w-6 shrink-0 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ backgroundColor: post.color }}>
                  {post.name[0]}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
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
