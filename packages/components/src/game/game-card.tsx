import { Card, CardContent, CardFooter } from "@/ui/card";
import { Text } from "@/ui/typography";
import { Rivet } from "@rivet-gg/api";

interface GameCardProps
  extends Pick<Rivet.game.Summary, "displayName" | "logoUrl"> {}

export function GameCard({ displayName, logoUrl }: GameCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <img
          src={logoUrl || "https://assets2.rivet.gg/games/blank/blankgame.svg"}
          className="w-24 h-24 mx-auto object-contain"
          alt="Game logo"
        />
      </CardContent>
      <CardFooter className="justify-center">
        <Text>{displayName}</Text>
      </CardFooter>
    </Card>
  );
}
