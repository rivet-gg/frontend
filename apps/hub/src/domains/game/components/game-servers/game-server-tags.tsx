import { Badge } from "@rivet-gg/components";

const BUILT_IN_TAGS = ["current", "rivet/latest", "enabled", "rivet/enabled"];

interface GameServerTagsProps {
  tags?: unknown;
  excludeBuiltIn?: boolean;
}

export function GameServerTags({
  tags = {},
  excludeBuiltIn = false,
}: GameServerTagsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags && typeof tags === "object"
        ? Object.entries(tags)
            .filter(([key]) =>
              excludeBuiltIn ? !BUILT_IN_TAGS.includes(key) : true,
            )
            .map(([key, value]) => (
              <Badge key={key} variant="outline">
                {key}={value}
              </Badge>
            ))
        : null}
    </div>
  );
}
