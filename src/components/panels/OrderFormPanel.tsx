"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Minus, Plus } from "lucide-react";
import { cn, formatPrice, getPriceDirection } from "@/lib/utils";
import type { Stock } from "@/types/stock";

async function fetchStock(symbol: string): Promise<Stock> {
  const res = await fetch(`/api/stocks/${symbol}`);
  return res.json();
}

const ORDER_TABS   = ["일반주문", "간편주문", "조건주문"] as const;
const SIDE_TABS    = ["구매", "판매", "대기"] as const;
const PRICE_TYPES  = ["지정가", "시장가"] as const;
const ORDER_TYPES  = ["종가단일가", "보통", "시장가", "최유리지정가", "최우선지정가"] as const;
const QTY_PRESETS  = [10, 25, 50] as const;

type OrderTab = (typeof ORDER_TABS)[number];
type SideTab  = (typeof SIDE_TABS)[number];

export function OrderFormPanel({ symbol }: { symbol: string }) {
  const [orderTab,  setOrderTab]  = useState<OrderTab>("일반주문");
  const [sideTab,   setSideTab]   = useState<SideTab>("구매");
  const [priceType, setPriceType] = useState<"지정가" | "시장가">("지정가");
  const [orderType, setOrderType] = useState(ORDER_TYPES[0]);
  const [price,     setPrice]     = useState<number | "">("");
  const [qty,       setQty]       = useState<number | "">("");

  const { data: stock } = useQuery({
    queryKey: ["stock", symbol],
    queryFn: () => fetchStock(symbol),
    refetchInterval: 3_000,
  });

  const currentPrice = stock?.price ?? 0;
  useEffect(() => {
    if (price === "" && currentPrice) setPrice(currentPrice);
  }, [currentPrice]); // eslint-disable-line react-hooks/exhaustive-deps

  const numPrice  = typeof price === "number" ? price : currentPrice;
  const numQty    = typeof qty === "number" ? qty : 0;
  const totalAmt  = numPrice * numQty;
  const dir       = getPriceDirection(stock?.changeRate ?? 0);

  const isBuy  = sideTab === "구매";
  const isSell = sideTab === "판매";

  function adjustPrice(delta: number) { setPrice((p) => Math.max(1, (typeof p === "number" ? p : numPrice) + delta)); }
  function adjustQty(delta: number)   { setQty((q) => Math.max(0, (typeof q === "number" ? q : 0) + delta)); }
  function setQtyPct(pct: number)     { const maxQty = Math.floor(10_000_000 / numPrice); setQty(Math.floor(maxQty * pct / 100)); }

  return (
    <div className="flex h-full flex-col bg-[var(--tds-surface-base)] text-xs">
      {/* Order mode tabs */}
      <div className="flex shrink-0 border-b border-[var(--tds-border-default)]">
        {ORDER_TABS.map((tab) => (
          <button key={tab} onClick={() => setOrderTab(tab)}
            className={cn("flex-1 py-2 text-[11px] font-medium transition-colors relative",
              orderTab === tab
                ? "text-[var(--tds-text-primary)] bg-[var(--tds-surface-base)]"
                : "text-[var(--tds-text-tertiary)] bg-[var(--tds-surface-elevated)] hover:text-[var(--tds-text-secondary)]"
            )}>
            {tab}
            {orderTab === tab && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--tds-text-brand)]" />}
          </button>
        ))}
      </div>

      {/* Buy/Sell/Wait tabs */}
      <div className="flex shrink-0 border-b border-[var(--tds-border-default)] px-3 pt-2 pb-0 gap-1">
        {SIDE_TABS.map((tab) => (
          <button key={tab} onClick={() => setSideTab(tab)}
            className={cn("relative px-3 pb-2 text-[11px] font-medium transition-colors",
              sideTab === tab
                ? tab === "구매" ? "text-[var(--tds-text-rise)]"
                : tab === "판매" ? "text-[var(--tds-text-fall)]"
                : "text-[var(--tds-text-secondary)]"
                : "text-[var(--tds-text-tertiary)] hover:text-[var(--tds-text-secondary)]"
            )}>
            {tab}
            {sideTab === tab && (
              <span className={cn("absolute bottom-0 left-0 right-0 h-[2px]",
                tab === "구매" ? "bg-[var(--tds-text-rise)]" : tab === "판매" ? "bg-[var(--tds-text-fall)]" : "bg-[var(--tds-text-secondary)]"
              )} />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
        {/* 주문 유형 */}
        <div className="flex items-center justify-between">
          <span className="text-[var(--tds-text-secondary)]">주문 유형</span>
          <select
            value={orderType}
            onChange={(e) => setOrderType(e.target.value as typeof orderType)}
            className="rounded border border-[var(--tds-border-default)] bg-[var(--tds-surface-base)] px-2 py-1 text-[11px] text-[var(--tds-text-primary)] outline-none"
          >
            {ORDER_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>

        {/* 구매 가격 toggle */}
        <div>
          <div className="mb-1.5 text-[var(--tds-text-secondary)]">구매 가격</div>
          <div className="flex rounded-lg border border-[var(--tds-border-default)] overflow-hidden">
            {PRICE_TYPES.map((t) => (
              <button key={t} onClick={() => setPriceType(t)}
                className={cn("flex-1 py-1.5 text-[11px] font-medium transition-colors",
                  priceType === t ? "bg-[var(--tds-surface-overlay)] text-[var(--tds-text-primary)]" : "text-[var(--tds-text-tertiary)]"
                )}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Price input */}
        {priceType === "지정가" && (
          <div>
            <div className="flex items-center gap-1 rounded-lg border border-[var(--tds-border-default)] px-2 py-1.5 focus-within:border-[var(--tds-text-brand)]">
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
                className="flex-1 bg-transparent text-right tabular-nums text-sm font-medium text-[var(--tds-text-primary)] outline-none"
              />
              <span className="text-[var(--tds-text-tertiary)]">원</span>
              <button onClick={() => adjustPrice(-(stock?.change ?? 100))} className="text-[var(--tds-text-tertiary)] hover:text-[var(--tds-text-secondary)]"><Minus size={12} /></button>
              <button onClick={() => adjustPrice(stock?.change ?? 100)} className="text-[var(--tds-text-tertiary)] hover:text-[var(--tds-text-secondary)]"><Plus size={12} /></button>
            </div>
          </div>
        )}

        {/* 수량 */}
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[var(--tds-text-secondary)]">수량</span>
            <span className="text-[10px] text-[var(--tds-text-tertiary)]">최대 0주 가능</span>
          </div>
          <div className="flex items-center gap-1 rounded-lg border border-[var(--tds-border-default)] px-2 py-1.5 focus-within:border-[var(--tds-text-brand)]">
            <input
              type="number"
              value={qty}
              onChange={(e) => setQty(e.target.value === "" ? "" : Number(e.target.value))}
              className="flex-1 bg-transparent text-right tabular-nums text-sm font-medium text-[var(--tds-text-primary)] outline-none"
              min={0}
            />
            <button onClick={() => adjustQty(-1)} className="text-[var(--tds-text-tertiary)] hover:text-[var(--tds-text-secondary)]"><Minus size={12} /></button>
            <button onClick={() => adjustQty(1)}  className="text-[var(--tds-text-tertiary)] hover:text-[var(--tds-text-secondary)]"><Plus size={12} /></button>
          </div>
          {/* Percentage shortcuts */}
          <div className="mt-1.5 flex gap-1">
            {QTY_PRESETS.map((pct) => (
              <button key={pct} onClick={() => setQtyPct(pct)}
                className="flex-1 rounded border border-[var(--tds-border-default)] py-1 text-[10px] text-[var(--tds-text-secondary)] hover:bg-[var(--tds-surface-overlay)]">
                {pct}%
              </button>
            ))}
            <button onClick={() => setQtyPct(100)}
              className="flex-1 rounded border border-[var(--tds-border-default)] py-1 text-[10px] text-[var(--tds-text-secondary)] hover:bg-[var(--tds-surface-overlay)]">
              최대
            </button>
          </div>
        </div>

        {/* Total amount */}
        {numQty > 0 && (
          <div className="flex items-center justify-between rounded-lg bg-[var(--tds-surface-overlay)] px-3 py-2">
            <span className="text-[var(--tds-text-secondary)]">주문 금액</span>
            <span className="font-medium tabular-nums text-[var(--tds-text-primary)]">{formatPrice(totalAmt)}원</span>
          </div>
        )}
      </div>

      {/* CTA button */}
      <div className="shrink-0 border-t border-[var(--tds-border-default)] p-3">
        <button
          onClick={() => { alert(`${sideTab} 주문: ${numQty}주 @ ${formatPrice(numPrice)}원`); }}
          className={cn(
            "w-full rounded-xl py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 active:opacity-75",
            sideTab === "구매" ? "bg-[var(--tds-text-rise)]" :
            sideTab === "판매" ? "bg-[var(--tds-text-fall)]" : "bg-[var(--tds-text-tertiary)]"
          )}
        >
          {sideTab}하기
        </button>
      </div>
    </div>
  );
}
