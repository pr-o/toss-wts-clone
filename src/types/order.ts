export type OrderSide = "buy" | "sell";
export type OrderType = "limit" | "market" | "stop";

export interface Order {
  id: string;
  symbol: string;
  side: OrderSide;
  type: OrderType;
  price?: number;      // undefined for market orders
  quantity: number;
  filledQuantity: number;
  status: "pending" | "partial" | "filled" | "cancelled";
  createdAt: number;
}

export interface Position {
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  pnl: number;
  pnlRate: number;
}

export interface Account {
  balance: number;        // KRW cash
  totalAsset: number;
  totalPnl: number;
  totalPnlRate: number;
  positions: Position[];
}
