"use client";

import { type ReactNode } from "react";
import { TopBar } from "./TopBar";
import { RightSidebar } from "./RightSidebar";
import { BottomTicker } from "./BottomTicker";

/** Outer shell shared by all WTS pages. Children = the main content area. */
export function WTSShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[var(--tds-surface-base)] text-[var(--tds-text-primary)]">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-1 flex-col overflow-hidden">{children}</div>
        <RightSidebar />
      </div>
      <BottomTicker />
    </div>
  );
}
