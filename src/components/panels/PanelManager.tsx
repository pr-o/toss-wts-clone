"use client";

import { usePanelStore } from "@/stores/panelStore";
import type { PanelNode } from "@/types/panel";
import { ChartPanel } from "@/components/chart/ChartPanel";
import { OrderBookPanel } from "@/components/orderbook/OrderBookPanel";

/**
 * Recursively renders the binary-tree panel layout.
 * SplitNodes render two children side-by-side (H) or stacked (V).
 * PanelLeafs render the corresponding panel component.
 */
function renderNode(node: PanelNode): React.ReactNode {
  if (node.type === "panel") {
    const symbol = node.symbol ?? "005930";
    switch (node.panelType) {
      case "chart":     return <ChartPanel key={node.id} symbol={symbol} />;
      case "orderbook": return <OrderBookPanel key={node.id} symbol={symbol} />;
      // TODO: implement remaining panel types
      default:
        return (
          <div key={node.id} className="flex h-full items-center justify-center bg-[var(--tds-surface-elevated)] text-xs text-[var(--tds-text-tertiary)]">
            {node.panelType}
          </div>
        );
    }
  }

  const isHorizontal = node.orientation === "H";
  const leftSize  = `${node.ratio * 100}%`;
  const rightSize = `${(1 - node.ratio) * 100}%`;

  return (
    <div
      key={node.id}
      className={`flex h-full w-full ${isHorizontal ? "flex-row" : "flex-col"}`}
    >
      <div style={{ [isHorizontal ? "width" : "height"]: leftSize }} className="overflow-hidden">
        {renderNode(node.left)}
      </div>
      {/* Resize handle — drag interaction to be implemented */}
      <div className={`shrink-0 bg-[var(--tds-border-default)] ${isHorizontal ? "w-px cursor-col-resize" : "h-px cursor-row-resize"}`} />
      <div style={{ [isHorizontal ? "width" : "height"]: rightSize }} className="overflow-hidden">
        {renderNode(node.right)}
      </div>
    </div>
  );
}

export function PanelManager() {
  const { layout } = usePanelStore();
  return <div className="h-full w-full overflow-hidden">{renderNode(layout.root)}</div>;
}
