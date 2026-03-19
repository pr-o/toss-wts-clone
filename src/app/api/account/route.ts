import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    balance: 10_000_000,
    totalAsset: 10_000_000,
    totalPnl: 0,
    totalPnlRate: 0,
    positions: [],
  });
}
