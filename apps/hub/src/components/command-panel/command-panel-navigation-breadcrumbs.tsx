import { GameAvatar } from "@/domains/game/components/game-avatar";
import {
  gameNamespaceDisplayNameQueryOptions,
  gameQueryOptions,
  groupGamesQueryOptions,
} from "@/domains/game/queries";
import { GroupAvatar } from "@/domains/group/components/group-avatar";
import { faPuzzle } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Skeleton } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import type { CommandPanelPage } from "./command-panel-navigation-provider";

function GroupBreadcrumbs({ groupId }: { groupId: string }) {
  const { data: group } = useSuspenseQuery(groupGamesQueryOptions(groupId));
  return (
    <>
      <GroupAvatar
        className="mr-2 size-4"
        displayName={group.displayName}
        avatarUrl={group.avatarUrl}
      />
      {group.displayName}
    </>
  );
}

function GameBreadcrumb({ gameId }: { gameId: string }) {
  const { data: game } = useSuspenseQuery(gameQueryOptions(gameId));
  return (
    <>
      <GameAvatar
        className="mr-2 size-4"
        displayName={game.displayName}
        logoUrl={game.logoUrl}
      />
      {game.displayName}
    </>
  );
}

function NamespaceBreadcrumb({
  gameId,
  namespaceId,
}: {
  gameId: string;
  namespaceId: string;
}) {
  const { data: namespace } = useSuspenseQuery(
    gameNamespaceDisplayNameQueryOptions({ gameId, namespaceId }),
  );
  return <span>{namespace}</span>;
}

function BackendBreadcrumb() {
  return (
    <>
      <FontAwesomeIcon icon={faPuzzle} className="mr-2 size-4" /> Backend
    </>
  );
}

interface CommandPanelNavigationBreadcrumbsProps {
  pages: CommandPanelPage[];
}

export function CommandPanelNavigationBreadcrumbs({
  pages,
}: CommandPanelNavigationBreadcrumbsProps) {
  if (pages.length === 0) {
    return null;
  }
  return (
    <div className="mt-2 flex min-h-8 items-center px-3">
      <Suspense fallback={<Skeleton className="h-4 w-10" />}>
        {pages.map((page) => (
          <Badge
            key={page.key}
            variant="outline"
            className="mr-2 flex items-center"
          >
            {page.key === "group" && <GroupBreadcrumbs {...page.params} />}
            {page.key === "game" && <GameBreadcrumb {...page.params} />}
            {page.key === "namespace" && (
              <NamespaceBreadcrumb {...page.params} />
            )}
            {page.key === "backend" && <BackendBreadcrumb />}
          </Badge>
        ))}
      </Suspense>
    </div>
  );
}
