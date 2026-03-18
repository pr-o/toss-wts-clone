import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PanelLayout, PanelNode, PanelType } from "@/types/panel";

// Stock detail page layout (images #4 / #5):
// ┌─────────────────┬─────────────┬──────────────┐
// │  Chart          │  호가       │  Order Form  │
// │                 │             │  (full ht)   │
// ├─────────────────┼─────────────┤              │
// │  Community      │  투자자동향 │              │
// └─────────────────┴─────────────┴──────────────┘
const DEFAULT_LAYOUT: PanelLayout = {
  version: 2,
  root: {
    type: "split",
    id: "root-split",
    orientation: "H",
    ratio: 0.70,   // left 70% (chart+orderbook) | right 30% (order form)
    left: {
      type: "split",
      id: "content-split",
      orientation: "H",
      ratio: 0.58,  // chart column 58% | orderbook column 42%
      left: {
        type: "split",
        id: "chart-col",
        orientation: "V",
        ratio: 0.60,
        left:  { type: "panel", id: "chart-panel",     panelType: "chart",     symbol: "005930" },
        right: { type: "panel", id: "community-panel", panelType: "community", symbol: "005930" },
      },
      right: {
        type: "split",
        id: "ob-col",
        orientation: "V",
        ratio: 0.55,
        left:  { type: "panel", id: "orderbook-panel",  panelType: "orderbook",       symbol: "005930" },
        right: { type: "panel", id: "investor-panel",   panelType: "investor-trend",  symbol: "005930" },
      },
    },
    right: { type: "panel", id: "order-form-panel", panelType: "order-form", symbol: "005930" },
  },
};

interface PanelStore {
  layout: PanelLayout;
  activeSymbol: string;
  setActiveSymbol: (symbol: string) => void;
  resetLayout: () => void;
  setLayout: (layout: PanelLayout) => void;
  updateRatio: (nodeId: string, ratio: number) => void;
}

function updateNodeRatio(node: PanelNode, targetId: string, ratio: number): PanelNode {
  if (node.type === "panel") return node;
  if (node.id === targetId) return { ...node, ratio };
  return {
    ...node,
    left:  updateNodeRatio(node.left,  targetId, ratio),
    right: updateNodeRatio(node.right, targetId, ratio),
  };
}

export const usePanelStore = create<PanelStore>()(
  persist(
    (set) => ({
      layout: DEFAULT_LAYOUT,
      activeSymbol: "005930",
      setActiveSymbol: (symbol) => set({ activeSymbol: symbol }),
      resetLayout: () => set({ layout: DEFAULT_LAYOUT }),
      setLayout: (layout) => set({ layout }),
      updateRatio: (nodeId, ratio) =>
        set((s) => ({
          layout: {
            ...s.layout,
            root: updateNodeRatio(s.layout.root, nodeId, ratio) as PanelLayout["root"],
          },
        })),
    }),
    { name: "wts-panel-layout" }
  )
);
