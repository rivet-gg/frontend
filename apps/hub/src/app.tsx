import {
  ConfigProvider,
  FullscreenLoading,
  Toaster,
  TooltipProvider,
  getConfig,
} from "@rivet-gg/components";
import * as Sentry from "@sentry/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { Suspense } from "react";
import { ThirdPartyProviders } from "./components/third-party-providers";
import { routeMasks } from "./lib/route-masks";
import { queryClient, queryClientPersister } from "./queries/global";
import { routeTree } from "./routeTree.gen";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
  interface StaticDataRouteOption {
    layout?: "full" | "compact";
  }
}

export const router = createRouter({
  routeTree,
  routeMasks,
  context: {
    // biome-ignore lint/style/noNonNullAssertion: we know this will be defined
    auth: undefined!,
    queryClient,
  },
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  defaultOnCatch: (error) => {
    Sentry.captureException(error);
  },
});

function InnerApp() {
  return <RouterProvider router={router} />;
}

export function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: queryClientPersister }}
    >
      <ConfigProvider value={getConfig()}>
        <ThirdPartyProviders>
          <Suspense fallback={<FullscreenLoading />}>
            <TooltipProvider>
              <InnerApp />
            </TooltipProvider>
          </Suspense>

          <Toaster />
          <ReactQueryDevtools />
        </ThirdPartyProviders>
      </ConfigProvider>
    </PersistQueryClientProvider>
  );
}
