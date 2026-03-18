"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { cn, formatChange, getPriceDirection } from "@/lib/utils";
import type { MarketIndex } from "@/types/stock";

async function fetchTicker(): Promise<MarketIndex[]> {
  const res = await fetch("/api/ticker");
  return res.json();
}

const STRIP_INDICES = [
  { id: "USDKRW", label: "달러 환율" },
  { id: "KOSPI2", label: "코스피" },
  { id: "KOSDAQ2",label: "코스닥" },
  { id: "NDX",    label: "나스닥" },
  { id: "NQ1",    label: "나스닥 100 선물" },
];

export function MarketDataStrip() {
  const { data: items = [] } = useQuery({ queryKey: ["ticker"], queryFn: fetchTicker, refetchInterval: 10_000 });
  const map = Object.fromEntries(items.map((i) => [i.id, i]));

  return (
    <div className="flex shrink-0 items-stretch gap-0 overflow-x-auto border-b border-[var(--tds-border-default)] bg-[var(--tds-surface-base)]">
      {/* Calendar card */}
      <div className="flex shrink-0 flex-col items-start justify-center gap-0.5 border-r border-[var(--tds-border-default)] px-3 py-2 min-w-[110px]">
        <div className="flex items-center gap-1">
          <span className="rounded bg-[var(--tds-fill-brand)] px-1 py-0.5 text-[10px] font-bold text-white">오늘</span>
        </div>
        <span className="text-[11px] font-medium text-[var(--tds-text-primary)]">증시 캘린더</span>
        <span className="text-[10px] text-[var(--tds-text-tertiary)]">근원 생산자물가지수 발표...</span>
      </div>

      {/* Index cards */}
      {STRIP_INDICES.map(({ id, label }) => {
        const item = map[id];
        if (!item) return null;
        const dir = getPriceDirection(item.changeRate);
        const changeSign = item.changeRate > 0 ? "+" : "";
        return (
          <div key={id} className="flex shrink-0 flex-col justify-center gap-0.5 border-r border-[var(--tds-border-default)] px-3 py-2 min-w-[130px] cursor-pointer hover:bg-[var(--tds-surface-overlay)] transition-colors">
            <span className="text-[10px] text-[var(--tds-text-tertiary)]">{label}</span>
            <span className="text-xs font-semibold tabular-nums text-[var(--tds-text-primary)]">
              {item.value.toLocaleString("ko-KR", { maximumFractionDigits: 2 })}
            </span>
            <span className={cn("text-[10px] tabular-nums", {
              "text-[var(--tds-text-rise)]": dir === "rise",
              "text-[var(--tds-text-fall)]": dir === "fall",
              "text-[var(--tds-text-tertiary)]": dir === "flat",
            })}>
              {changeSign}{item.change.toFixed(2)} ({Math.abs(item.changeRate).toFixed(2)}%)
            </span>
          </div>
        );
      })}
      {/* More arrow */}
      <button className="flex shrink-0 items-center px-2 text-[var(--tds-text-tertiary)] hover:text-[var(--tds-text-secondary)]">
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
