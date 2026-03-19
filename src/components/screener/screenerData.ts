export interface Strategy {
  id: number;
  label: string;
  desc: string;
}

export const STRATEGIES: Strategy[] = [
  { id: 1,  label: "연속 신승세",        desc: "연속 상승세를 보이는 글로벌 모멘텀 주식 모음" },
  { id: 2,  label: "저평가 성장주",      desc: "높은 성장률 대비 아직 저평가된 기술주 발굴" },
  { id: 3,  label: "아직 저평한 가치주", desc: "내재가치 대비 충분히 저평가된 국내 가치주" },
  { id: 4,  label: "무궁한 배당주",      desc: "오랜 기간 꾸준히 배당을 지급해 온 종목" },
  { id: 5,  label: "돈 벌어는 회사 찾기", desc: "높은 영업이익률과 순이익을 기록하는 기업" },
  { id: 6,  label: "저평가 탈출",        desc: "저평가 구간을 벗어나 반등이 예상되는 종목" },
  { id: 7,  label: "미래의 배당왕 찾기", desc: "배당 여력이 높아 향후 고배당이 기대되는 기업" },
  { id: 8,  label: "성장 기대주",        desc: "AI·반도체·바이오 등 고성장 섹터의 유망주" },
  { id: 9,  label: "현금이 매수",        desc: "현금성 자산이 풍부해 안전마진이 높은 기업" },
  { id: 10, label: "고수익 저평가",      desc: "높은 수익 잠재력에도 아직 저평가된 국내 종목" },
  { id: 11, label: "인컹 성장주",        desc: "안정적 배당 수익과 꾸준한 성장을 동시에 추구" },
];

export interface ScreenerStock {
  symbol: string;
  name: string;
  market: "NASDAQ" | "NYSE" | "KRX" | "KOSDAQ";
  sector: string;
  price: number;
  changeRate: number;
  volume: number;
  marketCap: number; // 억 KRW
  tossTraders: number;
  monthReturn: number;
  signal: "상승" | "하락" | "중립" | null;
}

// ── Strategy 1: 연속 신승세 ────────────────────────────────────────────────
export const S1: ScreenerStock[] = [
  { symbol:"PLTR",  name:"팔란티어 테크놀로지스", market:"NYSE",   sector:"데이터분석",  price:114400,   changeRate: 5.23, volume:  89400000, marketCap: 2600000, tossTraders: 156789, monthReturn: 42.1, signal:"상승" },
  { symbol:"NFLX",  name:"넷플릭스",             market:"NASDAQ", sector:"스트리밍",    price:1170000,  changeRate: 2.34, volume:   4500000, marketCap: 6500000, tossTraders:  84521, monthReturn: 28.4, signal:"상승" },
  { symbol:"UBER",  name:"우버",                 market:"NYSE",   sector:"모빌리티",    price:110500,   changeRate: 3.45, volume:  32100000, marketCap: 2340000, tossTraders:  42156, monthReturn: 32.6, signal:"상승" },
  { symbol:"META",  name:"메타 플랫폼",           market:"NASDAQ", sector:"소셜미디어",  price:728000,   changeRate: 1.92, volume:  22100000, marketCap:16900000, tossTraders: 125671, monthReturn: 19.8, signal:"상승" },
  { symbol:"COST",  name:"코스트코 홀세일",       market:"NASDAQ", sector:"소매",        price:1196000,  changeRate: 1.87, volume:   3200000, marketCap:14300000, tossTraders:  45231, monthReturn: 24.7, signal:"상승" },
  { symbol:"MSFT",  name:"마이크로소프트",         market:"NASDAQ", sector:"소프트웨어",  price:520000,   changeRate: 0.87, volume:  24500000, marketCap:35100000, tossTraders:  98432, monthReturn: 18.2, signal:"상승" },
  { symbol:"WMT",   name:"월마트",                market:"NYSE",   sector:"소매",        price:122200,   changeRate: 1.45, volume:  18400000, marketCap: 9100000, tossTraders:  38904, monthReturn: 21.3, signal:"상승" },
  { symbol:"BKNG",  name:"부킹 홀딩스",           market:"NASDAQ", sector:"여행",        price:6240000,  changeRate: 1.78, volume:    800000, marketCap: 5980000, tossTraders:  12345, monthReturn: 19.7, signal:"상승" },
  { symbol:"NOW",   name:"서비스나우",             market:"NYSE",   sector:"소프트웨어",  price:1365000,  changeRate: 1.34, volume:   1800000, marketCap: 6500000, tossTraders:  28456, monthReturn: 17.4, signal:"중립" },
  { symbol:"AVGO",  name:"브로드컴",               market:"NASDAQ", sector:"반도체",      price:292500,   changeRate: 2.15, volume:  12300000, marketCap:14300000, tossTraders:  34218, monthReturn: 16.8, signal:"상승" },
  { symbol:"LLY",   name:"일라이 릴리",            market:"NYSE",   sector:"헬스케어",    price:1027000,  changeRate: 1.56, volume:   5700000, marketCap:10400000, tossTraders:  54321, monthReturn: 15.2, signal:"상승" },
  { symbol:"AMZN",  name:"아마존",                 market:"NASDAQ", sector:"전자상거래",  price:266500,   changeRate: 1.23, volume:  45600000, marketCap:27000000, tossTraders: 185432, monthReturn: 14.5, signal:"중립" },
  { symbol:"SPOT",  name:"스포티파이",             market:"NYSE",   sector:"스트리밍",    price:559000,   changeRate: 3.45, volume:   6400000, marketCap: 9750000, tossTraders:  28345, monthReturn: 41.2, signal:"상승" },
  { symbol:"HOOD",  name:"로빈후드 마켓",          market:"NASDAQ", sector:"핀테크",      price:54600,    changeRate: 4.56, volume:  48900000, marketCap: 1560000, tossTraders: 124567, monthReturn: 58.4, signal:"상승" },
];

