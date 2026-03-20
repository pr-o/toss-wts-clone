"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { FeedSubNav } from "./FeedSubNav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

// ── Mock news data (sourced from real 2026 articles) ───────────────────────

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  sourceColor: string;
  imageUrl: string | null;
  hoursAgo: number;
  category: "주요" | "글로벌";
}

const ARTICLES: NewsArticle[] = [
  {
    id: "1",
    title: "이란 사태에 15% 빠진 삼성전자·SK하이닉스…\"지금이라도 사라\"",
    summary: "미·이란 긴장 고조로 삼성전자·SK하이닉스 주가가 고점 대비 15~17% 조정받았지만, 대신증권은 2026년 영업이익 전망치를 대폭 상향하며 '지금이 매수 기회'라고 강조했다.",
    source: "연합인포맥스", sourceColor: "#1d4ed8",
    imageUrl: "https://t1.daumcdn.net/news/202603/16/552842-MG6mj39/20260316114402564odra.jpg",
    hoursAgo: 3, category: "주요",
  },
  {
    id: "2",
    title: "삼전·하닉 조정에도…\"반도체 호황 지속, 이익전망치 상향\"",
    summary: "대신증권이 삼성전자와 SK하이닉스의 2026년 영업이익 전망을 각각 242조·204조 원으로 크게 높이며, AI 서버 수요 확대로 반도체 초호황 사이클이 지속될 것이라고 전망했다.",
    source: "비즈워치", sourceColor: "#059669",
    imageUrl: "https://img3.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202603/16/BUSINESSWATCH/20260316103405288wpmx.jpg",
    hoursAgo: 5, category: "주요",
  },
  {
    id: "3",
    title: "골드만삭스, 삼성전자 목표주가 26만 원·SK하이닉스 135만 원으로 재상향",
    summary: "골드만삭스가 삼성전자 목표주가를 26만 원, SK하이닉스를 135만 원으로 상향했으나, 뱅크오브아메리카는 코스피가 '고전적 버블 패턴'을 보이고 있다고 경고했다.",
    source: "파이낸셜뉴스", sourceColor: "#7c3aed",
    imageUrl: "https://image.fnnews.com/resource/media/image/2026/03/09/202603090917305888_l.jpg",
    hoursAgo: 6, category: "주요",
  },
  {
    id: "4",
    title: "SK하이닉스 대비 삼성전자 '반도체 전쟁' 격화 [분석+]",
    summary: "삼성전자와 SK하이닉스가 AI 메모리 시장에서 치열한 경쟁을 벌이는 가운데, 증권사들이 양사의 목표주가를 잇달아 올리며 '메모리 황금기'가 본격화됐다고 분석했다.",
    source: "한국경제", sourceColor: "#ea580c",
    imageUrl: "https://news.nateimg.co.kr/orgImg/hk/2026/03/14/AD.43542842.1.jpg",
    hoursAgo: 5, category: "주요",
  },
  {
    id: "5",
    title: "코스피 5,800선 붕괴…중동 전쟁 공포에 마이크론 호실적도 역부족",
    summary: "이스라엘·이란 확전 우려로 글로벌 위험자산 회피 심리가 강해지며 코스피가 5,800선을 하향 이탈했고, 마이크론의 호실적에도 불구하고 삼성전자·SK하이닉스는 급락했다.",
    source: "서울경제", sourceColor: "#dc2626",
    imageUrl: "https://newsimg.sedaily.com/2026/03/19/20021314_1.jpg",
    hoursAgo: 1, category: "주요",
  },
  {
    id: "6",
    title: "삼성전자 2.83%·SK하이닉스 7.03% 급등…코스피 5,800 회복",
    summary: "AI 메모리 수요 낙관론과 마이크론 실적 기대감에 힘입어 반도체 대형주가 급등하며 코스피가 5,800선을 회복하고 외국인·기관 순매수가 집중됐다.",
    source: "서울경제", sourceColor: "#dc2626",
    imageUrl: "https://newsimg.sedaily.com/2026/03/18/20020780_1.jpg",
    hoursAgo: 2, category: "주요",
  },
  {
    id: "7",
    title: "Nvidia GTC 2026: Jensen Huang sees $1 trillion in orders for Blackwell and Vera Rubin",
    summary: "엔비디아 CEO 젠슨 황이 GTC 2026 기조연설에서 블랙웰·베라 루빈 칩의 2027년까지 누적 수주 규모가 1조 달러에 달할 것이라고 밝히며 AI 인프라 수요가 월가 전망을 웃돈다고 강조했다.",
    source: "CNBC", sourceColor: "#cc0000",
    imageUrl: null,
    hoursAgo: 4, category: "글로벌",
  },
  {
    id: "8",
    title: "Meta stock climbs nearly 3% on report of planned layoffs to offset AI spending",
    summary: "메타가 AI 비용 부담을 상쇄하기 위해 전체 인력의 최대 20%(약 1만 6천 명)를 감원하는 구조조정을 검토 중이라는 보도 이후 주가가 3% 가까이 상승했다.",
    source: "CNBC", sourceColor: "#cc0000",
    imageUrl: null,
    hoursAgo: 4, category: "글로벌",
  },
  {
    id: "9",
    title: "Fed holds interest rates steady, forecasts one rate cut in 2026",
    summary: "미 연준이 3월 FOMC에서 기준금리를 3.5~3.75%로 동결하고, 이란 사태에 따른 유가 불안과 인플레이션 우려로 올해 금리 인하를 단 1회로 제한할 것이라고 시사했다.",
    source: "Fox Business", sourceColor: "#1d4ed8",
    imageUrl: "https://a57.foxnews.com/static.foxbusiness.com/foxbusiness.com/content/uploads/2026/01/931/523/jerome-powell-fed-presser-12-25.jpg",
    hoursAgo: 6, category: "글로벌",
  },
  {
    id: "10",
    title: "코스닥 강세 vs 코스피 하락…중동 긴장에도 정책 기대감 유효",
    summary: "중동 긴장 고조로 코스피 대형주가 하락 압박을 받는 가운데 코스닥은 정부 자본시장 개혁 기대감과 ETF 신규 출시 효과로 상대적 강세를 보이며 1.34% 상승했다.",
    source: "서울경제", sourceColor: "#dc2626",
    imageUrl: "https://wimg.sedaily.com/news/cms/2026/03/15/news-p.v1.20260315.42edc4541c6f43d08d7be046cb3ca728_P1.png",
    hoursAgo: 7, category: "주요",
  },
];

