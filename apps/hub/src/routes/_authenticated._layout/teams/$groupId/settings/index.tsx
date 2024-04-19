import { Flex } from "@rivet-gg/components";
import { createFileRoute } from "@tanstack/react-router";
import { GroupImageCard } from "@/domains/group/components/group-image-card";
import { GroupNameCard } from "@/domains/group/components/group-name-card";

function GroupIdSettingsView() {
  const { groupId } = Route.useParams();
  return (
    <Flex gap="4" direction="col">
      <GroupNameCard groupId={groupId} />
      <GroupImageCard groupId={groupId} />
    </Flex>
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/teams/$groupId/settings/",
)({
  component: GroupIdSettingsView,
});
