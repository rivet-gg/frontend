import { Outlet, createFileRoute, notFound } from "@tanstack/react-router";
import { gameBackendProjectQueryOptions } from "@/domains/game/queries";

function GameBackendRoute() {
  return <Outlet />;
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/backend",
)({
  component: GameBackendRoute,
  beforeLoad: async ({ params: { gameId }, context: { queryClient } }) => {
    const { project } = await queryClient.ensureQueryData(
      gameBackendProjectQueryOptions(gameId),
    );

    if (!project) {
      throw notFound();
    }

    return { projectId: project.projectId };
  },
});
