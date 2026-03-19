import { NextResponse } from "next/server";

export function DELETE() {
  // MSW handles order cancellation in the browser; this is a server-side fallback
  return new NextResponse(null, { status: 404 });
}
