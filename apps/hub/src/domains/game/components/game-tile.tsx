import type { Rivet } from "@rivet-gg/api";
import { AssetImage, Flex, Text } from "@rivet-gg/components";
import { GameBillingPlanBadge } from "./game-billing/game-billing-plan-badge";

interface GameTileProps
  extends Pick<Rivet.game.Summary, "gameId" | "displayName" | "logoUrl"> {}

export function GameTile({ gameId, displayName, logoUrl }: GameTileProps) {
  return (
    <Flex
      className="rounded-md border-2 p-4 hover:bg-accent"
      direction="col"
      justify="center"
      items="center"
    >
      <div>
        <AssetImage
          src={logoUrl || "/games/blank/blankgame.svg"}
          className="w-24 h-24 mx-auto object-contain"
          alt="Game logo"
        />
      </div>
      <Text className="line-clamp-1 mb-2">{displayName}</Text>
      <GameBillingPlanBadge gameId={gameId} />
    </Flex>
  );
}
