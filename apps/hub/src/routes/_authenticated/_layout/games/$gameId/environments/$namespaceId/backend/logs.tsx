import { ErrorComponent } from "@/components/error-component";
import { GameBackendListEventsPreview } from "@/domains/game/components/game-backend/game-backend-list-events-preview";
import * as Layout from "@/domains/game/layouts/backend-layout";
import { gameBackendEnvEventsQueryOptions } from "@/domains/game/queries";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  LiveBadge,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  type ErrorComponentProps,
  createFileRoute,
} from "@tanstack/react-router";
import { zodSearchValidator } from "@tanstack/router-zod-adapter";
import { z } from "zod";

function GameBackendEnvironmentIdLogsRoute() {
  const { namespaceId, gameId } = Route.useParams();
  const { eventId } = Route.useSearch();

  const { data } = useSuspenseQuery(
    gameBackendEnvEventsQueryOptions({ gameId, environmentId: namespaceId }),
  );

  return (
    <Card className="h-full max-h-full flex flex-col p-0">
      <CardHeader className="border-b">
        <CardTitle className="flex gap-4">
          Logs
          <LiveBadge />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 w-full p-0">
        <GameBackendListEventsPreview
          events={data}
          eventId={eventId}
          gameId={gameId}
          environmentId={namespaceId}
        />
      </CardContent>
    </Card>
  );
}

const searchSchema = z.object({
  eventId: z.string().optional(),
});

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/environments/$namespaceId/backend/logs",
)({
  validateSearch: zodSearchValidator(searchSchema),
  staticData: {
    layout: "full",
  },
  component: GameBackendEnvironmentIdLogsRoute,
  errorComponent: (props: ErrorComponentProps) => {
    return <ErrorComponent {...props} />;
  },
  pendingComponent: Layout.Content.Skeleton,
});
