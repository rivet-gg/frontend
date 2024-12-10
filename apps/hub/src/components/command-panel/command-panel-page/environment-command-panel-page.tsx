import {
  projectEnvironmentQueryOptions,
  projectMetadataQueryOptions,
  projectQueryOptions,
} from "@/domains/project/queries";
import { GuardEnterprise } from "@/lib/guards";
import { Badge, CommandGroup, CommandItem } from "@rivet-gg/components";
import {
  Icon,
  faActorsBorderless,
  faCodeBranch,
  faGear,
  faGlobe,
  faHammer,
  faJoystick,
  faKey,
  faLink,
  faPuzzle,
  faScroll,
  faUserCog,
} from "@rivet-gg/icons";
import { useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query";
import { useCommandPanelNavigation } from "../command-panel-navigation-provider";

interface EnvironmentCommandPanelPage {
  projectId: string;
  environmentId: string;
}

export function EnvironmentCommandPanelPage({
  projectId,
  environmentId,
}: EnvironmentCommandPanelPage) {
  const [
    {
      data: { displayName, versions },
    },
    {
      data: { legacyLobbiesEnabled, backendModulesEnabled },
    },
  ] = useSuspenseQueries({
    queries: [
      projectQueryOptions(projectId),
      projectMetadataQueryOptions({ projectId, environmentId }),
    ],
  });

  const {
    data: {
      namespace: { versionId, config },
    },
  } = useSuspenseQuery(
    projectEnvironmentQueryOptions({ environmentId, projectId }),
  );

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
              to: "/projects/$projectId/environments/$environmentId/actors",
              params: { projectId, environmentId },
            });
          }}
        >
          <Icon icon={faActorsBorderless} />
          Actors
        </CommandItem>
        <CommandItem
          onSelect={() => {
            navigate({
              to: "/projects/$projectId/environments/$environmentId/builds",
              params: { projectId, environmentId },
            });
          }}
        >
          <Icon icon={faHammer} />
          Builds
        </CommandItem>
        {backendModulesEnabled ? (
          <GuardEnterprise>
            <CommandItem
              onSelect={() => {
                navigate({
                  to: "/projects/$projectId/environments/$environmentId/backend",
                  params: { projectId, environmentId },
                });
              }}
            >
              <Icon icon={faPuzzle} />
              Backend
            </CommandItem>
          </GuardEnterprise>
        ) : null}

        {legacyLobbiesEnabled ? (
          <CommandItem
            onSelect={() => {
              navigate({
                to: "/projects/$projectId/environments/$environmentId/versions",
                params: { projectId, environmentId },
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
                    to: "/projects/$projectId/environments/$environmentId/cdn",
                    params: { projectId, environmentId },
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
                    to: "/projects/$projectId/environments/$environmentId/cdn",
                    params: { projectId, environmentId },
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
                    to: "/projects/$projectId/environments/$environmentId/cdn",
                    params: { projectId, environmentId },
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
                    to: "/projects/$projectId/environments/$environmentId/lobbies",
                    params: { projectId, environmentId },
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
                    to: "/projects/$projectId/environments/$environmentId/lobbies/logs",
                    params: { projectId, environmentId },
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
                    to: "/projects/$projectId/environments/$environmentId/lobbies/settings",
                    params: { projectId, environmentId },
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
              to: "/projects/$projectId/environments/$environmentId/tokens",
              params: { projectId, environmentId },
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
              to: "/projects/$projectId/environments/$environmentId/tokens",
              params: { projectId, environmentId },
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
              to: "/projects/$projectId/environments/$environmentId/tokens",
              params: { projectId, environmentId },
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
