import { NextResponse } from "next/server";
import { ALL_STOCKS } from "@/mocks/data/stocks";

function generateOrderBook(symbol: string, basePrice: number) {
  const asks = [];
  const bids = [];
  for (let i = 1; i <= 10; i++) {
    asks.push({ price: Math.round(basePrice * (1 + i * 0.001)), quantity: Math.floor(Math.random() * 500 + 10), count: Math.floor(Math.random() * 20 + 1) });
    bids.push({ price: Math.round(basePrice * (1 - i * 0.001)), quantity: Math.floor(Math.random() * 500 + 10), count: Math.floor(Math.random() * 20 + 1) });
  }
  return { symbol, asks, bids, timestamp: Date.now() };
}

export function GET(_req: Request, { params }: { params: Promise<{ symbol: string }> }) {
  return params.then(({ symbol }) => {
    const stock = ALL_STOCKS.find((s) => s.symbol === symbol);
    if (!stock) return new NextResponse(null, { status: 404 });
    return NextResponse.json(generateOrderBook(stock.symbol, stock.price));
  });
}
