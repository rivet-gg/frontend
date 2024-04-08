import {
  createRouter,
  RegisteredRouter,
  RoutePaths,
  RouterProvider,
} from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { AuthProvider, useAuth } from "./contexts/auth";
import { queryClient, queryClientPersister } from "./queries/global";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { Suspense } from "react";
import { FullscreenLoading } from "@rivet-gg/components";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }

  interface StaticDataRouteOption {
    subNav?: { title: string; url: string }[];
  }
}

// Create a new router instance
const router = createRouter({
  routeTree,
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
    </PersistQueryClientProvider>
  );
}
