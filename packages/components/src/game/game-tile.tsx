import { Flex } from "@/ui/flex";
import { Text } from "@/ui/typography";
import { Rivet } from "@rivet-gg/api";

interface GameTileProps
  extends Pick<Rivet.game.Summary, "displayName" | "logoUrl"> {}

export function GameTile({ displayName, logoUrl }: GameTileProps) {
  return (
    <Flex
      className="rounded-md border-muted border-2 p-4 hover:bg-accent"
      direction="col"
      justify="center"
      items="center"
    >
      <div>
        <img
          src={logoUrl || "https://assets2.rivet.gg/games/blank/blankgame.svg"}
          className="w-24 h-24 mx-auto object-contain"
          alt="Game logo"
        />
      </div>
      <Text className="line-clamp-1">{displayName}</Text>
    </Flex>
  );
}
