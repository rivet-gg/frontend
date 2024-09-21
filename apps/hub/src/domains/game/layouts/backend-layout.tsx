import {
  Flex,
  SidebarNavigation,
  SidebarPageContent,
  cn,
} from "@rivet-gg/components";
import { Icon, faSpinnerThird } from "@rivet-gg/icons";
import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";
import { GameBackendEnvironmentDatabaseLink } from "../components/game-backend/game-backend-environment-database-link";

const LINKS = [
  {
    url: "/games/$gameId/environments/$namespaceId/backend/",
    text: "Overview",
    exact: true,
  },
  {
    url: "/games/$gameId/environments/$namespaceId/backend/logs",
    text: "Logs",
  },
  {
    url: "/games/$gameId/environments/$namespaceId/backend/variables",
    text: "Variables",
  },
];

const DatabaseLink = ({
  isLoading,
  onClick,
}: ComponentProps<"button"> & { isLoading?: boolean }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="text-left inline-block data-active:text-foreground data-active:font-semibold"
    >
      {isLoading ? (
        <Icon
          icon={faSpinnerThird}
          className={cn("h-4 w-4 animate-spin mr-2")}
        />
      ) : null}
      Database
    </button>
  );
};

interface BackendPageProps {
  gameId: string;
  namespaceId: string;
  children: ReactNode;
}

function BackendPage({ namespaceId, gameId, children }: BackendPageProps) {
  return (
    <SidebarPageContent
      sidebar={
        <SidebarNavigation>
          {LINKS.map((link) => (
            <Link
              key={link.url}
              to={link.url}
              activeOptions={{ exact: link.exact, includeSearch: false }}
              params={{
                gameId,
                namespaceId,
              }}
              className="data-active:text-foreground data-active:font-semibold"
            >
              {link.text}
            </Link>
          ))}
          <GameBackendEnvironmentDatabaseLink
            asChild
            gameId={gameId}
            environmentId={namespaceId}
          >
            <DatabaseLink />
          </GameBackendEnvironmentDatabaseLink>
        </SidebarNavigation>
      }
    >
      <Flex gap="4" direction="col" className="w-full min-h-0 h-full md:h-auto">
        {children}
      </Flex>
    </SidebarPageContent>
  );
}

export { BackendPage as Root };
