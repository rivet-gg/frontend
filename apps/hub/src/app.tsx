import {
  ConfigProvider,
  FullscreenLoading,
  Toaster,
  getConfig,
} from "@rivet-gg/components";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { Suspense } from "react";
import { ThirdPartyProviders } from "./components/third-party-providers";
import { AuthProvider, useAuth } from "./domains/auth/contexts/auth";
import { routeMasks } from "./lib/route-masks";
import { queryClient, queryClientPersister } from "./queries/global";
import { routeTree } from "./routeTree.gen";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const router = createRouter({
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
});

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
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
            <AuthProvider>
              <InnerApp />
            </AuthProvider>
          </Suspense>

          <Toaster />
          <ReactQueryDevtools />
        </ThirdPartyProviders>
      </ConfigProvider>
    </PersistQueryClientProvider>
  );
}
