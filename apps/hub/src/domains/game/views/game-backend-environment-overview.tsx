import * as AutoscalingConfigForm from "@/domains/game/forms/backend-env-autoscaling-config-form";
import {
  ActionCard,
  Badge,
  Grid,
  Text,
  WithTooltip,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { GameBackendDeploymentLink } from "../components/game-backend/game-backend-deployment-link";
import {
  gameBackendProjectEnvConfigQueryOptions,
  gameBackendProjectEnvQueryOptions,
  useBackendAutoScalingConfigMutation,
} from "../queries";

interface OverviewCardProps {
  environmentId: string;
  projectId: string;
  gameId: string;
}

function OverviewCard({ environmentId, projectId, gameId }: OverviewCardProps) {
  const { data } = useSuspenseQuery(
    gameBackendProjectEnvQueryOptions({ projectId, environmentId }),
  );

  return (
    <ActionCard title={"Overview"}>
      <Text>Created {data.createTs.toLocaleString()}</Text>
      <Text>
        URL:{" "}
        <GameBackendDeploymentLink
          gameId={gameId}
          environmentNameId={data.nameId}
        />
      </Text>
      <Text asChild>
        <div>
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

interface ConfigCardProps {
  environmentId: string;
  projectId: string;
}

function ConfigCard({ environmentId, projectId }: ConfigCardProps) {
  const { data: config } = useSuspenseQuery(
    gameBackendProjectEnvConfigQueryOptions({ projectId, environmentId }),
  );
  const { mutateAsync } = useBackendAutoScalingConfigMutation();

  return (
    <AutoscalingConfigForm.Form
      defaultValues={{
        autoscalling: {
          min: AutoscalingConfigForm.AUTOSCALING_VALUE_TO_INDEX_MAP[
            config.autoscalingLimitMinCu
          ],
          max: AutoscalingConfigForm.AUTOSCALING_VALUE_TO_INDEX_MAP[
            config.autoscalingLimitMaxCu
          ],
        },
      }}
      onSubmit={async (values) => {
        await mutateAsync({
          projectId,
          environmentId,
          config: {
            autoscalingLimitMinCu:
              AutoscalingConfigForm.AUTOSCALING_VALUE_MAP[
                values.autoscalling.min
              ].value,
            autoscalingLimitMaxCu:
              AutoscalingConfigForm.AUTOSCALING_VALUE_MAP[
                values.autoscalling.max
              ].value,
          },
        });
      }}
    >
      <ActionCard
        title={"Config"}
        footer={
          <AutoscalingConfigForm.Submit>Save</AutoscalingConfigForm.Submit>
        }
      >
        <AutoscalingConfigForm.Autoscaling />
      </ActionCard>
    </AutoscalingConfigForm.Form>
  );
}

interface GameBackendEnvironmentOverviewProps {
  environmentId: string;
  projectId: string;
  gameId: string;
}

export function GameBackendEnvironmentOverview({
  environmentId,
  projectId,
  gameId,
}: GameBackendEnvironmentOverviewProps) {
  const { data: project } = useSuspenseQuery(
    gameBackendProjectEnvQueryOptions({ projectId, environmentId }),
  );
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="4" items="start">
      <OverviewCard
        projectId={projectId}
        environmentId={environmentId}
        gameId={gameId}
      />
      {project.tier === "dedicated" ? (
        <ConfigCard projectId={projectId} environmentId={environmentId} />
      ) : null}
    </Grid>
  );
}
