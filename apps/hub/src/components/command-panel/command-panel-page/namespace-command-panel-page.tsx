import {
  gameNamespaceQueryOptions,
  gameQueryOptions,
} from "@/domains/game/queries";
import { Badge, CommandGroup, CommandItem } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Home,
  Cog,
  Link,
  UserCog,
  Swords,
  Joystick,
  Scroll,
  KeyRound,
  GitBranch,
} from "lucide-react";
import { useCommandPanelNavigation } from "../command-panel-navigation-provider";

interface NamespaceCommandPanelPage {
  gameId: string;
  namespaceId: string;
}

export function NamespaceCommandPanelPage({
  gameId,
  namespaceId,
}: NamespaceCommandPanelPage) {
  const {
    data: { displayName, versions },
  } = useSuspenseQuery(gameQueryOptions(gameId));

  const {
    data: {
      namespace: { versionId, config },
    },
  } = useSuspenseQuery(gameNamespaceQueryOptions({ namespaceId, gameId }));

  const { navigate } = useCommandPanelNavigation();

  const currentVersion = versions.find(
    (version) => version.versionId === versionId,
  );

  return (
    <>
      <CommandGroup heading={displayName}>
        <CommandItem
          onSelect={() => {
            navigate({
              to: "/games/$gameId/namespaces/$namespaceId",
              params: { gameId, namespaceId },
            });
          }}
        >
          <Home />
          Overview
        </CommandItem>
        <CommandItem
          onSelect={() => {
            navigate({
              to: "/games/$gameId/namespaces/$namespaceId/versions",
              params: { gameId, namespaceId },
            });
          }}
        >
          <GitBranch />
          Versions
          {currentVersion ? (
            <Badge className="ml-2">{currentVersion?.displayName}</Badge>
          ) : null}
        </CommandItem>
      </CommandGroup>
      {config.cdn ? (
        <CommandGroup heading="CDN">
          <CommandItem
            onSelect={() => {
              navigate({
                to: "/games/$gameId/namespaces/$namespaceId/cdn",
                params: { gameId, namespaceId },
              });
            }}
          >
            <Home />
            CDN Overview
          </CommandItem>
          <CommandItem
            keywords={["cdn", "auth", "users"]}
            onSelect={() => {
              navigate({
                to: "/games/$gameId/namespaces/$namespaceId/cdn",
                params: { gameId, namespaceId },
                search: { modal: "cdn-users" },
              });
            }}
          >
            <UserCog />
            Manage authenticated users
          </CommandItem>
          <CommandItem
            keywords={["cdn", "custom", "domains"]}
            onSelect={() => {
              navigate({
                to: "/games/$gameId/namespaces/$namespaceId/cdn",
                params: { gameId, namespaceId },
                search: { modal: "cdn-domains" },
              });
            }}
          >
            <Link />
            Mange custom domains
          </CommandItem>
        </CommandGroup>
      ) : null}
      {config.matchmaker ? (
        <CommandGroup heading="Matchmaker">
          <CommandItem
            onSelect={() => {
              navigate({
                to: "/games/$gameId/namespaces/$namespaceId/matchmaker",
                params: { gameId, namespaceId },
              });
            }}
          >
            <Swords />
            Matchmaker Overview
          </CommandItem>
          <CommandItem
            keywords={["matchmaker", "lobbies"]}
            onSelect={() => {
              navigate({
                to: "/games/$gameId/namespaces/$namespaceId/matchmaker/lobbies",
                params: { gameId, namespaceId },
              });
            }}
          >
            <Joystick />
            Lobbies
          </CommandItem>
          <CommandItem
            keywords={["matchmaker", "logs"]}
            onSelect={() => {
              navigate({
                to: "/games/$gameId/namespaces/$namespaceId/matchmaker/logs",
                params: { gameId, namespaceId },
              });
            }}
          >
            <Scroll />
            Logs
          </CommandItem>
          <CommandItem
            keywords={["matchmaker", "settings"]}
            onSelect={() => {
              navigate({
                to: "/games/$gameId/namespaces/$namespaceId/matchmaker/settings",
                params: { gameId, namespaceId },
              });
            }}
          >
            <Cog />
            Settings
          </CommandItem>
        </CommandGroup>
      ) : null}
      <CommandGroup heading="Tokens">
        <CommandItem
          onSelect={() => {
            navigate({
              to: "/games/$gameId/namespaces/$namespaceId/tokens",
              params: { gameId, namespaceId },
              search: { modal: "public-token" },
            });
          }}
        >
          <KeyRound />
          Generate a public token
        </CommandItem>
        <CommandItem disabled>
          <KeyRound />
          Generate a service token
        </CommandItem>
        <CommandItem disabled>
          <KeyRound />
          Generate a development token
        </CommandItem>
      </CommandGroup>
    </>
  );
}
