import { groupGamesQueryOptions } from "@/domains/game/queries";
import { CommandGroup, CommandItem } from "@rivet-gg/components";
import {
  Icon,
  faGear,
  faHome,
  faPlus,
  faUserPlus,
  faUsers,
} from "@rivet-gg/icons";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useCommandPanelNavigation } from "../command-panel-navigation-provider";
import { GamesCommandPanelItems } from "../games-command-panel-items";

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
          <Icon icon={faHome} />
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
          <Icon icon={faUserPlus} />
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
          <Icon icon={faUsers} />
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
          <Icon icon={faGear} />
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
          <Icon icon={faPlus} />
          Create a new game
        </CommandItem>
        <GamesCommandPanelItems groupId={groupId} games={data.games} />
      </CommandGroup>
    </>
  );
}
