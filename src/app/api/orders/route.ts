import { NextResponse } from "next/server";
import type { Order } from "@/types/order";

// Server-side in-memory store (MSW owns the browser-side state)
const orders: Order[] = [];

export function GET() {
  return NextResponse.json(orders);
}

export async function POST(req: Request) {
  const body = (await req.json()) as Omit<Order, "id" | "filledQuantity" | "status" | "createdAt">;
  const order: Order = {
    ...body,
    id: crypto.randomUUID(),
    filledQuantity: body.type === "market" ? body.quantity : 0,
    status: body.type === "market" ? "filled" : "pending",
    createdAt: Date.now(),
  };
  orders.push(order);
  return NextResponse.json(order, { status: 201 });
}