// ── Strategy 2: 저평가 성장주 ─────────────────────────────────────────────
export const S2: ScreenerStock[] = [
  { symbol:"NVDA",  name:"엔비디아",               market:"NASDAQ", sector:"반도체",      price:119400,   changeRate: 0.00, volume:    659520, marketCap:29200000, tossTraders: 456789, monthReturn: 14.0, signal:"상승" },
  { symbol:"AMD",   name:"AMD",                    market:"NASDAQ", sector:"반도체",      price:143000,   changeRate: 2.45, volume:  52300000, marketCap: 8450000, tossTraders: 134567, monthReturn: 24.8, signal:"상승" },
  { symbol:"MU",    name:"마이크론 테크놀로지",     market:"NASDAQ", sector:"반도체",      price:123500,   changeRate: 3.67, volume:  28400000, marketCap: 5720000, tossTraders:  78432, monthReturn: 31.2, signal:"상승" },
  { symbol:"COIN",  name:"코인베이스",              market:"NASDAQ", sector:"핀테크",      price:273000,   changeRate:-2.14, volume:  18200000, marketCap: 6500000, tossTraders:  89234, monthReturn: -8.4, signal:"중립" },
  { symbol:"CRWD",  name:"크라우드스트라이크",      market:"NASDAQ", sector:"사이버보안",  price:455000,   changeRate: 0.78, volume:   7200000, marketCap: 9750000, tossTraders:  45678, monthReturn: 22.4, signal:"상승" },
  { symbol:"DDOG",  name:"데이터도그",              market:"NASDAQ", sector:"클라우드",    price:156000,   changeRate: 1.89, volume:   5600000, marketCap: 4940000, tossTraders:  18234, monthReturn: 12.3, signal:"상승" },
  { symbol:"NET",   name:"클라우드플레어",           market:"NYSE",   sector:"사이버보안",  price:169000,   changeRate: 2.34, volume:  12100000, marketCap: 5070000, tossTraders:  34521, monthReturn: 18.7, signal:"상승" },
  { symbol:"PLTR",  name:"팔란티어 테크놀로지스",   market:"NYSE",   sector:"데이터분석",  price:114400,   changeRate: 5.23, volume:  89400000, marketCap: 2600000, tossTraders: 156789, monthReturn: 42.1, signal:"상승" },
  { symbol:"SNOW",  name:"스노우플레이크",           market:"NYSE",   sector:"클라우드",    price:221000,   changeRate:-1.23, volume:   8900000, marketCap: 6500000, tossTraders:  23456, monthReturn: -4.2, signal:"중립" },
  { symbol:"SQ",    name:"블록",                    market:"NYSE",   sector:"핀테크",      price:88400,    changeRate:-0.89, volume:  14500000, marketCap: 2860000, tossTraders:  67890, monthReturn: -6.8, signal:"중립" },
  { symbol:"HOOD",  name:"로빈후드 마켓",            market:"NASDAQ", sector:"핀테크",      price:54600,    changeRate: 4.56, volume:  48900000, marketCap: 1560000, tossTraders: 124567, monthReturn: 58.4, signal:"상승" },
  { symbol:"ARM",   name:"ARM 홀딩스",               market:"NASDAQ", sector:"반도체설계",  price:156000,   changeRate: 3.45, volume:  18900000, marketCap:23660000, tossTraders:  45678, monthReturn: 48.4, signal:"상승" },
];

