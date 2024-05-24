import { ErrorComponent } from "@/components/error-component";
import { NotFoundComponent } from "@/components/not-found-component";
import type { AuthContext } from "@/domains/auth/contexts/auth";
import * as PageLayout from "@/layouts/page";
import * as Layout from "@/layouts/root";
import { FullscreenLoading, Page } from "@rivet-gg/components";
import type { QueryClient } from "@tanstack/react-query";
import {
  type ErrorComponentProps,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Suspense } from "react";

function RootNotFoundComponent() {
  return (
    <PageLayout.Root>
      <Page title="Not found">
        <NotFoundComponent />
      </Page>
    </PageLayout.Root>
  );
}

function RootErrorComponent(props: ErrorComponentProps) {
  return (
    <PageLayout.Root>
      <Page title="Error!">
        <ErrorComponent {...props} />
      </Page>
    </PageLayout.Root>
  );
}

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

      {import.meta.env.DEV ? <TanStackRouterDevtools /> : null}
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
  errorComponent: RootErrorComponent,
  notFoundComponent: RootNotFoundComponent,
});
