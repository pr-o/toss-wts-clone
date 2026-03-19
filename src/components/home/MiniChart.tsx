"use client";

import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createChart, CandlestickSeries, HistogramSeries, TickMarkType } from "lightweight-charts";
import { useThemeStore } from "@/stores/themeStore";
import { cn } from "@/lib/utils";
import type { Candle } from "@/types/stock";

async function fetchCandles(symbol: string): Promise<Candle[]> {
  const res = await fetch(`/api/stocks/${symbol}/candles`);
  return res.json();
}

interface Props {
  symbol: string;
  direction: "rise" | "fall" | "flat";
}

interface TooltipData {
  date: string;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  changeRate: number;
  cursorX: number;
  cursorY: number;
}

const KO_DAYS = ["일", "월", "화", "수", "목", "금", "토"];

function formatTooltipDate(ts: number) {
  const d = new Date(ts * 1000);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}(${KO_DAYS[d.getDay()]})`;
}

function formatVolume(v: number) {
  return Math.round(v / 10000).toLocaleString("ko-KR") + "만";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function tickFormatter(time: any, type: TickMarkType) {
  const d = new Date((time as number) * 1000);
  const yy = d.getFullYear().toString().slice(2);
  const m  = d.getMonth() + 1;
  if (type === TickMarkType.Year)  return `${d.getFullYear()}년`;
  if (type === TickMarkType.Month) return `${yy}년 ${m}월`;
  return `${m}/${String(d.getDate()).padStart(2, "0")}`;
}

function chartColors(theme: string) {
  return {
    text:   theme === "dark" ? "#a3a3a3" : "#737373",
    grid:   theme === "dark" ? "#262626" : "#f0f0f0",
    border: theme === "dark" ? "#3f3f3f" : "#e0e0e0",
  };
}

export function MiniChart({ symbol }: Props) {
  const wrapRef      = useRef<HTMLDivElement>(null);
  const chartElRef   = useRef<HTMLDivElement>(null);
  const candleMapRef = useRef<Map<number, Candle>>(new Map());
  const theme        = useThemeStore((s) => s.theme);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  const { data: candles } = useQuery({
    queryKey: ["candles", symbol],
    queryFn:  () => fetchCandles(symbol),
    staleTime: Infinity,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!chartElRef.current || !candles?.length) return;

    const colors = chartColors(theme);

    const chart = createChart(chartElRef.current, {
      width:  chartElRef.current.clientWidth,
      height: chartElRef.current.clientHeight,
      layout: { background: { color: "transparent" }, textColor: colors.text, fontSize: 10 },
      grid: {
        vertLines: { visible: false },
        horzLines: { color: colors.grid },
      },
      crosshair: {
        horzLine: { visible: false, labelVisible: false },
        vertLine: { color: colors.border, width: 1, style: 0, labelVisible: false },
      },
      leftPriceScale:  { visible: false },
      rightPriceScale: { visible: false },
      timeScale: {
        borderColor: colors.border,
        tickMarkFormatter: tickFormatter,
        fixLeftEdge:  true,
        fixRightEdge: true,
      },
      handleScroll: true,
      handleScale:  false,
    });

    // ── Candlestick series ──────────────────────────────────────────────────
    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor:         "#ef4444",
      downColor:       "#3b82f6",
      borderUpColor:   "#ef4444",
      borderDownColor: "#3b82f6",
      wickUpColor:     "#ef4444",
      wickDownColor:   "#3b82f6",
      priceLineVisible:  false,
      lastValueVisible:  false,
    });

    // ── Volume histogram ────────────────────────────────────────────────────
    const volSeries = chart.addSeries(HistogramSeries, {
      priceFormat:      { type: "volume" },
      priceScaleId:     "vol",
      lastValueVisible: false,
      priceLineVisible: false,
    });
    chart.priceScale("vol").applyOptions({
      scaleMargins: { top: 0.82, bottom: 0 },
    });

    // ── Feed data ──────────────────────────────────────────────────────────
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    candleSeries.setData(candles.map((c) => ({ time: c.time, open: c.open, high: c.high, low: c.low, close: c.close })) as any);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    volSeries.setData(candles.map((c) => ({ time: c.time, value: c.volume, color: c.close >= c.open ? "rgba(239,68,68,0.45)" : "rgba(59,130,246,0.45)" })) as any);

    const map = new Map<number, Candle>();
    candles.forEach((c) => map.set(c.time, c));
    candleMapRef.current = map;

    chart.timeScale().fitContent();

    // ── Crosshair → tooltip ────────────────────────────────────────────────
    chart.subscribeCrosshairMove((param) => {
      if (!param.time || !param.point) { setTooltip(null); return; }
      const c = candleMapRef.current.get(param.time as number);
      if (!c) { setTooltip(null); return; }
      setTooltip({
        date: formatTooltipDate(c.time),
        open: c.open, close: c.close, high: c.high, low: c.low,
        volume: c.volume,
        changeRate: ((c.close - c.open) / c.open) * 100,
        cursorX: param.point.x,
        cursorY: param.point.y,
      });
    });

    const ro = new ResizeObserver(() => {
      if (chartElRef.current)
        chart.resize(chartElRef.current.clientWidth, chartElRef.current.clientHeight);
    });
    ro.observe(chartElRef.current);

    return () => { ro.disconnect(); chart.remove(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candles, theme]);

  return (
    <div ref={wrapRef} className="relative h-full w-full">
      <div ref={chartElRef} className="h-full w-full" />

      {tooltip && (
        <div
          className="pointer-events-none absolute z-10 rounded-xl border border-[var(--tds-border-default)] bg-[var(--tds-surface-elevated)] px-3 py-2.5 text-[11px] shadow-lg"
          style={(() => {
            const W   = wrapRef.current?.clientWidth  ?? 0;
            const H   = wrapRef.current?.clientHeight ?? 0;
            const GAP = 12;
            const TW  = 160; // tooltip approx width
            const TH  = 170; // tooltip approx height
            const onRight = tooltip.cursorX + GAP + TW <= W;
            const x = onRight ? tooltip.cursorX + GAP : tooltip.cursorX - GAP - TW;
            const y = Math.max(4, Math.min(tooltip.cursorY - TH / 2, H - TH - 4));
            return { left: x, top: y, minWidth: TW };
          })()}
        >
          <div className="mb-2 text-[12px] font-semibold text-[var(--tds-text-primary)]">
            {tooltip.date}
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-[3px]">
            {([
              ["시작",   tooltip.open.toLocaleString("ko-KR") + "원",  ""],
              ["마지막", tooltip.close.toLocaleString("ko-KR") + "원", ""],
              ["최고",   tooltip.high.toLocaleString("ko-KR") + "원",  ""],
              ["최저",   tooltip.low.toLocaleString("ko-KR") + "원",   ""],
              ["거래량", formatVolume(tooltip.volume),                  ""],
            ] as const).map(([label, value]) => (
              <div key={label} className="contents">
                <span className="text-[var(--tds-text-tertiary)]">{label}</span>
                <span className="text-right tabular-nums text-[var(--tds-text-primary)]">{value}</span>
              </div>
            ))}
            <div className="contents">
              <span className="text-[var(--tds-text-tertiary)]">등락률</span>
              <span className={cn(
                "text-right tabular-nums font-medium",
                tooltip.changeRate > 0 ? "text-[var(--tds-text-rise)]" :
                tooltip.changeRate < 0 ? "text-[var(--tds-text-fall)]" :
                "text-[var(--tds-text-tertiary)]",
              )}>
                {tooltip.changeRate > 0 ? "+" : ""}{tooltip.changeRate.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
