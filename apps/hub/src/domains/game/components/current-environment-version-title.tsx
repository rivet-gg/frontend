import { useSuspenseQuery } from "@tanstack/react-query";
import {
  gameEnvironmentQueryOptions,
  gameVersionQueryOptions,
} from "../queries";
import { EnvironmentVersionTitle } from "./environment-version-title";

interface CurrentEnvironmentVersionTitleProps {
  environmentId: string;
  gameId: string;
}

export function CurrentEnvironmentVersionTitle({
  environmentId,
  gameId,
}: CurrentEnvironmentVersionTitleProps) {
  const {
    data: { namespace: environment },
  } = useSuspenseQuery(gameEnvironmentQueryOptions({ gameId, environmentId }));

  const { data: version } = useSuspenseQuery(
    gameVersionQueryOptions({ gameId, versionId: environment.versionId }),
  );

  return (
    <EnvironmentVersionTitle
      environment={environment.displayName}
      version={version?.displayName ?? "Unknown"}
    />
  );
}
