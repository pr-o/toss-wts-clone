import { NextResponse } from "next/server";
import { ALL_STOCKS } from "@/mocks/data/stocks";
import type { Candle } from "@/types/stock";

function jitter(price: number, pct = 0.005) {
  return price * (1 + (Math.random() * 2 - 1) * pct);
}

function generateCandles(basePrice: number, count = 200): Candle[] {
  const candles: Candle[] = [];
  let price = basePrice * 0.8;
  const now = Math.floor(Date.now() / 1000);
  for (let i = count; i >= 0; i--) {
    const open = price;
    const close = jitter(price, 0.015);
    const high = Math.max(open, close) * (1 + Math.random() * 0.01);
    const low  = Math.min(open, close) * (1 - Math.random() * 0.01);
    candles.push({ time: now - i * 86400, open: Math.round(open), high: Math.round(high), low: Math.round(low), close: Math.round(close), volume: Math.floor(Math.random() * 1_000_000 + 100_000) });
    price = close;
  }
  return candles;
}

export function GET(_req: Request, { params }: { params: Promise<{ symbol: string }> }) {
  return params.then(({ symbol }) => {
    const stock = ALL_STOCKS.find((s) => s.symbol === symbol);
    if (!stock) return new NextResponse(null, { status: 404 });
    return NextResponse.json(generateCandles(stock.price));
  });
}
