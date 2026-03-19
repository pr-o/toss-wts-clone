"use client";

import { useState } from "react";
import { Search, X, ChevronDown, ChevronUp, ChevronsUpDown, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types & data ───────────────────────────────────────────────────────────

interface Strategy {
  id: string;
  label: string;
  desc?: string;
}

const STRATEGIES: Strategy[] = [
  { id: "consecutive-rise", label: "연속 상승세",    desc: "당일일 연속 상승세 있는 나스닥 주식 추가" },
  { id: "rise-predict",     label: "상승 예측" },
  { id: "fall-predict",     label: "하락 예측" },
  { id: "earnings-date",    label: "실적 발표 날짜" },
  { id: "high-dividend",    label: "큰 폭 배당수익" },
  { id: "value",            label: "할인된 가치주" },
  { id: "momentum",         label: "모멘텀 고수익" },
  { id: "moving-avg",       label: "이동평균선 분석" },
  { id: "candle",           label: "봉 분석" },
  { id: "dividend",         label: "고수익 배당주" },
  { id: "low-price",        label: "낮은 시가" },
  { id: "growth",           label: "성장 주식" },
];

interface ScreenerStock {
  rank: number;
  symbol: string;
  name: string;
  market: "NASDAQ" | "NYSE" | "KRX" | "KOSDAQ";
  price: number;
  changeRate: number;
  volume: number;
  marketCap: number;    // 억 KRW
  tossTraders: number;
  monthReturn: number;
  signal: "상승" | "하락" | "중립" | null;
}

const STOCKS: ScreenerStock[] = [
  { rank: 1,  symbol: "IVZ",   name: "인베스코",            market: "NYSE",   price: 25980,  changeRate:  0.00, volume:   802478, marketCap:   45404, tossTraders:  25192, monthReturn: 37.9,  signal: "중립" },
  { rank: 2,  symbol: "SMMT",  name: "서밋 테라퓨틱스",      market: "NASDAQ", price: 49470,  changeRate:  0.00, volume:    52495, marketCap:   46804, tossTraders:    258, monthReturn: 30.7,  signal: null   },
  { rank: 3,  symbol: "AAPL",  name: "애플",                market: "NASDAQ", price: 281175, changeRate: -1.47, volume: 58234567, marketCap: 4309296, tossTraders: 100630, monthReturn: 34.3,  signal: null   },
  { rank: 4,  symbol: "IRM",   name: "아이언 마운틴",         market: "NYSE",   price: 153105, changeRate: -1.47, volume:  3215678, marketCap:   99900, tossTraders:  96007, monthReturn: 31.9,  signal: "중립" },
  { rank: 5,  symbol: "MPWR",  name: "모노리스 파워 시스템",   market: "NASDAQ", price: 502155, changeRate:  1.47, volume:  1001234, marketCap:  320597, tossTraders: 175881, monthReturn: 27.0,  signal: null   },
  { rank: 6,  symbol: "GOOGL", name: "알파벳",               market: "NASDAQ", price: 226997, changeRate:  0.00, volume:    69198, marketCap: 2788152, tossTraders:   1722, monthReturn: 23.84, signal: null   },
  { rank: 7,  symbol: "NEE",   name: "넥스트에라 에너지",      market: "NYSE",   price: 99285,  changeRate:  0.00, volume:  5242743, marketCap: 2143684, tossTraders: 123684, monthReturn: 22.69, signal: null   },
  { rank: 8,  symbol: "AMAT",  name: "어플라이드 머티리얼즈",   market: "NASDAQ", price: 186450, changeRate: -0.87, volume:  4126930, marketCap:  157905, tossTraders:  25905, monthReturn: 20.09, signal: null   },
  { rank: 9,  symbol: "CVNA",  name: "카바나",                market: "NYSE",   price: 253895, changeRate:  2.14, volume:  3651980, marketCap:  478955, tossTraders:  29955, monthReturn: 16.33, signal: null   },
  { rank: 10, symbol: "UPRO",  name: "프로쉐어즈 울트라프로 S&P500", market: "NYSE", price: 92175, changeRate: 0.48, volume: 10951095, marketCap: 14631, tossTraders: 10363981, monthReturn: 1.75, signal: null  },
  { rank: 11, symbol: "FBTC",  name: "피델리티 비트코인 ETF",   market: "NYSE",   price: 95730,  changeRate:  0.00, volume: 20165030, marketCap: 2148425, tossTraders: 548425, monthReturn: 17.29, signal: "중립" },
  { rank: 12, symbol: "IBIT",  name: "아이쉐어즈 비트코인 ETF", market: "NASDAQ", price: 58707,  changeRate:  1.29, volume:   108760, marketCap:  153535, tossTraders: 1796869, monthReturn: 16.95, signal: null  },
  { rank: 13, symbol: "AMZN",  name: "아마존",                market: "NASDAQ", price: 275355, changeRate: -0.92, volume: 15703981, marketCap: 2902181, tossTraders: 185703, monthReturn: 14.39, signal: null   },
  { rank: 14, symbol: "NVDA",  name: "엔비디아",               market: "NASDAQ", price: 119400, changeRate:  0.00, volume:   659520, marketCap: 2920000, tossTraders: 456789, monthReturn: 14.0,  signal: null   },
];

type SortKey = "rank" | "price" | "changeRate" | "volume" | "marketCap" | "tossTraders" | "monthReturn";

function fmtPrice(n: number) { return n.toLocaleString("ko-KR") + "원"; }
function fmtVol(n: number)   { return n >= 1_000_000 ? (n / 1_000_000).toFixed(1) + "M" : n.toLocaleString("ko-KR"); }
function fmtCap(n: number)   { return n >= 10000 ? (n / 10000).toFixed(1) + "조" : n.toLocaleString("ko-KR") + "억"; }
function fmtTraders(n: number) { return n >= 10000 ? (n / 10000).toFixed(1) + "만" : n.toLocaleString("ko-KR"); }

// ── Main component ─────────────────────────────────────────────────────────

export function ScreenerView() {
  const [activeStrategy, setActiveStrategy] = useState("consecutive-rise");
  const [symbolSearch, setSymbolSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("tossTraders");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const strategy = STRATEGIES.find((s) => s.id === activeStrategy)!;

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  }

  const filtered = STOCKS
    .filter((s) => symbolSearch === "" || s.symbol.toLowerCase().includes(symbolSearch.toLowerCase()) || s.name.includes(symbolSearch))
    .sort((a, b) => {
      const mul = sortDir === "asc" ? 1 : -1;
      return (a[sortKey] as number - (b[sortKey] as number)) * mul;
    });

  return (
    <div className="flex flex-1 overflow-hidden">

      {/* ── Left sidebar ─────────────────────────────────────────────── */}
      <div className="flex w-44 shrink-0 flex-col overflow-y-auto border-r border-[var(--tds-border-default)] bg-[var(--tds-surface-base)]">
        <div className="px-4 py-3 text-[13px] font-bold text-[var(--tds-text-primary)]">주식 골라보기 목록</div>

        <div className="px-4 pb-1 text-[10px] font-medium text-[var(--tds-text-tertiary)]">나의 전략</div>
        <div className="mb-1 px-4 py-1.5 text-[11px] text-[var(--tds-text-tertiary)]">저장된 전략이 없어요</div>

        <div className="mx-4 mb-2 border-t border-[var(--tds-border-default)]" />
        <div className="px-4 pb-1 text-[10px] font-medium text-[var(--tds-text-tertiary)]">스크리너 전략</div>

        {STRATEGIES.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveStrategy(s.id)}
            className={cn(
              "w-full px-4 py-2 text-left text-[12px] transition-colors",
              activeStrategy === s.id
                ? "bg-[var(--tds-surface-overlay)] font-semibold text-[var(--tds-text-primary)]"
                : "text-[var(--tds-text-secondary)] hover:bg-[var(--tds-surface-elevated)] hover:text-[var(--tds-text-primary)]",
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* ── Main content ─────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Title */}
        <div className="shrink-0 border-b border-[var(--tds-border-default)] px-6 py-4">
          <h1 className="text-[16px] font-bold text-[var(--tds-text-primary)]">{strategy.label}</h1>
          {strategy.desc && <p className="mt-0.5 text-[12px] text-[var(--tds-text-secondary)]">{strategy.desc}</p>}
        </div>

        {/* Filter bar */}
        <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-[var(--tds-border-default)] bg-[var(--tds-surface-base)] px-4 py-2">
          <span className="text-[11px] text-[var(--tds-text-tertiary)]">결과 {filtered.length}↑</span>
          <div className="flex h-7 items-center gap-1.5 rounded-lg border border-[var(--tds-border-default)] bg-[var(--tds-surface-overlay)] px-2">
            <Search size={11} className="text-[var(--tds-text-tertiary)]" />
            <input
              value={symbolSearch}
              onChange={(e) => setSymbolSearch(e.target.value)}
              placeholder="심볼"
              className="w-16 bg-transparent text-[11px] text-[var(--tds-text-primary)] outline-none placeholder:text-[var(--tds-text-tertiary)]"
            />
          </div>
          {[["국가", "미국"], ["시간표", "1일"], ["카테고리", "전체"]].map(([label, val]) => (
            <button key={label} className="flex h-7 items-center gap-1 rounded-lg border border-[var(--tds-border-default)] bg-[var(--tds-surface-overlay)] px-2.5 text-[11px] text-[var(--tds-text-secondary)]">
              {label}: {val} <ChevronDown size={10} />
            </button>
          ))}
          <button className="flex h-7 items-center gap-1 rounded-lg border border-[var(--tds-border-default)] bg-[var(--tds-surface-overlay)] px-2.5 text-[11px] text-[var(--tds-text-secondary)]">
            <SlidersHorizontal size={11} /> 주요지표 1달 %: 1개 선택 <ChevronDown size={10} />
          </button>
          {symbolSearch && (
            <button onClick={() => setSymbolSearch("")} className="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--tds-border-default)] text-[var(--tds-text-tertiary)] hover:text-[var(--tds-text-primary)]">
              <X size={12} />
            </button>
          )}
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full min-w-[900px] border-collapse text-[12px]">
            <thead className="sticky top-0 z-10 bg-[var(--tds-surface-base)]">
              <tr className="border-b border-[var(--tds-border-default)] text-[10px] text-[var(--tds-text-tertiary)]">
                <th className="w-8 px-3 py-2 text-center font-medium">#</th>
                <th className="px-3 py-2 text-left font-medium">이름</th>
                {([["price", "현재가"], ["changeRate", "등락률"], ["volume", "거래량"], ["marketCap", "시가총액"], ["tossTraders", "토스증권 거래자 수"], ["monthReturn", "1달 %"]] as [SortKey, string][]).map(([key, label]) => (
                  <th key={key} className="cursor-pointer px-3 py-2 text-right font-medium select-none" onClick={() => handleSort(key)}>
                    <span className="inline-flex items-center gap-0.5">
                      {label}
                      {sortKey === key
                        ? sortDir === "desc" ? <ChevronDown size={10} /> : <ChevronUp size={10} />
                        : <ChevronsUpDown size={10} className="opacity-30" />}
                    </span>
                  </th>
                ))}
                <th className="px-3 py-2 text-right font-medium">주요지표</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((stock, idx) => {
                const up   = stock.changeRate > 0;
                const down = stock.changeRate < 0;
                return (
                  <tr
                    key={stock.symbol}
                    className="cursor-pointer border-b border-[var(--tds-border-default)] transition-colors hover:bg-[var(--tds-surface-elevated)]"
                  >
                    <td className="px-3 py-2.5 text-center text-[var(--tds-text-tertiary)]">{idx + 1}</td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[var(--tds-surface-overlay)] text-[10px] font-bold text-[var(--tds-text-secondary)]">
                          {stock.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-medium text-[var(--tds-text-primary)]">{stock.name}</div>
                          <div className="flex items-center gap-1 text-[10px] text-[var(--tds-text-tertiary)]">
                            <span>{stock.symbol}</span>
                            <span className="rounded bg-[var(--tds-surface-overlay)] px-1">{stock.market}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-[var(--tds-text-primary)]">{fmtPrice(stock.price)}</td>
                    <td className={cn("px-3 py-2.5 text-right tabular-nums font-medium", up ? "text-[var(--tds-text-rise)]" : down ? "text-[var(--tds-text-fall)]" : "text-[var(--tds-text-tertiary)]")}>
                      {stock.changeRate > 0 ? "+" : ""}{stock.changeRate.toFixed(2)}%
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-[var(--tds-text-secondary)]">{fmtVol(stock.volume)}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-[var(--tds-text-secondary)]">{fmtCap(stock.marketCap)}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums">
                      <span className={cn(
                        "inline-block rounded px-1.5 py-0.5 text-[11px] font-medium",
                        stock.tossTraders > 100000
                          ? "bg-red-100 text-[var(--tds-text-rise)] dark:bg-red-950/40"
                          : stock.tossTraders > 10000
                          ? "bg-orange-100 text-orange-600 dark:bg-orange-950/40"
                          : "text-[var(--tds-text-secondary)]",
                      )}>
                        {fmtTraders(stock.tossTraders)}
                      </span>
                    </td>
                    <td className={cn("px-3 py-2.5 text-right tabular-nums font-medium", stock.monthReturn > 0 ? "text-[var(--tds-text-rise)]" : "text-[var(--tds-text-fall)]")}>
                      {stock.monthReturn > 0 ? "+" : ""}{stock.monthReturn.toFixed(2)}%
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      {stock.signal && (
                        <span className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-medium",
                          stock.signal === "상승" ? "bg-red-100 text-[var(--tds-text-rise)]" :
                          stock.signal === "하락" ? "bg-blue-100 text-[var(--tds-text-fall)]" :
                          "bg-[var(--tds-surface-overlay)] text-[var(--tds-text-tertiary)]",
                        )}>
                          {stock.signal}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
