"use client";

import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import type { InvestorTrend } from "@/types/stock";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

async function fetchTrend(symbol: string): Promise<InvestorTrend> {
  const res = await fetch(`/api/investor-trend/${symbol}`);
  return res.json();
}

function TrendBar({ value }: { value: number }) {
  const max = 500000;
  const pct = Math.min(Math.abs(value) / max, 1) * 50;
  const isPos = value >= 0;
  return (
    <div className="flex items-center gap-1">
      <span className={cn("w-16 text-right tabular-nums", isPos ? "text-[var(--tds-text-rise)]" : "text-[var(--tds-text-fall)]")}>
        {value === 0 ? "–" : (isPos ? "+" : "") + value.toLocaleString("ko-KR")}
      </span>
      <div className="flex h-1.5 w-20 overflow-hidden rounded-full bg-[var(--tds-surface-overlay)]">
        {isPos
          ? <div className="ml-auto h-full bg-[var(--tds-text-rise)]" style={{ width: `${pct}%` }} />
          : <div className="mr-auto h-full bg-[var(--tds-text-fall)]" style={{ width: `${pct}%` }} />
        }
      </div>
    </div>
  );
}

export function InvestorTrendPanel({ symbol }: { symbol: string }) {
  const { data: trend } = useQuery({
    queryKey: ["investor-trend", symbol],
    queryFn: () => fetchTrend(symbol),
    refetchInterval: 10_000,
  });

  const rows = [
    { label: "개인",   value: trend?.retail ?? 0 },
    { label: "외국인", value: trend?.foreign ?? 0 },
    { label: "기관",   value: trend?.institution ?? 0 },
  ];

  return (
    <div className="flex h-full flex-col bg-[var(--tds-surface-base)] text-xs">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-[var(--tds-border-default)] px-3 py-2">
        <span className="font-medium text-[var(--tds-text-primary)]">투자자 동향</span>
        <Button
          variant="ghost"
          size="icon-xs"
          className="text-[var(--tds-text-tertiary)] hover:text-[var(--tds-text-secondary)]"
        >
          ✕
        </Button>
      </div>

      {/* Today trend */}
      <div className="shrink-0 border-b border-[var(--tds-border-default)] px-3 py-2 space-y-1.5">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between">
            <span className="w-12 text-[var(--tds-text-secondary)]">{label}</span>
            <TrendBar value={value} />
          </div>
        ))}
      </div>

      {/* History table */}
      <ScrollArea className="flex-1">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-[var(--tds-surface-base)]">
            <TableRow className="border-b border-[var(--tds-border-default)]">
              <TableHead className="px-3 py-1.5 text-left text-[10px] text-[var(--tds-text-tertiary)]">일자</TableHead>
              <TableHead className="px-2 py-1.5 text-right text-[10px] text-[var(--tds-text-tertiary)]">개인</TableHead>
              <TableHead className="px-2 py-1.5 text-right text-[10px] text-[var(--tds-text-tertiary)]">외국인</TableHead>
              <TableHead className="px-2 py-1.5 text-right text-[10px] text-[var(--tds-text-tertiary)]">기관</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(trend?.history ?? []).map((row) => (
              <TableRow key={row.date} className="border-b border-[var(--tds-border-default)] hover:bg-[var(--tds-surface-elevated)]">
                <TableCell className="px-3 py-1.5 text-[var(--tds-text-tertiary)]">{row.date}</TableCell>
                {[row.retail, row.foreign, row.institution].map((v, i) => (
                  <TableCell key={i} className={cn("px-2 py-1.5 text-right tabular-nums", v >= 0 ? "text-[var(--tds-text-rise)]" : "text-[var(--tds-text-fall)]")}>
                    {v === 0 ? "–" : (v > 0 ? "+" : "") + v.toLocaleString("ko-KR")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
