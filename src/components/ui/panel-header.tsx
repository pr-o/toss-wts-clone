import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PanelHeaderProps {
  title: string;
  right?: ReactNode;
  className?: string;
}

export function PanelHeader({ title, right, className }: PanelHeaderProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-between border-b border-[var(--tds-border-default)] px-3 py-2",
        className,
      )}
    >
      <span className="font-medium text-[var(--tds-text-primary)]">{title}</span>
      {right}
    </div>
  );
}
