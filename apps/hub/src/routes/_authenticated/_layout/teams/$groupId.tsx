import * as Layout from "@/domains/game/layouts/group-layout";
import { groupGamesQueryOptions } from "@/domains/game/queries";
import { Outlet, createFileRoute, notFound } from "@tanstack/react-router";

function GroupIdView() {
  const { groupId } = Route.useParams();

  return (
    <Layout.Root groupId={groupId}>
      <Outlet />
    </Layout.Root>
  );
}

export const Route = createFileRoute("/_authenticated/_layout/teams/$groupId")({
  beforeLoad: async ({ context: { queryClient }, params: { groupId } }) => {
    const data = await queryClient.ensureQueryData(
      groupGamesQueryOptions(groupId),
    );

    const group = data.groups.find((group) => group.groupId === groupId);
    if (!group) {
      throw notFound();
    }
  },
  component: GroupIdView,
});
