export interface Stock {
  symbol: string;      // e.g. "005930" (KRX) or "AAPL" (US)
  name: string;        // e.g. "삼성전자"
  market: "KRX" | "NASDAQ" | "NYSE" | "KOSDAQ";
  price: number;
  change: number;      // absolute change
  changeRate: number;  // percent change
  volume: number;
  marketCap?: number;
  high: number;
  low: number;
  open: number;
  prevClose: number;
  // Home page ranking extras
  rank?: number;
  tradeVolumeBillion?: number;  // 거래대금 순 (억원)
  buyRatio?: number;            // 0–100, buyer percentage
  avatarColor?: string;         // hex color for avatar circle
}

export interface CommunityPost {
  id: string;
  symbol: string;
  username: string;
  avatarColor: string;
  minutesAgo: number;
  content: string;
  likes: number;
}

export interface NewsHeadline {
  id: string;
  symbol: string;
  content: string;
  hoursAgo: number;
  iconColor: string;
}

export interface InvestorTrend {
  symbol: string;
  retail: number;       // 개인 (net buy quantity)
  foreign: number;      // 외국인
  institution: number;  // 기관
  history: Array<{
    date: string;
    retail: number;
    foreign: number;
    institution: number;
  }>;
}

export interface Trade {
  price: number;
  quantity: number;
  changeRate: number;
  totalVolume: number;
  time: string;
}

export interface MarketIndex {
  id: string;          // e.g. "KOSPI"
  name: string;
  value: number;
  change: number;
  changeRate: number;
}

export interface Candle {
  time: number;        // Unix timestamp (seconds)
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface OrderBookEntry {
  price: number;
  quantity: number;
  count: number;
}

export interface OrderBook {
  symbol: string;
  bids: OrderBookEntry[];   // buy orders (내림차순)
  asks: OrderBookEntry[];   // sell orders (오름차순)
  timestamp: number;
}

export type NewsItem = {
  id: string;
  title: string;
  source: string;
  publishedAt: string;
  url?: string;
  relatedSymbols?: string[];
};
