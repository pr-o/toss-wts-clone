"use client";

import { Home, Newspaper, Filter, Wallet, Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "home",        label: "홈",           icon: Home },
  { id: "news",        label: "뉴스",          icon: Newspaper },
  { id: "stock-picker",label: "주식 골라보기",  icon: Filter },
  { id: "account",     label: "내 계좌",        icon: Wallet },
  { id: "search",      label: "종목 검색",      icon: Search },
] as const;

type NavId = (typeof NAV_ITEMS)[number]["id"];

export function LeftNav() {
  const [active, setActive] = useState<NavId>("home");

  return (
    <nav className="flex w-14 flex-col items-center gap-1 border-r border-[var(--tds-border-default)] bg-[var(--tds-surface-sidebar)] py-3">
      {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setActive(id)}
          className={cn(
            "flex w-10 flex-col items-center gap-0.5 rounded-lg py-2 text-[10px] transition-colors",
            active === id
              ? "bg-[var(--tds-surface-overlay)] text-[var(--tds-text-brand)]"
              : "text-[var(--tds-text-tertiary)] hover:bg-[var(--tds-surface-overlay)] hover:text-[var(--tds-text-secondary)]"
          )}
          title={label}
        >
          <Icon size={16} />
          <span className="leading-none">{label.length > 4 ? "" : label}</span>
        </button>
      ))}
    </nav>
  );
}
