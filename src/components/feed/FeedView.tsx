"use client";

import { useState } from "react";
import { Heart, MessageCircle, Share2, PenLine, ChevronDown } from "lucide-react";
import { FeedSubNav } from "./FeedSubNav";
import { cn } from "@/lib/utils";

// ── Mock data ──────────────────────────────────────────────────────────────

interface DartCard {
  type: "dart";
  company: string;
  title: string;
  preview: string;
  date: string;
}
interface StockCard {
  type: "stock";
  symbol: string;
  name: string;
  price: string;
  changeRate: number;
  date: string;
}
type EmbedCard = DartCard | StockCard;

interface Post {
  id: string;
  author: { name: string; color: string; badges: string[] };
  minutesAgo: number | "방금";
  content: string;
  embed?: EmbedCard;
  likes: number;
  comments: number;
  liked?: boolean;
}

const POSTS: Post[] = [
  {
    id: "1",
    author: { name: "실시간분석가", color: "#f97316", badges: ["팔로워", "분석가"] },
    minutesAgo: "방금",
    content:
      "2026년 삼성전자 시장가치 재고 계획\n\n□ 메타 분석\n□ 다음 페이지를 통해 분석자의 'One-Stop-Solution'이 기대한 재성장의 의미가 무엇인지 살펴보겠습니다.\n\nD-HBM 등 고부가 제품의 시장에서 양산체제 확보로 위위하지고 있으며, 자사주소각도 호재가 될 것으로 보입니다.",
    embed: {
      type: "dart",
      company: "삼성전자",
      title: "주요경영사항 보고 — HBM4 양산 체제 확보 및 자사주 소각 결의",
      preview: "삼성전자가 2분기부터 HBM4 풀 양산 체제에 돌입하며 AI 데이터센터 수요에 본격 대응합니다.",
      date: "2026.03.19",
    },
    likes: 11,
    comments: 27,
  },
  {
    id: "2",
    author: { name: "반도체매니아", color: "#1d4ed8", badges: [] },
    minutesAgo: 3,
    content: "SK하이닉스 HBM3E 양산 확대 소식에 반도체 섹터 전반이 강세네요. 오늘 포트폴리오 수익률 +6.2% 달성했습니다 🎉",
    embed: {
      type: "stock",
      symbol: "000660",
      name: "SK하이닉스",
      price: "178,500",
      changeRate: 8.96,
      date: "26년 3월 19일",
    },
    likes: 34,
    comments: 12,
    liked: true,
  },
  {
    id: "3",
    author: { name: "글로벌투자자", color: "#059669", badges: ["팔로워"] },
    minutesAgo: 8,
    content:
      "Fed 금리 동결 소식 이후 나스닥 선물이 강하게 반등하고 있습니다. AI 관련주 중심으로 연속 매수세가 유입되는 모습입니다. NVIDIA, META 주목할 필요가 있어 보입니다.",
    likes: 22,
    comments: 5,
  },
  {
    id: "4",
    author: { name: "가치투자클럽", color: "#7c3aed", badges: ["분석가"] },
    minutesAgo: 15,
    content:
      "포스코홀딩스 리튬 프로젝트 본격화 — 아르헨티나 리튬 상업 생산 3분기 개시 발표.\n2차전지 소재 사업이 드디어 실적에 반영되기 시작합니다. 목표주가 350,000원 유지.",
    embed: {
      type: "dart",
      company: "포스코홀딩스",
      title: "해외 투자사업 진행 현황 — 아르헨티나 리튬 염호 상업생산 개시 결정",
      preview: "포스코홀딩스는 아르헨티나 리튬 염호 프로젝트의 상업 생산을 2026년 3분기 개시하기로 확정했습니다.",
      date: "2026.03.18",
    },
    likes: 41,
    comments: 19,
  },
  {
    id: "5",
    author: { name: "퀀트전략가", color: "#dc2626", badges: [] },
    minutesAgo: 22,
    content: "코스피 2,584선에서 외국인 순매수 지속 확인. 기관도 반도체·자동차 업종 중심으로 동반 매수 포착. 단기 상승 모멘텀 유효합니다.",
    likes: 18,
    comments: 3,
  },
  {
    id: "6",
    author: { name: "테슬라팬클럽", color: "#ea580c", badges: [] },
    minutesAgo: 31,
    content:
      "테슬라 유럽 판매 급감 우려에도 불구하고 에너지 저장 부문 성장세가 인상적입니다. 2026년 Megapack 수요 급증으로 에너지 사업이 자동차 부문 부진을 상쇄할 것으로 봅니다.",
    embed: {
      type: "stock",
      symbol: "TSLA",
      name: "Tesla",
      price: "245.30",
      changeRate: -1.68,
      date: "26년 3월 19일",
    },
    likes: 9,
    comments: 7,
  },
];

