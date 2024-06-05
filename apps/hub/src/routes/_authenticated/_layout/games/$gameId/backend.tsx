import {
  gameBackendProjectQueryOptions,
  gameQueryOptions,
} from "@/domains/game/queries";
import { rivetEeClient } from "@/queries/global";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Outlet, createFileRoute } from "@tanstack/react-router";

function GameBackendRoute() {
  const { gameId } = Route.useParams();
  useSuspenseQuery(gameBackendProjectQueryOptions(gameId));
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

    if (project) {
      return { projectId: project.projectId };
    }

    const { game } = await queryClient.fetchQuery(gameQueryOptions(gameId));

    const newProject = await rivetEeClient.ee.cloud.opengb.projects.create({
      displayName: `${game.displayName} - Backend project`,
      developerGroupId: game.developerGroupId,
    });
    await rivetEeClient.ee.cloud.games.projects.link(gameId, {
      projectId: newProject.projectId,
    });
    return { projectId: newProject.projectId };
  },
});
