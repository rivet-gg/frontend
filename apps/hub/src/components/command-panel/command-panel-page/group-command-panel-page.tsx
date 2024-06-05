import { groupGamesQueryOptions } from "@/domains/game/queries";
import {
  faGear,
  faHome,
  faPlus,
  faUserPlus,
  faUsers,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CommandGroup, CommandItem } from "@rivet-gg/components";
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
          <FontAwesomeIcon icon={faHome} />
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
          <FontAwesomeIcon icon={faUserPlus} />
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
          <FontAwesomeIcon icon={faUsers} />
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
          <FontAwesomeIcon icon={faGear} />
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
          <FontAwesomeIcon icon={faPlus} />
          Create a new game
        </CommandItem>
        <GamesCommandPanelItems groupId={groupId} games={data.games} />
      </CommandGroup>
    </>
  );
}