// ── Strategy 3: 아직 저평한 가치주 ────────────────────────────────────────
export const S3: ScreenerStock[] = [
  { symbol:"005380", name:"현대차",                 market:"KRX",    sector:"자동차",      price:283000,   changeRate: 0.54, volume:   3200000, marketCap:  600000, tossTraders:  78345, monthReturn:  8.7, signal:"중립" },
  { symbol:"000270", name:"기아",                   market:"KRX",    sector:"자동차",      price:132000,   changeRate: 0.76, volume:   4500000, marketCap:  530000, tossTraders:  67891, monthReturn: 12.4, signal:"중립" },
  { symbol:"005490", name:"포스코홀딩스",            market:"KRX",    sector:"철강·소재",   price:398000,   changeRate:-1.24, volume:   1200000, marketCap:  340000, tossTraders:  45234, monthReturn: -8.4, signal:"하락" },
  { symbol:"035420", name:"NAVER",                   market:"KRX",    sector:"IT",          price:248000,   changeRate: 1.23, volume:   6700000, marketCap:  400000, tossTraders:  56789, monthReturn:  8.9, signal:"중립" },
  { symbol:"105560", name:"KB금융",                  market:"KRX",    sector:"금융",        price:89500,    changeRate: 0.34, volume:   5600000, marketCap:  360000, tossTraders:  34567, monthReturn:  6.2, signal:"하락" },
  { symbol:"055550", name:"신한지주",                market:"KRX",    sector:"금융",        price:58200,    changeRate: 0.23, volume:   8900000, marketCap:  270000, tossTraders:  28234, monthReturn:  4.8, signal:"하락" },
  { symbol:"000810", name:"삼성화재",                market:"KRX",    sector:"보험",        price:312000,   changeRate: 0.45, volume:    800000, marketCap:  160000, tossTraders:  12456, monthReturn:  5.6, signal:"중립" },
  { symbol:"066570", name:"LG전자",                  market:"KRX",    sector:"전자",        price:128000,   changeRate:-0.78, volume:   3400000, marketCap:  220000, tossTraders:  34789, monthReturn: -4.2, signal:"하락" },
  { symbol:"096770", name:"SK이노베이션",             market:"KRX",    sector:"에너지",      price:148500,   changeRate:-1.45, volume:   2100000, marketCap:  130000, tossTraders:  23456, monthReturn:-11.8, signal:"하락" },
  { symbol:"015760", name:"한국전력",                market:"KRX",    sector:"유틸리티",    price:23100,    changeRate: 0.43, volume:  12300000, marketCap:  140000, tossTraders:  18234, monthReturn: -2.4, signal:"하락" },
  { symbol:"011170", name:"롯데케미칼",              market:"KRX",    sector:"화학",        price:89200,    changeRate:-2.34, volume:   1500000, marketCap:   30000, tossTraders:   8234, monthReturn:-18.4, signal:"하락" },
  { symbol:"004020", name:"현대제철",                market:"KRX",    sector:"철강",        price:34800,    changeRate:-0.58, volume:   3200000, marketCap:   20000, tossTraders:   7890, monthReturn: -6.8, signal:"하락" },
];

// ── Strategy 4: 무궁한 배당주 ─────────────────────────────────────────────
export const S4: ScreenerStock[] = [
  { symbol:"JNJ",   name:"존슨앤존슨",              market:"NYSE",   sector:"헬스케어",    price:208000,   changeRate: 0.34, volume:   8900000, marketCap:11050000, tossTraders:  34567, monthReturn:  4.2, signal:"중립" },
  { symbol:"MCD",   name:"맥도날드",                 market:"NYSE",   sector:"레스토랑",    price:395200,   changeRate: 0.67, volume:   8900000, marketCap:12480000, tossTraders:  67890, monthReturn:  6.8, signal:"상승" },
  { symbol:"KO",    name:"코카콜라",                  market:"NYSE",   sector:"소비재",      price:80600,    changeRate: 0.23, volume:  32100000, marketCap: 7020000, tossTraders:  45678, monthReturn:  2.8, signal:"중립" },
  { symbol:"PG",    name:"프록터앤갬블",              market:"NYSE",   sector:"소비재",      price:218400,   changeRate: 0.45, volume:  12300000, marketCap:11050000, tossTraders:  28345, monthReturn:  6.4, signal:"중립" },
  { symbol:"PM",    name:"필립 모리스",               market:"NYSE",   sector:"담배",        price:171600,   changeRate: 0.56, volume:  12100000, marketCap:13390000, tossTraders:  23456, monthReturn: 10.2, signal:"중립" },
  { symbol:"CVX",   name:"쉐브론",                    market:"NYSE",   sector:"에너지",      price:214500,   changeRate:-1.23, volume:  18400000, marketCap: 9490000, tossTraders:  34567, monthReturn: -4.8, signal:"중립" },
  { symbol:"XOM",   name:"엑슨모빌",                  market:"NYSE",   sector:"에너지",      price:143000,   changeRate:-0.89, volume:  34500000, marketCap:11700000, tossTraders:  45678, monthReturn: -2.4, signal:"중립" },
  { symbol:"PEP",   name:"펩시코",                    market:"NASDAQ", sector:"소비재",      price:189800,   changeRate:-0.34, volume:  14500000, marketCap: 9100000, tossTraders:  23456, monthReturn: -1.8, signal:"중립" },
  { symbol:"VZ",    name:"버라이즌",                  market:"NYSE",   sector:"통신",        price:58500,    changeRate: 0.34, volume:  45600000, marketCap: 6370000, tossTraders:  45678, monthReturn:  4.2, signal:"중립" },
  { symbol:"T",     name:"AT&T",                     market:"NYSE",   sector:"통신",        price:29900,    changeRate: 0.78, volume: 124500000, marketCap: 4420000, tossTraders:  89234, monthReturn: 12.8, signal:"중립" },
  { symbol:"O",     name:"리얼티 인컴",               market:"NYSE",   sector:"리츠",        price:71500,    changeRate: 1.23, volume:  18400000, marketCap: 5330000, tossTraders:  56789, monthReturn: -8.4, signal:"중립" },
  { symbol:"MMM",   name:"3M",                       market:"NYSE",   sector:"산업재",      price:192400,   changeRate: 1.45, volume:   5600000, marketCap: 4290000, tossTraders:  18234, monthReturn:  8.4, signal:"중립" },
];

