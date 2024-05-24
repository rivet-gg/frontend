import { ActionCard, Text, Grid } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { gameBackendProjectEnvQueryOptions } from "../queries";
import * as AutoscalingConfigForm from "@/domains/game/forms/backend-env-autoscaling-config-form";

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
      <Text></Text>
    </ActionCard>
  );
}

function ConfigCard() {
  return (
    <AutoscalingConfigForm.Form defaultValues={{}} onSubmit={async () => {}}>
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
    <Grid columns={{ initial: "1", md: "2" }} gap="4" items="start">
      <OverviewCard projectId={projectId} environmentId={environmentId} />
      <ConfigCard />
    </Grid>
  );
}
