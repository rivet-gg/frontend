import { gameQueryOptions } from "@/domains/game/queries";
import {
  faCircleDollar,
  faCog,
  faHome,
  faKey,
  faPuzzle,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CommandGroup, CommandItem } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useCommandPanelNavigation } from "../command-panel-navigation-provider";
import { NamespacesCommandPanelItems } from "../namespaces-command-panel-items";

interface GameCommandPanelPage {
  gameId: string;
}

export function GameCommandPanelPage({ gameId }: GameCommandPanelPage) {
  const { data } = useSuspenseQuery(gameQueryOptions(gameId));

  const { navigate, changePage } = useCommandPanelNavigation();
  return (
    <>
      <CommandGroup heading={data.displayName}>
        <CommandItem
          onSelect={() => {
            navigate({ to: "/games/$gameId", params: { gameId } });
          }}
        >
          <FontAwesomeIcon icon={faHome} />
          Overview
        </CommandItem>
        <CommandItem
          onSelect={() => {
            navigate({ to: "/games/$gameId/billing", params: { gameId } });
          }}
        >
          <FontAwesomeIcon icon={faCircleDollar} />
          Billing
        </CommandItem>
        <CommandItem
          onSelect={() => {
            changePage({ key: "backend", params: { gameId } });
          }}
        >
          <FontAwesomeIcon icon={faPuzzle} />
          Backend
        </CommandItem>
        <CommandItem
          onSelect={() => {
            navigate({ to: "/games/$gameId/settings", params: { gameId } });
          }}
        >
          <FontAwesomeIcon icon={faCog} />
          Settings
        </CommandItem>
      </CommandGroup>
      <CommandGroup heading="Namespaces">
        <NamespacesCommandPanelItems
          gameId={gameId}
          namespaces={data.namespaces}
        />
      </CommandGroup>
      <CommandGroup heading="Tokens">
        <CommandItem
          onSelect={() => {
            navigate({
              to: "/games/$gameId",
              params: { gameId },
              search: { modal: "cloud-token" },
            });
          }}
        >
          <FontAwesomeIcon icon={faKey} />
          Generate a cloud token
        </CommandItem>
      </CommandGroup>
    </>
  );
}