// ── Strategy 5: 돈 벌어는 회사 찾기 ──────────────────────────────────────
export const S5: ScreenerStock[] = [
  { symbol:"AAPL",  name:"애플",                    market:"NASDAQ", sector:"IT",          price:292500,   changeRate:-1.47, volume:  58234567, marketCap: 4309296, tossTraders: 100630, monthReturn: 34.3, signal:"상승" },
  { symbol:"MSFT",  name:"마이크로소프트",           market:"NASDAQ", sector:"소프트웨어",  price:520000,   changeRate: 0.87, volume:  24500000, marketCap:35100000, tossTraders:  98432, monthReturn: 18.2, signal:"상승" },
  { symbol:"GOOGL", name:"알파벳",                   market:"NASDAQ", sector:"IT",          price:227500,   changeRate: 0.00, volume:     69198, marketCap: 2788152, tossTraders:   1722, monthReturn: 23.8, signal:"상승" },
  { symbol:"META",  name:"메타 플랫폼",              market:"NASDAQ", sector:"소셜미디어",  price:728000,   changeRate: 1.92, volume:  22100000, marketCap:16900000, tossTraders: 125671, monthReturn: 19.8, signal:"상승" },
  { symbol:"V",     name:"비자",                     market:"NYSE",   sector:"핀테크",      price:416000,   changeRate: 0.45, volume:  12100000, marketCap:17420000, tossTraders:  34567, monthReturn: 12.4, signal:"중립" },
  { symbol:"MA",    name:"마스터카드",                market:"NYSE",   sector:"핀테크",      price:663000,   changeRate: 0.67, volume:   8900000, marketCap:14430000, tossTraders:  28345, monthReturn: 14.8, signal:"중립" },
  { symbol:"ASML",  name:"ASML 홀딩",               market:"NASDAQ", sector:"반도체장비",  price:975000,   changeRate:-2.34, volume:   3200000, marketCap:14430000, tossTraders:  45678, monthReturn:  8.4, signal:"중립" },
  { symbol:"ORCL",  name:"오라클",                   market:"NYSE",   sector:"소프트웨어",  price:182000,   changeRate: 1.67, volume:  12300000, marketCap: 7800000, tossTraders:  23456, monthReturn: 28.4, signal:"상승" },
  { symbol:"QCOM",  name:"퀄컴",                     market:"NASDAQ", sector:"반도체",      price:214500,   changeRate: 2.45, volume:  18400000, marketCap: 4490000, tossTraders:  56789, monthReturn: 22.4, signal:"상승" },
  { symbol:"TXN",   name:"텍사스 인스트루먼트",      market:"NASDAQ", sector:"반도체",      price:247000,   changeRate: 1.23, volume:  14500000, marketCap: 4490000, tossTraders:  34789, monthReturn: 15.6, signal:"중립" },
  { symbol:"ADBE",  name:"어도비",                   market:"NASDAQ", sector:"소프트웨어",  price:494000,   changeRate: 0.89, volume:   5600000, marketCap: 4550000, tossTraders:  34567, monthReturn: 12.8, signal:"중립" },
  { symbol:"ACN",   name:"액센추어",                 market:"NYSE",   sector:"IT서비스",    price:468000,   changeRate:-0.45, volume:   4500000, marketCap: 7020000, tossTraders:  18234, monthReturn:  8.4, signal:"중립" },
];

