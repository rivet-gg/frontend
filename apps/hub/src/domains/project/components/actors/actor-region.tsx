import { AssetImage, Flex, WithTooltip } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { actorRegionQueryOptions } from "../../queries";
import {
  REGION_LABEL,
  getRegionEmoji,
  getRegionKey,
} from "../matchmaker/lobby-region";

interface ActorRegionProps {
  regionId: string;
  projectId: string;
  environmentId: string;
  showLabel?: boolean | "abbreviated";
}

export function ActorRegion({
  projectId,
  regionId,
  environmentId,
  showLabel,
}: ActorRegionProps) {
  const { data: region } = useSuspenseQuery(
    actorRegionQueryOptions({ projectId, environmentId, regionId }),
  );

  const regionKey = getRegionKey(region?.name);

  if (showLabel) {
    return (
      <Flex gap="2" items="center" justify="center">
        <AssetImage className="w-4 min-w-4" src={getRegionEmoji(regionKey)} />
        {showLabel === "abbreviated"
          ? regionKey.toUpperCase()
          : (REGION_LABEL[regionKey] ?? REGION_LABEL.unknown)}
      </Flex>
    );
  }

  return (
    <WithTooltip
      content={REGION_LABEL[regionKey] ?? REGION_LABEL.unknown}
      trigger={
        <Flex gap="2" items="center" justify="center">
          <AssetImage className="w-4 min-w-4" src={getRegionEmoji(regionKey)} />
        </Flex>
      }
    />
  );
}
