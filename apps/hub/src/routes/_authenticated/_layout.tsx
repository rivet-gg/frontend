import { PageLayout } from "@rivet-gg/components/layout";
import { Outlet, createFileRoute, useMatches } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_layout")({
  component: () => {
    const matches = useMatches();
    return (
      <PageLayout.Root layout={matches[matches.length - 1].staticData.layout}>
        <Outlet />
      </PageLayout.Root>
    );
  },
  pendingComponent: PageLayout.Root.Skeleton,
});
