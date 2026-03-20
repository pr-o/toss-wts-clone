"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import type { CommunityPost } from "@/types/stock";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

async function fetchPosts(symbol: string): Promise<CommunityPost[]> {
  const res = await fetch(`/api/community/${symbol}`);
  return res.json();
}

export function CommunityPanel({ symbol }: { symbol: string }) {
  const { data: posts = [] } = useQuery({
    queryKey: ["community", symbol],
    queryFn: () => fetchPosts(symbol),
  });

  return (
    <div className="flex h-full flex-col bg-[var(--tds-surface-base)] text-xs">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-[var(--tds-border-default)] px-3 py-2">
        <span className="font-medium text-[var(--tds-text-primary)]">커뮤니티</span>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="xs"
            className="gap-0.5 text-[10px] text-[var(--tds-text-tertiary)] hover:text-[var(--tds-text-secondary)]"
          >
            인기순 <ChevronDown size={11} />
          </Button>
          <Button
            variant="ghost"
            size="icon-xs"
            className="text-[var(--tds-text-tertiary)] hover:text-[var(--tds-text-secondary)]"
          >
            ✕
          </Button>
        </div>
      </div>

      {/* Posts */}
      <ScrollArea className="flex-1">
        {posts.length === 0 ? (
          <div className="flex h-full items-center justify-center text-[var(--tds-text-tertiary)]">
            커뮤니티 게시글이 없어요
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="border-b border-[var(--tds-border-default)] px-3 py-2.5">
              <div className="flex items-start gap-2">
                <div
                  className="mt-0.5 h-7 w-7 shrink-0 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
                  style={{ backgroundColor: post.avatarColor }}
                >
                  {post.username[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="font-semibold text-[var(--tds-text-primary)]">{post.username}</span>
                    <span className="text-[10px] text-[var(--tds-text-tertiary)]">{post.minutesAgo}분</span>
                  </div>
                  <p className="leading-relaxed text-[var(--tds-text-secondary)]">{post.content}</p>
                </div>
              </div>
            </div>
          ))
        )}
        <Button
          variant="ghost"
          className="w-full py-2 text-center text-[10px] text-[var(--tds-text-brand)] hover:underline"
        >
          전체 보기 &gt;
        </Button>
      </ScrollArea>
    </div>
  );
}
