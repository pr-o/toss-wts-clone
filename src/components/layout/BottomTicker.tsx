"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, useAnimationControls } from "motion/react";
import { useRouter } from "next/navigation";
import { cn, formatChange, getPriceDirection } from "@/lib/utils";
import type { MarketIndex } from "@/types/stock";

async function fetchTicker(): Promise<MarketIndex[]> {
  const res = await fetch("/api/ticker");
  return res.json();
}

function formatValue(value: number): string {
  // Values >= 100 use comma-separated integers; < 100 (e.g. VIX) keep 2 decimals
  if (value >= 1000) return value.toLocaleString("ko-KR", { maximumFractionDigits: 2 });
  return value.toFixed(2);
}

export function BottomTicker() {
  const controls = useAnimationControls();
  const router = useRouter();
  const { data: items = [] } = useQuery({
    queryKey: ["ticker"],
    queryFn: fetchTicker,
    refetchInterval: 10_000,
  });

  useEffect(() => {
    if (items.length > 0) controls.start({ x: ["0%", "-50%"] });
  }, [items.length]); // eslint-disable-line react-hooks/exhaustive-deps

  if (items.length === 0) return null;

  const tickerContent = (
    <span className="flex items-center gap-0">
      {items.map((item, i) => {
        const dir = getPriceDirection(item.changeRate);
        return (
          <span key={`${item.id}-${i}`} className="flex items-center">
            {i > 0 && <span className="mx-5 text-[var(--tds-border-strong)]">|</span>}
            <span
              className="group flex cursor-pointer items-center gap-0 rounded px-1.5 py-0.5 transition-colors hover:bg-[var(--tds-text-brand)]/10"
              onClick={() => router.push(`/indices/${item.id}`)}
            >
              <span className="text-[var(--tds-text-secondary)] group-hover:text-[var(--tds-text-brand)] group-hover:underline">{item.name}</span>
              <span className="ml-1.5 tabular-nums font-medium text-[var(--tds-text-primary)]">
                {formatValue(item.value)}
              </span>
              <span className={cn("ml-1 tabular-nums", {
                "text-[var(--tds-text-rise)]": dir === "rise",
                "text-[var(--tds-text-fall)]": dir === "fall",
                "text-[var(--tds-text-tertiary)]": dir === "flat",
              })}>
                {formatChange(item.changeRate)}
              </span>
            </span>
          </span>
        );
      })}
    </span>
  );

  return (
    <footer
      className="flex h-7 shrink-0 items-center overflow-hidden border-t border-[var(--tds-border-default)] bg-[var(--tds-surface-elevated)] text-[11px]"
      onMouseEnter={() => controls.stop()}
      onMouseLeave={() => controls.start({ x: ["0%", "-50%"] })}
    >
      <div className="relative flex-1 overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          animate={controls}
          transition={{ duration: 35, ease: "linear", repeat: Infinity }}
        >
          <span className="pr-20">{tickerContent}</span>
          <span className="pr-20">{tickerContent}</span>
        </motion.div>
      </div>
    </footer>
  );
}
