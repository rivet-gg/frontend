import { Badge, cn } from "@rivet-gg/components";

const BUILT_IN_TAGS = ["current", "rivet/latest", "enabled", "rivet/enabled"];

interface ServerTagsProps {
  tags?: unknown;
  excludeBuiltIn?: boolean;
  className?: string;
}

export function ServerTags({
  tags = {},
  excludeBuiltIn = false,
  className,
}: ServerTagsProps) {
  return (
    <div className={cn("flex flex-wrap gap-2 empty:hidden", className)}>
      {tags && typeof tags === "object"
        ? Object.entries(tags)
            .filter(([key]) =>
              excludeBuiltIn ? !BUILT_IN_TAGS.includes(key) : true,
            )
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([key, value]) => (
              <Badge
                key={key}
                variant="outline"
                className="overflow-visible flex-shrink-0 text-ellipsis"
              >
                {key}={value}
              </Badge>
            ))
        : null}
    </div>
  );
}
