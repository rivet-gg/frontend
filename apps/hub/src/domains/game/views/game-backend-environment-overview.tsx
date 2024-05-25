import * as AutoscalingConfigForm from "@/domains/game/forms/backend-env-autoscaling-config-form";
import { ActionCard, Flex, Grid, Link, Text } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  gameBackendProjectEnvQueryOptions,
  useBackendAutoScalingConfigMutation,
} from "../queries";

interface OverviewCardProps {
  environmentId: string;
  projectId: string;
}

function OverviewCard({ environmentId, projectId }: OverviewCardProps) {
  const { data } = useSuspenseQuery(
    gameBackendProjectEnvQueryOptions({ projectId, environmentId }),
  );

  return (
    <ActionCard title={"Overview"}>
      <Text>Created {data.createTs.toLocaleString()}</Text>
      <Text>
        URL:{" "}
        <Link href={`https://${data.nameId}.opengb.rivet.gg`}>
          {data.nameId}.opengb.rivet.gg
        </Link>
      </Text>
    </ActionCard>
  );
}

interface ConfigCardProps {
  environmentId: string;
  projectId: string;
}

function ConfigCard({ environmentId, projectId }: ConfigCardProps) {
  const { mutateAsync } = useBackendAutoScalingConfigMutation();
  return (
    <AutoscalingConfigForm.Form
      defaultValues={{ autoscalling: { min: 0, max: 1 } }}
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
}

export function GameBackendEnvironmentOverview({
  environmentId,
  projectId,
}: GameBackendEnvironmentOverviewProps) {
  return (
    <Flex direction="col" gap="4" items="start">
      <OverviewCard projectId={projectId} environmentId={environmentId} />
      <ConfigCard projectId={projectId} environmentId={environmentId} />
    </Flex>
  );
}