// ── Strategy 6: 저평가 탈출 ───────────────────────────────────────────────
export const S6: ScreenerStock[] = [
  { symbol:"INTC",  name:"인텔",                    market:"NASDAQ", sector:"반도체",      price:31200,    changeRate: 4.56, volume:  89400000, marketCap:10400000, tossTraders:  67890, monthReturn: -8.4, signal:"상승" },
  { symbol:"BA",    name:"보잉",                     market:"NYSE",   sector:"항공우주",    price:227500,   changeRate: 2.34, volume:  18900000, marketCap: 3770000, tossTraders:  45678, monthReturn:-12.4, signal:"상승" },
  { symbol:"PYPL",  name:"페이팔",                   market:"NASDAQ", sector:"핀테크",      price:101400,   changeRate: 5.67, volume:  32100000, marketCap:10400000, tossTraders:  89234, monthReturn: 24.8, signal:"상승" },
  { symbol:"F",     name:"포드 모터",                market:"NYSE",   sector:"자동차",      price:15600,    changeRate: 3.45, volume: 234500000, marketCap: 6240000, tossTraders:  78234, monthReturn: -4.2, signal:"상승" },
  { symbol:"EBAY",  name:"이베이",                   market:"NASDAQ", sector:"전자상거래",  price:80600,    changeRate: 1.23, volume:  14500000, marketCap: 3640000, tossTraders:  23456, monthReturn:  8.4, signal:"상승" },
  { symbol:"012450", name:"한화에어로스페이스",       market:"KRX",    sector:"방산",        price:328000,   changeRate: 4.56, volume:   1200000, marketCap:  270000, tossTraders:  34567, monthReturn: 52.4, signal:"상승" },
  { symbol:"329180", name:"HD현대중공업",             market:"KRX",    sector:"조선",        price:148500,   changeRate: 2.34, volume:   2100000, marketCap:  120000, tossTraders:  18234, monthReturn: 28.4, signal:"상승" },
  { symbol:"051910", name:"LG화학",                  market:"KRX",    sector:"화학",        price:358000,   changeRate:-1.23, volume:   1800000, marketCap:  250000, tossTraders:  23456, monthReturn:-12.4, signal:"상승" },
  { symbol:"011170", name:"롯데케미칼",              market:"KRX",    sector:"화학",        price:89200,    changeRate: 1.78, volume:   1500000, marketCap:   30000, tossTraders:   8234, monthReturn:-18.4, signal:"상승" },
  { symbol:"139480", name:"이마트",                  market:"KRX",    sector:"소매",        price:78300,    changeRate: 2.45, volume:    900000, marketCap:   30000, tossTraders:  12456, monthReturn: -4.8, signal:"상승" },
  { symbol:"STLA",  name:"스텔란티스",               market:"NYSE",   sector:"자동차",      price:19500,    changeRate: 2.78, volume:  56700000, marketCap: 3640000, tossTraders:  12345, monthReturn:-18.4, signal:"상승" },
  { symbol:"GS건설", name:"GS건설",                  market:"KRX",    sector:"건설",        price:24800,    changeRate:-1.23, volume:   3200000, marketCap:   10000, tossTraders:   8234, monthReturn: -8.4, signal:"중립" },
];

// ── Strategy 7: 미래의 배당왕 찾기 ────────────────────────────────────────
export const S7: ScreenerStock[] = [
  { symbol:"GOOGL", name:"알파벳",                   market:"NASDAQ", sector:"IT",          price:227500,   changeRate: 0.00, volume:     69198, marketCap: 2788152, tossTraders:   1722, monthReturn: 23.8, signal:"상승" },
  { symbol:"META",  name:"메타 플랫폼",              market:"NASDAQ", sector:"소셜미디어",  price:728000,   changeRate: 1.92, volume:  22100000, marketCap:16900000, tossTraders: 125671, monthReturn: 19.8, signal:"상승" },
  { symbol:"AMZN",  name:"아마존",                   market:"NASDAQ", sector:"전자상거래",  price:266500,   changeRate: 1.23, volume:  45600000, marketCap:27000000, tossTraders: 185432, monthReturn: 14.5, signal:"중립" },
  { symbol:"NFLX",  name:"넷플릭스",                 market:"NASDAQ", sector:"스트리밍",    price:1170000,  changeRate: 2.34, volume:   4500000, marketCap: 6500000, tossTraders:  84521, monthReturn: 28.4, signal:"상승" },
  { symbol:"CRM",   name:"세일즈포스",               market:"NYSE",   sector:"소프트웨어",  price:364000,   changeRate: 2.34, volume:  12100000, marketCap: 5200000, tossTraders:  28345, monthReturn: 18.4, signal:"상승" },
  { symbol:"ADBE",  name:"어도비",                   market:"NASDAQ", sector:"소프트웨어",  price:494000,   changeRate: 0.89, volume:   5600000, marketCap: 4550000, tossTraders:  34567, monthReturn: 12.8, signal:"중립" },
  { symbol:"NOW",   name:"서비스나우",               market:"NYSE",   sector:"소프트웨어",  price:1365000,  changeRate: 1.34, volume:   1800000, marketCap: 6500000, tossTraders:  28456, monthReturn: 17.4, signal:"중립" },
  { symbol:"BKNG",  name:"부킹 홀딩스",              market:"NASDAQ", sector:"여행",        price:6240000,  changeRate: 1.78, volume:    800000, marketCap: 5980000, tossTraders:  12345, monthReturn: 19.7, signal:"상승" },
  { symbol:"ISRG",  name:"인튜이티브 서지컬",        market:"NASDAQ", sector:"헬스케어",    price:702000,   changeRate: 0.67, volume:   2400000, marketCap: 7800000, tossTraders:  18234, monthReturn: 22.4, signal:"상승" },
  { symbol:"TMO",   name:"써모 피셔 사이언티픽",     market:"NYSE",   sector:"헬스케어",    price:637000,   changeRate:-0.45, volume:   3200000, marketCap:10400000, tossTraders:  12456, monthReturn:  8.4, signal:"중립" },
  { symbol:"SPGI",  name:"S&P 글로벌",               market:"NYSE",   sector:"금융정보",    price:663000,   changeRate: 1.23, volume:   4500000, marketCap: 8580000, tossTraders:   9876, monthReturn: 18.4, signal:"상승" },
  { symbol:"DHR",   name:"다나허",                   market:"NYSE",   sector:"헬스케어",    price:312000,   changeRate: 0.89, volume:   5600000, marketCap: 7800000, tossTraders:  15678, monthReturn: 12.8, signal:"중립" },
];

