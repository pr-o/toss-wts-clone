export type PanelType =
  | "chart"
  | "orderbook"
  | "realtime"
  | "order"
  | "news"
  | "community"
  | "home"
  | "stock-detail";

export interface PanelLeaf {
  type: "panel";
  id: string;
  panelType: PanelType;
  symbol?: string;   // which stock this panel is bound to
}

export interface PanelSplit {
  type: "split";
  id: string;
  orientation: "H" | "V";  // H = side by side, V = top/bottom
  ratio: number;            // 0–1, fraction for the "left/top" child
  left: PanelNode;
  right: PanelNode;
}

export type PanelNode = PanelLeaf | PanelSplit;

export interface PanelLayout {
  version: number;
  root: PanelNode;
}
