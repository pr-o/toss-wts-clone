import { WTSShell } from "@/components/layout/WTSShell";
import { StockDetailView } from "@/components/stock/StockDetailView";

interface Props {
  params: Promise<{ symbol: string }>;
}

export default async function StockOrderPage({ params }: Props) {
  const { symbol } = await params;
  return (
    <WTSShell>
      <StockDetailView symbol={symbol} />
    </WTSShell>
  );
}
