import { GroupImageCard } from "@/components/group/group-image-card";
import { GroupNameCard } from "@/components/group/group-name-card";
import { GroupPageTabs } from "@/components/group/group-page-tabs";
import { groupGamesQueryOptions } from "@/queries/games";
import { Flex, SidebarNavigation, SidebarPage } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";

function GroupIdSettingsView() {
  const { groupId } = Route.useParams();
  const { data } = useSuspenseQuery(groupGamesQueryOptions(groupId));

  return (
    <>
      <SidebarPage
        title={data.displayName}
        header={<GroupPageTabs groupId={groupId} currentTab="settings" />}
        sidebar={
          <SidebarNavigation>
            <Link
              to="/teams/$groupId/settings"
              params={{ groupId }}
              className="font-semibold text-primary"
            >
              General
            </Link>
          </SidebarNavigation>
        }
      >
        <Flex gap="4" direction="col">
          <GroupNameCard groupId={groupId} />
          <GroupImageCard groupId={groupId} />
        </Flex>
      </SidebarPage>
    </>
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/teams/$groupId/settings/",
)({
  beforeLoad: async ({ context: { queryClient }, params: { groupId } }) => {
    const data = await queryClient.ensureQueryData(
      groupGamesQueryOptions(groupId),
    );

    const group = data.groups.find((group) => group.groupId === groupId);
    if (!group) {
      throw notFound();
    }
  },
  component: GroupIdSettingsView,
});
