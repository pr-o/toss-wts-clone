import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PanelLayout, PanelNode, PanelType } from "@/types/panel";

const DEFAULT_LAYOUT: PanelLayout = {
  version: 1,
  root: {
    type: "split",
    id: "root-split",
    orientation: "H",
    ratio: 0.55,
    left: {
      type: "split",
      id: "left-split",
      orientation: "V",
      ratio: 0.6,
      left:  { type: "panel", id: "chart-panel",     panelType: "chart",     symbol: "005930" },
      right: { type: "panel", id: "orderbook-panel", panelType: "orderbook", symbol: "005930" },
    },
    right: {
      type: "split",
      id: "right-split",
      orientation: "V",
      ratio: 0.65,
      left:  { type: "panel", id: "realtime-panel", panelType: "realtime", symbol: "005930" },
      right: { type: "panel", id: "order-panel",    panelType: "order",    symbol: "005930" },
    },
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
