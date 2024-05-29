import { ErrorComponent } from "@/components/error-component";
import { NotFoundComponent } from "@/components/not-found-component";
import type { AuthContext } from "@/domains/auth/contexts/auth";
import { FullscreenLoading, Page } from "@rivet-gg/components";
import { PageLayout, RootLayout } from "@rivet-gg/components/layout";
import type { QueryClient } from "@tanstack/react-query";
import {
  type ErrorComponentProps,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Suspense } from "react";
import { Header as UiHeader } from "../components/header";

const Header = () => {
  return <UiHeader />;
};

const Footer = () => {
  return (
    <RootLayout.Footer>
      &copy; {new Date().getFullYear()} Rivet Gaming, Inc. All rights reserved
    </RootLayout.Footer>
  );
};

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
    <RootLayout.Root>
      <Header />
      <RootLayout.Main>
        <Outlet />
      </RootLayout.Main>
      <Footer />
    </RootLayout.Root>
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
