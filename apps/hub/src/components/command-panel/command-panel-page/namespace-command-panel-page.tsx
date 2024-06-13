import {
  gameNamespaceQueryOptions,
  gameQueryOptions,
} from "@/domains/game/queries";
import {
  faChessKnight,
  faCodeBranch,
  faGear,
  faGlobe,
  faHome,
  faJoystick,
  faKey,
  faLink,
  faScroll,
  faUserCog,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, CommandGroup, CommandItem } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
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
          <FontAwesomeIcon icon={faHome} />
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
          <FontAwesomeIcon icon={faCodeBranch} />
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
            <FontAwesomeIcon icon={faGlobe} />
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
            <FontAwesomeIcon icon={faUserCog} />
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
            <FontAwesomeIcon icon={faLink} />
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
                to: "/games/$gameId/namespaces/$namespaceId/lobbies",
                params: { gameId, namespaceId },
              });
            }}
          >
            <FontAwesomeIcon icon={faJoystick} />
            Lobbies
          </CommandItem>
          <CommandItem
            keywords={["matchmaker", "logs"]}
            onSelect={() => {
              navigate({
                to: "/games/$gameId/namespaces/$namespaceId/lobbies/logs",
                params: { gameId, namespaceId },
              });
            }}
          >
            <FontAwesomeIcon icon={faScroll} />
            Logs
          </CommandItem>
          <CommandItem
            keywords={["matchmaker", "settings"]}
            onSelect={() => {
              navigate({
                to: "/games/$gameId/namespaces/$namespaceId/lobbies/settings",
                params: { gameId, namespaceId },
              });
            }}
          >
            <FontAwesomeIcon icon={faGear} />
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
          <FontAwesomeIcon icon={faKey} />
          Generate a public token
        </CommandItem>
        <CommandItem disabled>
          <FontAwesomeIcon icon={faKey} />
          Generate a service token
        </CommandItem>
        <CommandItem disabled>
          <FontAwesomeIcon icon={faKey} />
          Generate a development token
        </CommandItem>
      </CommandGroup>
    </>
  );
}
