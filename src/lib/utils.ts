import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Format a number as KRW price (e.g. 12,345) */
export function formatPrice(value: number): string {
  return value.toLocaleString("ko-KR");
}

/** Format a number as a signed percent change (e.g. +1.23%) */
export function formatChange(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

/** Format a market index value — comma-separated for ≥1000, 2 decimals otherwise */
export function formatValue(value: number): string {
  if (value >= 1000) return value.toLocaleString("ko-KR", { maximumFractionDigits: 2 });
  return value.toFixed(2);
}

/** Returns "rise" | "fall" | "flat" for coloring */
export function getPriceDirection(change: number): "rise" | "fall" | "flat" {
  if (change > 0) return "rise";
  if (change < 0) return "fall";
  return "flat";
}
