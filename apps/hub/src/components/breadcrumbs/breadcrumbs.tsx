import { Skeleton } from "@rivet-gg/components";
import { CatchBoundary, useMatchRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { GroupBreadcrumb } from "./group-breadcrumb";
import { GameBreadcrumb } from "./game-breadcrumb";
import { NamespaceBreadcrumb } from "./namespace-breadcrumb";
import { useAuth } from "@/domains/auth/contexts/auth";
import { noop } from "@/lib/utils";

function Content() {
  const matchRoute = useMatchRoute();

  const { profile } = useAuth();
  if (!profile?.identity.isRegistered) {
    return null;
  }

  const groupMatch = matchRoute({ to: "/teams/$groupId", fuzzy: true }) as
    | false
    | { groupId: string };

  if (groupMatch) {
    return <GroupBreadcrumb groupId={groupMatch.groupId} />;
  }

  const gameNamespaceMatch = matchRoute({
    to: "/games/$gameId/namespaces/$namespaceId",
    fuzzy: true,
  }) as false | { gameId: string; namespaceId: string };

  if (gameNamespaceMatch) {
    return (
      <NamespaceBreadcrumb
        namespaceId={gameNamespaceMatch.namespaceId}
        gameId={gameNamespaceMatch.gameId}
      />
    );
  }

  const gameMatch = matchRoute({ to: "/games/$gameId", fuzzy: true }) as
    | false
    | { gameId: string };

  if (gameMatch) {
    return <GameBreadcrumb gameId={gameMatch.gameId} />;
  }

  return null;
}

export function Breadcrumbs() {
  return (
    <div className="flex items-center gap-2">
      <CatchBoundary getResetKey={() => "reset"} errorComponent={noop}>
        <Suspense
          fallback={
            <>
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-16" />
            </>
          }
        >
          <Content />
        </Suspense>
      </CatchBoundary>
    </div>
  );
}
