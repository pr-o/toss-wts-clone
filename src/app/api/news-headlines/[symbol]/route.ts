import { NextResponse } from "next/server";
import { NEWS_HEADLINES } from "@/mocks/data/community";

export function GET(_req: Request, { params }: { params: Promise<{ symbol: string }> }) {
  return params.then(({ symbol }) =>
    NextResponse.json(NEWS_HEADLINES.filter((n) => n.symbol === symbol))
  );
}
