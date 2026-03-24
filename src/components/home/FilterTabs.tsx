import { TAB_TRIGGER_CLASS } from "@/lib/constants";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterTabsProps {
  value: string;
  onValueChange: (value: string) => void;
  options: readonly string[];
  className?: string;
  /** Collapse into a Select dropdown below the `lg` breakpoint */
  responsive?: boolean;
}

export function FilterTabs({
  value,
  onValueChange,
  options,
  className,
  responsive,
}: FilterTabsProps) {
  return (
    <>
      {responsive && (
        <div className="xl:hidden shrink-0">
          <Select value={value} onValueChange={(v) => v && onValueChange(v)}>
            <SelectTrigger className="h-auto w-18 rounded-lg border-0 bg-[var(--tds-surface-overlay)] px-2 py-1 text-[11px] text-[var(--tds-text-primary)] shadow-none focus:ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt} value={opt} className="text-[11px]">
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      <Tabs
        value={value}
        onValueChange={onValueChange}
        className={`shrink-0 flex-row gap-0${responsive ? " hidden xl:block" : ""}${className ? ` ${className}` : ""}`}
      >
        <TabsList className="h-auto gap-0 rounded-lg bg-[var(--tds-surface-overlay)] p-0.5">
          {options.map((opt) => (
            <TabsTrigger key={opt} value={opt} className={TAB_TRIGGER_CLASS}>
              {opt}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </>
  );
}
