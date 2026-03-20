"use client";

import { type ReactNode } from "react";
import { TopBar } from "./TopBar";
import { RightSidebar } from "./RightSidebar";
import { BottomTicker } from "./BottomTicker";
import { PageFooter } from "./PageFooter";

/** Outer shell shared by all WTS pages. Children = the main content area. */
export function WTSShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--tds-surface-base)] text-[var(--tds-text-primary)]">
      <TopBar />
      <div className="flex flex-1">
        {/* Left column — body scrolls, BottomTicker is left-column-wide only */}
        <div className="flex min-w-0 flex-1 flex-col">
          {children}
          <BottomTicker />
          <PageFooter />
        </div>
        {/* Right sidebar — sticky below TopBar, always in view */}
        <div className="sticky top-11 h-[calc(100vh-44px)] shrink-0 self-start">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
