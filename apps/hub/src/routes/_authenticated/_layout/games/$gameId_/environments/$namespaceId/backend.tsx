import { ErrorComponent } from "@/components/error-component";
import * as Layout from "@/domains/game/layouts/backend-layout";
import { gameBackendQueryOptions } from "@/domains/game/queries";
import { useDialog } from "@/hooks/use-dialog";
import { isRivetError } from "@/lib/utils";
import { rivetEeClient } from "@/queries/global";
import {
  type ErrorComponentProps,
  Outlet,
  createFileRoute,
} from "@tanstack/react-router";
import { z } from "zod";

function Modals() {
  const navigate = Route.useNavigate();
  const { gameId, namespaceId } = Route.useParams();
  const { modal } = Route.useSearch();

  const ConfirmOuterbaseConnectionDialog =
    useDialog.ConfirmOuterbaseConnection.Dialog;

  const handleonOpenChange = (value: boolean) => {
    if (!value) {
      navigate({ search: { modal: undefined } });
    }
  };

  return (
    <ConfirmOuterbaseConnectionDialog
      environmentId={namespaceId}
      gameId={gameId}
      dialogProps={{
        open: modal === "database",
        onOpenChange: handleonOpenChange,
      }}
    />
  );
}

function BackendLayoutErrorComponent(props: ErrorComponentProps) {
  const { namespaceId, gameId } = Route.useParams();
  return (
    <Layout.Root namespaceId={namespaceId} gameId={gameId}>
      <ErrorComponent {...props} />
    </Layout.Root>
  );
}

function BackendLayoutView() {
  const { namespaceId, gameId } = Route.useParams();

  return (
    <Layout.Root namespaceId={namespaceId} gameId={gameId}>
      <Outlet />
      <Modals />
    </Layout.Root>
  );
}

const searchSchema = z.object({
  modal: z.enum(["database"]).or(z.string()).optional(),
});

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/environments/$namespaceId/backend",
)({
  validateSearch: (search) => searchSchema.parse(search),
  component: BackendLayoutView,
  errorComponent: BackendLayoutErrorComponent,
  beforeLoad: async ({ context, params: { gameId, namespaceId } }) => {
    try {
      await context.queryClient.fetchQuery(
        gameBackendQueryOptions({ gameId, environmentId: namespaceId }),
      );
    } catch (error) {
      if (isRivetError(error)) {
        if (error.body.code === "BACKEND_NOT_FOUND") {
          return rivetEeClient.ee.backend.create(gameId, namespaceId, {});
        }
      }
      throw error;
    }
  },
});
