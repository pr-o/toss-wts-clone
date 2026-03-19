import { WTSShell } from "@/components/layout/WTSShell";
import { ScreenerView } from "@/components/screener/ScreenerView";

export default async function ScreenerStrategyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const strategyId = parseInt(id, 10) || 1;
  return (
    <WTSShell>
      <ScreenerView strategyId={strategyId} />
    </WTSShell>
  );
}
