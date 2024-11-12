import { useAuth } from "@/domains/auth/contexts/auth";
import { noop } from "@/lib/utils";
import { Skeleton, cn } from "@rivet-gg/components";
import { CatchBoundary, useMatchRoute } from "@tanstack/react-router";
import { Suspense, useContext } from "react";
import { EnvironmentBreadcrumb } from "./environment-breadcrumb";
import { GameBreadcrumb } from "./game-breadcrumb";
import { GroupBreadcrumb } from "./group-breadcrumb";
import { MobileBreadcrumbsContext } from "./mobile-breadcrumbs";

function Content() {
  const matchRoute = useMatchRoute();

  const { profile } = useAuth();
  if (!profile?.identity.isRegistered) {
    return null;
  }

  const groupMatch = matchRoute({ to: "/teams/$groupId", fuzzy: true });

  if (groupMatch) {
    return <GroupBreadcrumb groupId={groupMatch.groupId} />;
  }

  const gameEnvMatch = matchRoute({
    to: "/games/$gameId/environments/$environmentId",
    fuzzy: true,
  });

  if (gameEnvMatch) {
    return (
      <EnvironmentBreadcrumb
        environmentId={gameEnvMatch.environmentId}
        gameId={gameEnvMatch.gameId}
      />
    );
  }

  const gameMatch = matchRoute({ to: "/games/$gameId", fuzzy: true });

  if (gameMatch) {
    return <GameBreadcrumb gameId={gameMatch.gameId} />;
  }

  return null;
}

export function Breadcrumbs() {
  const isMobile = useContext(MobileBreadcrumbsContext);
  return (
    <div
      className={cn(
        "flex",
        isMobile && "flex-col gap-6",
        !isMobile && "items-center gap-2",
      )}
    >
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
