import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { queryClient, queryClientPersister } from "./queries/global";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { Suspense } from "react";
import { FullscreenLoading, Toaster } from "@rivet-gg/components";
import { useAuth, AuthProvider } from "./domains/auth/contexts/auth";
import { routeMasks } from "./lib/route-masks";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const router = createRouter({
  routeTree,
  routeMasks,
  context: {
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
      <Suspense fallback={<FullscreenLoading />}>
        <AuthProvider>
          <InnerApp />
        </AuthProvider>
      </Suspense>

      <Toaster />
      <ReactQueryDevtools />
    </PersistQueryClientProvider>
  );
}
