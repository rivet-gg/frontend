import { useAuth } from "@/domains/auth/contexts/auth";
import { gamesQueryOptions } from "@/domains/game/queries";
import { GroupListView } from "@/domains/group/views/group-list-view";
import { CtaCard, Grid, NarrowPage } from "@rivet-gg/components";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

function IndexRoute() {
  const { profile } = useAuth();

  return (
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
  );
}

export const Route = createFileRoute("/_authenticated/_layout/")({
  beforeLoad: async ({ context }) => {
    await context.queryClient.ensureQueryData(gamesQueryOptions());
  },
  component: IndexRoute,
});
