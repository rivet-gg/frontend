import { groupGamesQueryOptions } from "@/domains/game/queries";
import {
  AssetImage,
  Flex,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { ComponentProps } from "react";

interface GroupGameSelectProps extends ComponentProps<typeof Select> {
  groupId: string;
}

export function GroupGameSelect({ groupId, ...props }: GroupGameSelectProps) {
  const { data } = useSuspenseQuery(groupGamesQueryOptions(groupId));

  return (
    <Select {...props}>
      <SelectTrigger>
        <SelectValue placeholder="Select game..." />
      </SelectTrigger>
      <SelectContent>
        {data.games.map((game, index, groupList) => (
          <SelectItem key={game.gameId} value={game.gameId}>
            <Flex gap="2" items="center">
              <AssetImage
                src={game.logoUrl || "/games/blank/blankgame.svg"}
                className="mx-auto size-5 object-contain"
                alt="Game logo"
              />
              {game.displayName}
            </Flex>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
