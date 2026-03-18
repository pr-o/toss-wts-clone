import type { Stock, MarketIndex } from "@/types/stock";

export const KOREAN_STOCKS: Stock[] = [
  { symbol: "005930", name: "삼성전자", market: "KRX",    price: 74800,  change: 800,   changeRate: 1.08,  volume: 15234567, high: 75200, low: 74100, open: 74200, prevClose: 74000, marketCap: 446400000000000 },
  { symbol: "000660", name: "SK하이닉스",  market: "KRX",    price: 178500, change: -2500, changeRate: -1.38, volume: 3456789,  high: 181500, low: 177800, open: 181000, prevClose: 181000, marketCap: 130000000000000 },
  { symbol: "035720", name: "카카오",      market: "KRX",    price: 42350,  change: 650,   changeRate: 1.56,  volume: 2345678,  high: 42800, low: 41900, open: 42000, prevClose: 41700 },
  { symbol: "035420", name: "NAVER",       market: "KRX",    price: 182000, change: -1000, changeRate: -0.55, volume: 1234567,  high: 184500, low: 181000, open: 183500, prevClose: 183000 },
  { symbol: "051910", name: "LG화학",      market: "KRX",    price: 312000, change: 4000,  changeRate: 1.30,  volume: 567890,   high: 314500, low: 309000, open: 310000, prevClose: 308000 },
  { symbol: "005380", name: "현대차",      market: "KRX",    price: 215000, change: 2500,  changeRate: 1.18,  volume: 890123,   high: 216000, low: 213000, open: 213500, prevClose: 212500 },
  { symbol: "006400", name: "삼성SDI",     market: "KRX",    price: 267500, change: -3500, changeRate: -1.29, volume: 345678,   high: 272000, low: 266500, open: 271000, prevClose: 271000 },
  { symbol: "207940", name: "삼성바이오로직스", market: "KRX", price: 875000, change: 12000, changeRate: 1.39, volume: 123456,  high: 878000, low: 866000, open: 868000, prevClose: 863000 },
  { symbol: "068270", name: "셀트리온",    market: "KOSDAQ", price: 172500, change: -2000, changeRate: -1.15, volume: 678901,   high: 175500, low: 171500, open: 174500, prevClose: 174500 },
  { symbol: "003550", name: "LG",          market: "KRX",    price: 78400,  change: 900,   changeRate: 1.16,  volume: 456789,   high: 78800, low: 77600, open: 77700, prevClose: 77500 },
];

export const US_STOCKS: Stock[] = [
  { symbol: "AAPL",  name: "Apple",      market: "NASDAQ", price: 189.50, change: 2.30,  changeRate: 1.23,  volume: 58234567, high: 190.20, low: 187.80, open: 188.00, prevClose: 187.20, marketCap: 2900000000000 },
  { symbol: "MSFT",  name: "Microsoft",  market: "NASDAQ", price: 378.20, change: -3.10, changeRate: -0.81, volume: 23456789, high: 382.50, low: 377.10, open: 381.30, prevClose: 381.30 },
  { symbol: "NVDA",  name: "NVIDIA",     market: "NASDAQ", price: 467.50, change: 8.90,  changeRate: 1.94,  volume: 45678901, high: 469.80, low: 460.20, open: 461.00, prevClose: 458.60 },
  { symbol: "GOOGL", name: "Alphabet",   market: "NASDAQ", price: 152.80, change: 1.20,  changeRate: 0.79,  volume: 21345678, high: 153.50, low: 151.20, open: 151.80, prevClose: 151.60 },
  { symbol: "AMZN",  name: "Amazon",     market: "NASDAQ", price: 185.40, change: -0.90, changeRate: -0.48, volume: 32456789, high: 187.20, low: 184.60, open: 186.50, prevClose: 186.30 },
  { symbol: "META",  name: "Meta",       market: "NASDAQ", price: 498.70, change: 6.30,  changeRate: 1.28,  volume: 18234567, high: 500.20, low: 494.50, open: 495.00, prevClose: 492.40 },
  { symbol: "TSLA",  name: "Tesla",      market: "NASDAQ", price: 245.30, change: -4.20, changeRate: -1.68, volume: 89234567, high: 251.80, low: 244.10, open: 250.50, prevClose: 249.50 },
  { symbol: "BRK.B", name: "Berkshire",  market: "NYSE",   price: 378.90, change: 0.80,  changeRate: 0.21,  volume: 3456789,  high: 380.10, low: 377.50, open: 378.20, prevClose: 378.10 },
];

export const ALL_STOCKS = [...KOREAN_STOCKS, ...US_STOCKS];

export const MARKET_INDICES: MarketIndex[] = [
  { id: "KOSPI",   name: "KOSPI",   value: 2584.32, change: 18.24,  changeRate: 0.71 },
  { id: "KOSDAQ",  name: "KOSDAQ",  value: 862.15,  change: -4.37,  changeRate: -0.50 },
  { id: "SPX",     name: "S&P 500", value: 4789.10, change: 23.45,  changeRate: 0.49 },
  { id: "NDX",     name: "나스닥",   value: 16823.40, change: 98.70, changeRate: 0.59 },
  { id: "DJI",     name: "다우",     value: 37865.20, change: -45.30, changeRate: -0.12 },
  { id: "NQ1",     name: "나스닥선물", value: 16798.50, change: 45.20, changeRate: 0.27 },
];

// Bottom ticker — financial indices (separate from the top-bar nav indices)
export const TICKER_INDICES: MarketIndex[] = [
  { id: "DJI",   name: "다우존스",         value: 46993.26, change: 46.85,  changeRate: 0.09 },
  { id: "SOX",   name: "필라델피아 반도체", value: 7836.82,  change: 40.58,  changeRate: 0.52 },
  { id: "VIX",   name: "VIX",             value: 22.37,    change: -1.14,  changeRate: -4.84 },
  { id: "DXY",   name: "달러 인덱스",      value: 99.49,    change: -0.08,  changeRate: -0.08 },
  { id: "USDKRW",name: "달러 환율",        value: 1485.15,  change: -6.45,  changeRate: -0.43 },
  { id: "KOSPI2",name: "코스피",           value: 2581.54,  change: 18.24,  changeRate: 0.71 },
  { id: "KOSDAQ2",name: "코스닥",          value: 860.73,   change: -4.37,  changeRate: -0.50 },
  { id: "NQ1",   name: "나스닥선물",       value: 16726.09, change: 45.20,  changeRate: 0.27 },
];
