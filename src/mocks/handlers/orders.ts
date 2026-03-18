import { http, HttpResponse } from "msw";
import type { Order, Account } from "@/types/order";

const orders: Order[] = [];

let account: Account = {
  balance: 10_000_000,  // 1000만원
  totalAsset: 10_000_000,
  totalPnl: 0,
  totalPnlRate: 0,
  positions: [],
};

export const orderHandlers = [
  // GET /api/account
  http.get("/api/account", () => HttpResponse.json(account)),

  // GET /api/orders
  http.get("/api/orders", () => HttpResponse.json(orders)),

  // POST /api/orders
  http.post("/api/orders", async ({ request }) => {
    const body = (await request.json()) as Omit<Order, "id" | "filledQuantity" | "status" | "createdAt">;
    const order: Order = {
      ...body,
      id: crypto.randomUUID(),
      filledQuantity: 0,
      status: "pending",
      createdAt: Date.now(),
    };
    // Simulate instant fill for market orders
    if (order.type === "market") {
      order.filledQuantity = order.quantity;
      order.status = "filled";
    }
    orders.push(order);
    return HttpResponse.json(order, { status: 201 });
  }),

  // DELETE /api/orders/:id — cancel order
  http.delete("/api/orders/:id", ({ params }) => {
    const idx = orders.findIndex((o) => o.id === params.id);
    if (idx === -1) return new HttpResponse(null, { status: 404 });
    orders[idx].status = "cancelled";
    return HttpResponse.json(orders[idx]);
  }),
];
