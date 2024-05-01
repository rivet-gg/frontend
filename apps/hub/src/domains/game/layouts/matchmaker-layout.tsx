import {
  SidebarNavigation,
  Flex,
  SidebarPageContent,
} from "@rivet-gg/components";
import { Link } from "@tanstack/react-router";
import { ReactNode } from "react";

const LINKS = [
  // {
  //   url: "/games/$gameId/namespaces/$namespaceId/matchmaker/",
  //   text: "Overview",
  //   exact: true,
  // },
  {
    url: "/games/$gameId/namespaces/$namespaceId/matchmaker/lobbies",
    text: "Lobbies",
  },
  {
    url: "/games/$gameId/namespaces/$namespaceId/matchmaker/logs",
    text: "Logs",
  },
  {
    url: "/games/$gameId/namespaces/$namespaceId/matchmaker/settings",
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
              params={{
                gameId,
                namespaceId,
              }}
              activeOptions={{ exact: link.exact }}
              className="data-active:text-foreground font-semibold"
            >
              {link.text}
            </Link>
          ))}
        </SidebarNavigation>
      }
    >
      <Flex gap="4" direction="col">
        {children}
      </Flex>
    </SidebarPageContent>
  );
}

export { MatchmakerPage as Root };
