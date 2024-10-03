import {
  groupGamesQueryOptions,
  groupsCountQueryOptions,
} from "@/domains/game/queries";
import { GroupAvatar } from "@/domains/group/components/group-avatar";
import { GroupSelect } from "@/domains/group/components/group-select";
import { useSuspenseQueries } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { Fragment, useContext } from "react";
import { NavItem } from "../header/nav-item";
import { MobileBreadcrumbsContext } from "./mobile-breadcrumbs";

interface GroupBreadcrumbProps {
  groupId: string;
}

export function GroupBreadcrumb({ groupId }: GroupBreadcrumbProps) {
  const [{ data: groupsCount }, { data }] = useSuspenseQueries({
    queries: [groupsCountQueryOptions(), groupGamesQueryOptions(groupId)],
  });

  const navigate = useNavigate();

  const handleGroupChange = (groupId: string) => {
    navigate({
      to: "/teams/$groupId",
      params: { groupId },
    });
  };

  const isMobile = useContext(MobileBreadcrumbsContext);

  const Element = isMobile ? NavItem : Fragment;

  return (
    <Element>
      {groupsCount > 1 ? (
        <GroupSelect
          showCreateGroup
          onCreateClick={() =>
            navigate({ to: ".", search: { modal: "create-group" } })
          }
          value={groupId}
          onValueChange={handleGroupChange}
        />
      ) : (
        <Link
          to="/teams/$groupId"
          params={{ groupId }}
          className="flex items-center gap-2"
        >
          <GroupAvatar
            avatarUrl={data.avatarUrl}
            displayName={data.displayName}
            className={isMobile ? "size-4" : "size-5"}
          />
          {data.displayName}
        </Link>
      )}
    </Element>
  );
}