// ── Strategy 8: 성장 기대주 ───────────────────────────────────────────────
export const S8: ScreenerStock[] = [
  { symbol:"NVDA",  name:"엔비디아",               market:"NASDAQ", sector:"반도체",      price:119400,   changeRate: 0.00, volume:    659520, marketCap:29200000, tossTraders: 456789, monthReturn: 14.0, signal:"상승" },
  { symbol:"ARM",   name:"ARM 홀딩스",             market:"NASDAQ", sector:"반도체설계",  price:156000,   changeRate: 3.45, volume:  18900000, marketCap:23660000, tossTraders:  45678, monthReturn: 48.4, signal:"상승" },
  { symbol:"MRVL",  name:"마벨 테크놀로지",        market:"NASDAQ", sector:"반도체",      price:93600,    changeRate: 4.56, volume:  28400000, marketCap:10400000, tossTraders:  34567, monthReturn: 62.4, signal:"상승" },
  { symbol:"AMD",   name:"AMD",                   market:"NASDAQ", sector:"반도체",      price:143000,   changeRate: 2.45, volume:  52300000, marketCap: 8450000, tossTraders: 134567, monthReturn: 24.8, signal:"상승" },
  { symbol:"SMCI",  name:"슈퍼마이크로 컴퓨터",   market:"NASDAQ", sector:"서버",        price:49400,    changeRate: 8.23, volume: 124500000, marketCap: 6500000, tossTraders:  78234, monthReturn:-32.4, signal:"상승" },
  { symbol:"SOUN",  name:"사운드하운드 AI",        market:"NASDAQ", sector:"AI",          price:14300,    changeRate:12.34, volume:  89400000, marketCap:  780000, tossTraders: 234567, monthReturn:124.8, signal:"상승" },
  { symbol:"IONQ",  name:"아이온큐",               market:"NYSE",   sector:"양자컴퓨팅",  price:46800,    changeRate: 6.78, volume:  34500000, marketCap: 1040000, tossTraders:  89234, monthReturn: 82.4, signal:"상승" },
  { symbol:"SMMT",  name:"서밋 테라퓨틱스",       market:"NASDAQ", sector:"바이오",      price:49400,    changeRate: 0.00, volume:     52495, marketCap:  468040, tossTraders:    258, monthReturn: 30.7, signal:null    },
  { symbol:"RGTI",  name:"리게티 컴퓨팅",         market:"NASDAQ", sector:"양자컴퓨팅",  price:15600,    changeRate: 9.23, volume: 124500000, marketCap:  260000, tossTraders:  56789, monthReturn:148.4, signal:"상승" },
  { symbol:"JOBY",  name:"조비 에비에이션",        market:"NYSE",   sector:"에어택시",    price:9100,     changeRate: 4.56, volume:  45600000, marketCap:  620000, tossTraders:  34567, monthReturn: 28.4, signal:"상승" },
  { symbol:"RXRX",  name:"리커전 파마슈티컬",      market:"NASDAQ", sector:"AI바이오",    price:11700,    changeRate:-3.45, volume:  18900000, marketCap:  520000, tossTraders:  12345, monthReturn:-24.8, signal:"중립" },
  { symbol:"QBTS",  name:"D-웨이브 퀀텀",          market:"NYSE",   sector:"양자컴퓨팅",  price:7800,     changeRate: 5.67, volume:  78900000, marketCap:  200000, tossTraders:  34567, monthReturn: 92.4, signal:"상승" },
];

