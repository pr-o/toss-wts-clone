import type { CommunityPost, NewsHeadline } from "@/types/stock";

export const COMMUNITY_POSTS: CommunityPost[] = [
  // SK하이닉스 (000660)
  { id: "1",  symbol: "000660", username: "빼오고",    avatarColor: "#f97316", minutesAgo: 8,  content: "팔고싶어서 근질거려",                    likes: 12 },
  { id: "2",  symbol: "000660", username: "함수이써요", avatarColor: "#3b82f6", minutesAgo: 9,  content: "오늘 10프로 찍고 얼짱에서 13프로 ㄱㄱㄱ", likes: 8  },
  { id: "3",  symbol: "000660", username: "거래거래",  avatarColor: "#10b981", minutesAgo: 10, content: "전재산 안박아서 포모오네...",              likes: 5  },
  { id: "4",  symbol: "000660", username: "안녕이요",  avatarColor: "#8b5cf6", minutesAgo: 12, content: "😊😊😊 한 주만...",                      likes: 3  },
  // 삼성전자 (005930)
  { id: "5",  symbol: "005930", username: "삼성맨",    avatarColor: "#1d4ed8", minutesAgo: 5,  content: "반도체 슈퍼사이클 왔다 ㄷㄷ",            likes: 24 },
  { id: "6",  symbol: "005930", username: "개미투자자", avatarColor: "#dc2626", minutesAgo: 7,  content: "8만전자 드디어... 눈물난다",              likes: 18 },
  { id: "7",  symbol: "005930", username: "주식고수",  avatarColor: "#059669", minutesAgo: 15, content: "오늘도 물타기 성공 ㅋㅋ",                likes: 9  },
  // KODEX 레버리지 (122630)
  { id: "8",  symbol: "122630", username: "레버리지신자", avatarColor: "#7c3aed", minutesAgo: 3, content: "2배짜리 오늘 꽤 잘 올라주네요 ㅎㅎ",    likes: 31 },
  { id: "9",  symbol: "122630", username: "불타는개미", avatarColor: "#ea580c", minutesAgo: 6,  content: "이거 들고있으니까 심장이 ㅋㅋ",           likes: 15 },
  // 한미반도체 (042700)
  { id: "10", symbol: "042700", username: "짱헷님",    avatarColor: "#0891b2", minutesAgo: 11, content: "31만원 올라가지 지금 팔지 마세요",        likes: 7  },
  { id: "11", symbol: "042700", username: "히몽몽",    avatarColor: "#7c3aed", minutesAgo: 26, content: "이것들도 드무오기시작",                   likes: 4  },
  // 현대차 (005380)
  { id: "12", symbol: "005380", username: "자동차매니아", avatarColor: "#1d4ed8", minutesAgo: 4, content: "전기차 판매 회복세 기대해봅시다",         likes: 11 },
  // KODEX 인버스 (114800)
  { id: "13", symbol: "114800", username: "인버스왕",   avatarColor: "#dc2626", minutesAgo: 2,  content: "하락장에 인버스 들고 웃고있음 ㅋ",       likes: 22 },
  { id: "14", symbol: "114800", username: "곰장이",     avatarColor: "#6b7280", minutesAgo: 8,  content: "코스피 더 빠져줘야할텐데...",             likes: 6  },
];

export const NEWS_HEADLINES: NewsHeadline[] = [
  { id: "1", symbol: "000660", content: "실적이 발표됐어요. 2025년 연간 영업이익 47조 2,063억원, 2024년보다 101% 증가", hoursAgo: 24, iconColor: "#7c3aed" },
  { id: "2", symbol: "000660", content: "최근 1년 사이 가장 높은 애널리스트 목표주가가 나왔어요.",                       hoursAgo: 24, iconColor: "#dc2626" },
  { id: "3", symbol: "005930", content: "삼성전자, 2분기 반도체 실적 기대치 상회할 전망",                                hoursAgo: 12, iconColor: "#1d4ed8" },
  { id: "4", symbol: "005930", content: "외국인 투자자 삼성전자 순매수세 지속",                                           hoursAgo: 20, iconColor: "#059669" },
  { id: "5", symbol: "122630", content: "KOSPI 급등에 레버리지 ETF 수익률 상위권",                                        hoursAgo: 6,  iconColor: "#7c3aed" },
  { id: "6", symbol: "122630", content: "코스피 3거래일 연속 상승, 레버리지 강세 지속 전망",                              hoursAgo: 18, iconColor: "#f97316" },
  { id: "7", symbol: "042700", content: "한미반도체, HBM 관련 매출 급증으로 분기 최대 실적 달성",                         hoursAgo: 8,  iconColor: "#ea580c" },
  { id: "8", symbol: "005380", content: "현대차 전기차 글로벌 판매 전년 대비 35% 증가",                                   hoursAgo: 16, iconColor: "#1d4ed8" },
];
