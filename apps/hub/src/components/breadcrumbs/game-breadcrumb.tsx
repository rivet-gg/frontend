import { gameQueryOptions } from "@/domains/game/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { GroupBreadcrumb } from "./group-breadcrumb";
import { Link } from "@tanstack/react-router";
import { Separator } from "./separator";
import { GameAvatar } from "@/domains/game/components/game-avatar";

interface GameBreadcrumbProps {
  gameId: string;
}

export function GameBreadcrumb({ gameId }: GameBreadcrumbProps) {
  const { data } = useSuspenseQuery(gameQueryOptions(gameId));

  return (
    <>
      <GroupBreadcrumb groupId={data.developerGroupId} />
      <Separator />
      <Link to="/games/$gameId" params={{ gameId }} className="flex gap-2">
        <GameAvatar
          displayName={data.displayName}
          logoUrl={data.logoUrl}
          className="size-5"
        />
        {data.displayName}
      </Link>
    </>
  );
}
