import {
  Flex,
  SidebarNavigation,
  SidebarPageContent,
  Skeleton,
} from "@rivet-gg/components";
import { Link } from "@tanstack/react-router";
import type { PropsWithChildren, ReactNode } from "react";

const LINKS = [
  {
    url: "/games/$gameId/environments/$environmentId/lobbies/",
    text: "Lobbies",
    exact: true,
  },
  {
    url: "/games/$gameId/environments/$environmentId/lobbies/logs",
    text: "Logs",
  },
  {
    url: "/games/$gameId/environments/$environmentId/lobbies/settings",
    text: "Settings",
  },
];

interface MatchmakerPageProps {
  gameId: string;
  environmentId: string;
  children: ReactNode;
}

function MatchmakerPage({
  environmentId,
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
                environmentId,
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

MatchmakerPage.Skeleton = function MatchmakerPageSkeleton() {
  return (
    <SidebarPageContent
      sidebar={
        <SidebarNavigation>
          <Skeleton className="w-full h-5" />
          <Skeleton className="w-full h-5" />
          <Skeleton className="w-full h-5" />
          <Skeleton className="w-full h-5" />
        </SidebarNavigation>
      }
    >
      <Flex gap="4" direction="col" className="w-full min-h-0 h-full md:h-auto">
        <Skeleton className="w-full h-56" />
        <Skeleton className="w-full h-56" />
      </Flex>
    </SidebarPageContent>
  );
};

function Content({ children }: PropsWithChildren) {
  return children;
}

Content.Skeleton = function ContentSkeleton() {
  return (
    <>
      <Skeleton className="w-full h-56" />
      <Skeleton className="w-full h-56" />
    </>
  );
};

export { MatchmakerPage as Root, Content };
