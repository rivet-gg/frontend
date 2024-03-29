import { AuthContext } from "@/contexts/auth";
import * as Layout from "@/components/layouts/root";
import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { bootstrapQueryOptions } from "@/queries/bootstrap";

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
