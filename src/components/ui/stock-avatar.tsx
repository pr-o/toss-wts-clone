import { cn } from "@/lib/utils";
import { getAvatarLabel } from "@/lib/utils";
import { DEFAULT_AVATAR_COLOR } from "@/lib/constants";

const SIZE_CLASSES = {
  xs: "h-5 w-5 text-[9px]",
  sm: "h-6 w-6 text-[9px]",
  md: "h-7 w-7 text-[11px]",
  lg: "h-8 w-8 text-[13px]",
} as const;

interface StockAvatarProps {
  name: string;
  avatarColor?: string;
  size?: keyof typeof SIZE_CLASSES;
  className?: string;
}

export function StockAvatar({
  name,
  avatarColor,
  size = "md",
  className,
}: StockAvatarProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-bold text-white",
        SIZE_CLASSES[size],
        className,
      )}
      style={{ backgroundColor: avatarColor ?? DEFAULT_AVATAR_COLOR }}
    >
      {getAvatarLabel(name)}
    </div>
  );
}
