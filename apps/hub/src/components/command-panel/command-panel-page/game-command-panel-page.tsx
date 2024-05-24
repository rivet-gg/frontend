import { gameQueryOptions } from "@/domains/game/queries";
import { CommandGroup, CommandItem } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Cog, Home, KeyRound, Receipt } from "lucide-react";
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
          <Home />
          Overview
        </CommandItem>
        <CommandItem
          onSelect={() => {
            navigate({ to: "/games/$gameId/billing", params: { gameId } });
          }}
        >
          <Receipt />
          Billing
        </CommandItem>
        <CommandItem
          onSelect={() => {
            navigate({ to: "/games/$gameId/settings", params: { gameId } });
          }}
        >
          <Cog />
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
          <KeyRound />
          Generate a cloud token
        </CommandItem>
      </CommandGroup>
    </>
  );
}