const FILTER_TABS = ["전체뉴스", "주요뉴스", "글로벌뉴스"] as const;
type FilterTab = (typeof FILTER_TABS)[number];

const PAGE_SIZE = 7;

function NewsItem({ article }: { article: NewsArticle }) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="flex cursor-pointer items-start gap-4 border-b border-[var(--tds-border-default)] px-5 py-4 hover:bg-[var(--tds-surface-elevated)] transition-colors">
      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="mb-1 flex items-center gap-1.5">
          <Badge
            className="rounded-full px-2 py-0.5 text-[10px] font-medium text-white"
            style={{ backgroundColor: article.sourceColor }}
          >
            {article.source}
          </Badge>
        </div>
        <h3 className="mb-1 text-[13px] font-semibold leading-snug text-[var(--tds-text-primary)] line-clamp-2">
          {article.title}
        </h3>
        <p className="mb-2 text-[11px] leading-relaxed text-[var(--tds-text-secondary)] line-clamp-2">
          {article.summary}
        </p>
        <span className="text-[10px] text-[var(--tds-text-tertiary)]">
          {article.source} · {article.hoursAgo}시간 전
        </span>
      </div>

      {/* Thumbnail */}
      <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-[var(--tds-surface-overlay)]">
        {article.imageUrl && !imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.imageUrl}
            alt={article.title}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-6 w-6 rounded-full opacity-30" style={{ backgroundColor: article.sourceColor }} />
          </div>
        )}
      </div>
    </article>
  );
}

export function NewsView() {
  const [filterTab, setFilterTab] = useState<FilterTab>("전체뉴스");
  const [page, setPage] = useState(1);

  const filtered = ARTICLES.filter((a) => {
    if (filterTab === "주요뉴스")  return a.category === "주요";
    if (filterTab === "글로벌뉴스") return a.category === "글로벌";
    return true;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="flex flex-1 overflow-hidden">
      <FeedSubNav />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Filter tabs */}
        <Tabs
          value={filterTab}
          onValueChange={(v) => { setFilterTab(v as FilterTab); setPage(1); }}
          className="shrink-0 border-b border-[var(--tds-border-default)] px-5"
        >
          <TabsList variant="line" className="h-auto gap-0 rounded-none bg-transparent p-0">
            {FILTER_TABS.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="relative h-auto rounded-none px-4 py-3 text-[13px] font-medium transition-colors data-active:text-[var(--tds-text-primary)] data-active:bg-transparent data-active:shadow-none after:rounded-full after:bg-[var(--tds-text-brand)]"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Articles */}
        <ScrollArea className="flex-1">
          {paged.map((article) => <NewsItem key={article.id} article={article} />)}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1 py-4">
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="text-[var(--tds-text-tertiary)] hover:bg-[var(--tds-surface-overlay)] disabled:opacity-30"
              >
                <ChevronLeft size={14} />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <Button
                  key={n}
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => setPage(n)}
                  className={cn(
                    "text-[12px] transition-colors",
                    page === n
                      ? "bg-[var(--tds-fill-brand)] font-semibold text-white hover:bg-[var(--tds-fill-brand)]"
                      : "text-[var(--tds-text-secondary)] hover:bg-[var(--tds-surface-overlay)]",
                  )}
                >
                  {n}
                </Button>
              ))}
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="text-[var(--tds-text-tertiary)] hover:bg-[var(--tds-surface-overlay)] disabled:opacity-30"
              >
                <ChevronRight size={14} />
              </Button>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
