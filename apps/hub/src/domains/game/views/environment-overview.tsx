import {
  ActionCard,
  Badge,
  Grid,
  Text,
  WithTooltip,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { GameBackendDeploymentLink } from "../components/game-backend/game-backend-deployment-link";
import { gameBackendQueryOptions } from "../queries";

interface OverviewCardProps {
  environmentId: string;
  gameId: string;
}

function OverviewCard({ environmentId, gameId }: OverviewCardProps) {
  const { data } = useSuspenseQuery(
    gameBackendQueryOptions({ gameId, environmentId }),
  );

  return (
    <ActionCard title={"Overview"}>
      <Text>Created {data.createdAt.toLocaleString()}</Text>
      <Text>
        URL: <GameBackendDeploymentLink url={data.endpoint} />
      </Text>
      <Text asChild>
        <div className="flex gap-2 items-center ">
          Tier{" "}
          <WithTooltip
            content="This can't be changed. Please contact support to upgrade."
            trigger={<Badge>{data.tier}</Badge>}
          />
        </div>
      </Text>
    </ActionCard>
  );
}

interface GameBackendEnvironmentOverviewProps {
  environmentId: string;
  gameId: string;
}

export function GameBackendEnvironmentOverview({
  environmentId,
  gameId,
}: GameBackendEnvironmentOverviewProps) {
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="4" items="start">
      <OverviewCard environmentId={environmentId} gameId={gameId} />
    </Grid>
  );
}
