"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";
import { useThemeStore } from "@/stores/themeStore";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5_000,       // stock data is stale after 5 s
      refetchInterval: 5_000, // poll every 5 s for real-time feel
    },
  },
});

async function startMSW() {
  if (typeof window === "undefined") return;
  const { worker } = await import("@/mocks/browser");
  await worker.start({ onUnhandledRequest: "bypass" });
}

function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useThemeStore((s) => s.theme);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return <>{children}</>;
}

export function Providers({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    startMSW().then(() => setReady(true));
  }, []);

  if (!ready) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryClientProvider>
  );
}
