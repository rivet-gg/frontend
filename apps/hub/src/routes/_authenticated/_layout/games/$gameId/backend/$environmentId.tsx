import { useDialog } from "@/hooks/use-dialog";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

function Modals() {
  const navigate = Route.useNavigate();
  const { environmentId } = Route.useParams();
  const { modal } = Route.useSearch();
  const { projectId } = Route.useRouteContext();

  const ConfirmOuterbaseConnection =
    useDialog.ConfirmOuterbaseConnection.Dialog;

  const handleonOpenChange = (value: boolean) => {
    if (!value) {
      navigate({ search: { modal: undefined } });
    }
  };

  return (
    <>
      <ConfirmOuterbaseConnection
        environmentId={environmentId}
        projectId={projectId}
        dialogProps={{
          open: modal === "database",
          onOpenChange: handleonOpenChange,
        }}
      />
    </>
  );
}

function GameBackendEnvIdView() {
  return (
    <>
      <Modals />
      <Outlet />
    </>
  );
}

const searchSchema = z.object({
  modal: z.enum(["database"]).or(z.string()).optional(),
});

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/backend/$environmentId",
)({
  validateSearch: (search) => searchSchema.parse(search),
  component: GameBackendEnvIdView,
});
