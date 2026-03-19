"use client";

import { Home, Newspaper, Filter, Wallet, Search } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "home",         label: "홈",           icon: Home,       href: "/" },
  { id: "news",         label: "뉴스",          icon: Newspaper,  href: "/news" },
  { id: "stock-picker", label: "주식 골라보기",  icon: Filter,     href: "/screener" },
  { id: "account",      label: "내 계좌",        icon: Wallet,     href: "/account" },
  { id: "search",       label: "종목 검색",      icon: Search,     href: "/search" },
] as const;

export function LeftNav() {
  const router   = useRouter();
  const pathname = usePathname();
  const active   = NAV_ITEMS.find((n) => n.href === pathname)?.id ?? "home";

  return (
    <nav className="flex w-14 flex-col items-center gap-1 border-r border-[var(--tds-border-default)] bg-[var(--tds-surface-sidebar)] py-3">
      {NAV_ITEMS.map(({ id, label, icon: Icon, href }) => (
        <button
          key={id}
          onClick={() => router.push(href)}
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
