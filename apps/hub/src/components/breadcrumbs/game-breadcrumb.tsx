import { GameAvatar } from "@/domains/game/components/game-avatar";
import { GroupGameSelect } from "@/domains/game/components/group-game-select";
import {
  gameQueryOptions,
  gamesCountQueryOptions,
} from "@/domains/game/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { Fragment, useContext } from "react";
import { NavItem } from "../header/nav-item";
import { GroupBreadcrumb } from "./group-breadcrumb";
import { MobileBreadcrumbsContext } from "./mobile-breadcrumbs";
import { Separator } from "./separator";

interface GameBreadcrumbProps {
  gameId: string;
}

export function GameBreadcrumb({ gameId }: GameBreadcrumbProps) {
  const { data } = useSuspenseQuery(gameQueryOptions(gameId));
  const { data: gamesCount } = useSuspenseQuery(
    gamesCountQueryOptions(data.developerGroupId),
  );

  const navigate = useNavigate();
  const handleGameChange = (gameId: string) => {
    navigate({
      to: "/games/$gameId",
      params: { gameId },
    });
  };

  const isMobile = useContext(MobileBreadcrumbsContext);

  const Element = isMobile ? NavItem : Fragment;

  return (
    <>
      <GroupBreadcrumb groupId={data.developerGroupId} />
      <Separator />
      <Element>
        {gamesCount > 1 ? (
          <GroupGameSelect
            groupId={data.developerGroupId}
            value={gameId}
            onValueChange={handleGameChange}
          />
        ) : (
          <Link
            to="/games/$gameId"
            params={{ gameId }}
            className="flex items-center gap-2"
          >
            <GameAvatar
              displayName={data.displayName}
              logoUrl={data.logoUrl}
              className={isMobile ? "size-4" : "size-5"}
            />
            {data.displayName}
          </Link>
        )}
      </Element>
    </>
  );
}
