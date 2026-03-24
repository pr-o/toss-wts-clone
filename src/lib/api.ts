import type {
  Stock,
  StockTrend,
  Candle,
  OrderBook,
  MarketIndex,
  CommunityPost,
  NewsHeadline,
  InvestorTrend,
} from "@/types/stock";

const get = <T>(path: string): Promise<T> => fetch(path).then((r) => r.json());

export const api = {
  stocks: () => get<Stock[]>("/api/stocks"),
  stock: (symbol: string) => get<Stock>(`/api/stocks/${symbol}`),
  candles: (symbol: string) => get<Candle[]>(`/api/stocks/${symbol}/candles`),
  orderbook: (symbol: string) => get<OrderBook>(`/api/stocks/${symbol}/orderbook`),
  ticker: () => get<MarketIndex[]>("/api/ticker"),
  posts: (symbol: string) => get<CommunityPost[]>(`/api/community/${symbol}`),
  news: (symbol: string) => get<NewsHeadline[]>(`/api/news-headlines/${symbol}`),
  investorTrends: () => get<StockTrend[]>("/api/investor-trends"),
  investorTrend: (symbol: string) => get<InvestorTrend>(`/api/investor-trend/${symbol}`),
};
