import { SidebarNavigation, SidebarPageContent } from "@rivet-gg/components";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

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
        </SidebarNavigation>
      }
    >
      {children}
    </SidebarPageContent>
  );
}

export { GameBackendEnvPage as Root };
