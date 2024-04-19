import { Page } from "@rivet-gg/components";
import { ReactNode } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { groupGamesQueryOptions } from "../queries";

interface GroupPageProps {
  groupId: string;
  children: ReactNode;
}

function GroupPage({ children, groupId }: GroupPageProps) {
  const { data: group } = useSuspenseQuery(groupGamesQueryOptions(groupId));
  return <Page title={group.displayName}>{children}</Page>;
}

export { GroupPage as Root };
