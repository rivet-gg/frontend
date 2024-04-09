import { groupSubNav } from "@/domains/group/data/route";
import { groupGamesQueryOptions } from "@/domains/game/queries";
import { Flex, SidebarNavigation, SidebarPage } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { GroupImageCard } from "@/domains/group/components/group-image-card";
import { GroupNameCard } from "@/domains/group/components/group-name-card";

function GroupIdSettingsView() {
  const { groupId } = Route.useParams();
  const { data } = useSuspenseQuery(groupGamesQueryOptions(groupId));

  return (
    <>
      <SidebarPage
        title={data.displayName}
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
  staticData: {
    subNav: groupSubNav,
  },
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
