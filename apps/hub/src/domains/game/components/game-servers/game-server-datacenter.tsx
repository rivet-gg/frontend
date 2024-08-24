import { AssetImage, Flex, WithTooltip } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { dataCenterQueryOptions } from "../../queries";
import {
  REGION_LABEL,
  getRegionEmoji,
  getRegionKey,
} from "../game-matchmaker/lobby-region";

interface GameServerDatacenterProps {
  datacenterId: string;
  gameId: string;
  environmentId: string;
  showLabel?: boolean;
}

export function GameServerDatacenter({
  gameId,
  datacenterId,
  environmentId,
  showLabel,
}: GameServerDatacenterProps) {
  const { data: region } = useSuspenseQuery(
    dataCenterQueryOptions({ gameId, environmentId, datacenterId }),
  );

  const regionKey = getRegionKey(region?.slug);

  if (showLabel) {
    return (
      <Flex gap="2" items="center" justify="center">
        <AssetImage className="w-4 min-w-4" src={getRegionEmoji(regionKey)} />
        {REGION_LABEL[regionKey] ?? REGION_LABEL.unknown}
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
