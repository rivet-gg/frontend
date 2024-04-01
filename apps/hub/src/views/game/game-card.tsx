import { Rivet } from "@rivet-gg/api";
import { Card, CardContent, CardFooter, Text } from "@rivet-gg/components";
import { Link } from "@tanstack/react-router";

interface GameCardProps extends Rivet.game.Summary {}

export function GameCard({ displayName, gameId, logoUrl }: GameCardProps) {
  return (
    <Link to="/games/$gameId" params={{ gameId }}>
      <Card>
        <CardContent className="pt-6">
          <img
            src={
              logoUrl || "https://assets2.rivet.gg/games/blank/blankgame.svg"
            }
            className="w-24 h-24 mx-auto object-contain"
            alt="Game logo"
          />
        </CardContent>
        <CardFooter className="justify-center">
          <Text>{displayName}</Text>
        </CardFooter>
      </Card>
    </Link>
  );
}
