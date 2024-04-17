import { groupGamesQueryOptions } from "@/domains/game/queries";
import { Flex, SidebarNavigation, SidebarPage } from "@rivet-gg/components";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { GroupImageCard } from "@/domains/group/components/group-image-card";
import { GroupNameCard } from "@/domains/group/components/group-name-card";

function GroupIdSettingsView() {
  const { group } = Route.useLoaderData();

  return (
    <>
      <SidebarPage
        title={group.displayName}
        sidebar={
          <SidebarNavigation>
            <Link
              to="/teams/$groupId/settings"
              params={{ groupId: group.groupId }}
              className="text-foreground font-semibold"
            >
              General
            </Link>
          </SidebarNavigation>
        }
      >
        <Flex gap="4" direction="col">
          <GroupNameCard groupId={group.groupId} />
          <GroupImageCard groupId={group.groupId} />
        </Flex>
      </SidebarPage>
    </>
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/teams/$groupId/settings/",
)({
  loader: async ({ context: { queryClient }, params: { groupId } }) => {
    const data = await queryClient.ensureQueryData(
      groupGamesQueryOptions(groupId),
    );

    const group = data.groups.find((group) => group.groupId === groupId);
    if (!group) {
      throw notFound();
    }

    return { group };
  },
  component: GroupIdSettingsView,
});
