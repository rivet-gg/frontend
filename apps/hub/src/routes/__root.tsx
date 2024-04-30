import { ErrorComponent } from "@/components/error-component";
import { AuthContext } from "@/domains/auth/contexts/auth";
import * as Layout from "@/layouts/root";
import { FullscreenLoading } from "@rivet-gg/components";
import { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Suspense } from "react";

function Root() {
  return (
    <Layout.Root>
      <Layout.Header />
      <Layout.Main>
        <Outlet />
      </Layout.Main>
      <Layout.Footer />
    </Layout.Root>
  );
}

function RootRoute() {
  return (
    <>
      <Suspense fallback={<FullscreenLoading />}>
        <Root />
      </Suspense>

      <TanStackRouterDevtools />
    </>
  );
}

export interface RouterContext {
  auth: AuthContext;
  queryClient: QueryClient;
  subNav?: { title: string; url: string; exact?: boolean }[];
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootRoute,
  errorComponent: ErrorComponent,
  wrapInSuspense: false,
});
