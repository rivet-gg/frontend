import { groupGamesQueryOptions } from "@/domains/game/queries";
import { CommandGroup, CommandItem } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Home, Plus, UserPlus, Users, Cog } from "lucide-react";
import { GamesCommandPanelItems } from "../games-command-panel-items";
import { useCommandPanelNavigation } from "../command-panel-navigation-provider";

interface GroupCommandPanelPageProps {
  groupId: string;
}

export function GroupCommandPanelPage({ groupId }: GroupCommandPanelPageProps) {
  const { data } = useSuspenseQuery(groupGamesQueryOptions(groupId));

  const { navigate } = useCommandPanelNavigation();
  return (
    <>
      <CommandGroup heading={data.displayName}>
        <CommandItem
          onSelect={() => {
            navigate({ to: "/teams/$groupId", params: { groupId } });
          }}
        >
          <Home className="mr-2 size-4" />
          Overview
        </CommandItem>
        <CommandItem
          onSelect={() => {
            navigate({
              to: "/teams/$groupId",
              search: { modal: "invite" },
              params: { groupId },
            });
          }}
        >
          <UserPlus className="mr-2 size-4" />
          Invite a member
        </CommandItem>
        <CommandItem
          onSelect={() => {
            navigate({
              to: "/teams/$groupId/members",
              params: { groupId },
            });
          }}
        >
          <Users className="mr-2 size-4" />
          Members
        </CommandItem>
        <CommandItem
          onSelect={() => {
            navigate({
              to: "/teams/$groupId/settings",
              params: { groupId },
            });
          }}
        >
          <Cog className="mr-2 size-4" />
          Settings
        </CommandItem>
      </CommandGroup>

      <CommandGroup heading="Games">
        <CommandItem
          onSelect={() => {
            navigate({
              to: "/teams/$groupId",
              params: { groupId },
              search: { modal: "create-game" },
            });
          }}
        >
          <Plus className="mr-2 size-4" />
          Create a new game
        </CommandItem>
        <GamesCommandPanelItems groupId={groupId} games={data.games} />
      </CommandGroup>
    </>
  );
}
