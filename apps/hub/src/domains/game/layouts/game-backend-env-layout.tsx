import { SidebarNavigation, SidebarPageContent } from "@rivet-gg/components";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

interface GameBackendEnvPageProps {
  gameId: string;
  environmentId: string;
  children: ReactNode;
}

function GameBackendEnvPage({
  children,
  gameId,
  environmentId,
}: GameBackendEnvPageProps) {
  return (
    <SidebarPageContent
      sidebar={
        <SidebarNavigation>
          <Link
            to="/games/$gameId/backend/$environmentId"
            params={{ gameId, environmentId }}
            className="text-foreground font-semibold"
          >
            Overview
          </Link>
          <Link
            to="/games/$gameId/backend/$environmentId/logs"
            params={{ gameId, environmentId }}
          >
            Logs
          </Link>
          <Link
            to="/games/$gameId/backend/$environmentId/variables"
            params={{ gameId, environmentId }}
          >
            Variables
          </Link>
        </SidebarNavigation>
      }
    >
      {children}
    </SidebarPageContent>
  );
}

export { GameBackendEnvPage as Root };
