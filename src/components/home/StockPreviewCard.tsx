"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { cn, formatPrice, getPriceDirection } from "@/lib/utils";
import type { Stock, CommunityPost, NewsHeadline } from "@/types/stock";
import { MiniChart } from "./MiniChart";
import { Button } from "@/components/ui/button";

async function fetchStock(symbol: string): Promise<Stock> {
  const res = await fetch(`/api/stocks/${symbol}`); return res.json();
}
async function fetchPosts(symbol: string): Promise<CommunityPost[]> {
  const res = await fetch(`/api/community/${symbol}`); return res.json();
}
async function fetchNews(symbol: string): Promise<NewsHeadline[]> {
  const res = await fetch(`/api/news-headlines/${symbol}`); return res.json();
}

export function StockPreviewCard({ symbol }: { symbol: string }) {
  const router = useRouter();
  const { data: stock }   = useQuery({ queryKey: ["stock", symbol],    queryFn: () => fetchStock(symbol),  refetchInterval: 5_000 });
  const { data: posts = [] } = useQuery({ queryKey: ["community", symbol], queryFn: () => fetchPosts(symbol) });
  const { data: news = [] }  = useQuery({ queryKey: ["news-hl", symbol],   queryFn: () => fetchNews(symbol)  });

  if (!stock) return <div className="p-4 text-xs text-[var(--tds-text-tertiary)]">로딩 중...</div>;

  const dir = getPriceDirection(stock.changeRate);

  return (
    <div className="flex flex-col text-xs">
      {/* Stock info header */}
      <div
        className="cursor-pointer border-b border-[var(--tds-border-default)] p-3 hover:bg-[var(--tds-surface-elevated)] transition-colors"
        onClick={() => router.push(`/stocks/${symbol}/order`)}
      >
        <div className="flex items-center gap-2 mb-1">
          <div className="h-7 w-7 shrink-0 rounded-full flex items-center justify-center text-[11px] font-bold text-white" style={{ backgroundColor: stock.avatarColor ?? "#6b7280" }}>
            {stock.name[0]}
          </div>
          <div>
            <div className="font-semibold text-[var(--tds-text-primary)]">{stock.name}</div>
            <div className={cn("tabular-nums font-medium", {
              "text-[var(--tds-text-rise)]": dir === "rise",
              "text-[var(--tds-text-fall)]": dir === "fall",
              "text-[var(--tds-text-tertiary)]": dir === "flat",
            })}>
              {formatPrice(stock.price)}원 {stock.changeRate > 0 ? "+" : ""}{stock.changeRate.toFixed(2)}%
            </div>
          </div>
        </div>
        {/* Mini chart */}
        <div className="mt-2 h-56 rounded overflow-hidden">
          <MiniChart symbol={symbol} direction={dir} />
        </div>
      </div>

      {/* 한 줄 요약 */}
      {news.length > 0 && (
        <div className="border-b border-[var(--tds-border-default)] p-3">
          <div className="mb-2 font-semibold text-[var(--tds-text-primary)]">한 줄 요약</div>
          {news.slice(0, 2).map((item) => (
            <div key={item.id} className="mb-2 flex items-start gap-2">
              <div className="mt-0.5 h-5 w-5 shrink-0 rounded-full flex items-center justify-center text-[9px] font-bold text-white" style={{ backgroundColor: item.iconColor }}>
                소
              </div>
              <div>
                <div className="leading-relaxed text-[var(--tds-text-primary)]">{item.content}</div>
                <div className="mt-0.5 text-[10px] text-[var(--tds-text-tertiary)]">{item.hoursAgo}일 전</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 커뮤니티 */}
      {posts.length > 0 && (
        <div className="p-3">
          <div className="mb-2 font-semibold text-[var(--tds-text-primary)]">커뮤니티</div>
          {posts.slice(0, 4).map((post) => (
            <div key={post.id} className="mb-2.5 flex items-start gap-2">
              <div className="h-6 w-6 shrink-0 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ backgroundColor: post.avatarColor }}>
                {post.username[0]}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="font-medium text-[var(--tds-text-primary)]">{post.username}</span>
                  <span className="text-[10px] text-[var(--tds-text-tertiary)]">{post.minutesAgo}분</span>
                </div>
                <div className="text-[var(--tds-text-secondary)] leading-relaxed">{post.content}</div>
              </div>
            </div>
          ))}
          <Button
            variant="ghost"
            size="xs"
            onClick={() => router.push(`/stocks/${symbol}/order`)}
            className="mt-1 h-auto p-0 text-[10px] text-[var(--tds-text-brand)] hover:underline hover:bg-transparent"
          >
            전체 보기 &gt;
          </Button>
        </div>
      )}
    </div>
  );
}
