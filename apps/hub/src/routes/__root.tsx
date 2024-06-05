import { ErrorComponent } from "@/components/error-component";
import { NotFoundComponent } from "@/components/not-found-component";
import type { AuthContext } from "@/domains/auth/contexts/auth";
import { useDialog } from "@/hooks/use-dialog";
import * as PageLayout from "@/layouts/page";
import * as Layout from "@/layouts/root";
import { FEEDBACK_FORM_ID } from "@/lib/data/constants";
import { FullscreenLoading, Page } from "@rivet-gg/components";
import type { QueryClient } from "@tanstack/react-query";
import {
  type ErrorComponentProps,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { usePostHog } from "posthog-js/react";
import { Suspense } from "react";

function Modals() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const posthog = usePostHog();

  const FeedbackDialog = useDialog.Feedback.Dialog;

  if (!search || !("modal" in search)) {
    return;
  }

  const { modal } = search;

  const handleonOpenChange = (value: boolean) => {
    if (!value) {
      navigate({ search: { modal: undefined } });
    } else {
      posthog.capture("survey shown", { $survey_id: FEEDBACK_FORM_ID });
    }
  };

  return (
    <>
      <FeedbackDialog
        dialogProps={{
          open: modal === "feedback",
          onOpenChange: handleonOpenChange,
        }}
      />
    </>
  );
}

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
        <Modals />
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
