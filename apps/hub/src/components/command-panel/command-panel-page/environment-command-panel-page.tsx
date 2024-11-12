import {
  gameEnvironmentQueryOptions,
  gameMetadataQueryOptions,
  gameQueryOptions,
} from "@/domains/game/queries";
import { GuardEnterprise } from "@/lib/guards";
import { Badge, CommandGroup, CommandItem } from "@rivet-gg/components";
import {
  Icon,
  faCodeBranch,
  faGear,
  faGlobe,
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

interface EnvironmentCommandPanelPage {
  gameId: string;
  environmentId: string;
}

export function EnvironmentCommandPanelPage({
  gameId,
  environmentId,
}: EnvironmentCommandPanelPage) {
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
  } = useSuspenseQuery(gameEnvironmentQueryOptions({ environmentId, gameId }));

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
              to: "/games/$gameId/environments/$environmentId/servers",
              params: { gameId, environmentId },
            });
          }}
        >
          <Icon icon={faServer} />
          Servers
        </CommandItem>
        <GuardEnterprise>
          <CommandItem
            onSelect={() => {
              navigate({
                to: "/games/$gameId/environments/$environmentId/backend",
                params: { gameId, environmentId },
              });
            }}
          >
            <Icon icon={faPuzzle} />
            Backend
          </CommandItem>
        </GuardEnterprise>

        {legacyLobbiesEnabled ? (
          <CommandItem
            onSelect={() => {
              navigate({
                to: "/games/$gameId/environments/$environmentId/versions",
                params: { gameId, environmentId },
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
                    to: "/games/$gameId/environments/$environmentId/cdn",
                    params: { gameId, environmentId },
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
                    to: "/games/$gameId/environments/$environmentId/cdn",
                    params: { gameId, environmentId },
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
                    to: "/games/$gameId/environments/$environmentId/cdn",
                    params: { gameId, environmentId },
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
                    to: "/games/$gameId/environments/$environmentId/lobbies",
                    params: { gameId, environmentId },
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
                    to: "/games/$gameId/environments/$environmentId/lobbies/logs",
                    params: { gameId, environmentId },
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
                    to: "/games/$gameId/environments/$environmentId/lobbies/settings",
                    params: { gameId, environmentId },
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
              to: "/games/$gameId/environments/$environmentId/tokens",
              params: { gameId, environmentId },
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
              to: "/games/$gameId/environments/$environmentId/tokens",
              params: { gameId, environmentId },
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
              to: "/games/$gameId/environments/$environmentId/tokens",
              params: { gameId, environmentId },
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
