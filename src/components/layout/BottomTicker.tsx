"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import type { NewsItem } from "@/types/stock";

async function fetchNews(): Promise<NewsItem[]> {
  const res = await fetch("/api/news");
  return res.json();
}

export function BottomTicker() {
  const { data: news = [] } = useQuery({ queryKey: ["news"], queryFn: fetchNews });

  const ticker = news.map((n) => n.title).join("  ·  ");

  return (
    <footer className="flex h-7 items-center overflow-hidden border-t border-[var(--tds-border-default)] bg-[var(--tds-surface-elevated)] px-3">
      <span className="mr-3 shrink-0 text-[10px] font-semibold text-[var(--tds-text-brand)]">뉴스</span>
      <div className="relative flex-1 overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap text-[11px] text-[var(--tds-text-secondary)]"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          <span className="pr-16">{ticker}</span>
          <span className="pr-16">{ticker}</span>
        </motion.div>
      </div>
    </footer>
  );
}
