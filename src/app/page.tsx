import { Suspense } from "react";
import { WTSShell } from "@/components/layout/WTSShell";
import { HomeView } from "@/components/home/HomeView";

export default function Home() {
  return (
    <WTSShell>
      <Suspense>
        <HomeView />
      </Suspense>
    </WTSShell>
  );
}
