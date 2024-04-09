import { useAuth } from "@/domains/auth/contexts/auth";
import { gamesQueryOptions } from "@/domains/game/queries";
import { GroupListView } from "@/domains/group/views/group-list-view";
import { CtaCard, Grid, NarrowPage } from "@rivet-gg/components";
import { createFileRoute } from "@tanstack/react-router";

function IndexRoute() {
  const { profile } = useAuth();

  return (
    <NarrowPage title={`Welcome to Rivet, ${profile?.identity.displayName}!`}>
      <Grid columns="2" gap="4">
        <a href="https://rivet.gg/learn">
          <CtaCard title="Learn" description="Get started with your engine" />
        </a>
        <a href="https://rivet.gg/learn">
          <CtaCard title="Docs" description="Lorem ipsum" />
        </a>
        <a href="https://rivet.gg/learn">
          <CtaCard title="Discord" description="Lorem ipsum" />
        </a>
        <a href="https://rivet.gg/learn">
          <CtaCard title="GitHub" description="Lorem ipsum" />
        </a>
      </Grid>
      <GroupListView />
    </NarrowPage>
  );
}

export const Route = createFileRoute("/_authenticated/_layout/")({
  beforeLoad: async ({ context }) => {
    await context.queryClient.ensureQueryData(gamesQueryOptions());
  },
  component: IndexRoute,
});
