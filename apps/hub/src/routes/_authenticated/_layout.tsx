import * as Layout from "@/layouts/page";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/_authenticated/_layout")({
  component: () => {
    return (
      <Suspense fallback={<Layout.Root.Skeleton />}>
        <Layout.Root>
          <Outlet />
        </Layout.Root>
      </Suspense>
    );
  },
});
