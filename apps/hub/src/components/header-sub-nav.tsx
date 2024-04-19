import { buildNamespaceSubNav, gameSubNav } from "@/domains/game/data/route";
import { gameNamespaceQueryOptions } from "@/domains/game/queries";
import { groupSubNav } from "@/domains/group/data/route";
import { Skeleton } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useMatchRoute } from "@tanstack/react-router";
import { Suspense } from "react";

interface LinksProps {
  links: { title: string; url: string; exact?: boolean }[];
  params: Record<string, string>;
}

function Links({ links, params }: LinksProps) {
  return (
    <div className="-mb-2 flex min-h-10 items-center gap-6">
      {links.map((item) => (
        <Link
          key={item.url}
          to={item.url}
          activeOptions={{ exact: item.exact }}
          params={params}
          className="text-muted-foreground data-active:border-white data-active:text-foreground border-b border-transparent py-2 text-sm"
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
}

interface NamespaceLinksProps extends Omit<LinksProps, "links"> {
  namespaceId: string;
  gameId: string;
}

function NamespaceLinks({ namespaceId, gameId, params }: NamespaceLinksProps) {
  const { data } = useSuspenseQuery(
    gameNamespaceQueryOptions({ gameId, namespaceId }),
  );
  return (
    <Links
      links={buildNamespaceSubNav(data.namespace.config)}
      params={params}
    />
  );
}

function Content() {
  const matchRoute = useMatchRoute();

  const namespaceMatch = matchRoute({
    to: "/games/$gameId/namespaces/$namespaceId",
    fuzzy: true,
  }) as { gameId: string; namespaceId: string } | false;

  if (namespaceMatch) {
    return (
      <NamespaceLinks
        gameId={namespaceMatch.gameId}
        namespaceId={namespaceMatch.namespaceId}
        params={namespaceMatch}
      />
    );
  }

  const gameMatch = matchRoute({ to: "/games/$gameId", fuzzy: true }) as
    | { gameId: string }
    | false;

  if (gameMatch) {
    return <Links links={gameSubNav} params={gameMatch} />;
  }

  const groupMatch = matchRoute({ to: "/teams/$groupId", fuzzy: true }) as
    | { groupId: string }
    | false;

  if (groupMatch) {
    return <Links links={groupSubNav} params={groupMatch} />;
  }

  return null;
}

export function HeaderSubNav() {
  return (
    <Suspense
      fallback={
        <div className="-mb-2 flex min-h-10 items-center gap-6">
          <Skeleton className="mb-2 h-5 w-16" />
          <Skeleton className="mb-2 h-5 w-16" />
          <Skeleton className="mb-2 h-5 w-16" />
        </div>
      }
    >
      <Content />
    </Suspense>
  );
}
