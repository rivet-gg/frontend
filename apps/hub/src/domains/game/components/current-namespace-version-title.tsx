import { useSuspenseQuery } from "@tanstack/react-query";
import { gameNamespaceQueryOptions, gameVersionQueryOptions } from "../queries";
import { NamespaceVersionTitle } from "./namespace-version-title";

interface CurrentNamespaceVersionTitleProps {
  namespaceId: string;
  gameId: string;
}

export function CurrentNamespaceVersionTitle({
  namespaceId,
  gameId,
}: CurrentNamespaceVersionTitleProps) {
  const {
    data: { namespace },
  } = useSuspenseQuery(gameNamespaceQueryOptions({ gameId, namespaceId }));

  const { data: version } = useSuspenseQuery(
    gameVersionQueryOptions({ gameId, versionId: namespace.versionId }),
  );

  return (
    <NamespaceVersionTitle
      namespace={namespace.displayName}
      version={version?.displayName ?? "Unknown"}
    />
  );
}
