import { NextResponse } from "next/server";
import { ALL_STOCKS } from "@/mocks/data/stocks";

export function GET(_req: Request, { params }: { params: Promise<{ symbol: string }> }) {
  return params.then(({ symbol }) => {
    const stock = ALL_STOCKS.find((s) => s.symbol === symbol);
    const basePrice = stock?.price ?? 50000;
    const now = new Date();
    const trades = Array.from({ length: 20 }, (_, i) => {
      const d = new Date(now.getTime() - i * 30000);
      const price = Math.round(basePrice * (1 + (Math.random() * 0.01 - 0.005)));
      return {
        price,
        quantity: Math.floor(Math.random() * 50 + 1),
        changeRate: parseFloat((((price - basePrice) / basePrice) * 100).toFixed(2)),
        totalVolume: Math.floor(1_500_000 + Math.random() * 100_000 - i * 5000),
        time: `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`,
      };
    });
    return NextResponse.json(trades);
  });
}