// ── Strategy 9: 현금이 매수 ───────────────────────────────────────────────
export const S9: ScreenerStock[] = [
  { symbol:"AAPL",  name:"애플",                   market:"NASDAQ", sector:"IT",          price:292500,   changeRate:-1.47, volume:  58234567, marketCap: 4309296, tossTraders: 100630, monthReturn: 34.3, signal:"상승" },
  { symbol:"GOOGL", name:"알파벳",                  market:"NASDAQ", sector:"IT",          price:227500,   changeRate: 0.00, volume:     69198, marketCap: 2788152, tossTraders:   1722, monthReturn: 23.8, signal:"상승" },
  { symbol:"META",  name:"메타 플랫폼",             market:"NASDAQ", sector:"소셜미디어",  price:728000,   changeRate: 1.92, volume:  22100000, marketCap:16900000, tossTraders: 125671, monthReturn: 19.8, signal:"상승" },
  { symbol:"MSFT",  name:"마이크로소프트",          market:"NASDAQ", sector:"소프트웨어",  price:520000,   changeRate: 0.87, volume:  24500000, marketCap:35100000, tossTraders:  98432, monthReturn: 18.2, signal:"상승" },
  { symbol:"BRK.B", name:"버크셔 해서웨이 B",      market:"NYSE",   sector:"투자",        price:585000,   changeRate: 0.23, volume:   8900000, marketCap:18200000, tossTraders:  23456, monthReturn:  8.4, signal:"중립" },
  { symbol:"TM",    name:"도요타 자동차",           market:"NYSE",   sector:"자동차",      price:260000,   changeRate: 0.45, volume:  12300000, marketCap:12480000, tossTraders:  12345, monthReturn:  6.8, signal:"중립" },
  { symbol:"005930", name:"삼성전자",               market:"KRX",    sector:"IT",          price:95400,    changeRate: 2.83, volume:  45600000, marketCap: 5700000, tossTraders: 234567, monthReturn: 18.4, signal:"상승" },
  { symbol:"000660", name:"SK하이닉스",             market:"KRX",    sector:"반도체",      price:215000,   changeRate: 7.03, volume:  18400000, marketCap: 1560000, tossTraders: 156789, monthReturn: 42.4, signal:"상승" },
  { symbol:"005380", name:"현대차",                 market:"KRX",    sector:"자동차",      price:283000,   changeRate: 0.54, volume:   3200000, marketCap:  600000, tossTraders:  78345, monthReturn:  8.7, signal:"중립" },
  { symbol:"066570", name:"LG전자",                 market:"KRX",    sector:"전자",        price:128000,   changeRate:-0.78, volume:   3400000, marketCap:  220000, tossTraders:  34789, monthReturn: -4.2, signal:"하락" },
  { symbol:"006400", name:"삼성SDI",                market:"KRX",    sector:"배터리",      price:448000,   changeRate:-2.34, volume:   1200000, marketCap:  310000, tossTraders:  23456, monthReturn:-22.4, signal:"중립" },
  { symbol:"005490", name:"포스코홀딩스",           market:"KRX",    sector:"철강",        price:398000,   changeRate:-1.24, volume:   1200000, marketCap:  340000, tossTraders:  45234, monthReturn: -8.4, signal:"중립" },
];

// ── Strategy 10: 고수익 저평가 ─────────────────────────────────────────────
export const S10: ScreenerStock[] = [
  { symbol:"373220", name:"LG에너지솔루션",         market:"KRX",    sector:"배터리",      price:385000,   changeRate:-3.45, volume:   2100000, marketCap:  900000, tossTraders:  34567, monthReturn:-28.4, signal:"하락" },
  { symbol:"006400", name:"삼성SDI",                market:"KRX",    sector:"배터리",      price:448000,   changeRate:-2.34, volume:   1200000, marketCap:  310000, tossTraders:  23456, monthReturn:-22.4, signal:"하락" },
  { symbol:"012330", name:"현대모비스",              market:"KRX",    sector:"자동차부품",  price:248000,   changeRate:-0.56, volume:   1500000, marketCap:  230000, tossTraders:  18234, monthReturn: -4.2, signal:"중립" },
  { symbol:"028260", name:"삼성물산",                market:"KRX",    sector:"건설·무역",   price:188000,   changeRate: 0.89, volume:   2100000, marketCap:  360000, tossTraders:  23456, monthReturn:  8.8, signal:"중립" },
  { symbol:"047050", name:"포스코인터내셔널",        market:"KRX",    sector:"무역",        price:68400,    changeRate: 2.45, volume:   3400000, marketCap:   80000, tossTraders:  15678, monthReturn: 24.8, signal:"상승" },
  { symbol:"086280", name:"현대글로비스",            market:"KRX",    sector:"물류",        price:198000,   changeRate: 1.23, volume:   1200000, marketCap:   70000, tossTraders:   9876, monthReturn: 12.4, signal:"중립" },
  { symbol:"003490", name:"대한항공",                market:"KRX",    sector:"항공",        price:28400,    changeRate: 2.34, volume:   8900000, marketCap:  110000, tossTraders:  34567, monthReturn: 18.4, signal:"상승" },
  { symbol:"034020", name:"두산에너빌리티",           market:"KRX",    sector:"에너지",      price:23900,    changeRate: 3.45, volume:  12300000, marketCap:   70000, tossTraders:  45678, monthReturn: 48.4, signal:"상승" },
  { symbol:"009830", name:"한화솔루션",              market:"KRX",    sector:"태양광",      price:48200,    changeRate: 1.23, volume:   4500000, marketCap:   30000, tossTraders:  12345, monthReturn:  8.4, signal:"상승" },
  { symbol:"023530", name:"롯데쇼핑",                market:"KRX",    sector:"소매",        price:68900,    changeRate: 0.78, volume:   1500000, marketCap:   30000, tossTraders:   7890, monthReturn: -4.8, signal:"중립" },
  { symbol:"096770", name:"SK이노베이션",             market:"KRX",    sector:"에너지",      price:148500,   changeRate:-1.45, volume:   2100000, marketCap:  130000, tossTraders:  23456, monthReturn:-11.8, signal:"하락" },
  { symbol:"035720", name:"카카오",                  market:"KRX",    sector:"IT",          price:52400,    changeRate: 1.54, volume:  12300000, marketCap:  230000, tossTraders:  89234, monthReturn: -8.4, signal:"중립" },
];

