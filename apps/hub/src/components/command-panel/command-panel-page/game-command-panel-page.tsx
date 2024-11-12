import { gameQueryOptions } from "@/domains/game/queries";
import { GuardEnterprise } from "@/lib/guards";
import { CommandGroup, CommandItem } from "@rivet-gg/components";
import { Icon, faCircleDollar, faCog, faHome, faKey } from "@rivet-gg/icons";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useCommandPanelNavigation } from "../command-panel-navigation-provider";
import { NamespacesCommandPanelItems } from "../namespaces-command-panel-items";

interface GameCommandPanelPage {
  gameId: string;
}

export function GameCommandPanelPage({ gameId }: GameCommandPanelPage) {
  const { data } = useSuspenseQuery(gameQueryOptions(gameId));

  const { navigate } = useCommandPanelNavigation();

  return (
    <>
      <CommandGroup heading={data.displayName}>
        <CommandItem
          onSelect={() => {
            navigate({ to: "/games/$gameId", params: { gameId } });
          }}
        >
          <Icon icon={faHome} />
          Overview
        </CommandItem>
        <GuardEnterprise>
          <CommandItem
            onSelect={() => {
              navigate({ to: "/games/$gameId/billing", params: { gameId } });
            }}
          >
            <Icon icon={faCircleDollar} />
            Billing
          </CommandItem>
        </GuardEnterprise>
        <CommandItem
          onSelect={() => {
            navigate({ to: "/games/$gameId/settings", params: { gameId } });
          }}
        >
          <Icon icon={faCog} />
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
          <Icon icon={faKey} />
          Generate a cloud token
        </CommandItem>
      </CommandGroup>
    </>
  );
}
