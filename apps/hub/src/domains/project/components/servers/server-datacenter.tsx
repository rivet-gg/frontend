import { AssetImage, Flex, WithTooltip } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { regionQueryOptions } from "../../queries";
import {
  REGION_LABEL,
  getRegionEmoji,
  getRegionKey,
} from "../matchmaker/lobby-region";

interface ServerDatacenterProps {
  regionId: string;
  projectId: string;
  environmentId: string;
  showLabel?: boolean | "abbreviated";
}

export function ServerDatacenter({
  projectId,
  regionId,
  environmentId,
  showLabel,
}: ServerDatacenterProps) {
  const { data: region } = useSuspenseQuery(
    regionQueryOptions({ projectId, environmentId, regionId }),
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

export function LobbyRegionIcon({
  regionNameId,
  className,
}: { regionNameId: string; className?: string }) {
  const regionKey = getRegionKey(regionNameId);
  return <AssetImage className={className} src={getRegionEmoji(regionKey)} />;
}

export function LobbyRegionName({ regionNameId }: { regionNameId: string }) {
  const regionKey = getRegionKey(regionNameId);
  return REGION_LABEL[regionKey] ?? REGION_LABEL.unknown;
}
