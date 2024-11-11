import { ErrorComponent } from "@/components/error-component";
import { tryCreateBackend } from "@/domains/game/helpers/try-create-backend";
import * as Layout from "@/domains/game/layouts/game-layout";
import {
  gameEnvironmentQueryOptions,
  gameQueryOptions,
} from "@/domains/game/queries";
import { useDialog } from "@/hooks/use-dialog";
import { queryClient } from "@/queries/global";
import {
  type ErrorComponentProps,
  Outlet,
  createFileRoute,
  notFound,
} from "@tanstack/react-router";
import { zodSearchValidator } from "@tanstack/router-zod-adapter";
import { z } from "zod";

function Modals() {
  const navigate = Route.useNavigate();
  const { gameId, environmentId } = Route.useParams();
  const { modal } = Route.useSearch();

  const ConfirmOuterbaseConnectionDialog =
    useDialog.ConfirmOuterbaseConnection.Dialog;

  const CreateDynamicServerDialog = useDialog.CreateDynamicServer.Dialog;

  const handleonOpenChange = (value: boolean) => {
    if (!value) {
      navigate({ search: { modal: undefined } });
    }
  };

  return (
    <>
      <ConfirmOuterbaseConnectionDialog
        environmentId={environmentId}
        gameId={gameId}
        dialogProps={{
          open: modal === "database",
          onOpenChange: handleonOpenChange,
        }}
      />
      <CreateDynamicServerDialog
        environmentId={environmentId}
        gameId={gameId}
        dialogProps={{
          open: modal === "create-server",
          onOpenChange: handleonOpenChange,
        }}
      />
    </>
  );
}

function EnvironmentErrorComponent(props: ErrorComponentProps) {
  return <ErrorComponent {...props} />;
}

function environmentIdRoute() {
  return (
    <>
      <Outlet />
      <Modals />
    </>
  );
}
const searchSchema = z.object({
  modal: z
    .enum(["database", "create-server"])
    .or(z.string())
    .optional()
    .catch(undefined),
});
export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/environments/$environmentId",
)({
  validateSearch: zodSearchValidator(searchSchema),
  loader: async ({ params: { gameId, environmentId } }) => {
    const { game } = await queryClient.ensureQueryData(
      gameQueryOptions(gameId),
    );
    const { namespace: environment } = await queryClient.ensureQueryData(
      gameEnvironmentQueryOptions({ gameId, environmentId }),
    );

    const version = game.versions.find(
      (version) => version.versionId === environment.versionId,
    );

    if (!environment || !game || !version) {
      throw notFound();
    }

    await tryCreateBackend({
      gameId,
      environmentId: environmentId,
      queryClient,
    });

    return { environment, version };
  },
  component: environmentIdRoute,
  errorComponent: EnvironmentErrorComponent,
  pendingComponent: Layout.Root.Skeleton,
});
