import { groupGamesQueryOptions } from "@/domains/game/queries";
import { GroupAvatar } from "@/domains/group/components/group-avatar";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Separator } from "./separator";

interface GroupBreadcrumbProps {
  groupId: string;
}

export function GroupBreadcrumb({ groupId }: GroupBreadcrumbProps) {
  const { data } = useSuspenseQuery(groupGamesQueryOptions(groupId));

  return (
    <>
      <Separator />
      <Link to="/teams/$groupId" params={{ groupId }} className="flex gap-2">
        <GroupAvatar
          avatarUrl={data.avatarUrl}
          displayName={data.displayName}
          className="size-5"
        />
        {data.displayName}
      </Link>
    </>
  );
}
