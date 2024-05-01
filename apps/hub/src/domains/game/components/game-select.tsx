import { gamesQueryOptions } from "@/domains/game/queries";
import { GroupAvatar } from "@/domains/group/components/group-avatar";
import {
  AssetImage,
  Flex,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CirclePlus } from "lucide-react";
import { ComponentProps, Fragment, useCallback } from "react";

interface GameSelectProps extends ComponentProps<typeof Select> {
  showCreateGame?: boolean;
  onCreateClick?: () => void;
}

export function GameSelect({
  showCreateGame,
  onCreateClick,
  onValueChange,
  ...props
}: GameSelectProps) {
  const { data } = useSuspenseQuery(gamesQueryOptions());

  const handleValueChange = useCallback(
    (value: string) => {
      if (value === "create") {
        onCreateClick?.();
        return;
      }
      onValueChange?.(value);
    },
    [onCreateClick, onValueChange],
  );

  return (
    <Select {...props} onValueChange={handleValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select game..." />
      </SelectTrigger>
      <SelectContent>
        {showCreateGame ? (
          <>
            <SelectItem value="create">
              <Flex gap="2" items="center">
                <CirclePlus className="size-4" />
                Create new game
              </Flex>
            </SelectItem>
            <SelectSeparator />
          </>
        ) : null}
        {data.map((group, index, groupList) => (
          <Fragment key={group.groupId}>
            <SelectGroup>
              <SelectLabel>
                <Flex gap="2" items="center">
                  <GroupAvatar
                    className="size-5"
                    displayName={group.displayName}
                    avatarUrl={group.avatarUrl}
                  />
                  {group.displayName}
                </Flex>
              </SelectLabel>
              {group.games.map((game) => (
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
            </SelectGroup>
            {groupList.length - 1 !== index ? <SelectSeparator /> : null}
          </Fragment>
        ))}
      </SelectContent>
    </Select>
  );
}
