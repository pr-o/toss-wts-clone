import type { Stock, MarketIndex } from "@/types/stock";

export const KOREAN_STOCKS: Stock[] = [
  { symbol: "000660", name: "SK하이닉스",       market: "KRX",    price: 178500, change: 14800,  changeRate: 8.96,  volume: 3456789,  high: 181500, low: 177800, open: 181000, prevClose: 163700, marketCap: 130000000000000, rank: 1,  tradeVolumeBillion: 430, buyRatio: 61, avatarColor: "#7c3aed" },
  { symbol: "005930", name: "삼성전자",          market: "KRX",    price: 74800,  change: 5200,   changeRate: 7.52,  volume: 15234567, high: 75200,  low: 74100,  open: 74200, prevClose: 69600, marketCap: 446400000000000,  rank: 2,  tradeVolumeBillion: 426, buyRatio: 67, avatarColor: "#1d4ed8" },
  { symbol: "122630", name: "KODEX 레버리지",    market: "KRX",    price: 95295,  change: 9855,   changeRate: 11.52, volume: 2345678,  high: 96000,  low: 87000,  open: 87500, prevClose: 85440,                               rank: 3,  tradeVolumeBillion: 195, buyRatio: 50, avatarColor: "#7c3aed" },
  { symbol: "047050", name: "포스코홀딩스",      market: "KRX",    price: 289000, change: 57900,  changeRate: 20.12, volume: 890123,   high: 290000, low: 280000, open: 281000, prevClose: 231100,                              rank: 4,  tradeVolumeBillion: 181, buyRatio: 55, avatarColor: "#059669" },
  { symbol: "005380", name: "현대차",            market: "KRX",    price: 215000, change: 8700,   changeRate: 4.21,  volume: 890123,   high: 216000, low: 213000, open: 213500, prevClose: 206300, marketCap: 45000000000000,  rank: 5,  tradeVolumeBillion: 90,  buyRatio: 70, avatarColor: "#1d4ed8" },
  { symbol: "069500", name: "KODEX 200",         market: "KRX",    price: 89490,  change: 4870,   changeRate: 5.73,  volume: 567890,   high: 90000,  low: 87500,  open: 88000, prevClose: 84620,                               rank: 6,  tradeVolumeBillion: 71,  buyRatio: 59, avatarColor: "#7c3aed" },
  { symbol: "252670", name: "KODEX 200선물인버스2X", market: "KRX", price: 233,   change: -32,    changeRate:-12.07, volume: 12345678, high: 270,    low: 228,    open: 265, prevClose: 265,                                   rank: 7,  tradeVolumeBillion: 67,  buyRatio: 57, avatarColor: "#dc2626" },
  { symbol: "042700", name: "한미반도체",         market: "KRX",    price: 311000, change: 10000,  changeRate: 3.32,  volume: 678901,   high: 312500, low: 302000, open: 305000, prevClose: 301000,                              rank: 8,  tradeVolumeBillion: 57,  buyRatio: 61, avatarColor: "#ea580c" },
  { symbol: "233740", name: "KODEX 코스닥150레버리지", market: "KOSDAQ", price: 17675, change: 974, changeRate: 5.83, volume: 3456789, high: 17900,  low: 17200,  open: 17300, prevClose: 16701,                              rank: 9,  tradeVolumeBillion: 45,  buyRatio: 59, avatarColor: "#7c3aed" },
  { symbol: "047040", name: "대우건설",           market: "KRX",    price: 14840,  change: 2720,   changeRate: 22.44, volume: 890123,   high: 15000,  low: 14200,  open: 14300, prevClose: 12120,                               rank: 10, tradeVolumeBillion: 44,  buyRatio: 55, avatarColor: "#0891b2" },
  { symbol: "035420", name: "NAVER",              market: "KRX",    price: 182000, change: -1000,  changeRate: -0.55, volume: 1234567,  high: 184500, low: 181000, open: 183500, prevClose: 183000,                              rank: 11, tradeVolumeBillion: 37,  buyRatio: 53, avatarColor: "#16a34a" },
  { symbol: "091810", name: "티와이홀딩스",       market: "KRX",    price: 48007,  change: 5299,   changeRate: 12.42, volume: 456789,   high: 48500,  low: 44500,  open: 45000, prevClose: 42708,                               rank: 12, tradeVolumeBillion: 33,  buyRatio: 38, avatarColor: "#7c3aed" },
  { symbol: "114800", name: "KODEX 인버스",       market: "KRX",    price: 1561,   change: -96,    changeRate: -5.81, volume: 12345678, high: 1620,   low: 1555,   open: 1620, prevClose: 1657,                                  rank: 13, tradeVolumeBillion: 32,  buyRatio: 47, avatarColor: "#dc2626" },
  { symbol: "035720", name: "카카오",             market: "KRX",    price: 42350,  change: 1750,   changeRate: 4.30,  volume: 2345678,  high: 42800,  low: 41900,  open: 42000, prevClose: 40600,                               rank: 14, tradeVolumeBillion: 32,  buyRatio: 60, avatarColor: "#fbbf24" },
  { symbol: "338220", name: "휴림로봇",           market: "KOSDAQ", price: 14870,  change: 1440,   changeRate: 10.71, volume: 345678,   high: 15100,  low: 14200,  open: 14300, prevClose: 13430,                               rank: 15, tradeVolumeBillion: 22,  buyRatio: 62, avatarColor: "#059669" },
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
