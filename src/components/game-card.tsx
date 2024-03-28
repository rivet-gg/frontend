import { Rivet } from "@rivet-gg/api";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Link } from "@tanstack/react-router";

interface GameCardProps extends Rivet.game.Summary {}

export const GameCard = ({ displayName, gameId }: GameCardProps) => {
  return (
    <Link to="/games/$gameId" params={{ gameId }}>
      <Card>
        <CardHeader>
          <CardTitle>{displayName}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
};
