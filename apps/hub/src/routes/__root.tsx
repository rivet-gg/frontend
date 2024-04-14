import { AuthContext } from "@/domains/auth/contexts/auth";
import { bootstrapQueryOptions } from "@/domains/auth/queries/bootstrap";
import * as Layout from "@/layouts/root";
import { Toaster } from "@rivet-gg/components";
import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

function RootRoute() {
  useSuspenseQuery(bootstrapQueryOptions());

  return (
    <>
      <Layout.Root>
        <Layout.Header />
        <Layout.Main>
          <Outlet />
        </Layout.Main>
        <Layout.Footer />
      </Layout.Root>

      <Toaster />
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </>
  );
}

export interface RouterContext {
  auth: AuthContext;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootRoute,
});
