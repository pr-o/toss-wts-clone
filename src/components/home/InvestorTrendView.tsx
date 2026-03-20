"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { cn, formatPrice, getPriceDirection } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StockTrend {
  symbol: string;
  name: string;
  price: number;
  changeRate: number;
  avatarColor?: string;
  retail: number;
  foreign: number;
  institution: number;
}

async function fetchTrends(): Promise<StockTrend[]> {
  const res = await fetch("/api/investor-trends");
  return res.json();
}

function formatNetBuy(v: number) {
  const abs = Math.abs(v);
  const sign = v >= 0 ? "+" : "-";
  if (abs >= 1_000_000_000_000) return `${sign}${(abs / 1_000_000_000_000).toFixed(1)}조`;
  if (abs >= 100_000_000) return `${sign}${Math.round(abs / 100_000_000).toLocaleString("ko-KR")}억`;
  if (abs >= 10_000) return `${sign}${Math.round(abs / 10_000).toLocaleString("ko-KR")}만`;
  return `${sign}${abs.toLocaleString("ko-KR")}`;
}

function TrendColumn({
  title,
  trends,
  getter,
  mode,
}: {
  title: string;
  trends: StockTrend[];
  getter: (t: StockTrend) => number;
  mode: "buy" | "sell";
}) {
  const sorted = [...trends].sort((a, b) =>
    mode === "buy" ? getter(b) - getter(a) : getter(a) - getter(b)
  );
  const totalNet = trends.reduce((s, t) => s + getter(t), 0);
  const totalDir = getPriceDirection(totalNet);

  return (
    <div className="flex flex-1 flex-col border-r border-[var(--tds-border-default)] last:border-r-0">
      {/* Column header */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--tds-border-default)] bg-[var(--tds-surface-base)] px-3 py-2.5">
        <span className="text-[14px] font-semibold text-[var(--tds-text-primary)]">{title}</span>
        <div className="flex flex-col items-end">
          <span className="text-[11px] text-[var(--tds-text-tertiary)]">합계 {mode === "buy" ? "순매수" : "순매도"}</span>
          <span className={cn(
            "text-[12px] font-medium tabular-nums",
            totalDir === "rise" ? "text-[var(--tds-text-rise)]" :
            totalDir === "fall" ? "text-[var(--tds-text-fall)]" : "text-[var(--tds-text-tertiary)]"
          )}>
            {formatNetBuy(totalNet)}
          </span>
        </div>
      </div>

      {/* Sub-header */}
      <div className="sticky top-[57px] z-10 grid grid-cols-[20px_1fr_72px_64px] items-center gap-1.5 border-b border-[var(--tds-border-default)] bg-[var(--tds-surface-base)] px-3 py-1.5 text-[11px] text-[var(--tds-text-tertiary)]">
        <span />
        <span>종목명</span>
        <span className="text-right">현재가</span>
        <span className="text-right">{mode === "buy" ? "순매수" : "순매도"}</span>
      </div>

      {/* Rows */}
      <div>
        {sorted.map((t, i) => {
          const val = getter(t);
          const dir = getPriceDirection(t.changeRate);
          const label = t.name.startsWith("KODEX") ? "K" : t.name[0];
          return (
            <div
              key={t.symbol}
              className="grid grid-cols-[20px_1fr_72px_64px] items-center gap-1.5 border-b border-[var(--tds-border-default)] px-3 py-2 transition-colors even:bg-[var(--tds-surface-elevated)] hover:bg-[var(--tds-surface-overlay)] last:border-b-0"
            >
              <span className="text-[12px] text-[var(--tds-text-tertiary)]">{i + 1}</span>
              <div className="flex min-w-0 items-center gap-1.5">
                <div
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
                  style={{ backgroundColor: t.avatarColor ?? "#6b7280" }}
                >
                  {label}
                </div>
                <span className="truncate text-[13px] font-medium text-[var(--tds-text-primary)]">
                  {t.name}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[12px] font-medium tabular-nums text-[var(--tds-text-primary)]">
                  {formatPrice(t.price)}
                </span>
                <span className={cn(
                  "text-[11px] tabular-nums",
                  dir === "rise" ? "text-[var(--tds-text-rise)]" :
                  dir === "fall" ? "text-[var(--tds-text-fall)]" : "text-[var(--tds-text-tertiary)]"
                )}>
                  {t.changeRate > 0 ? "+" : ""}{t.changeRate.toFixed(2)}%
                </span>
              </div>
              <span className={cn(
                "text-right text-[12px] font-medium tabular-nums",
                val >= 0 ? "text-[var(--tds-text-rise)]" : "text-[var(--tds-text-fall)]"
              )}>
                {formatNetBuy(val)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function InvestorTrendView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("ranking") === "sell" ? "sell" : "buy";

  const setMode = (m: "buy" | "sell") => {
    const params = new URLSearchParams(searchParams.toString());
    if (m === "buy") params.delete("ranking");
    else params.set("ranking", "sell");
    router.replace(`?${params.toString()}`);
  };

  const { data: trends = [] } = useQuery({
    queryKey: ["investor-trends"],
    queryFn: fetchTrends,
    refetchInterval: 10_000,
  });

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Filter chips */}
      <div className="flex shrink-0 items-center border-b border-[var(--tds-border-default)] px-4 py-2">
        <Tabs value={mode} onValueChange={(v) => setMode(v as "buy" | "sell")}>
          <TabsList className="h-auto gap-0 rounded-lg bg-[var(--tds-surface-overlay)] p-0.5">
            <TabsTrigger value="buy" className="rounded-md px-2 py-1 text-[11px] text-[var(--tds-text-tertiary)] data-active:bg-[var(--tds-surface-base)] data-active:font-medium data-active:text-[var(--tds-text-primary)] data-active:shadow-sm">순매수</TabsTrigger>
            <TabsTrigger value="sell" className="rounded-md px-2 py-1 text-[11px] text-[var(--tds-text-tertiary)] data-active:bg-[var(--tds-surface-base)] data-active:font-medium data-active:text-[var(--tds-text-primary)] data-active:shadow-sm">순매도</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Columns */}
      <div className="flex flex-1 overflow-y-auto">
        <TrendColumn title="외국인" trends={trends} getter={(t) => t.foreign} mode={mode} />
        <TrendColumn title="기관" trends={trends} getter={(t) => t.institution} mode={mode} />
        <TrendColumn title="개인" trends={trends} getter={(t) => t.retail} mode={mode} />
      </div>
    </div>
  );
}
