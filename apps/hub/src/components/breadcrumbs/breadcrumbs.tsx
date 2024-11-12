import { useAuth } from "@/domains/auth/contexts/auth";
import { noop } from "@/lib/utils";
import { Skeleton, cn } from "@rivet-gg/components";
import { CatchBoundary, useMatchRoute } from "@tanstack/react-router";
import { Suspense, useContext } from "react";
import { EnvironmentBreadcrumb } from "./environment-breadcrumb";
import { GroupBreadcrumb } from "./group-breadcrumb";
import { MobileBreadcrumbsContext } from "./mobile-breadcrumbs";
import { ProjectBreadcrumb } from "./project-breadcrumb";

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

  const projectEnvMatch = matchRoute({
    to: "/projects/$projectId/environments/$environmentId",
    fuzzy: true,
  });

  if (projectEnvMatch) {
    return (
      <EnvironmentBreadcrumb
        environmentId={projectEnvMatch.environmentId}
        projectId={projectEnvMatch.projectId}
      />
    );
  }

  const projectMatch = matchRoute({ to: "/projects/$projectId", fuzzy: true });

  if (projectMatch) {
    return <ProjectBreadcrumb projectId={projectMatch.projectId} />;
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
