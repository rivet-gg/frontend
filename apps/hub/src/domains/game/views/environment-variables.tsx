import * as GameBackendEnvironmentVariablesForm from "@/domains/game/forms/backend-env-variables-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { computeBackendEnvVariablesDiff } from "../helpers/backend-env-compute-diff-variables";
import {
  gameBackendEnvVariablesQueryOptions,
  useBackendUpdateVariablesMutation,
} from "../queries";

interface GameBackendEnvironmentVariablesProps {
  gameId: string;
  environmentId: string;
}

export function GameBackendEnvironmentVariables({
  environmentId,
  gameId,
}: GameBackendEnvironmentVariablesProps) {
  const { data } = useSuspenseQuery(
    gameBackendEnvVariablesQueryOptions({ gameId, environmentId }),
  );
  const { mutateAsync } = useBackendUpdateVariablesMutation();
  return (
    <GameBackendEnvironmentVariablesForm.Form
      onSubmit={async (values, form) => {
        const diff = computeBackendEnvVariablesDiff(data, values.variables);
        if (diff.errors.length > 0) {
          for (const { idx, error } of diff.errors) {
            form.setError(`variables.${idx}.value`, {
              type: "manual",
              message: error,
            });
          }
          return;
        }
        return mutateAsync({
          gameId,
          environmentId,
          variables: diff.variables,
        });
      }}
      defaultValues={{
        variables: Object.entries(data).map(([key, value]) => ({
          key,
          value: value.text,
          isSecret: value.secret !== undefined,
        })),
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Environment Variables</CardTitle>
        </CardHeader>
        <CardContent>
          <GameBackendEnvironmentVariablesForm.Variables />
        </CardContent>
        <CardFooter>
          <GameBackendEnvironmentVariablesForm.Submit>
            Save
          </GameBackendEnvironmentVariablesForm.Submit>
        </CardFooter>
      </Card>
    </GameBackendEnvironmentVariablesForm.Form>
  );
}
