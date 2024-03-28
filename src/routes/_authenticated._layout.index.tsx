import { gamesQueryOptions } from "@/queries/games";
import { AppIndexView } from "@/views/app-index-view";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_layout/")({
  beforeLoad: async ({ context }) => {
    await context.queryClient.ensureQueryData(gamesQueryOptions());
  },
  component: () => {
    return <AppIndexView />;
  },
});
