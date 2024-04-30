import * as Layout from "@/domains/game/layouts/game-layout";
import { gameQueryOptions } from "@/domains/game/queries";
import { useDialog } from "@/hooks/use-dialog";

import { Outlet, createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

function Modals() {
  const navigate = Route.useNavigate();
  const { gameId } = Route.useParams();
  const { modal } = Route.useSearch();

  const GenerateGameCloudTokenDialog = useDialog.GenerateGameCloudToken.Dialog;

  const handleonOpenChange = (value: boolean) => {
    if (!value) {
      navigate({ search: { modal: undefined } });
    }
  };

  return (
    <>
      <GenerateGameCloudTokenDialog
        gameId={gameId}
        dialogProps={{
          open: modal === "cloud-token",
          onOpenChange: handleonOpenChange,
        }}
      />
    </>
  );
}

function GameIdRoute() {
  const { gameId } = Route.useParams();
  return (
    <Layout.Root gameId={gameId}>
      <Outlet />
      <Modals />
    </Layout.Root>
  );
}

const searchSchema = z.object({
  modal: z.enum(["cloud-token"]).optional(),
});

export const Route = createFileRoute("/_authenticated/_layout/games/$gameId")({
  validateSearch: (search) => searchSchema.parse(search),
  beforeLoad: async ({ context: { queryClient }, params: { gameId } }) => {
    await queryClient.ensureQueryData(gameQueryOptions(gameId));
  },
  component: GameIdRoute,
});
