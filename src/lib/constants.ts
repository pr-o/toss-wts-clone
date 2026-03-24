/** TanStack Query refetch intervals (ms) — use these instead of inline magic numbers */
export const POLL = {
  orderbook: 2_000,
  orderForm: 3_000,
  stocks: 5_000,
  trends: 10_000,
  marketStatus: 60_000,
} as const;

/** Compact pill-style TabsTrigger className used across filter tab groups */
export const TAB_TRIGGER_CLASS =
  "cursor-pointer rounded-md px-2 py-1 text-[11px] text-[var(--tds-text-tertiary)] data-active:bg-[var(--tds-surface-base)] data-active:font-medium data-active:text-[var(--tds-text-primary)] data-active:shadow-sm";

/** Fallback background color for stock/user avatar circles */
export const DEFAULT_AVATAR_COLOR = "#6b7280";
