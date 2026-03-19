"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ChevronDown, ChevronUp, ChevronsUpDown, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { STRATEGIES, STRATEGY_STOCKS } from "./screenerData";

type SortKey = "price" | "changeRate" | "volume" | "marketCap" | "tossTraders" | "monthReturn";

const LOGO_COLORS = [
  { bg: "#ef4444", text: "#fff" }, // red
  { bg: "#f97316", text: "#fff" }, // orange
  { bg: "#eab308", text: "#fff" }, // yellow
  { bg: "#22c55e", text: "#fff" }, // green
  { bg: "#06b6d4", text: "#fff" }, // cyan
  { bg: "#3b82f6", text: "#fff" }, // blue
  { bg: "#8b5cf6", text: "#fff" }, // violet
  { bg: "#ec4899", text: "#fff" }, // pink
  { bg: "#14b8a6", text: "#fff" }, // teal
  { bg: "#f43f5e", text: "#fff" }, // rose
  { bg: "#a855f7", text: "#fff" }, // purple
  { bg: "#0ea5e9", text: "#fff" }, // sky
  { bg: "#10b981", text: "#fff" }, // emerald
  { bg: "#6366f1", text: "#fff" }, // indigo
  { bg: "#84cc16", text: "#fff" }, // lime
  { bg: "#fb923c", text: "#fff" }, // orange-400
];

function logoColor(symbol: string) {
  let hash = 0;
  for (let i = 0; i < symbol.length; i++) hash = (hash * 31 + symbol.charCodeAt(i)) >>> 0;
  return LOGO_COLORS[hash % LOGO_COLORS.length];
}

function fmtPrice(n: number)   { return n.toLocaleString("ko-KR") + "원"; }
function fmtVol(n: number)     { return n >= 1_000_000 ? (n / 1_000_000).toFixed(1) + "M" : n.toLocaleString("ko-KR"); }
function fmtCap(n: number)     { return n >= 10000 ? (n / 10000).toFixed(1) + "조" : n.toLocaleString("ko-KR") + "억"; }
function fmtTraders(n: number) { return n >= 10000 ? (n / 10000).toFixed(1) + "만" : n.toLocaleString("ko-KR"); }

export function ScreenerView({ strategyId = 1 }: { strategyId?: number }) {
  const router = useRouter();
  const [symbolSearch, setSymbolSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("tossTraders");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const strategy = STRATEGIES.find((s) => s.id === strategyId) ?? STRATEGIES[0];
  const stocks    = STRATEGY_STOCKS[strategyId] ?? STRATEGY_STOCKS[1];

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("desc"); }
  }

  const filtered = stocks
    .filter((s) =>
      symbolSearch === "" ||
      s.symbol.toLowerCase().includes(symbolSearch.toLowerCase()) ||
      s.name.includes(symbolSearch),
    )
    .sort((a, b) => {
      const mul = sortDir === "asc" ? 1 : -1;
      return ((a[sortKey] as number) - (b[sortKey] as number)) * mul;
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
            onClick={() => router.push(`/screener/${s.id}`)}
            className={cn(
              "w-full px-4 py-2 text-left text-[12px] transition-colors",
              strategyId === s.id
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
          <p className="mt-0.5 text-[12px] text-[var(--tds-text-secondary)]">{strategy.desc}</p>
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
            <button
              onClick={() => setSymbolSearch("")}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--tds-border-default)] text-[var(--tds-text-tertiary)] hover:text-[var(--tds-text-primary)]"
            >
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
                {(
                  [
                    ["price",        "현재가"],
                    ["changeRate",   "등락률"],
                    ["volume",       "거래량"],
                    ["marketCap",    "시가총액"],
                    ["tossTraders",  "토스증권 거래자 수"],
                    ["monthReturn",  "1달 %"],
                  ] as [SortKey, string][]
                ).map(([key, label]) => (
                  <th
                    key={key}
                    className="cursor-pointer px-3 py-2 text-right font-medium select-none"
                    onClick={() => handleSort(key)}
                  >
                    <span className="inline-flex items-center gap-0.5">
                      {label}
                      {sortKey === key ? (
                        sortDir === "desc" ? <ChevronDown size={10} /> : <ChevronUp size={10} />
                      ) : (
                        <ChevronsUpDown size={10} className="opacity-30" />
                      )}
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
                    key={`${stock.symbol}-${idx}`}
                    className="cursor-pointer border-b border-[var(--tds-border-default)] transition-colors hover:bg-[var(--tds-surface-elevated)]"
                  >
                    <td className="px-3 py-2.5 text-center text-[var(--tds-text-tertiary)]">{idx + 1}</td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <div
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[10px] font-bold"
                          style={{ backgroundColor: logoColor(stock.symbol).bg, color: logoColor(stock.symbol).text }}
                        >
                          {stock.symbol.replace(/\d/g, "").slice(0, 2) || stock.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-medium text-[var(--tds-text-primary)]">{stock.name}</div>
                          <div className="flex items-center gap-1 text-[10px] text-[var(--tds-text-tertiary)]">
                            <span>{stock.symbol}</span>
                            <span className="rounded bg-[var(--tds-surface-overlay)] px-1">{stock.market}</span>
                            <span>{stock.sector}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-[var(--tds-text-primary)]">
                      {fmtPrice(stock.price)}
                    </td>
                    <td className={cn(
                      "px-3 py-2.5 text-right tabular-nums font-medium",
                      up ? "text-[var(--tds-text-rise)]" : down ? "text-[var(--tds-text-fall)]" : "text-[var(--tds-text-tertiary)]",
                    )}>
                      {stock.changeRate > 0 ? "+" : ""}{stock.changeRate.toFixed(2)}%
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-[var(--tds-text-secondary)]">
                      {fmtVol(stock.volume)}
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-[var(--tds-text-secondary)]">
                      {fmtCap(stock.marketCap)}
                    </td>
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
                    <td className={cn(
                      "px-3 py-2.5 text-right tabular-nums font-medium",
                      stock.monthReturn > 0 ? "text-[var(--tds-text-rise)]" : "text-[var(--tds-text-fall)]",
                    )}>
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
