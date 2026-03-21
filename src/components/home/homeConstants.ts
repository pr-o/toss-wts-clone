// View tabs
export const VIEW_REALTIME = "실시간 차트" as const;
export const VIEW_TRENDING = "지금 뜨는 카테고리" as const;
export const VIEW_INVESTOR = "국내 투자자 동향" as const;
export const VIEW_TABS = [VIEW_REALTIME, VIEW_TRENDING, VIEW_INVESTOR] as const;

// Market filter tabs
export const MARKET_ALL      = "전체" as const;
export const MARKET_DOMESTIC = "국내" as const;
export const MARKET_OVERSEAS = "해외" as const;
export const MARKET_TABS = [MARKET_ALL, MARKET_DOMESTIC, MARKET_OVERSEAS] as const;

// Sort tabs
export const SORT_TOSS_AMOUNT   = "토스증권 거래대금" as const;
export const SORT_TOSS_VOLUME   = "토스증권 거래량" as const;
export const SORT_AMOUNT        = "거래대금" as const;
export const SORT_VOLUME        = "거래량" as const;
export const SORT_RISING        = "급상승" as const;
export const SORT_FALLING       = "급하락" as const;
export const SORT_TABS = [
  SORT_TOSS_AMOUNT,
  SORT_TOSS_VOLUME,
  SORT_AMOUNT,
  SORT_VOLUME,
  SORT_RISING,
  SORT_FALLING,
] as const;

// Time frame tabs
export const TIME_REALTIME = "실시간" as const;
export const TIME_1D       = "1일" as const;
export const TIME_1W       = "1주일" as const;
export const TIME_1M       = "1개월" as const;
export const TIME_3M       = "3개월" as const;
export const TIME_6M       = "6개월" as const;
export const TIME_1Y       = "1년" as const;
export const TIME_TABS = [
  TIME_REALTIME,
  TIME_1D,
  TIME_1W,
  TIME_1M,
  TIME_3M,
  TIME_6M,
  TIME_1Y,
] as const;
