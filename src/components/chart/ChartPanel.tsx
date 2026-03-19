"use client";

import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { createChart, type IChartApi, type ISeriesApi, CandlestickSeries } from "lightweight-charts";
import { useThemeStore } from "@/stores/themeStore";
import type { Candle } from "@/types/stock";

function resolveChartColors() {
  const s = getComputedStyle(document.documentElement);
  return {
    text:   s.getPropertyValue("--chart-text").trim(),
    grid:   s.getPropertyValue("--chart-grid").trim(),
    border: s.getPropertyValue("--chart-border").trim(),
  };
}

interface ChartPanelProps {
  symbol: string;
}

async function fetchCandles(symbol: string): Promise<Candle[]> {
  const res = await fetch(`/api/stocks/${symbol}/candles`);
  return res.json();
}

export function ChartPanel({ symbol }: ChartPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const theme = useThemeStore((s) => s.theme);

  const { data: candles } = useQuery({
    queryKey: ["candles", symbol],
    queryFn: () => fetchCandles(symbol),
    staleTime: Infinity,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });

  // Initialize chart
  useEffect(() => {
    if (!containerRef.current) return;

    const colors = resolveChartColors();

    const chart = createChart(containerRef.current, {
      width:  containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
      layout: {
        background: { color: "transparent" },
        textColor: colors.text,
      },
      grid: {
        vertLines: { color: colors.grid },
        horzLines: { color: colors.grid },
      },
      crosshair: { mode: 1 },
      rightPriceScale: { borderColor: colors.border },
      timeScale:       { borderColor: colors.border },
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor:          "#ef4444",   // Korean convention: red = rise
      downColor:        "#3b82f6",   // blue = fall
      borderUpColor:    "#ef4444",
      borderDownColor:  "#3b82f6",
      wickUpColor:      "#ef4444",
      wickDownColor:    "#3b82f6",
    });

    chartRef.current  = chart;
    seriesRef.current = series;

    const ro = new ResizeObserver(() => {
      if (!containerRef.current) return;
      chart.resize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    });
    ro.observe(containerRef.current);

    return () => {
      ro.disconnect();
      chart.remove();
    };
  }, []);

  // Re-apply colors when theme switches
  useEffect(() => {
    if (!chartRef.current) return;
    const colors = resolveChartColors();
    chartRef.current.applyOptions({
      layout:          { textColor: colors.text },
      grid:            { vertLines: { color: colors.grid }, horzLines: { color: colors.grid } },
      rightPriceScale: { borderColor: colors.border },
      timeScale:       { borderColor: colors.border },
    });
  }, [theme]);

  // Update data
  useEffect(() => {
    if (!seriesRef.current || !candles) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    seriesRef.current.setData(candles as any);
  }, [candles]);

  return (
    <div className="flex h-full flex-col bg-[var(--tds-surface-base)]">
      <div className="flex items-center gap-2 border-b border-[var(--tds-border-default)] px-3 py-1.5">
        <span className="text-xs font-medium text-[var(--tds-text-primary)]">{symbol}</span>
        <span className="text-[10px] text-[var(--tds-text-tertiary)]">일봉</span>
      </div>
      <div ref={containerRef} className="flex-1" />
    </div>
  );
}
