import { rivetEeClient } from "@/queries/global";
import { queryOptions } from "@tanstack/react-query";

export const groupBillingUsageQueryOptions = ({
  groupId,
  startTs,
  endTs,
}: {
  groupId: string;
  startTs: Date;
  endTs: Date;
}) =>
  queryOptions({
    queryKey: [
      "group",
      groupId,
      "billing",
      "usage",
      { startTs, endTs },
    ] as const,
    queryFn: ({ queryKey: [_, groupId] }) =>
      rivetEeClient.ee.cloud.groups.billing.getUsage(groupId, {
        queryStartTs: startTs,
        queryEndTs: endTs,
      }),
  });

export const gameBillingQueryOptions = (gameId: string) => {
  return queryOptions({
    queryKey: ["game", gameId, "billing"],
    queryFn: ({
      queryKey: [
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _,
        gameId,
      ],
    }) => rivetEeClient.ee.cloud.games.billing.get(gameId),
  });
};
