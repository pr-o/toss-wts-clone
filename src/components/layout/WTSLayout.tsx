"use client";

import { TopBar } from "./TopBar";
import { StockHeader } from "./StockHeader";
import { RightSidebar } from "./RightSidebar";
import { BottomTicker } from "./BottomTicker";
import { PanelManager } from "@/components/panels/PanelManager";

/**
 * Root layout of the WTS (Web Trading System).
 *
 * ┌─────────────────────────────────────────────────────────────┐
 * │  TopBar — logo, horizontal nav tabs, search, avatar         │
 * ├───────────────────────────────────────┬─────────────────────┤
 * │  StockHeader                          │                     │
 * │  (symbol, price, stats, detail tabs)  │   RightSidebar      │
 * ├───────────────────────────────────────┤   (기본계좌,         │
 * │                                       │    내 투자 tabs,    │
 * │   PanelManager (resizable panels)     │    watchlist)       │
 * │                                       │                     │
 * ├───────────────────────────────────────┴─────────────────────┤
 * │  BottomTicker — scrolling financial index data              │
 * └─────────────────────────────────────────────────────────────┘
 */
export function WTSLayout() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[var(--tds-surface-base)] text-[var(--tds-text-primary)]">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        {/* Main content: stock header + panels */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <StockHeader />
          <main className="flex-1 overflow-hidden">
            <PanelManager />
          </main>
        </div>
        <RightSidebar />
      </div>
      <BottomTicker />
    </div>
  );
}
