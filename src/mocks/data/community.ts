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
  { id: "8",  symbol: "005380", content: "현대차 전기차 글로벌 판매 전년 대비 35% 증가",                                                              hoursAgo: 16, iconColor: "#1d4ed8" },
  // 포스코홀딩스 (047050)
  { id: "9",  symbol: "047050", content: "포스코홀딩스, 아르헨티나 리튬 상업 생산 3분기 개시 및 자산 매각으로 1조 원 현금 확보 계획 발표",             hoursAgo: 10, iconColor: "#059669" },
  { id: "10", symbol: "047050", content: "2025년 연결 영업이익 전년 대비 16% 감소한 1조 8천억 원 기록… 배터리소재 부문 부진이 발목",                   hoursAgo: 22, iconColor: "#dc2626" },
  // NAVER (035420)
  { id: "11", symbol: "035420", content: "네이버, 4분기 매출 3조 2천억 원으로 전년 대비 10.7% 성장… AI 기반 광고가 플랫폼 매출 55% 견인",              hoursAgo: 8,  iconColor: "#16a34a" },
  { id: "12", symbol: "035420", content: "2026년부터 GPU 6만 기 포함 연간 1조 원 규모 AI 인프라 투자 집행 예정, 증권사 22곳 '매수' 의견 유지",           hoursAgo: 20, iconColor: "#16a34a" },
  // 카카오 (035720)
  { id: "13", symbol: "035720", content: "카카오, 2025년 연간 매출 8조 99억 원으로 역대 최고 기록… 영업이익률 전년 대비 3%p 개선된 9% 달성",             hoursAgo: 12, iconColor: "#fbbf24" },
  { id: "14", symbol: "035720", content: "ChatGPT for Kakao 사용자 800만 명 돌파, 2026년 매출 10% 이상 성장 및 영업이익률 10% 목표 제시",                hoursAgo: 24, iconColor: "#059669" },
  // 대우건설 (047040)
  { id: "15", symbol: "047040", content: "대우건설, 가덕도 신공항 부지 조성 공사 PQ 서류 제출… 대형 인프라 수주 확대 전략 본격화",                       hoursAgo: 6,  iconColor: "#0891b2" },
  { id: "16", symbol: "047040", content: "신임문역 일대 도시환경정비사업 시공사로 최종 선정, 성수4구역 'THE SEONGSU 520' 브랜드 제안",                    hoursAgo: 18, iconColor: "#0891b2" },
  // 티와이홀딩스 (091810)
  { id: "17", symbol: "091810", content: "티와이홀딩스, 3분기 누적 영업손실 전년 대비 95.2% 급감… 레저·미디어 부문 구조 개선 효과",                       hoursAgo: 14, iconColor: "#7c3aed" },
  { id: "18", symbol: "091810", content: "골프·아웃도어 수요 증가로 레저 사업 회복세, 방송 광고 시장 위축으로 미디어 부문 부진 지속",                      hoursAgo: 28, iconColor: "#f97316" },
  // 휴림로봇 (338220)
  { id: "19", symbol: "338220", content: "휴림로봇, 3분기 누적 매출 전년 동기 대비 118.3% 급증, 영업손실폭도 52.3% 축소",                                  hoursAgo: 5,  iconColor: "#059669" },
  { id: "20", symbol: "338220", content: "자율주행 기반 AMR 'TETRA-DSV' 상용화 추진… 교육·키오스크·물류 시장 진출 가속화",                                 hoursAgo: 15, iconColor: "#059669" },
  // KODEX 인버스 (114800)
  { id: "21", symbol: "114800", content: "코스피 지수 하락 흐름에 인버스 ETF 거래량 급증, 기관 매수세 유입",                                               hoursAgo: 3,  iconColor: "#dc2626" },
  { id: "22", symbol: "114800", content: "글로벌 긴축 우려 재점화… 코스피 하방 압력 지속 전망에 인버스 관심 확대",                                         hoursAgo: 11, iconColor: "#dc2626" },
  // KODEX 200 (069500)
  { id: "23", symbol: "069500", content: "KODEX 200 순자산 10조 원 돌파, 코스피 대형주 강세에 패시브 자금 유입 확대",                                       hoursAgo: 9,  iconColor: "#7c3aed" },
  { id: "24", symbol: "069500", content: "외국인 코스피 200 편입 종목 집중 매수… 지수형 ETF 수급 개선 기대",                                               hoursAgo: 21, iconColor: "#7c3aed" },
  // KODEX 200선물인버스2X (252670)
  { id: "25", symbol: "252670", content: "코스피 상승 전환에 인버스2X ETF 급락, 레버리지 하락 베팅 투자자 손실 확대",                                       hoursAgo: 4,  iconColor: "#dc2626" },
  { id: "26", symbol: "252670", content: "글로벌 증시 반등세에 인버스 상품 손실 누적… 변동성 확대 구간 주의 요망",                                          hoursAgo: 16, iconColor: "#dc2626" },
  // KODEX 코스닥150레버리지 (233740)
  { id: "27", symbol: "233740", content: "코스닥 150 지수 강세에 레버리지 ETF 수익률 상위권 진입",                                                          hoursAgo: 7,  iconColor: "#7c3aed" },
  { id: "28", symbol: "233740", content: "2차전지·반도체 중소형주 급등에 코스닥150레버리지 거래 폭발적 증가",                                               hoursAgo: 19, iconColor: "#f97316" },
  // Apple (AAPL)
  { id: "29", symbol: "AAPL",   content: "Apple, FY26Q1 매출 1,438억 달러로 역대 최대 분기 실적… EPS $2.84로 예상치 6.7% 상회",                            hoursAgo: 10, iconColor: "#555555" },
  { id: "30", symbol: "AAPL",   content: "아이폰 역대 최대 분기 판매 기록, 서비스 매출도 사상 최고치… 2분기 가이던스 성장률 13~16% 제시",                   hoursAgo: 22, iconColor: "#555555" },
  // Microsoft (MSFT)
  { id: "31", symbol: "MSFT",   content: "Microsoft, FY26Q2 매출 813억 달러(+17% YoY)… Azure 성장률 39% 기록하며 AI 수요 강세 확인",                       hoursAgo: 8,  iconColor: "#0078d4" },
  { id: "32", symbol: "MSFT",   content: "코파일럿 유료 좌석 1,500만 석 돌파, CEO 나델라 '이미 빅프랜차이즈 수준의 AI 매출 구축'",                          hoursAgo: 20, iconColor: "#0078d4" },
  // NVIDIA (NVDA)
  { id: "33", symbol: "NVDA",   content: "NVIDIA, FY26Q4 매출 681억 달러로 전년 대비 73% 폭증… 데이터센터 부문만 623억 달러",                               hoursAgo: 6,  iconColor: "#76b900" },
  { id: "34", symbol: "NVDA",   content: "젠슨 황 CEO '블랙웰 수요 차트 한계 초과, 전량 완판'… 차세대 '베라 루빈' 샘플 출하 개시",                          hoursAgo: 18, iconColor: "#76b900" },
  // Alphabet (GOOGL)
  { id: "35", symbol: "GOOGL",  content: "알파벳, 4분기 매출 1,138억 달러(+18% YoY)… 클라우드 매출 48% 성장으로 컨센서스 상회",                            hoursAgo: 12, iconColor: "#4285f4" },
  { id: "36", symbol: "GOOGL",  content: "제미나이 AI 월간 활성 사용자 7억 5천만 명 돌파, 2026년 AI 인프라 투자 최대 1,850억 달러 계획 발표",               hoursAgo: 24, iconColor: "#4285f4" },
  // Amazon (AMZN)
  { id: "37", symbol: "AMZN",   content: "아마존, FY25Q4 AWS 매출 356억 달러(+24%)로 13분기 만에 최고 성장률 기록… 전체 매출 2,134억 달러",                 hoursAgo: 9,  iconColor: "#ff9900" },
  { id: "38", symbol: "AMZN",   content: "2026년 자본지출 2,000억 달러 계획 발표, AI·로봇·위성 투자 확대… AWS 수주 잔고 2,440억 달러",                      hoursAgo: 21, iconColor: "#ff9900" },
  // Meta (META)
  { id: "39", symbol: "META",   content: "메타, FY25Q4 매출 599억 달러(+24% YoY)… AI 광고 고도화로 광고 단가 6% 상승·노출 수 18% 증가",                    hoursAgo: 7,  iconColor: "#0668e1" },
  { id: "40", symbol: "META",   content: "2026년 설비투자 최대 1,350억 달러 계획 발표, AI 인프라 및 기술 인재 확보에 집중 투자",                             hoursAgo: 19, iconColor: "#0668e1" },
  // Tesla (TSLA)
  { id: "41", symbol: "TSLA",   content: "테슬라, 2025년 연간 인도량 164만 대로 전년 대비 8.6% 감소… BYD에 글로벌 1위 내줘",                                hoursAgo: 11, iconColor: "#cc0000" },
  { id: "42", symbol: "TSLA",   content: "유럽 판매 11개월간 39% 급감, 에너지 저장 사업은 분기 14.2GWh 배치로 선방",                                        hoursAgo: 23, iconColor: "#cc0000" },
  // Berkshire Hathaway (BRK.B)
  { id: "43", symbol: "BRK.B",  content: "버크셔, 워런 버핏 CEO 퇴임… 그렉 아벨이 신임 CEO 취임하며 3,816억 달러 역대 최대 현금 보유 승계",                 hoursAgo: 14, iconColor: "#7c3aed" },
  { id: "44", symbol: "BRK.B",  content: "FY2025 영업이익 444억 달러로 전년 대비 약 30% 감소, 그렉 아벨 첫 주주서한으로 투자 전략 지속성 강조",             hoursAgo: 26, iconColor: "#7c3aed" },
];
