import * as Layout from "@/layouts/page";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/_authenticated/_layout")({
  component: () => {
    return (
      <Layout.Root>
        <Suspense fallback={<Layout.Root.Skeleton />}>
          <Outlet />
        </Suspense>
      </Layout.Root>
    );
  },
});
