import {
  gameBackendProjectQueryOptions,
  gameQueryOptions,
} from "@/domains/game/queries";
import { useDialog } from "@/hooks/use-dialog";
import { rivetEeClient } from "@/queries/global";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

function Modals() {
  const navigate = Route.useNavigate();
  const { gameId } = Route.useParams();
  const { modal } = Route.useSearch();
  const { projectId } = Route.useRouteContext();

  const CreateNewBackendEnvironment = useDialog.CreateBackendEnv.Dialog;

  const handleonOpenChange = (value: boolean) => {
    if (!value) {
      navigate({ search: { modal: undefined } });
    }
  };

  return (
    <>
      <CreateNewBackendEnvironment
        gameId={gameId}
        projectId={projectId}
        dialogProps={{
          open: modal === "create-environment",
          onOpenChange: handleonOpenChange,
        }}
      />
    </>
  );
}

function GameBackendRoute() {
  const { gameId } = Route.useParams();
  useSuspenseQuery(gameBackendProjectQueryOptions(gameId));
  return (
    <>
      <Modals />
      <Outlet />
    </>
  );
}

const searchSchema = z.object({
  modal: z.enum(["create-environment"]).or(z.string()).optional(),
});

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/backend",
)({
  validateSearch: (search) => searchSchema.parse(search),
  component: GameBackendRoute,
  beforeLoad: async ({ params: { gameId }, context: { queryClient } }) => {
    const { project } = await queryClient.ensureQueryData(
      gameBackendProjectQueryOptions(gameId),
    );

    if (project) {
      return { projectId: project.projectId };
    }

    const { game } = await queryClient.fetchQuery(gameQueryOptions(gameId));

    const newProject = await rivetEeClient.ee.cloud.backend.projects.create({
      displayName: `${game.displayName.slice(0, 15)}-backend`,
      developerGroupId: game.developerGroupId,
    });
    await rivetEeClient.ee.cloud.games.projects.link(gameId, {
      projectId: newProject.projectId,
    });
    return { projectId: newProject.projectId };
  },
});
