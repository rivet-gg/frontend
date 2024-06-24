import {
  SidebarNavigation,
  SidebarPageContent,
  Skeleton,
} from "@rivet-gg/components";
import { Link } from "@tanstack/react-router";
import { type ReactNode, Suspense } from "react";
import { GameBackendDatabaseLink } from "../components/game-backend/game-backend-database-link";

const LINKS = [
  {
    url: "/games/$gameId/backend/$environmentId",
    text: "Overview",
    exact: true,
  },
  {
    url: "/games/$gameId/backend/$environmentId/logs",
    text: "Logs",
  },
  {
    url: "/games/$gameId/backend/$environmentId/variables",
    text: "Variables",
  },
];

interface GameBackendEnvPageProps {
  gameId: string;
  environmentId: string;
  projectId: string;
  children: ReactNode;
}

function GameBackendEnvPage({
  children,
  gameId,
  projectId,
  environmentId,
}: GameBackendEnvPageProps) {
  return (
    <SidebarPageContent
      sidebar={
        <SidebarNavigation>
          {LINKS.map((link) => (
            <Link
              key={link.url}
              to={link.url}
              params={{
                gameId,
                environmentId,
              }}
              activeOptions={{ exact: link.exact }}
              className="data-active:text-foreground data-active:font-semibold"
            >
              {link.text}
            </Link>
          ))}
          <GameBackendDatabaseLink
            projectId={projectId}
            environmentId={environmentId}
          />
        </SidebarNavigation>
      }
    >
      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        {children}
      </Suspense>
    </SidebarPageContent>
  );
}

export { GameBackendEnvPage as Root };
