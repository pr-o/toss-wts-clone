"use client";

import { usePanelStore } from "@/stores/panelStore";
import type { PanelNode } from "@/types/panel";
import { ChartPanel } from "@/components/chart/ChartPanel";
import { OrderBookPanel } from "@/components/orderbook/OrderBookPanel";
import { OrderFormPanel } from "./OrderFormPanel";
import { CommunityPanel } from "./CommunityPanel";
import { InvestorTrendPanel } from "./InvestorTrendPanel";

function renderNode(node: PanelNode, symbolOverride?: string): React.ReactNode {
  if (node.type === "panel") {
    const symbol = symbolOverride ?? node.symbol ?? "005930";
    switch (node.panelType) {
      case "chart":          return <ChartPanel        key={node.id} symbol={symbol} />;
      case "orderbook":      return <OrderBookPanel    key={node.id} symbol={symbol} />;
      case "order-form":     return <OrderFormPanel    key={node.id} symbol={symbol} />;
      case "community":      return <CommunityPanel    key={node.id} symbol={symbol} />;
      case "investor-trend": return <InvestorTrendPanel key={node.id} symbol={symbol} />;
      default:
        return (
          <div key={node.id} className="flex h-full items-center justify-center bg-[var(--tds-surface-elevated)] text-xs text-[var(--tds-text-tertiary)]">
            {node.panelType}
          </div>
        );
    }
  }

  const isH       = node.orientation === "H";
  const leftSize  = `${node.ratio * 100}%`;
  const rightSize = `${(1 - node.ratio) * 100}%`;

  return (
    <div key={node.id} className={`flex h-full w-full ${isH ? "flex-row" : "flex-col"}`}>
      <div style={{ [isH ? "width" : "height"]: leftSize }} className="overflow-hidden">
        {renderNode(node.left, symbolOverride)}
      </div>
      <div className={`shrink-0 bg-[var(--tds-border-default)] ${isH ? "w-px cursor-col-resize" : "h-px cursor-row-resize"}`} />
      <div style={{ [isH ? "width" : "height"]: rightSize }} className="overflow-hidden">
        {renderNode(node.right, symbolOverride)}
      </div>
    </div>
  );
}

export function PanelManager({ symbol }: { symbol?: string }) {
  const { layout, activeSymbol } = usePanelStore();
  const sym = symbol ?? activeSymbol;
  return <div className="h-full w-full overflow-hidden">{renderNode(layout.root, sym)}</div>;
}
