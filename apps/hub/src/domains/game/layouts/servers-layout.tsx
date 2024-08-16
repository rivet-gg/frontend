import {
  Flex,
  SidebarNavigation,
  SidebarPageContent,
} from "@rivet-gg/components";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const LINKS = [
  {
    url: "/games/$gameId/environments/$namespaceId/servers/",
    text: "Servers",
    exact: true,
  },
  {
    url: "/games/$gameId/environments/$namespaceId/servers/builds",
    text: "Builds",
  },
];

interface ServersPageProps {
  gameId: string;
  namespaceId: string;
  children: ReactNode;
}

function ServersPage({ namespaceId, gameId, children }: ServersPageProps) {
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

export { ServersPage as Root };
