import { http, HttpResponse } from "msw";
import { COMMUNITY_POSTS, NEWS_HEADLINES } from "../data/community";

export const communityHandlers = [
  http.get("/api/community/:symbol", ({ params }) => {
    const posts = COMMUNITY_POSTS.filter((p) => p.symbol === params.symbol);
    return HttpResponse.json(posts);
  }),

  http.get("/api/news-headlines/:symbol", ({ params }) => {
    const headlines = NEWS_HEADLINES.filter((n) => n.symbol === params.symbol);
    return HttpResponse.json(headlines);
  }),

  // Investor trend data
  http.get("/api/investor-trend/:symbol", ({ params }) => {
    const seed = params.symbol?.toString().charCodeAt(0) ?? 0;
    const rand = (base: number, spread: number) =>
      Math.round(base + (((seed * 7 + Math.random() * 100) % spread) - spread / 2));

    return HttpResponse.json({
      symbol: params.symbol,
      retail:      rand(-50000, 200000),
      foreign:     rand(-100000, 150000),
      institution: rand(-30000, 80000),
      history: Array.from({ length: 5 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const fmt = `${d.getFullYear().toString().slice(2)}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
        return {
          date: fmt,
          retail:      rand(-500000, 10000000),
          foreign:     rand(-200000, 5000000),
          institution: rand(-100000, 3000000),
        };
      }),
    });
  }),

  // Recent trades (시세)
  http.get("/api/trades/:symbol", ({ params }) => {
    const baseStock = params.symbol;
    const basePrice = baseStock === "005930" ? 74800 : baseStock === "000660" ? 178500 : 50000;
    const now = new Date();
    const trades = Array.from({ length: 20 }, (_, i) => {
      const d = new Date(now.getTime() - i * 30000);
      const price = Math.round(basePrice * (1 + (Math.random() * 0.01 - 0.005)));
      const changeRate = ((price - basePrice) / basePrice) * 100;
      return {
        price,
        quantity: Math.floor(Math.random() * 50 + 1),
        changeRate: parseFloat(changeRate.toFixed(2)),
        totalVolume: Math.floor(1500000 + Math.random() * 100000 - i * 5000),
        time: `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`,
      };
    });
    return HttpResponse.json(trades);
  }),
];
