import type { AuthContext } from "@/domains/auth/contexts/auth";
import {
  bootstrapQueryOptions,
  clusterQueryOptions,
} from "@/domains/auth/queries/bootstrap";
import { gameQueryOptions, gamesQueryOptions } from "@/domains/game/queries";
import { type QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { notFound, redirect } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";
import { ls } from "./ls";

export function GuardEnterprise({ children }: PropsWithChildren) {
  const { data: cluster } = useSuspenseQuery(clusterQueryOptions());

  if (cluster === "enterprise") {
    return children;
  }

  return null;
}

export async function guardEnterprise({
  queryClient,
}: { queryClient: QueryClient }) {
  const bootstrap = await queryClient.fetchQuery(bootstrapQueryOptions());

  if (bootstrap.cluster === "oss") {
    throw notFound();
  }
}

export async function guardOssNewie({
  queryClient,
  auth,
}: { queryClient: QueryClient; auth: AuthContext }) {
  const { cluster } = await queryClient.fetchQuery(bootstrapQueryOptions());

  const { games, groups } = await queryClient.fetchQuery(gamesQueryOptions());

  if (cluster === "oss" && games.length === 1) {
    const {
      game: { namespaces },
    } = await queryClient.fetchQuery(gameQueryOptions(games[0].gameId));

    // In case the game has no namespaces, or we failed to fetch the game, redirect to the game page
    if (namespaces.length > 0) {
      throw redirect({
        to: "/games/$gameId/environments/$namespaceId",
        params: {
          gameId: games[0].gameId,
          namespaceId: namespaces[0].namespaceId,
        },
      });
    }

    throw redirect({
      to: "/games/$gameId",
      params: {
        gameId: games[0].gameId,
      },
    });
  }

  const lastTeam = ls.get(
    `rivet-lastteam-${auth.profile?.identity.identityId}`,
  );

  if (lastTeam) {
    throw redirect({
      to: "/teams/$groupId",
      params: { groupId: lastTeam },
    });
  }

  if (groups.length > 0) {
    throw redirect({
      to: "/teams/$groupId",
      params: { groupId: groups[0].groupId },
    });
  }
}
