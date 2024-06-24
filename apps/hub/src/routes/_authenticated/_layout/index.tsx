import { useAuth } from "@/domains/auth/contexts/auth";
import { gamesQueryOptions } from "@/domains/game/queries";
import { GroupListView } from "@/domains/group/views/group-list-view";
import { useDialog } from "@/hooks/use-dialog";
import { CtaCard, Grid, NarrowPage } from "@rivet-gg/components";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { z } from "zod";

function Modals() {
  const navigate = Route.useNavigate();
  const search = Route.useSearch();

  const CreateGroupGameDialog = useDialog.CreateGame.Dialog;

  if (!search || !("modal" in search)) {
    return;
  }

  const { groupId, modal } = search;

  const handleonOpenChange = (value: boolean) => {
    if (!value) {
      navigate({ search: { modal: undefined } });
    }
  };

  return (
    <>
      <CreateGroupGameDialog
        groupId={groupId}
        onSuccess={async (data) =>
          await navigate({
            to: "/games/$gameId",
            params: { gameId: data.gameId },
          })
        }
        dialogProps={{
          open: modal === "create-game",
          onOpenChange: handleonOpenChange,
        }}
      />
    </>
  );
}

function IndexRoute() {
  const { profile } = useAuth();

  return (
    <>
      <Modals />
      <NarrowPage title={`Welcome to Rivet, ${profile?.identity.displayName}!`}>
        <Grid columns={{ initial: "1", md: "2" }} gap="4">
          <a href="https://rivet.gg/learn" target="_blank" rel="noreferrer">
            <CtaCard title="Learn">Get started with your engine</CtaCard>
          </a>
          <a href="https://rivet.gg/docs" target="_blank" rel="noreferrer">
            <CtaCard title="Docs">
              Learn more about Rivet and its features
            </CtaCard>
          </a>
          <a href="https://rivet.gg/discord" target="_blank" rel="noreferrer">
            <CtaCard title="Discord">Join our community on Discord</CtaCard>
          </a>
          <a
            href="https://github.com/rivet-gg"
            target="_blank"
            rel="noreferrer"
          >
            <CtaCard title="GitHub">Contribute to Rivet on GitHub</CtaCard>
          </a>
        </Grid>
        <Suspense fallback={<GroupListView.Skeleton />}>
          <GroupListView />
        </Suspense>
      </NarrowPage>
    </>
  );
}

const searchSchema = z.object({
  modal: z.enum(["create-game"]).optional(),
  groupId: z.string().optional(),
});

export const Route = createFileRoute("/_authenticated/_layout/")({
  validateSearch: (search) => searchSchema.parse(search),
  beforeLoad: async ({ context }) => {
    await context.queryClient.ensureQueryData(gamesQueryOptions());
  },
  component: IndexRoute,
});
