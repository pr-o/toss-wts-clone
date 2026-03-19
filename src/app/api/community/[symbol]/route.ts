import { NextResponse } from "next/server";
import { COMMUNITY_POSTS } from "@/mocks/data/community";

export function GET(_req: Request, { params }: { params: Promise<{ symbol: string }> }) {
  return params.then(({ symbol }) =>
    NextResponse.json(COMMUNITY_POSTS.filter((p) => p.symbol === symbol))
  );
}
