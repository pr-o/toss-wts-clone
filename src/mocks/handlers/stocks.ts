import { http, HttpResponse } from "msw";
import { ALL_STOCKS, MARKET_INDICES } from "../data/stocks";
import type { Candle, OrderBook } from "@/types/stock";

// Simulate price drift on each call
function jitter(price: number, pct = 0.005): number {
  return price * (1 + (Math.random() * 2 - 1) * pct);
}

function generateCandles(basePrice: number, count = 200): Candle[] {
  const candles: Candle[] = [];
  let price = basePrice * 0.8;
  const now = Math.floor(Date.now() / 1000);
  for (let i = count; i >= 0; i--) {
    const open = price;
    const close = jitter(price, 0.015);
    const high = Math.max(open, close) * (1 + Math.random() * 0.01);
    const low = Math.min(open, close) * (1 - Math.random() * 0.01);
    candles.push({
      time: now - i * 86400,
      open: Math.round(open),
      high: Math.round(high),
      low: Math.round(low),
      close: Math.round(close),
      volume: Math.floor(Math.random() * 1000000 + 100000),
    });
    price = close;
  }
  return candles;
}

function generateOrderBook(basePrice: number): OrderBook {
  const asks: OrderBook["asks"] = [];
  const bids: OrderBook["bids"] = [];
  for (let i = 1; i <= 10; i++) {
    asks.push({ price: Math.round(basePrice * (1 + i * 0.001)), quantity: Math.floor(Math.random() * 500 + 10), count: Math.floor(Math.random() * 20 + 1) });
    bids.push({ price: Math.round(basePrice * (1 - i * 0.001)), quantity: Math.floor(Math.random() * 500 + 10), count: Math.floor(Math.random() * 20 + 1) });
  }
  return { symbol: "", asks, bids, timestamp: Date.now() };
}

export const stockHandlers = [
  // GET /api/stocks — list all stocks
  http.get("/api/stocks", () => {
    const stocks = ALL_STOCKS.map((s) => ({ ...s, price: Math.round(jitter(s.price)) }));
    return HttpResponse.json(stocks);
  }),

  // GET /api/stocks/:symbol
  http.get("/api/stocks/:symbol", ({ params }) => {
    const stock = ALL_STOCKS.find((s) => s.symbol === params.symbol);
    if (!stock) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json({ ...stock, price: Math.round(jitter(stock.price)) });
  }),

  // GET /api/stocks/:symbol/candles?interval=1d
  http.get("/api/stocks/:symbol/candles", ({ params }) => {
    const stock = ALL_STOCKS.find((s) => s.symbol === params.symbol);
    if (!stock) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(generateCandles(stock.price));
  }),

  // GET /api/stocks/:symbol/orderbook
  http.get("/api/stocks/:symbol/orderbook", ({ params }) => {
    const stock = ALL_STOCKS.find((s) => s.symbol === params.symbol);
    if (!stock) return new HttpResponse(null, { status: 404 });
    const ob = generateOrderBook(stock.price);
    return HttpResponse.json({ ...ob, symbol: stock.symbol });
  }),

  // GET /api/indices
  http.get("/api/indices", () => {
    const indices = MARKET_INDICES.map((idx) => ({
      ...idx,
      value: parseFloat(jitter(idx.value).toFixed(2)),
    }));
    return HttpResponse.json(indices);
  }),
];
