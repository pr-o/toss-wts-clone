"use client";

import { Moon, Sun, Search, User } from "lucide-react";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useThemeStore } from "@/stores/themeStore";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NAV_TABS = [
  {
    id: "home",
    label: "홈",
    href: "/",
    match: (p: string) => p === "/",
    disabled: false,
  },
  {
    id: "feed",
    label: "피드",
    href: "/feed/recommended",
    match: (p: string) => p.startsWith("/feed"),
    disabled: false,
  },
  {
    id: "screener",
    label: "주식 골라보기",
    href: "/screener",
    match: (p: string) => p.startsWith("/screener"),
    disabled: false,
  },
  {
    id: "account",
    label: "내 계좌",
    href: "/account",
    match: (p: string) => p.startsWith("/account"),
    disabled: true,
  },
] as const;

export function TopBar() {
  const { theme, toggle } = useThemeStore();
  const router = useRouter();
  const pathname = usePathname();
  const [searchFocused, setSearchFocused] = useState(false);

  const activeTab = NAV_TABS.find((t) => t.match(pathname))?.id ?? "home";

  return (
    <header className="sticky top-0 z-40 flex h-11 shrink-0 items-center gap-0 border-b border-[var(--tds-border-default)] bg-[var(--tds-surface-base)] px-4">
      {/* Logo */}
      <Button
        variant="ghost"
        onClick={() => router.push("/")}
        className="mr-6 shrink-0 gap-1 px-0 hover:bg-transparent"
      >
        <span className="text-sm font-bold text-[var(--tds-text-brand)] tracking-wider">
          토스쯩꿘
        </span>
      </Button>

      {/* Horizontal nav tabs */}
      <nav className="flex items-center gap-1">
        {NAV_TABS.map(({ id, label, href, disabled }) => (
          <Button
            key={id}
            variant="ghost"
            disabled={disabled}
            onClick={() => router.push(href)}
            className={cn(
              "relative h-auto rounded px-3 py-1.5 text-sm transition-colors hover:bg-transparent",
              disabled
                ? "cursor-not-allowed text-[var(--tds-text-tertiary)] opacity-40"
                : activeTab === id
                  ? "font-semibold text-[var(--tds-text-primary)]"
                  : "text-[var(--tds-text-tertiary)] hover:text-[var(--tds-text-secondary)]",
            )}
          >
            {label}
            {activeTab === id && !disabled && (
              <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-[var(--tds-text-brand)]" />
            )}
          </Button>
        ))}
      </nav>

      {/* Center notice */}
      <div className="absolute left-1/2 -translate-x-1/2 text-[12px] text-[var(--tds-text-secondary)] font-bold">
        이 웹사이트는 포트폴리오 용도로 토스증권을 모방한 사이트입니다
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Search input */}
      <div
        className={cn(
          "mr-2 flex h-8 w-52 items-center gap-2 rounded-lg border px-3 text-xs transition-all",
          searchFocused
            ? "border-[var(--tds-text-brand)] bg-[var(--tds-surface-base)]"
            : "border-[var(--tds-border-default)] bg-[var(--tds-surface-overlay)]",
        )}
      >
        <Search
          size={13}
          className="shrink-0 text-[var(--tds-text-tertiary)]"
        />
        <Input
          type="text"
          placeholder="/ 눌러 검색하세요"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className="h-auto w-full border-0 bg-transparent p-0 text-xs text-[var(--tds-text-primary)] shadow-none outline-none placeholder:text-[var(--tds-text-tertiary)] focus-visible:ring-0"
        />
      </div>

      {/* Theme toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggle}
        className="text-[var(--tds-text-tertiary)] hover:bg-[var(--tds-surface-overlay)] hover:text-[var(--tds-text-primary)]"
        aria-label="테마 변경"
      >
        {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
      </Button>

      {/* Account avatar */}
      <Button
        variant="ghost"
        size="icon"
        className="ml-1 rounded-full bg-[var(--tds-surface-overlay)] text-[var(--tds-text-secondary)] hover:bg-[var(--tds-surface-elevated)]"
      >
        <User size={15} />
      </Button>
    </header>
  );
}
