import { GameBackendEnvironmentDatabaseLink } from "@/domains/game/components/game-backend/game-backend-environment-database-link";
import {
  gameBackendProjectEnvQueryOptions,
  gameBackendProjectQueryOptions,
} from "@/domains/game/queries";
import { faHome, faKey, faScroll } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  type ButtonProps,
  CommandGroup,
  CommandItem,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useCommandPanelNavigation } from "../command-panel-navigation-provider";

function ButtonCommandItem({
  children,
  startIcon,
  endIcon,
  onClick,
}: ButtonProps) {
  const { close } = useCommandPanelNavigation();
  return (
    <CommandItem
      onSelect={() => {
        close();
        onClick?.();
      }}
    >
      {startIcon}
      {children}
      {endIcon}
    </CommandItem>
  );
}

interface EnvironmentCommandPanelPageProps {
  gameId: string;
  environmentId: string;
}

export function EnvironmentCommandPanelPage({
  gameId,
  environmentId,
}: EnvironmentCommandPanelPageProps) {
  const {
    data: { project },
  } = useSuspenseQuery(gameBackendProjectQueryOptions(gameId));

  if (!project) throw new Error("Project not found");

  const { data: env } = useSuspenseQuery(
    gameBackendProjectEnvQueryOptions({
      projectId: project.projectId,
      environmentId,
    }),
  );

  const { navigate } = useCommandPanelNavigation();

  return (
    <>
      <CommandGroup heading={env.displayName}>
        <CommandItem
          onSelect={() => {
            navigate({
              to: "/games/$gameId/backend/$environmentId",
              params: { gameId, environmentId },
            });
          }}
        >
          <FontAwesomeIcon icon={faHome} />
          Overview
        </CommandItem>
        <CommandItem
          onSelect={() => {
            navigate({
              to: "/games/$gameId/backend/$environmentId/logs",
              params: { gameId, environmentId },
            });
          }}
        >
          <FontAwesomeIcon icon={faScroll} />
          Logs
        </CommandItem>
        <GameBackendEnvironmentDatabaseLink
          asChild
          projectId={project.projectId}
          environmentId={environmentId}
        >
          <ButtonCommandItem>Database</ButtonCommandItem>
        </GameBackendEnvironmentDatabaseLink>
        <CommandItem
          onSelect={() => {
            navigate({
              to: "/games/$gameId/backend/$environmentId/variables",
              params: { gameId, environmentId },
            });
          }}
        >
          <FontAwesomeIcon icon={faKey} />
          Variables
        </CommandItem>
      </CommandGroup>
    </>
  );
}
