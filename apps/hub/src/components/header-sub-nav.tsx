import { useAuth } from "@/domains/auth/contexts/auth";
import {
  buildGameSubNav,
  buildNamespaceSubNav,
} from "@/domains/game/data/route";
import { gameNamespaceQueryOptions } from "@/domains/game/queries";
import { groupSubNav } from "@/domains/group/data/route";
import { useFeatureFlag } from "@/hooks/use-feature-flag";
import { noop } from "@/lib/utils";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Skeleton, cn } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CatchBoundary, Link, useMatchRoute } from "@tanstack/react-router";
import { type ReactNode, Suspense, useContext } from "react";
import { MobileBreadcrumbsContext } from "./breadcrumbs/mobile-breadcrumbs";

interface LinkButtonProps {
  title: string;
  url: string;
  exact?: boolean;
  icon?: IconProp;
  params: Record<string, unknown>;
}

const LinkButton = ({ title, url, exact, params, icon }: LinkButtonProps) => {
  const isMobile = useContext(MobileBreadcrumbsContext);

  if (isMobile) {
    return (
      <Link
        to={url}
        activeOptions={{ exact: exact }}
        params={params}
        className="text-muted-foreground hover:text-foreground text-lg data-active:text-foreground"
      >
        {icon ? (
          <span className="mr-2 size-5">
            <FontAwesomeIcon className="size-5" icon={icon} />
          </span>
        ) : null}
        {title}
      </Link>
    );
  }

  return (
    <Button asChild variant="ghost">
      <Link
        to={url}
        activeOptions={{ exact: exact }}
        params={params}
        className={
          "relative text-muted-foreground data-active:text-foreground data-active:after:content-[''] rounded-b-none data-active:after:absolute data-active:after:bottom-0 data-active:after:left-0 data-active:after:right-0 data-active:after:h-[2px] data-active:after:bg-primary"
        }
      >
        {icon ? (
          <span className="mr-2 size-4">
            <FontAwesomeIcon className="size-4" icon={icon} />
          </span>
        ) : null}
        {title}
      </Link>
    </Button>
  );
};

interface LinksProps {
  links: { title: string; url: string; exact?: boolean; icon?: IconProp }[];
  params: Record<string, string>;
}

function Links({ links, params }: LinksProps) {
  const isMobile = useContext(MobileBreadcrumbsContext);
  return (
    // I don't have a better idea than hardcoding the 10px here
    <div
      className={cn({
        "-mx-8 -mb-[9px] hidden md:flex min-h-10 items-center px-8": !isMobile,
        "flex flex-col text-left pl-8 gap-6": isMobile,
      })}
    >
      {links.map((item) => (
        <LinkButton key={item.url} {...item} params={params} />
      ))}
    </div>
  );
}

function GameLinks({ params }: Omit<LinksProps, "links"> & { gameId: string }) {
  const isEnabled = useFeatureFlag("hub-opengb-backend");
  return (
    <Links
      links={buildGameSubNav({ isOpenGbEnabled: isEnabled })}
      params={params}
    />
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

  const { profile } = useAuth();

  if (!profile?.identity.isRegistered) {
    return null;
  }

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
    return <GameLinks gameId={gameMatch.gameId} params={gameMatch} />;
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
    <CatchBoundary getResetKey={() => "reset"} errorComponent={noop}>
      <Suspense
        fallback={
          <div className="-mb-2 hidden md:flex min-h-10 items-center gap-6">
            <Skeleton className="mb-2 h-5 w-16" />
            <Skeleton className="mb-2 h-5 w-16" />
            <Skeleton className="mb-2 h-5 w-16" />
          </div>
        }
      >
        <Content />
      </Suspense>
    </CatchBoundary>
  );
}