// ── Strategy 11: 인컹 성장주 ──────────────────────────────────────────────
export const S11: ScreenerStock[] = [
  { symbol:"MCD",   name:"맥도날드",               market:"NYSE",   sector:"레스토랑",    price:395200,   changeRate: 0.67, volume:   8900000, marketCap:12480000, tossTraders:  67890, monthReturn:  6.8, signal:"상승" },
  { symbol:"COST",  name:"코스트코 홀세일",         market:"NASDAQ", sector:"소매",        price:1196000,  changeRate: 1.87, volume:   3200000, marketCap:14300000, tossTraders:  45231, monthReturn: 24.7, signal:"상승" },
  { symbol:"HD",    name:"홈 디포",                 market:"NYSE",   sector:"소매",        price:494000,   changeRate: 0.45, volume:   8900000, marketCap:15600000, tossTraders:  45678, monthReturn: 12.4, signal:"중립" },
  { symbol:"TJX",   name:"TJX 컴퍼니스",           market:"NYSE",   sector:"소매",        price:169000,   changeRate: 1.23, volume:  18400000, marketCap:10920000, tossTraders:  18234, monthReturn: 18.4, signal:"상승" },
  { symbol:"SBUX",  name:"스타벅스",               market:"NASDAQ", sector:"레스토랑",    price:127400,   changeRate: 2.34, volume:  18900000, marketCap: 5460000, tossTraders:  34567, monthReturn: 14.8, signal:"상승" },
  { symbol:"LOW",   name:"로우스 컴퍼니스",         market:"NYSE",   sector:"소매",        price:299000,   changeRate: 0.78, volume:  12300000, marketCap: 6240000, tossTraders:  28345, monthReturn: 10.8, signal:"중립" },
  { symbol:"NEE",   name:"넥스트에라 에너지",       market:"NYSE",   sector:"유틸리티",    price:98800,    changeRate: 0.00, volume:   5242743, marketCap: 2143684, tossTraders: 123684, monthReturn: 22.7, signal:"중립" },
  { symbol:"AMT",   name:"아메리칸 타워",           market:"NYSE",   sector:"리츠",        price:279500,   changeRate: 1.23, volume:   5600000, marketCap: 9360000, tossTraders:  23456, monthReturn: 12.8, signal:"중립" },
  { symbol:"PSA",   name:"퍼블릭 스토리지",         market:"NYSE",   sector:"리츠",        price:403000,   changeRate: 0.56, volume:   3400000, marketCap: 6500000, tossTraders:  12345, monthReturn:  8.4, signal:"중립" },
  { symbol:"SPG",   name:"사이먼 프라퍼티 그룹",   market:"NYSE",   sector:"리츠",        price:231400,   changeRate: 1.45, volume:   4500000, marketCap: 5460000, tossTraders:  15678, monthReturn: 18.4, signal:"상승" },
  { symbol:"CCI",   name:"크라운 캐슬",             market:"NYSE",   sector:"리츠",        price:130000,   changeRate:-0.89, volume:   8900000, marketCap: 5460000, tossTraders:  18234, monthReturn: -4.8, signal:"중립" },
  { symbol:"O",     name:"리얼티 인컴",             market:"NYSE",   sector:"리츠",        price:71500,    changeRate: 1.23, volume:  18400000, marketCap: 5330000, tossTraders:  56789, monthReturn: -8.4, signal:"중립" },
];

export const STRATEGY_STOCKS: Record<number, ScreenerStock[]> = {
  1: S1, 2: S2, 3: S3, 4: S4, 5: S5, 6: S6,
  7: S7, 8: S8, 9: S9, 10: S10, 11: S11,
};
