import { groupGamesQueryOptions } from "@/queries/games";
import { GroupIndexView } from "@/views/group-index-view";
import { createFileRoute, notFound } from "@tanstack/react-router";

const GroupIdRoute = () => {
  return <GroupIndexView groupId={Route.useParams().groupId} />;
};

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
  component: GroupIdRoute,
});
