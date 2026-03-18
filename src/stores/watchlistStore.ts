import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WatchlistStore {
  symbols: string[];
  add: (symbol: string) => void;
  remove: (symbol: string) => void;
  has: (symbol: string) => boolean;
}

export const useWatchlistStore = create<WatchlistStore>()(
  persist(
    (set, get) => ({
      symbols: ["005930", "000660", "AAPL", "NVDA"],
      add: (symbol) =>
        set((s) => ({ symbols: s.symbols.includes(symbol) ? s.symbols : [...s.symbols, symbol] })),
      remove: (symbol) =>
        set((s) => ({ symbols: s.symbols.filter((sym) => sym !== symbol) })),
      has: (symbol) => get().symbols.includes(symbol),
    }),
    { name: "wts-watchlist" }
  )
);
