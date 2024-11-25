import type { AuthContext } from "@/domains/auth/contexts/auth";
import {
  bootstrapQueryOptions,
  clusterQueryOptions,
} from "@/domains/auth/queries/bootstrap";
import {
  projectQueryOptions,
  projectsQueryOptions,
} from "@/domains/project/queries";
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

export async function guardOssNewbie({
  queryClient,
  auth,
}: { queryClient: QueryClient; auth: AuthContext }) {
  const { cluster } = await queryClient.fetchQuery(bootstrapQueryOptions());

  const { games: projects, groups } = await queryClient.fetchQuery(
    projectsQueryOptions(),
  );

  if (cluster === "oss" && projects.length === 1) {
    const {
      game: { namespaces },
    } = await queryClient.fetchQuery(projectQueryOptions(projects[0].gameId));

    // In case the project has no namespaces, or we failed to fetch the project, redirect to the project page
    if (namespaces.length > 0) {
      throw redirect({
        to: "/projects/$projectId/environments/$environmentId",
        params: {
          projectId: projects[0].gameId,
          environmentId: namespaces[0].namespaceId,
        },
        from: "/",
      });
    }
    throw redirect({
      to: "/projects/$projectId",
      params: {
        projectId: projects[0].gameId,
      },
      from: "/",
    });
  }

  const lastTeam = ls.get(
    `rivet-lastteam-${auth.profile?.identity.identityId}`,
  );

  if (lastTeam) {
    throw redirect({
      to: "/teams/$groupId",
      params: { groupId: lastTeam },
      from: "/",
    });
  }

  if (groups.length > 0) {
    throw redirect({
      to: "/teams/$groupId",
      params: { groupId: groups[0].groupId },
      from: "/",
    });
  }
}