const WEEKLY_RANKINGS = [
  { rank: 1, name: "나다올라이머스", stat: "+14.3%",  color: "#7c3aed", highlight: false },
  { rank: 2, name: "gobits21",      stat: "수익률 1.87%", color: "#1d4ed8", highlight: false },
  { rank: 3, name: "수기",           stat: "팔로워 2,847", color: "#059669", highlight: false },
  { rank: 4, name: "두두리제38298",  stat: "+11.48%",  color: "#ea580c", highlight: true },
  { rank: 5, name: "수기23843",      stat: "+9.77%",   color: "#dc2626", highlight: false },
];

const THEMES = [
  { name: "미국주식/테크주",   color: "#1d4ed8" },
  { name: "미국주식/레버리지", color: "#7c3aed" },
  { name: "반도체/HBM",       color: "#059669" },
  { name: "2차전지/소재",      color: "#ea580c" },
];

// ── Sub-components ─────────────────────────────────────────────────────────

function DartEmbed({ card }: { card: DartCard }) {
  return (
    <div className="mt-3 overflow-hidden rounded-xl border border-[var(--tds-border-default)] bg-[var(--tds-surface-overlay)]">
      <div className="flex items-stretch">
        <div className="flex w-12 shrink-0 items-center justify-center bg-[#003087] text-[10px] font-bold tracking-tight text-white">
          D·ART
        </div>
        <div className="flex-1 p-3">
          <div className="mb-0.5 text-[11px] font-semibold text-[var(--tds-text-primary)] line-clamp-1">{card.company} · {card.title}</div>
          <div className="text-[10px] text-[var(--tds-text-secondary)] line-clamp-2 leading-relaxed">{card.preview}</div>
          <div className="mt-1 text-[10px] text-[var(--tds-text-tertiary)]">{card.date}</div>
        </div>
      </div>
    </div>
  );
}

