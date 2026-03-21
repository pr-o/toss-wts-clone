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
  { id: "13", symbol: "114800", username: "인버스왕",   avatarColor: "#dc2626", minutesAgo: 2,  content: "하락장에 인버스 들고 웃고있음 ㅋ",                         likes: 22 },
  { id: "14", symbol: "114800", username: "곰장이",     avatarColor: "#6b7280", minutesAgo: 8,  content: "코스피 더 빠져줘야할텐데...",                               likes: 6  },
  // ZSL
  { id: "15", symbol: "ZSL",    username: "인버스러버",  avatarColor: "#ef4444", minutesAgo: 7,  content: "ZSL 타이밍 잘못 잡았다... 은 계속 오르네 ㅠ",               likes: 9  },
  { id: "16", symbol: "ZSL",    username: "실버베어",   avatarColor: "#6b7280", minutesAgo: 14, content: "인버스 ETF는 장기 보유하면 안 된다는 걸 몸으로 배우는 중",    likes: 14 },
  // 쿠팡 (CPNG)
  { id: "17", symbol: "CPNG",   username: "로켓배송팬", avatarColor: "#e11d48", minutesAgo: 5,  content: "쿠팡 매일 쓰는데 주식도 사놔야겠다 ㅋㅋ",                     likes: 17 },
  { id: "18", symbol: "CPNG",   username: "와우회원",   avatarColor: "#f97316", minutesAgo: 11, content: "로켓와우 가격 올려도 탈퇴 안 하는 사람들 봐라, 해자가 있음",   likes: 21 },
  // IONQ
  { id: "19", symbol: "IONQ",   username: "양자덕후",   avatarColor: "#7c3aed", minutesAgo: 6,  content: "양자컴퓨팅 아직 멀었다는 사람들 있는데... IONQ는 다르다",      likes: 13 },
  { id: "20", symbol: "IONQ",   username: "미래투자자", avatarColor: "#8b5cf6", minutesAgo: 19, content: "변동성 장난 없음 ㅋㅋ 오늘만 10% 빠짐... 심장 어디 갔냐",      likes: 8  },
  // BTX
  { id: "21", symbol: "BTX",    username: "바이오신자", avatarColor: "#16a34a", minutesAgo: 9,  content: "임상 결과 발표 전 포지션 어떻게 가져가야 할지... 패스트트랙이니 기대는 됨", likes: 11 },
  { id: "22", symbol: "BTX",    username: "올인갬블러", avatarColor: "#dc2626", minutesAgo: 22, content: "바이오는 올인 아니면 스몰베팅, 중간은 없음 ㅋㅋ",               likes: 5  },
  // MSTU
  { id: "23", symbol: "MSTU",   username: "비트코인형", avatarColor: "#f97316", minutesAgo: 4,  content: "MSTU 들고 심장 박동 빠르게 살기 ㅋㅋㅋ",                       likes: 26 },
  { id: "24", symbol: "MSTU",   username: "레버리지중독", avatarColor: "#ea580c", minutesAgo: 16, content: "BTC 올라가면 2배 오르고 내려가면 2배 떨어지는 거 알면서도 못 팜", likes: 19 },
  // VYM
  { id: "25", symbol: "VYM",    username: "배당장인",   avatarColor: "#0891b2", minutesAgo: 3,  content: "월급처럼 배당 받는 기분이라 VYM 계속 적립 중 ㅎㅎ",             likes: 33 },
  { id: "26", symbol: "VYM",    username: "존버왕",     avatarColor: "#0e7490", minutesAgo: 18, content: "ETF 장기투자는 VYM이 국룰이라는 분들 진짜 많더라",               likes: 22 },
  // SPLG
  { id: "27", symbol: "SPLG",   username: "SPY탈출",    avatarColor: "#1d4ed8", minutesAgo: 8,  content: "SPY보다 수수료 싼 SPLG로 갈아탄 지 1년... 누적 수익률은 비슷",  likes: 16 },
  { id: "28", symbol: "SPLG",   username: "인덱스신자", avatarColor: "#3b82f6", minutesAgo: 21, content: "S&P 500 ETF는 그냥 오래 들고 있으면 장땡 아닌가요",              likes: 28 },
  // Reddit (RDDT)
  { id: "29", symbol: "RDDT",   username: "레딧덕",     avatarColor: "#ff4500", minutesAgo: 2,  content: "레딧 데이터 팔아서 AI 회사들한테 돈 버는 구조가 생각보다 크네", likes: 37 },
  { id: "30", symbol: "RDDT",   username: "IPO대박",    avatarColor: "#f97316", minutesAgo: 13, content: "오늘 개장하자마자 27% 뛰어서 바로 팔았음... 아직 더 가는 중 ㅠ", likes: 44 },
  // TSLT
  { id: "31", symbol: "TSLT",   username: "테슬라레버", avatarColor: "#cc0000", minutesAgo: 6,  content: "TSLT 들고있으면 심장이 테슬라 주가와 2배로 반응함 ㅋㅋ",         likes: 20 },
  { id: "32", symbol: "TSLT",   username: "롤오버고통", avatarColor: "#9ca3af", minutesAgo: 20, content: "레버리지 ETF는 롤오버 비용 때문에 장기 보유가 손해인데도 계속 들고 있음", likes: 12 },
  // SoundHound (SOUN)
  { id: "33", symbol: "SOUN",   username: "AI주식꾼",  avatarColor: "#0ea5e9", minutesAgo: 7,  content: "현차랑 계약 연장했다는 뉴스에 들어갔는데 엔비디아 지분 매각에 바로 마이너스 ㅠ", likes: 18 },
  { id: "34", symbol: "SOUN",   username: "AI뚝배기",  avatarColor: "#38bdf8", minutesAgo: 23, content: "AI 관련주 변동성 어마어마하네... 타이밍 잘못 잡으면 빼기 각",     likes: 9  },
  // Norwegian Cruise Line (NCLH)
  { id: "35", symbol: "NCLH",   username: "코로나존버", avatarColor: "#003087", minutesAgo: 4,  content: "코로나 때 공포에 샀던 NCLH 드디어 손익분기점 넘음 ㅠㅠ",        likes: 41 },
  { id: "36", symbol: "NCLH",   username: "크루즈팬",  avatarColor: "#0891b2", minutesAgo: 17, content: "크루즈 주식 들고 있으면 여행 갈 때마다 심리적으로 이득인 느낌 ㅋ", likes: 15 },
  // SoFi (SOFI)
  { id: "37", symbol: "SOFI",   username: "핀테크신자", avatarColor: "#8b5cf6", minutesAgo: 5,  content: "소파이 은행 라이선스 취득한다고 할 때 들어갔는데 드디어 빛을 보나", likes: 23 },
  { id: "38", symbol: "SOFI",   username: "오늘도14%",  avatarColor: "#7c3aed", minutesAgo: 12, content: "오늘 14% 뛰었는데 이게 호재가 맞나요? ㅋㅋㅋ 너무 신남",         likes: 31 },
  // Booking Holdings (BKNG)
  { id: "39", symbol: "BKNG",   username: "부킹닷컴유저", avatarColor: "#003580", minutesAgo: 8, content: "부킹닷컴 사용자인데 주식도 매달 적립 중 ㅋ 잘 모르면 쓰는 서비스 사면 됨", likes: 27 },
  { id: "40", symbol: "BKNG",   username: "소수점매수",  avatarColor: "#1d4ed8", minutesAgo: 24, content: "주가 너무 비싸서 소수점 매수로 조금씩 모으는 중 ㅎㅎ",            likes: 14 },
  // Chevron (CVX)
  { id: "41", symbol: "CVX",    username: "배당오일",   avatarColor: "#00aaff", minutesAgo: 3,  content: "배당 안정적이고 자사주 매입도 하니까 월급 받는 기분으로 보유 중",  likes: 29 },
  { id: "42", symbol: "CVX",    username: "유가쫄보",   avatarColor: "#0369a1", minutesAgo: 15, content: "석유주는 유가에 연동되니까 OPEC 발표 때마다 심장이 쿵쾅거림",     likes: 11 },
  // Palantir (PLTR)
  { id: "43", symbol: "PLTR",   username: "국방AI팬",   avatarColor: "#dc2626", minutesAgo: 6,  content: "팰런티어 미군 AI 계약 계속 따오는데 왜 주가가 내리냐고 ㅠ",       likes: 35 },
  { id: "44", symbol: "PLTR",   username: "공매도전사", avatarColor: "#b91c1c", minutesAgo: 19, content: "공매도 세력이랑 계속 싸우는 주식 ㅋㅋ 결국은 오른다",             likes: 24 },
  // REX
  { id: "45", symbol: "REX",    username: "낙폭매수",   avatarColor: "#6b7280", minutesAgo: 9,  content: "오늘 16% 빠졌는데 이게 기회인지 폭탄인지 ㅋㅋ 반반임",           likes: 7  },
  { id: "46", symbol: "REX",    username: "바닥예측러", avatarColor: "#9ca3af", minutesAgo: 25, content: "REX 언제 바닥 잡냐... 아직 더 내려갈 것 같기도 하고",             likes: 4  },
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
  // ZSL
  { id: "45", symbol: "ZSL",    content: "은 선물 가격 연중 최고치 경신에 ZSL 2배 인버스 손실 폭 확대, 귀금속 강세 흐름 당분간 지속 전망",                   hoursAgo: 5,  iconColor: "#ef4444" },
  { id: "46", symbol: "ZSL",    content: "연준 금리동결 신호에 안전자산 수요 급증… 은 가격 상승 압력 지속, ZSL 단기 하락 리스크 경고",                        hoursAgo: 17, iconColor: "#ef4444" },
  // 쿠팡 (CPNG)
  { id: "47", symbol: "CPNG",   content: "쿠팡, FY25 4분기 매출 91억 달러 기록… 한국 e커머스 시장 점유율 41% 돌파하며 성장 지속",                            hoursAgo: 8,  iconColor: "#e11d48" },
  { id: "48", symbol: "CPNG",   content: "로켓배송 회원 수 1,400만 명 돌파, 대만·일본 시장 진출 가속화로 해외 매출 비중 확대",                               hoursAgo: 20, iconColor: "#e11d48" },
  // IONQ
  { id: "49", symbol: "IONQ",   content: "IonQ, 양자컴퓨팅 오류율 사상 최저치 달성… 상업화 일정 2년 앞당기며 경쟁사 대비 기술 우위 확보",                    hoursAgo: 6,  iconColor: "#7c3aed" },
  { id: "50", symbol: "IONQ",   content: "미 공군과 1억 달러 규모 양자 시뮬레이션 계약 체결, 정부 수요 기반 매출 가시화",                                      hoursAgo: 22, iconColor: "#7c3aed" },
  // BTX
  { id: "51", symbol: "BTX",    content: "BTX, 혈액암 치료제 2상 임상 FDA 패스트트랙 지정… 조기 승인 가능성 높아져 바이오 섹터 주목",                         hoursAgo: 9,  iconColor: "#16a34a" },
  { id: "52", symbol: "BTX",    content: "주요 임상 데이터 발표 앞두고 바이오 섹터 변동성 급증, 결과 발표 전후 주가 급등락 주의 요망",                         hoursAgo: 23, iconColor: "#16a34a" },
  // MSTU
  { id: "53", symbol: "MSTU",   content: "비트코인 가격 급등에 MSTU 레버리지 ETF 단기 80% 수익 기록… 2배 추종 구조로 변동성 극대화",                          hoursAgo: 4,  iconColor: "#f97316" },
  { id: "54", symbol: "MSTU",   content: "MicroStrategy 비트코인 추가 매입 발표에 MSTU 연동 상품 동반 급등, 코인 흐름과 함께 모니터링 필수",                   hoursAgo: 16, iconColor: "#f97316" },
  // VYM
  { id: "55", symbol: "VYM",    content: "VYM, 배당 수익률 3.2% 안정적 유지… 연준 인하 국면에서 고배당 ETF 매력 재부각, 자금 유입 확대",                      hoursAgo: 11, iconColor: "#0891b2" },
  { id: "56", symbol: "VYM",    content: "뱅가드 배당 ETF 시리즈 월간 순유입 사상 최대 기록, 장기 배당 투자자 수요 꾸준히 증가",                              hoursAgo: 25, iconColor: "#0891b2" },
  // SPLG
  { id: "57", symbol: "SPLG",   content: "SPLG, S&P 500 추종 ETF 중 최저 수준 보수율 유지… 장기 투자자 중심 자금 유입 가속화",                               hoursAgo: 7,  iconColor: "#1d4ed8" },
  { id: "58", symbol: "SPLG",   content: "미 증시 변동성 확대 국면에서 S&P 500 ETF 저가 매수세 유입, SPLG 거래량 전주 대비 42% 증가",                         hoursAgo: 19, iconColor: "#1d4ed8" },
  // Reddit (RDDT)
  { id: "59", symbol: "RDDT",   content: "레딧, AI 기업 대상 데이터 라이선스 매출 급증… 광고 수익도 전분기 대비 29% 성장하며 어닝 서프라이즈",                 hoursAgo: 3,  iconColor: "#ff4500" },
  { id: "60", symbol: "RDDT",   content: "IPO 이후 최고가 경신, 커뮤니티 기반 광고 모델과 AI 데이터 사업 확장 가능성 재평가 중",                              hoursAgo: 15, iconColor: "#ff4500" },
  // TSLT
  { id: "61", symbol: "TSLT",   content: "테슬라 주가 급락에 TSLT 2배 레버리지 ETF 동반 폭락… 하루 8% 손실로 단기 리스크 주의 요망",                          hoursAgo: 5,  iconColor: "#cc0000" },
  { id: "62", symbol: "TSLT",   content: "일론 머스크 정치 행보 관련 유럽 브랜드 이미지 하락 지속… 테슬라 레버리지 상품 변동성 극대화",                        hoursAgo: 18, iconColor: "#cc0000" },
  // SoundHound (SOUN)
  { id: "63", symbol: "SOUN",   content: "사운드하운드, 현대기아차 음성 AI 플랫폼 공급 계약 연장… 차량 AI 시장 확대로 B2B 매출 기반 강화",                    hoursAgo: 10, iconColor: "#0ea5e9" },
  { id: "64", symbol: "SOUN",   content: "엔비디아 보유 지분 전량 매각 소식에 주가 11% 급락… 기관 투자자 이탈 우려 확대",                                      hoursAgo: 24, iconColor: "#0ea5e9" },
  // Norwegian Cruise Line (NCLH)
  { id: "65", symbol: "NCLH",   content: "노르웨이 크루즈라인, 2026년 예약 건수 역대 최고치… 탑승률 107% 기록하며 분기 흑자 전환 성공",                        hoursAgo: 8,  iconColor: "#003087" },
  { id: "66", symbol: "NCLH",   content: "연료비 하락과 여행 수요 회복세 맞물려 EBITDA 마진 3년 만에 최고 수준 달성",                                          hoursAgo: 21, iconColor: "#003087" },
  // SoFi (SOFI)
  { id: "67", symbol: "SOFI",   content: "소파이, 은행 라이선스 취득 2년 만에 순이익 달성… 핀테크에서 풀뱅킹으로의 전환 성공 평가",                            hoursAgo: 6,  iconColor: "#8b5cf6" },
  { id: "68", symbol: "SOFI",   content: "연준 금리 인하 기조에 소파이 대출 포트폴리오 순이자마진 개선 전망, 목표주가 상향 릴레이",                            hoursAgo: 20, iconColor: "#8b5cf6" },
  // Booking Holdings (BKNG)
  { id: "69", symbol: "BKNG",   content: "부킹홀딩스, 분기 매출 56억 달러로 역대 최고치… AI 기반 여행 추천 도입으로 예약 전환율 18% 개선",                    hoursAgo: 9,  iconColor: "#003580" },
  { id: "70", symbol: "BKNG",   content: "유럽·아시아 여행 수요 폭발적 증가로 사상 최대 예약 건수 기록, 2026년 가이던스 상향 조정",                            hoursAgo: 23, iconColor: "#003580" },
  // Chevron (CVX)
  { id: "71", symbol: "CVX",    content: "셰브론, FY25 잉여현금흐름으로 자사주 매입 175억 달러 집행… 주주환원 프로그램 업계 최대 규모",                        hoursAgo: 7,  iconColor: "#00aaff" },
  { id: "72", symbol: "CVX",    content: "유가 하락에도 퍼미안 분지 생산량 사상 최대 기록, 철저한 비용 통제로 안정적 배당 지속 능력 확인",                     hoursAgo: 19, iconColor: "#00aaff" },
  // Palantir (PLTR)
  { id: "73", symbol: "PLTR",   content: "팰런티어, 미 육군과 2조 4천억 원 규모 AI 전투 시스템 계약 체결… 국방 AI 사업 최대 수혜주 부각",                     hoursAgo: 4,  iconColor: "#dc2626" },
  { id: "74", symbol: "PLTR",   content: "S&P 500 편입 이후 기관 순매수 집중, 애널리스트 목표주가 줄상향… 소프트웨어 섹터 내 AI 대장주 자리매김",             hoursAgo: 17, iconColor: "#dc2626" },
  // REX
  { id: "75", symbol: "REX",    content: "REX, 금리 민감 섹터 전반 약세 속 낙폭 과대 평가… 단기 기술적 반등 구간 진입 분석",                                  hoursAgo: 6,  iconColor: "#6b7280" },
  { id: "76", symbol: "REX",    content: "미 연방준비제도 추가 긴축 우려 재점화에 중소형주 동반 하락, REX 포함 섹터 전반 조정 국면",                           hoursAgo: 18, iconColor: "#6b7280" },
];
