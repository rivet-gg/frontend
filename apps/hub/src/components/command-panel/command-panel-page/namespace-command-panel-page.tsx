import {
  gameMetadataQueryOptions,
  gameNamespaceQueryOptions,
  gameQueryOptions,
} from "@/domains/game/queries";
import { Badge, CommandGroup, CommandItem } from "@rivet-gg/components";
import {
  Icon,
  faCodeBranch,
  faGear,
  faGlobe,
  faHome,
  faJoystick,
  faKey,
  faLink,
  faPuzzle,
  faScroll,
  faServer,
  faUserCog,
} from "@rivet-gg/icons";
import { useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query";
import { useCommandPanelNavigation } from "../command-panel-navigation-provider";

interface NamespaceCommandPanelPage {
  gameId: string;
  namespaceId: string;
}

export function NamespaceCommandPanelPage({
  gameId,
  namespaceId,
}: NamespaceCommandPanelPage) {
  const [
    {
      data: { displayName, versions },
    },
    {
      data: { legacyLobbiesEnabled },
    },
  ] = useSuspenseQueries({
    queries: [gameQueryOptions(gameId), gameMetadataQueryOptions({ gameId })],
  });

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
              to: "/games/$gameId/environments/$namespaceId",
              params: { gameId, namespaceId },
            });
          }}
        >
          <Icon icon={faHome} />
          Overview
        </CommandItem>
        <CommandItem
          onSelect={() => {
            navigate({
              to: "/games/$gameId/environments/$namespaceId/servers",
              params: { gameId, namespaceId },
            });
          }}
        >
          <Icon icon={faServer} />
          Servers
        </CommandItem>
        <CommandItem
          onSelect={() => {
            navigate({
              to: "/games/$gameId/environments/$namespaceId/backend",
              params: { gameId, namespaceId },
            });
          }}
        >
          <Icon icon={faPuzzle} />
          Backend
        </CommandItem>

        {legacyLobbiesEnabled ? (
          <CommandItem
            onSelect={() => {
              navigate({
                to: "/games/$gameId/environments/$namespaceId/versions",
                params: { gameId, namespaceId },
              });
            }}
          >
            <Icon icon={faCodeBranch} />
            Versions
            {currentVersion ? (
              <Badge className="ml-2">{currentVersion?.displayName}</Badge>
            ) : null}
          </CommandItem>
        ) : null}
      </CommandGroup>
      {legacyLobbiesEnabled ? (
        <>
          {config.cdn ? (
            <CommandGroup heading="CDN">
              <CommandItem
                onSelect={() => {
                  navigate({
                    to: "/games/$gameId/environments/$namespaceId/cdn",
                    params: { gameId, namespaceId },
                  });
                }}
              >
                <Icon icon={faGlobe} />
                CDN Overview
              </CommandItem>
              <CommandItem
                keywords={["cdn", "auth", "users"]}
                onSelect={() => {
                  navigate({
                    to: "/games/$gameId/environments/$namespaceId/cdn",
                    params: { gameId, namespaceId },
                    search: { modal: "cdn-users" },
                  });
                }}
              >
                <Icon icon={faUserCog} />
                Manage authenticated users
              </CommandItem>
              <CommandItem
                keywords={["cdn", "custom", "domains"]}
                onSelect={() => {
                  navigate({
                    to: "/games/$gameId/environments/$namespaceId/cdn",
                    params: { gameId, namespaceId },
                    search: { modal: "cdn-domains" },
                  });
                }}
              >
                <Icon icon={faLink} />
                Mange custom domains
              </CommandItem>
            </CommandGroup>
          ) : null}
          {config.matchmaker ? (
            <CommandGroup heading="Matchmaker">
              <CommandItem
                keywords={["matchmaker", "lobbies"]}
                onSelect={() => {
                  navigate({
                    to: "/games/$gameId/environments/$namespaceId/lobbies",
                    params: { gameId, namespaceId },
                  });
                }}
              >
                <Icon icon={faJoystick} />
                Lobbies
              </CommandItem>
              <CommandItem
                keywords={["matchmaker", "logs"]}
                onSelect={() => {
                  navigate({
                    to: "/games/$gameId/environments/$namespaceId/lobbies/logs",
                    params: { gameId, namespaceId },
                  });
                }}
              >
                <Icon icon={faScroll} />
                Logs
              </CommandItem>
              <CommandItem
                keywords={["matchmaker", "settings"]}
                onSelect={() => {
                  navigate({
                    to: "/games/$gameId/environments/$namespaceId/lobbies/settings",
                    params: { gameId, namespaceId },
                  });
                }}
              >
                <Icon icon={faGear} />
                Settings
              </CommandItem>
            </CommandGroup>
          ) : null}
        </>
      ) : null}
      <CommandGroup heading="Tokens">
        <CommandItem
          onSelect={() => {
            navigate({
              to: "/games/$gameId/environments/$namespaceId/tokens",
              params: { gameId, namespaceId },
              search: { modal: "public-token" },
            });
          }}
        >
          <Icon icon={faKey} />
          Generate a public token
        </CommandItem>
        <CommandItem
          onSelect={() => {
            navigate({
              to: "/games/$gameId/environments/$namespaceId/tokens",
              params: { gameId, namespaceId },
              search: { modal: "service-token" },
            });
          }}
        >
          <Icon icon={faKey} />
          Generate a service token
        </CommandItem>
        <CommandItem
          onSelect={() => {
            navigate({
              to: "/games/$gameId/environments/$namespaceId/tokens",
              params: { gameId, namespaceId },
            });
          }}
        >
          <Icon icon={faKey} />
          Generate a development token
        </CommandItem>
      </CommandGroup>
    </>
  );
}
