import { PageLayout } from "@rivet-gg/components/layout";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/_authenticated/_layout")({
  component: () => {
    return (
      <PageLayout.Root>
        <Suspense fallback={<PageLayout.Root.Skeleton />}>
          <Outlet />
        </Suspense>
      </PageLayout.Root>
    );
  },
});
