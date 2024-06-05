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
          <a href="https://rivet.gg/learn">
            <CtaCard title="Learn">Get started with your engine</CtaCard>
          </a>
          <a href="https://rivet.gg/docs">
            <CtaCard title="Docs">
              Learn more about Rivet and its features
            </CtaCard>
          </a>
          <a href="https://rivet.gg/discord">
            <CtaCard title="Discord">Join our community on Discord</CtaCard>
          </a>
          <a href="https://github.com/rivet-gg">
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

const searchSchema = z
  .union([
    z.object({
      modal: z.enum(["create-game"]),
      groupId: z.string(),
    }),
    z.object({}),
  ])
  .optional();

export const Route = createFileRoute("/_authenticated/_layout/")({
  validateSearch: (search) => searchSchema.parse(search),
  beforeLoad: async ({ context }) => {
    await context.queryClient.ensureQueryData(gamesQueryOptions());
  },
  component: IndexRoute,
});
