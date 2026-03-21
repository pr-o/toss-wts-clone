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
  { symbol: "373220", name: "LG에너지솔루션",     market: "KRX",    price: 385000, change: -8000,  changeRate: -2.04, volume: 234567,   high: 395000, low: 383000, open: 394000, prevClose: 393000,                              rank: 16, tradeVolumeBillion: 19,  buyRatio: 44, avatarColor: "#c2410c" },
  { symbol: "068270", name: "셀트리온",           market: "KRX",    price: 174500, change: 3500,   changeRate: 2.05,  volume: 456789,   high: 175500, low: 172000, open: 172500, prevClose: 171000,                              rank: 17, tradeVolumeBillion: 17,  buyRatio: 58, avatarColor: "#0e7490" },
  { symbol: "105560", name: "KB금융",             market: "KRX",    price: 92700,  change: 1200,   changeRate: 1.31,  volume: 345678,   high: 93100,  low: 91500,  open: 91800, prevClose: 91500,                               rank: 18, tradeVolumeBillion: 15,  buyRatio: 56, avatarColor: "#b45309" },
  { symbol: "259960", name: "크래프톤",           market: "KRX",    price: 312000, change: -4000,  changeRate: -1.27, volume: 123456,   high: 317000, low: 310000, open: 316000, prevClose: 316000,                              rank: 19, tradeVolumeBillion: 13,  buyRatio: 48, avatarColor: "#6d28d9" },
  { symbol: "247540", name: "에코프로비엠",       market: "KOSDAQ", price: 142500, change: 7200,   changeRate: 5.32,  volume: 567890,   high: 144000, low: 138000, open: 138500, prevClose: 135300,                              rank: 20, tradeVolumeBillion: 12,  buyRatio: 65, avatarColor: "#15803d" },
];

