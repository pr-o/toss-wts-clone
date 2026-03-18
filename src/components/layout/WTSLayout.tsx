"use client";

import { TopBar } from "./TopBar";
import { LeftNav } from "./LeftNav";
import { RightSidebar } from "./RightSidebar";
import { BottomTicker } from "./BottomTicker";
import { PanelManager } from "@/components/panels/PanelManager";

/**
 * Root layout of the WTS (Web Trading System).
 *
 * ┌──────────────────────────────────────────────────────┐
 * │  TopBar  — market indices, search, theme toggle      │
 * ├──────┬───────────────────────────────┬───────────────┤
 * │      │                               │               │
 * │ Left │   PanelManager (resizable     │ RightSidebar  │
 * │ Nav  │   binary-tree panel layout)   │ (watchlist,   │
 * │      │                               │  portfolio)   │
 * │      │                               │               │
 * ├──────┴───────────────────────────────┴───────────────┤
 * │  BottomTicker — scrolling news / price headlines     │
 * └──────────────────────────────────────────────────────┘
 */
export function WTSLayout() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[var(--tds-surface-base)] text-[var(--tds-text-primary)]">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <LeftNav />
        <main className="flex-1 overflow-hidden">
          <PanelManager />
        </main>
        <RightSidebar />
      </div>
      <BottomTicker />
    </div>
  );
}
