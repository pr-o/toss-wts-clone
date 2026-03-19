import { NextResponse } from "next/server";
import { TICKER_INDICES } from "@/mocks/data/stocks";

function jitter(value: number, pct = 0.002) {
  return parseFloat((value * (1 + (Math.random() * 2 - 1) * pct)).toFixed(2));
}

export function GET() {
  return NextResponse.json(TICKER_INDICES.map((idx) => ({ ...idx, value: jitter(idx.value) })));
}
