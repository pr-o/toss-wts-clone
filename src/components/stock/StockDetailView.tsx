"use client";

import { useEffect } from "react";
import { usePanelStore } from "@/stores/panelStore";
import { StockHeader } from "@/components/layout/StockHeader";
import { PanelManager } from "@/components/panels/PanelManager";

export function StockDetailView({ symbol }: { symbol: string }) {
  const setActiveSymbol = usePanelStore((s) => s.setActiveSymbol);

  // Sync URL symbol → store on mount / symbol change
  useEffect(() => {
    setActiveSymbol(symbol);
  }, [symbol, setActiveSymbol]);

  return (
    <>
      <StockHeader symbol={symbol} />
      <main className="flex-1 overflow-hidden">
        <PanelManager symbol={symbol} />
      </main>
    </>
  );
}
