"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useWatchlistStore } from "@/stores/watchlistStore";
import { cn, formatPrice, getPriceDirection } from "@/lib/utils";
import type { Stock } from "@/types/stock";

async function fetchStocks(): Promise<Stock[]> {
  const res = await fetch("/api/stocks");
  return res.json();
}

interface Props {
  focusedSymbol: string;
  onFocus: (symbol: string) => void;
  marketFilter?: string;
  sortBy?: string;
  timeFrame?: string;
}

/** Deterministic mock period return — seeded from symbol so it's stable across re-renders */
function getPeriodChangeRate(stock: Stock, period: string): number {
  if (period === "실시간" || period === "1일") return stock.changeRate;
  const scaleMap: Record<string, number> = {
    "1주일": 3.5,
    "1개월": 9,
    "3개월": 17,
    "6개월": 26,
    "1년": 42,
  };
  const scale = scaleMap[period] ?? 1;
  const hash = stock.symbol
    .split("")
    .reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) & 0xffff, 0);
  const fraction = (hash % 1000) / 1000; // 0.000 – 0.999
  const baseDir = stock.changeRate >= 0 ? 1 : -1;
  const dir = hash % 10 < 7 ? baseDir : -baseDir; // 70 % follows current trend
  return parseFloat((dir * fraction * scale).toFixed(2));
}

function ChangeRateBadge({ cr }: { cr: number }) {
  const dir = getPriceDirection(cr);
  return (
    <span
      className={cn(
        "rounded px-1.5 py-0.5 font-medium tabular-nums",
        dir === "rise"
          ? "text-[var(--tds-text-rise)]"
          : dir === "fall"
            ? "text-[var(--tds-text-fall)]"
            : "text-[var(--tds-text-tertiary)]",
      )}
    >
      {cr > 0 ? "+" : ""}
      {cr.toFixed(2)}%
    </span>
  );
}

function useChangeFlash(cr: number) {
  const flashKeyRef = useRef(0);
  const [flashKey, setFlashKey] = useState(0);
  const prevCrRef = useRef(cr);
  const dir = getPriceDirection(cr);

  useEffect(() => {
    if (prevCrRef.current !== cr) {
      prevCrRef.current = cr;
      flashKeyRef.current += 1;
      setFlashKey(flashKeyRef.current);
    }
  }, [cr]);

  const animationName =
    dir === "rise" ? "flash-rise" : dir === "fall" ? "flash-fall" : undefined;
  const style = animationName
    ? { animation: `${animationName} 3.5s ease-out forwards` }
    : undefined;

  return { flashKey, style };
}

function StockAvatar({ stock }: { stock: Stock }) {
  const bg = stock.avatarColor ?? "#6b7280";
  const label = stock.name.startsWith("KODEX")
    ? stock.name.includes("레버리지")
      ? "2x"
      : stock.name.includes("인버스2X")
        ? "2x"
        : "K"
    : stock.name[0];
  return (
    <div
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white"
      style={{ backgroundColor: bg }}
    >
      {label}
    </div>
  );
}

interface RowProps {
  stock: Stock;
  idx: number;
  cr: number;
  isFocused: boolean;
  watched: boolean;
  onFocus: (symbol: string) => void;
  onAdd: (symbol: string) => void;
  onRemove: (symbol: string) => void;
  onNavigate: (symbol: string) => void;
}

