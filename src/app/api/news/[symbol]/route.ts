import { NextResponse } from "next/server";

const NEWS = [
  { id: "1", title: "삼성전자, 2분기 반도체 실적 기대치 상회", source: "한국경제", publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), relatedSymbols: ["005930"] },
  { id: "2", title: "NVIDIA, AI 칩 수요 급증으로 주가 사상 최고치 경신", source: "뉴스1", publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), relatedSymbols: ["NVDA"] },
  { id: "3", title: "코스피, 외국인 순매수에 2580선 회복", source: "연합뉴스", publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() },
  { id: "4", title: "애플, 새 아이폰 발표 앞두고 공급망 우려", source: "블룸버그", publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), relatedSymbols: ["AAPL"] },
  { id: "5", title: "카카오, 신규 AI 서비스 출시 계획 발표", source: "디지털타임스", publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), relatedSymbols: ["035720"] },
  { id: "6", title: "Fed, 기준금리 동결 결정…연내 인하 시사", source: "연합인포맥스", publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString() },
  { id: "7", title: "SK하이닉스, HBM3E 양산 확대로 수익성 개선 기대", source: "전자신문", publishedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), relatedSymbols: ["000660"] },
  { id: "8", title: "테슬라, 전기차 가격 인하 발표에 주가 하락", source: "로이터", publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), relatedSymbols: ["TSLA"] },
];

export function GET(_req: Request, { params }: { params: Promise<{ symbol: string }> }) {
  return params.then(({ symbol }) =>
    NextResponse.json(NEWS.filter((n) => n.relatedSymbols?.includes(symbol)))
  );
}
