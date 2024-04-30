import { gamesQueryOptions } from "@/domains/game/queries";
import { CommandGroup } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { GamesCommandPanelItems } from "../games-command-panel-items";

export function AllGamesGamesCommandGroup() {
  const { data } = useSuspenseQuery(gamesQueryOptions());

  return (
    <CommandGroup heading="Games">
      {data.map((group) => (
        <GamesCommandPanelItems
          key={group.groupId}
          groupId={group.groupId}
          games={group.games}
        />
      ))}
    </CommandGroup>
  );
}
