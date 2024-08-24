import { gameBuildsQueryOptions } from "@/domains/game/queries";
import {
  Flex,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { ComponentProps } from "react";
import { GameServerTags } from "./game-server-tags";

interface GameServerBuildSelectProps extends ComponentProps<typeof Select> {
  gameId: string;
  environmentId: string;
}

export function GameServerBuildSelect({
  gameId,
  environmentId,
  ...props
}: GameServerBuildSelectProps) {
  const { data } = useSuspenseQuery(
    gameBuildsQueryOptions({ gameId, environmentId }),
  );

  return (
    <Select {...props}>
      <SelectTrigger>
        <SelectValue placeholder="Select build..." />
      </SelectTrigger>
      <SelectContent>
        {data.length === 0 ? (
          <SelectItem value="invalid" disabled>
            No builds available
          </SelectItem>
        ) : null}
        {data.map((build) => (
          <SelectItem key={build.id} value={build.id}>
            <Flex gap="2" items="center">
              {build.name}
              <GameServerTags tags={build.tags} />
            </Flex>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