function StockEmbed({ card }: { card: StockCard }) {
  const up = card.changeRate > 0;
  return (
    <div className="mt-3 flex items-center justify-between rounded-xl border border-[var(--tds-border-default)] bg-[var(--tds-surface-overlay)] px-4 py-3">
      <div>
        <div className="text-[11px] font-semibold text-[var(--tds-text-primary)]">{card.name}</div>
        <div className="mt-0.5 text-[10px] text-[var(--tds-text-tertiary)]">{card.date}</div>
      </div>
      <div className="text-right">
        <div className="text-sm font-semibold tabular-nums text-[var(--tds-text-primary)]">{card.price}원</div>
        <div className={cn("text-[11px] font-medium tabular-nums", up ? "text-[var(--tds-text-rise)]" : "text-[var(--tds-text-fall)]")}>
          {up ? "+" : ""}{card.changeRate.toFixed(2)}%
        </div>
      </div>
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  const [liked, setLiked] = useState(post.liked ?? false);
  const [likes, setLikes] = useState(post.likes);

  return (
    <article className="border-b border-[var(--tds-border-default)] px-5 py-4">
      {/* Author row */}
      <div className="mb-3 flex items-center gap-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white" style={{ backgroundColor: post.author.color }}>
          {post.author.name[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[13px] font-semibold text-[var(--tds-text-primary)]">{post.author.name}</span>
            {post.author.badges.map((b) => (
              <span key={b} className="rounded-full bg-[var(--tds-surface-overlay)] px-1.5 py-0.5 text-[10px] text-[var(--tds-text-secondary)]">{b}</span>
            ))}
          </div>
          <div className="text-[10px] text-[var(--tds-text-tertiary)]">
            {post.minutesAgo === "방금" ? "방금" : `${post.minutesAgo}분 전`}
          </div>
        </div>
      </div>

      {/* Content */}
      <p className="whitespace-pre-line text-[13px] leading-relaxed text-[var(--tds-text-primary)]">
        {post.content}
      </p>

      {/* Embed */}
      {post.embed?.type === "dart"  && <DartEmbed  card={post.embed} />}
      {post.embed?.type === "stock" && <StockEmbed card={post.embed} />}

      {/* Actions */}
      <div className="mt-3 flex items-center gap-4">
        <button
          onClick={() => { setLiked((p) => !p); setLikes((n) => n + (liked ? -1 : 1)); }}
          className={cn("flex items-center gap-1 text-[11px] transition-colors", liked ? "text-[var(--tds-text-rise)]" : "text-[var(--tds-text-tertiary)] hover:text-[var(--tds-text-secondary)]")}
        >
          <Heart size={13} fill={liked ? "currentColor" : "none"} />
          {likes}
        </button>
        <button className="flex items-center gap-1 text-[11px] text-[var(--tds-text-tertiary)] hover:text-[var(--tds-text-secondary)]">
          <MessageCircle size={13} />
          {post.comments}
        </button>
        <button className="flex items-center gap-1 text-[11px] text-[var(--tds-text-tertiary)] hover:text-[var(--tds-text-secondary)]">
          <Share2 size={13} />
        </button>
      </div>
    </article>
  );
}

// ── Main view ──────────────────────────────────────────────────────────────

export function FeedView() {
  return (
    <div className="flex flex-1 overflow-hidden">

      {/* ── Left sub-nav ─────────────────────────────────────────────── */}
      <FeedSubNav />

      {/* ── Feed posts ───────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Write prompt */}
        <div className="flex shrink-0 items-center gap-3 border-b border-[var(--tds-border-default)] px-5 py-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--tds-surface-overlay)] text-[11px] font-bold text-[var(--tds-text-secondary)]">나</div>
          <div className="flex-1 rounded-lg bg-[var(--tds-surface-overlay)] px-3 py-2 text-[12px] text-[var(--tds-text-tertiary)] cursor-text">
            투자 이야기가 없나 이웃들은?
          </div>
          <button className="flex shrink-0 items-center gap-1 rounded-lg bg-[var(--tds-fill-brand)] px-3 py-1.5 text-[12px] font-medium text-white">
            <PenLine size={12} />
            글쓰기
          </button>
        </div>

        {/* Posts */}
        <div className="flex-1 overflow-y-auto">
          {POSTS.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      </div>

      {/* ── Right panel ──────────────────────────────────────────────── */}
      <div className="flex w-52 shrink-0 flex-col overflow-y-auto border-l border-[var(--tds-border-default)] bg-[var(--tds-surface-base)]">

        {/* Weekly rankings */}
        <div className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[12px] font-semibold text-[var(--tds-text-primary)]">주간 프로필 랭킹</span>
            <button className="flex items-center gap-0.5 text-[10px] text-[var(--tds-text-tertiary)]">
              기간 <ChevronDown size={10} />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {WEEKLY_RANKINGS.map((u) => (
              <div key={u.rank} className="flex items-center gap-2">
                <span className="w-4 shrink-0 text-[10px] font-bold text-[var(--tds-text-tertiary)]">{u.rank}</span>
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: u.color }}>
                  {u.name[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[11px] font-medium text-[var(--tds-text-primary)]">{u.name}</div>
                  <div className={cn("text-[10px] tabular-nums", u.highlight ? "font-semibold text-[var(--tds-text-rise)]" : "text-[var(--tds-text-tertiary)]")}>
                    {u.stat}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-4 border-t border-[var(--tds-border-default)]" />

        {/* Notable themes */}
        <div className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[12px] font-semibold text-[var(--tds-text-primary)]">주목할 만한 테마</span>
            <button className="text-[10px] text-[var(--tds-text-tertiary)]">더보기 &gt;</button>
          </div>
          <div className="flex flex-col gap-2">
            {THEMES.map((t) => (
              <div key={t.name} className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-[var(--tds-surface-overlay)] transition-colors">
                <div className="h-5 w-5 shrink-0 rounded-md" style={{ backgroundColor: t.color }} />
                <span className="text-[11px] text-[var(--tds-text-primary)]">{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
