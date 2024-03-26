import { AuthContext } from "@/auth";
import * as Layout from "@/components/layouts/root";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export interface RouterContext {
  auth: AuthContext;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
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
  ),
});