function StockRow({
  stock,
  idx,
  cr,
  isFocused,
  watched,
  onFocus,
  onAdd,
  onRemove,
  onNavigate,
}: RowProps) {
  const { flashKey, style: flashStyle } = useChangeFlash(cr);
  const buyRatio = stock.buyRatio ?? 50;
  return (
    <div
      onClick={() => onFocus(stock.symbol)}
      onDoubleClick={() => onNavigate(stock.symbol)}
      className={cn(
        "grid cursor-pointer grid-cols-[32px_28px_36px_1fr_100px_86px_70px_120px] items-center gap-2 px-3 py-2.5 transition-colors",
        isFocused
          ? "bg-[var(--tds-surface-overlay)]"
          : "hover:bg-[var(--tds-surface-elevated)]",
      )}
    >
      {/* Heart */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          watched ? onRemove(stock.symbol) : onAdd(stock.symbol);
        }}
        className={cn(
          "flex h-5 w-5 items-center justify-center rounded transition-colors",
          watched
            ? "text-[var(--tds-text-rise)]"
            : "text-[var(--tds-border-strong)] hover:text-[var(--tds-text-secondary)]",
        )}
      >
        <Heart size={13} fill={watched ? "currentColor" : "none"} />
      </button>

      {/* Rank */}
      <span className="font-medium text-[var(--tds-text-secondary)]">
        {idx + 1}
      </span>

      {/* Avatar */}
      <StockAvatar stock={stock} />

      {/* Name */}
      <div className="min-w-0">
        <div className="truncate font-medium text-[var(--tds-text-primary)]">
          {stock.name}
        </div>
      </div>

      {/* Price */}
      <div className="text-right font-medium tabular-nums text-[var(--tds-text-primary)]">
        {formatPrice(stock.price)}원
      </div>

      {/* Change rate badge */}
      <div
        key={flashKey}
        className="flex justify-end rounded"
        style={flashStyle}
      >
        <ChangeRateBadge cr={cr} />
      </div>

      {/* Trade volume */}
      <div className="text-right tabular-nums text-[var(--tds-text-secondary)]">
        {stock.tradeVolumeBillion ?? "–"}억원
      </div>

      {/* Buy/sell ratio bar */}
      <div className="flex flex-col gap-0.5 px-1 self-end">
        <div className="flex h-[3px] w-full overflow-hidden rounded-full">
          <div
            className="bg-[var(--tds-text-fall)] h-full transition-all"
            style={{ width: `${buyRatio}%` }}
          />
          <div className="bg-[var(--tds-text-rise)] h-full flex-1" />
        </div>
        <div className="flex justify-between text-[12px] tabular-nums">
          <span className="text-[var(--tds-text-fall)]">{buyRatio}</span>
          <span className="text-[var(--tds-text-rise)]">{100 - buyRatio}</span>
        </div>
      </div>
    </div>
  );
}

export function StockRankList({
  focusedSymbol,
  onFocus,
  marketFilter = "전체",
  sortBy = "토스증권 거래대금",
  timeFrame = "실시간",
}: Props) {
  const router = useRouter();
  const { has, add, remove } = useWatchlistStore();
  const { data: stocks = [] } = useQuery({
    queryKey: ["stocks"],
    queryFn: fetchStocks,
    refetchInterval: 5_000,
  });

  const displayChangeRate = (s: Stock) => getPeriodChangeRate(s, timeFrame);

  const filtered = stocks
    .filter((s) => s.rank !== undefined)
    .filter((s) => {
      if (marketFilter === "국내")
        return s.market === "KRX" || s.market === "KOSDAQ";
      if (marketFilter === "해외")
        return s.market === "NASDAQ" || s.market === "NYSE";
      return true;
    });

  const ranked = [...filtered].sort((a, b) => {
    if (sortBy === "토스증권 거래대금" || sortBy === "거래대금")
      return (b.tradeVolumeBillion ?? 0) - (a.tradeVolumeBillion ?? 0);
    if (sortBy === "토스증권 거래량" || sortBy === "거래량")
      return b.volume - a.volume;
    if (sortBy === "급상승") return displayChangeRate(b) - displayChangeRate(a);
    if (sortBy === "급하락") return displayChangeRate(a) - displayChangeRate(b);
    return (a.rank ?? 99) - (b.rank ?? 99);
  });

  const changeRateLabel =
    timeFrame === "실시간" || timeFrame === "1일"
      ? "등락률"
      : `${timeFrame} 수익률`;

  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Column headers */}
      <div className="grid shrink-0 grid-cols-[32px_28px_36px_1fr_100px_86px_70px_120px] items-center gap-2 border-b border-[var(--tds-border-default)] px-3 py-1.5 text-[12px] text-[var(--tds-text-tertiary)]">
        <span />
        <span>순위</span>
        <span />
        <span>종목명</span>
        <span className="text-right">현재가</span>
        <span className="text-right">{changeRateLabel}</span>
        <span className="text-right">거래대금 순</span>
        <span className="text-center">토스증권 거래 비율 ⓘ</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        {/* Time label */}
        <div className="px-3 py-1 text-[12px] text-[var(--tds-text-tertiary)]">
          순위 · 오늘 {timeStr} 기준
        </div>
        {/* Hint to double-click */}
        <div className="px-3 py-0.5 text-center text-[12px] text-[var(--tds-text-tertiary)]">
          종목을 더블클릭하면 상세 페이지로 이동해요
        </div>
        {ranked.map((stock, idx) => (
          <StockRow
            key={stock.symbol}
            stock={stock}
            idx={idx}
            cr={displayChangeRate(stock)}
            isFocused={stock.symbol === focusedSymbol}
            watched={has(stock.symbol)}
            onFocus={onFocus}
            onAdd={add}
            onRemove={remove}
            onNavigate={(sym) => router.push(`/stocks/${sym}/order`)}
          />
        ))}
      </div>
    </div>
  );
}
