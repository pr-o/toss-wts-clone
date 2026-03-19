import { NextResponse } from "next/server";
import { ALL_STOCKS } from "@/mocks/data/stocks";

function jitter(price: number, pct = 0.005) {
  return price * (1 + (Math.random() * 2 - 1) * pct);
}

export function GET(_req: Request, { params }: { params: Promise<{ symbol: string }> }) {
  return params.then(({ symbol }) => {
    const stock = ALL_STOCKS.find((s) => s.symbol === symbol);
    if (!stock) return new NextResponse(null, { status: 404 });
    return NextResponse.json({ ...stock, price: Math.round(jitter(stock.price)) });
  });
}
