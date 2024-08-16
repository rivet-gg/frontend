import { cn } from "./lib/utils";
import { Badge } from "./ui/badge";

interface LiveBadgeProps {
  className?: string;
}

export function LiveBadge({ className }: LiveBadgeProps) {
  return (
    <Badge
      className={cn(className, "flex justify-center items-center")}
      variant="outline"
    >
      Live
      <div className="ml-2 bg-destructive rounded-full animate-pulse size-2" />
    </Badge>
  );
}
