import * as Layout from "@/layouts/page";
import { Outlet, createFileRoute, useMatches } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/_authenticated/_layout")({
  component: () => {
    const matches = useMatches();
    return (
      <Suspense
        fallback={
          <Layout.Root.Skeleton
            layout={matches[matches.length - 1].staticData.layout}
          />
        }
      >
        <Layout.Root layout={matches[matches.length - 1].staticData.layout}>
          <Outlet />
        </Layout.Root>
      </Suspense>
    );
  },
});