export const US_STOCKS: Stock[] = [
  { symbol: "ZSL",   name: "ZSL",          market: "NYSE",   price: 42961,  change: -6722,  changeRate: -13.53, volume: 12345678,  high: 49200,  low: 42500,  open: 49100,  prevClose: 49683,  rank: 21, tradeVolumeBillion: 537, buyRatio: 32, avatarColor: "#ef4444" },
  { symbol: "CPNG",  name: "쿠팡",          market: "NYSE",   price: 13077,  change:  -347,  changeRate:  -2.59, volume: 23456789,  high: 13500,  low: 13000,  open: 13400,  prevClose: 13424,  rank: 22, tradeVolumeBillion: 507, buyRatio: 55, avatarColor: "#e11d48" },
  { symbol: "IONQ",  name: "IONQ",          market: "NYSE",   price: 33669,  change: -3738,  changeRate: -10.02, volume: 15678901,  high: 37500,  low: 33400,  open: 37400,  prevClose: 37407,  rank: 23, tradeVolumeBillion: 361, buyRatio: 42, avatarColor: "#7c3aed" },
  { symbol: "NVDA",  name: "엔비디아",       market: "NASDAQ", price: 132284, change: -6524,  changeRate:  -4.71, volume: 45678901,  high: 139800, low: 131500, open: 138700, prevClose: 138808, rank: 24, tradeVolumeBillion: 330, buyRatio: 58, avatarColor: "#76b900" },
  { symbol: "TSLA",  name: "테슬라",         market: "NASDAQ", price: 169611, change: -4949,  changeRate:  -2.83, volume: 89234567,  high: 174200, low: 168900, open: 173100, prevClose: 174560, rank: 25, tradeVolumeBillion: 310, buyRatio: 65, avatarColor: "#cc0000" },
  { symbol: "BTX",   name: "BTX",           market: "NASDAQ", price: 23670,  change: -2448,  changeRate:  -9.37, volume:  8901234,  high: 26200,  low: 23500,  open: 26100,  prevClose: 26118,  rank: 26, tradeVolumeBillion: 262, buyRatio: 38, avatarColor: "#16a34a" },
  { symbol: "MSTU",  name: "MSTU",          market: "NASDAQ", price:  7848,  change:  -175,  changeRate:  -2.17, volume: 34567890,  high:  8050,  low:  7800,  open:  8020,  prevClose:  8023,  rank: 27, tradeVolumeBillion: 226, buyRatio: 48, avatarColor: "#f97316" },
  { symbol: "VYM",   name: "VYM",           market: "NYSE",   price: 217711, change: -4214,  changeRate:  -1.90, volume:  5678901,  high: 222100, low: 217000, open: 221800, prevClose: 221925, rank: 28, tradeVolumeBillion: 220, buyRatio: 62, avatarColor: "#0891b2" },
  { symbol: "SPLG",  name: "SPLG",          market: "NYSE",   price: 74583,  change: -1446,  changeRate:  -1.91, volume:  9012345,  high: 76100,  low: 74400,  open: 75900,  prevClose: 76029,  rank: 29, tradeVolumeBillion: 215, buyRatio: 52, avatarColor: "#1d4ed8" },
  { symbol: "RDDT",  name: "레딧",           market: "NYSE",   price: 31424,  change: +8359,  changeRate: +26.90, volume:  7890123,  high: 31800,  low: 24800,  open: 24800,  prevClose: 23065,  rank: 30, tradeVolumeBillion: 200, buyRatio: 78, avatarColor: "#ff4500" },
  { symbol: "TSLT",  name: "TSLT",          market: "NASDAQ", price: 35288,  change: -3067,  changeRate:  -8.00, volume:  6789012,  high: 38400,  low: 35100,  open: 38300,  prevClose: 38357,  rank: 31, tradeVolumeBillion: 192, buyRatio: 35, avatarColor: "#cc0000" },
  { symbol: "SOUN",  name: "사운드하운드",    market: "NASDAQ", price:  4348,  change:  -559,  changeRate: -11.40, volume: 45678901,  high:  4950,  low:  4300,  open:  4920,  prevClose:  4907,  rank: 32, tradeVolumeBillion: 155, buyRatio: 43, avatarColor: "#0ea5e9" },
  { symbol: "NCLH",  name: "노르웨이 크루즈", market: "NYSE",   price: 77069,  change:-10837,  changeRate: -13.26, volume:  5678901,  high: 88200,  low: 76800,  open: 87900,  prevClose: 87906,  rank: 33, tradeVolumeBillion: 148, buyRatio: 37, avatarColor: "#003087" },
  { symbol: "SOFI",  name: "소파이",         market: "NASDAQ", price: 100119, change:+13927,  changeRate: +14.45, volume:  8901234,  high: 101500, low: 87200,  open: 87500,  prevClose: 86097,  rank: 34, tradeVolumeBillion: 138, buyRatio: 74, avatarColor: "#8b5cf6" },
  { symbol: "BKNG",  name: "부킹홀딩스",     market: "NASDAQ", price: 654222, change:-63996,  changeRate:  -8.91, volume:  1234567,  high: 719500, low: 652000, open: 718200, prevClose: 718218, rank: 35, tradeVolumeBillion: 128, buyRatio: 40, avatarColor: "#003580" },
  { symbol: "AMZN",  name: "아마존",         market: "NASDAQ", price: 297300, change:-16424,  changeRate:  -5.23, volume: 32456789,  high: 315000, low: 296500, open: 314700, prevClose: 313724, rank: 36, tradeVolumeBillion: 124, buyRatio: 55, avatarColor: "#ff9900" },
  { symbol: "CVX",   name: "셰브론",         market: "NYSE",   price: 89977,  change: -3064,  changeRate:  -3.29, volume:  7890123,  high: 93200,  low: 89700,  open: 93000,  prevClose: 93041,  rank: 37, tradeVolumeBillion: 115, buyRatio: 50, avatarColor: "#00aaff" },
  { symbol: "PLTR",  name: "팰런티어",       market: "NASDAQ", price:  3905,  change:  -347,  changeRate:  -8.21, volume: 56789012,  high:  4280,  low:  3880,  open:  4240,  prevClose:  4252,  rank: 38, tradeVolumeBillion: 112, buyRatio: 61, avatarColor: "#dc2626" },
  { symbol: "GOOGL", name: "구글",           market: "NASDAQ", price: 43641,  change: -1124,  changeRate:  -2.51, volume: 21345678,  high: 44900,  low: 43500,  open: 44700,  prevClose: 44765,  rank: 39, tradeVolumeBillion: 108, buyRatio: 52, avatarColor: "#4285f4" },
  { symbol: "MSFT",  name: "마이크로소프트",  market: "NASDAQ", price: 19121,  change:  -793,  changeRate:  -3.98, volume: 23456789,  high: 19960,  low: 19000,  open: 19890,  prevClose: 19914,  rank: 40, tradeVolumeBillion: 104, buyRatio: 54, avatarColor: "#00a4ef" },
  { symbol: "META",  name: "메타",           market: "NASDAQ", price: 550999, change:-11583,  changeRate:  -2.06, volume: 18234567,  high: 563000, low: 549500, open: 562400, prevClose: 562582, rank: 41, tradeVolumeBillion:  98, buyRatio: 55, avatarColor: "#1877f2" },
  { symbol: "AAPL",  name: "애플",           market: "NASDAQ", price: 326700, change: -5032,  changeRate:  -1.52, volume: 58234567,  high: 332100, low: 325800, open: 331700, prevClose: 331732, rank: 42, tradeVolumeBillion:  90, buyRatio: 60, avatarColor: "#555555" },
  { symbol: "REX",   name: "REX",            market: "NYSE",   price: 38057,  change: -7416,  changeRate: -16.32, volume:  2345678,  high: 45700,  low: 37900,  open: 45500,  prevClose: 45473,  rank: 43, tradeVolumeBillion:  85, buyRatio: 34, avatarColor: "#6b7280" },
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
