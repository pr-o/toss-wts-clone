import { NextResponse } from "next/server";
import { ALL_STOCKS } from "@/mocks/data/stocks";

function jitter(price: number, pct = 0.005) {
  return price * (1 + (Math.random() * 2 - 1) * pct);
}

export function GET() {
  const stocks = ALL_STOCKS.map((s) => ({ ...s, price: Math.round(jitter(s.price)) }));
  return NextResponse.json(stocks);
}
