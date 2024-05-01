import { GameTableActions } from "@/domains/game/components/game-table-actions";
import { groupGamesQueryOptions } from "@/domains/game/queries";
import {
  AssetImage,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Flex,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";

interface GroupGamesProps {
  groupId: string;
}

export function GroupGames({ groupId }: GroupGamesProps) {
  const { data } = useSuspenseQuery(groupGamesQueryOptions(groupId));

  const navigate = useNavigate();

  return (
    <>
      <Card w="full">
        <CardHeader>
          <Flex items="center" gap="4" justify="between">
            <CardTitle>Games</CardTitle>
            <Button variant="secondary" size="sm">
              <Link search={{ modal: "create-game" }}>
                <Plus />
              </Link>
            </Button>
          </Flex>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead w="16"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead w="16"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.games.map((game) => (
                <TableRow
                  key={game.gameId}
                  isClickable
                  onClick={() => {
                    navigate({
                      to: "/games/$gameId",
                      params: { gameId: game.gameId },
                    });
                  }}
                >
                  <TableCell w="16">
                    <AssetImage
                      src={game.logoUrl || "/games/blank/blankgame.svg"}
                      alt={`${game.displayName} logo`}
                      width={64}
                      height={64}
                    />
                  </TableCell>
                  <TableCell>
                    <Text>{game.displayName}</Text>
                  </TableCell>
                  <TableCell>
                    <GameTableActions />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
