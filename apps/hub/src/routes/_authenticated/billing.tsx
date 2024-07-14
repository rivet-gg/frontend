import { GameSelect } from "@/domains/game/components/game-select";
import * as Layout from "@/layouts/page-centered";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@rivet-gg/components";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

function BillingRoute() {
  const [gameId, setGameId] = useState<string | null>(null);

  return (
    <Layout.Root>
      <Card>
        <CardHeader>
          <CardTitle>Billing</CardTitle>
          <CardDescription>
            Choose a game for which you would like to manage billing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GameSelect onValueChange={setGameId} />
        </CardContent>
        <CardFooter>
          <Button asChild disabled={!gameId}>
            {/* biome-ignore lint/style/noNonNullAssertion: it's safe to assume that gameid exists */}
            <Link to="/games/$gameId/billing" params={{ gameId: gameId! }}>
              Manage billing
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </Layout.Root>
  );
}

export const Route = createFileRoute("/_authenticated/billing")({
  component: BillingRoute,
});
