"use client";

import { useQuery } from "@tanstack/react-query";
import { formatPrice, getPriceDirection, cn } from "@/lib/utils";
import type { OrderBook } from "@/types/stock";

interface OrderBookPanelProps {
  symbol: string;
}

async function fetchOrderBook(symbol: string): Promise<OrderBook> {
  const res = await fetch(`/api/stocks/${symbol}/orderbook`);
  return res.json();
}

export function OrderBookPanel({ symbol }: OrderBookPanelProps) {
  const { data: ob } = useQuery({
    queryKey: ["orderbook", symbol],
    queryFn: () => fetchOrderBook(symbol),
    refetchInterval: 2_000,
  });

  const maxQty = Math.max(
    ...(ob?.asks.map((a) => a.quantity) ?? [1]),
    ...(ob?.bids.map((b) => b.quantity) ?? [1])
  );

  return (
    <div className="flex h-full flex-col bg-[var(--tds-surface-base)] text-xs">
      <div className="border-b border-[var(--tds-border-default)] px-3 py-1.5">
        <span className="font-medium text-[var(--tds-text-primary)]">호가</span>
      </div>

      {/* Header row */}
      <div className="grid grid-cols-3 gap-1 border-b border-[var(--tds-border-default)] px-2 py-1 text-[10px] text-[var(--tds-text-tertiary)]">
        <span>잔량</span>
        <span className="text-center">가격</span>
        <span className="text-right">잔량</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Asks (매도 — sells, shown top) */}
        {[...(ob?.asks ?? [])].reverse().map((ask, i) => (
          <div key={i} className="relative grid grid-cols-3 items-center gap-1 px-2 py-0.5">
            <div
              className="absolute right-0 top-0 h-full bg-[var(--tds-text-fall)] opacity-10"
              style={{ width: `${(ask.quantity / maxQty) * 50}%` }}
            />
            <span className="text-[var(--tds-text-tertiary)] tabular-nums">{ask.quantity.toLocaleString()}</span>
            <span className="text-center font-medium tabular-nums text-[var(--tds-text-fall)]">{formatPrice(ask.price)}</span>
            <span />
          </div>
        ))}

        {/* Spread indicator */}
        <div className="border-y border-[var(--tds-border-default)] py-0.5 text-center text-[10px] text-[var(--tds-text-tertiary)]">
          {ob ? `스프레드 ${formatPrice(ob.asks[0].price - ob.bids[0].price)}` : "—"}
        </div>

        {/* Bids (매수 — buys, shown bottom) */}
        {(ob?.bids ?? []).map((bid, i) => (
          <div key={i} className="relative grid grid-cols-3 items-center gap-1 px-2 py-0.5">
            <div
              className="absolute left-0 top-0 h-full bg-[var(--tds-text-rise)] opacity-10"
              style={{ width: `${(bid.quantity / maxQty) * 50}%` }}
            />
            <span />
            <span className="text-center font-medium tabular-nums text-[var(--tds-text-rise)]">{formatPrice(bid.price)}</span>
            <span className="text-right text-[var(--tds-text-tertiary)] tabular-nums">{bid.quantity.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
