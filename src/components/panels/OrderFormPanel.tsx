"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Minus, Plus } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import type { Stock } from "@/types/stock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  function adjustPrice(delta: number) { setPrice((p) => Math.max(1, (typeof p === "number" ? p : numPrice) + delta)); }
  function adjustQty(delta: number)   { setQty((q) => Math.max(0, (typeof q === "number" ? q : 0) + delta)); }
  function setQtyPct(pct: number)     { const maxQty = Math.floor(10_000_000 / numPrice); setQty(Math.floor(maxQty * pct / 100)); }

  return (
    <div className="flex h-full flex-col bg-[var(--tds-surface-base)] text-xs">
      {/* Order mode tabs */}
      <Tabs
        value={orderTab}
        onValueChange={(v) => setOrderTab(v as OrderTab)}
        className="shrink-0 border-b border-[var(--tds-border-default)]"
      >
        <TabsList className="h-auto w-full rounded-none bg-transparent p-0">
          {ORDER_TABS.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className={cn(
                "relative flex-1 rounded-none py-2 text-[11px] font-medium transition-colors",
                "data-active:text-[var(--tds-text-primary)] data-active:bg-[var(--tds-surface-base)] data-active:shadow-none",
                "text-[var(--tds-text-tertiary)] bg-[var(--tds-surface-elevated)]",
                "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[var(--tds-text-brand)] after:opacity-0 data-active:after:opacity-100"
              )}
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Buy/Sell/Wait tabs */}
      <Tabs
        value={sideTab}
        onValueChange={(v) => setSideTab(v as SideTab)}
        className="shrink-0 border-b border-[var(--tds-border-default)] px-3 pt-2 pb-0"
      >
        <TabsList className="h-auto gap-1 rounded-none bg-transparent p-0">
          {SIDE_TABS.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className={cn(
                "relative h-auto rounded-none px-3 pb-2 text-[11px] font-medium transition-colors",
                "data-active:bg-transparent data-active:shadow-none",
                tab === "구매" && "data-active:text-[var(--tds-text-rise)] after:bg-[var(--tds-text-rise)]",
                tab === "판매" && "data-active:text-[var(--tds-text-fall)] after:bg-[var(--tds-text-fall)]",
                tab === "대기" && "data-active:text-[var(--tds-text-secondary)] after:bg-[var(--tds-text-secondary)]",
                "text-[var(--tds-text-tertiary)]",
                "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:opacity-0 data-active:after:opacity-100"
              )}
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <ScrollArea className="flex-1">
        <div className="px-3 py-3 space-y-3">
          {/* 주문 유형 */}
          <div className="flex items-center justify-between">
            <span className="text-[var(--tds-text-secondary)]">주문 유형</span>
            <Select
              value={orderType}
              onValueChange={(v) => setOrderType(v as typeof orderType)}
            >
              <SelectTrigger
                size="sm"
                className="h-auto rounded border border-[var(--tds-border-default)] bg-[var(--tds-surface-base)] px-2 py-1 text-[11px] text-[var(--tds-text-primary)]"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ORDER_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 구매 가격 toggle */}
          <div>
            <div className="mb-1.5 text-[var(--tds-text-secondary)]">구매 가격</div>
            <Tabs
              value={priceType}
              onValueChange={(v) => setPriceType(v as "지정가" | "시장가")}
            >
              <TabsList className="h-auto w-full rounded-lg border border-[var(--tds-border-default)] bg-transparent p-0 overflow-hidden">
                {PRICE_TYPES.map((t) => (
                  <TabsTrigger
                    key={t}
                    value={t}
                    className="flex-1 rounded-none py-1.5 text-[11px] font-medium transition-colors data-active:bg-[var(--tds-surface-overlay)] data-active:text-[var(--tds-text-primary)] data-active:shadow-none text-[var(--tds-text-tertiary)]"
                  >
                    {t}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Price input */}
          {priceType === "지정가" && (
            <div>
              <div className="flex items-center gap-1 rounded-lg border border-[var(--tds-border-default)] px-2 py-1.5 focus-within:border-[var(--tds-text-brand)]">
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
                  className="h-auto flex-1 border-0 bg-transparent p-0 text-right tabular-nums text-sm font-medium text-[var(--tds-text-primary)] shadow-none focus-visible:ring-0"
                />
                <span className="text-[var(--tds-text-tertiary)]">원</span>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => adjustPrice(-(stock?.change ?? 100))}
                  className="text-[var(--tds-text-tertiary)] hover:text-[var(--tds-text-secondary)]"
                >
                  <Minus size={12} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => adjustPrice(stock?.change ?? 100)}
                  className="text-[var(--tds-text-tertiary)] hover:text-[var(--tds-text-secondary)]"
                >
                  <Plus size={12} />
                </Button>
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
              <Input
                type="number"
                value={qty}
                onChange={(e) => setQty(e.target.value === "" ? "" : Number(e.target.value))}
                className="h-auto flex-1 border-0 bg-transparent p-0 text-right tabular-nums text-sm font-medium text-[var(--tds-text-primary)] shadow-none focus-visible:ring-0"
                min={0}
              />
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => adjustQty(-1)}
                className="text-[var(--tds-text-tertiary)] hover:text-[var(--tds-text-secondary)]"
              >
                <Minus size={12} />
              </Button>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => adjustQty(1)}
                className="text-[var(--tds-text-tertiary)] hover:text-[var(--tds-text-secondary)]"
              >
                <Plus size={12} />
              </Button>
            </div>
            {/* Percentage shortcuts */}
            <div className="mt-1.5 flex gap-1">
              {QTY_PRESETS.map((pct) => (
                <Button
                  key={pct}
                  variant="outline"
                  size="xs"
                  onClick={() => setQtyPct(pct)}
                  className="flex-1 border-[var(--tds-border-default)] py-1 text-[10px] text-[var(--tds-text-secondary)] hover:bg-[var(--tds-surface-overlay)]"
                >
                  {pct}%
                </Button>
              ))}
              <Button
                variant="outline"
                size="xs"
                onClick={() => setQtyPct(100)}
                className="flex-1 border-[var(--tds-border-default)] py-1 text-[10px] text-[var(--tds-text-secondary)] hover:bg-[var(--tds-surface-overlay)]"
              >
                최대
              </Button>
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
      </ScrollArea>

      {/* CTA button */}
      <div className="shrink-0 border-t border-[var(--tds-border-default)] p-3">
        <Button
          onClick={() => { alert(`${sideTab} 주문: ${numQty}주 @ ${formatPrice(numPrice)}원`); }}
          className={cn(
            "w-full rounded-xl py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 active:opacity-75",
            sideTab === "구매" ? "bg-[var(--tds-text-rise)]" :
            sideTab === "판매" ? "bg-[var(--tds-text-fall)]" : "bg-[var(--tds-text-tertiary)]"
          )}
        >
          {sideTab}하기
        </Button>
      </div>
    </div>
  );
}
