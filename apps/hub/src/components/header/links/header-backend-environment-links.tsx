import { GameBackendEnvironmentDatabaseLink } from "@/domains/game/components/game-backend/game-backend-environment-database-link";
import { faHome, faKey, faScroll } from "@fortawesome/pro-solid-svg-icons";
import { Link, useRouteContext } from "@tanstack/react-router";
import { HeaderLink } from "../header-link";

interface BackendEnvironmentLinksProps {
  gameId: string;
  environmentId: string;
}

export function BackendEnvironmentLinks({
  gameId,
  environmentId,
}: BackendEnvironmentLinksProps) {
  const projectId = useRouteContext({
    from: "/_authenticated/_layout/games/$gameId/backend/$environmentId",
    select: (context) => context.projectId,
  });

  return (
    <>
      <HeaderLink icon={faHome}>
        <Link
          to="/games/$gameId/backend/$environmentId"
          activeOptions={{ exact: true }}
          params={{ gameId, environmentId }}
        >
          Overview
        </Link>
      </HeaderLink>
      <HeaderLink icon={faScroll}>
        <Link
          to="/games/$gameId/backend/$environmentId/logs"
          params={{ gameId, environmentId }}
        >
          Logs
        </Link>
      </HeaderLink>
      <GameBackendEnvironmentDatabaseLink
        projectId={projectId}
        environmentId={environmentId}
        asChild
      >
        <HeaderLink>
          <span className="cursor-pointer">Database</span>
        </HeaderLink>
      </GameBackendEnvironmentDatabaseLink>
      <HeaderLink icon={faKey}>
        <Link
          to="/games/$gameId/backend/$environmentId/variables"
          params={{ gameId, environmentId }}
        >
          Variables
        </Link>
      </HeaderLink>
    </>
  );
}
