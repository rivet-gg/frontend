import {
  Flex,
  SidebarNavigation,
  SidebarPageContent,
} from "@rivet-gg/components";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const LINKS = [
  // {
  //   url: "/games/$gameId/namespaces/$namespaceId/matchmaker/",
  //   text: "Overview",
  //   exact: true,
  // },
  {
    url: "/games/$gameId/namespaces/$namespaceId/lobbies/",
    text: "Lobbies",
    exact: true,
  },
  {
    url: "/games/$gameId/namespaces/$namespaceId/lobbies/logs",
    text: "Logs",
  },
  {
    url: "/games/$gameId/namespaces/$namespaceId/lobbies/settings",
    text: "Settings",
  },
];

interface MatchmakerPageProps {
  gameId: string;
  namespaceId: string;
  children: ReactNode;
}

function MatchmakerPage({
  namespaceId,
  gameId,
  children,
}: MatchmakerPageProps) {
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
        </SidebarNavigation>
      }
    >
      <Flex gap="4" direction="col" className="w-full min-h-0 h-full md:h-auto">
        {children}
      </Flex>
    </SidebarPageContent>
  );
}

export { MatchmakerPage as Root };
