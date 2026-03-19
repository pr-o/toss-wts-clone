import { NextResponse } from "next/server";

export function GET(_req: Request, { params }: { params: Promise<{ symbol: string }> }) {
  return params.then(({ symbol }) => {
    const seed = symbol.charCodeAt(0) ?? 0;
    const rand = (base: number, spread: number) =>
      Math.round(base + (((seed * 7 + Math.random() * 100) % spread) - spread / 2));

    return NextResponse.json({
      symbol,
      retail:      rand(-50000, 200000),
      foreign:     rand(-100000, 150000),
      institution: rand(-30000, 80000),
      history: Array.from({ length: 5 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const fmt = `${d.getFullYear().toString().slice(2)}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
        return { date: fmt, retail: rand(-500000, 10000000), foreign: rand(-200000, 5000000), institution: rand(-100000, 3000000) };
      }),
    });
  });
}
