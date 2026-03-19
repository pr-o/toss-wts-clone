import { NextResponse } from "next/server";
import { MARKET_INDICES } from "@/mocks/data/stocks";

function jitter(value: number, pct = 0.005) {
  return parseFloat((value * (1 + (Math.random() * 2 - 1) * pct)).toFixed(2));
}

export function GET() {
  return NextResponse.json(MARKET_INDICES.map((idx) => ({ ...idx, value: jitter(idx.value) })));
}
