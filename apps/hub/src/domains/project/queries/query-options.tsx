import { rivetClient } from "@/queries/global";
import { getMetaWatchIndex } from "@/queries/utils";
import { loadModuleCategories } from "@rivet-gg/components";
import { queryOptions } from "@tanstack/react-query";

export const projectsQueryOptions = () => {
  return queryOptions({
    queryKey: ["projects"],
    queryFn: ({ meta, signal }) =>
      rivetClient.cloud.games.getGames(
        {
          watchIndex: getMetaWatchIndex(meta),
        },
        { abortSignal: signal },
      ),
    select: (data) => {
      return data.groups.map((group) => {
        return {
          ...group,
          projects: data.games.filter(
            (game) => game.developer.groupId === group.groupId,
          ),
        };
      });
    },
  });
};

export const groupsCountQueryOptions = () => {
  return queryOptions({
    ...projectsQueryOptions(),
    select: (data) => data.groups.length,
  });
};

export const groupProjectsQueryOptions = (groupId: string) => {
  return queryOptions({
    ...projectsQueryOptions(),
    select: (data) => {
      // biome-ignore lint/style/noNonNullAssertion: when we get here, we know the group exists
      const group = data.groups.find((group) => group.groupId === groupId)!;
      const projects = data.games.filter(
        (game) => game.developer.groupId === group.groupId,
      );
      return {
        ...group,
        projects,
      };
    },
  });
};

export const groupOnwerQueryOptions = (groupId: string) => {
  return queryOptions({
    ...groupProjectsQueryOptions(groupId),
    select: (data) => {
      return groupProjectsQueryOptions(groupId).select?.(data).ownerIdentityId;
    },
  });
};

export const projectsCountQueryOptions = (groupId: string) => {
  return queryOptions({
    ...groupProjectsQueryOptions(groupId),
    select: (data) => data.games.length,
  });
};

export const projectQueryOptions = (projectId: string) => {
  return queryOptions({
    queryKey: ["project", projectId],
    queryFn: ({
      queryKey: [
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _,
        projectId,
      ],
      signal,
      meta,
    }) =>
      rivetClient.cloud.games.getGameById(
        projectId,
        {
          watchIndex: getMetaWatchIndex(meta),
        },
        { abortSignal: signal },
      ),
    select: (data) => ({
      ...data.game,
      namespaces: data.game.namespaces.map((environment) => ({
        ...environment,
        version: data.game.versions.find(
          (version) => version.versionId === environment.versionId,
        ),
      })),
    }),
  });
};

export const projectVersionsQueryOptions = (projectId: string) => {
  return queryOptions({
    ...projectQueryOptions(projectId),
    select: (data) =>
      projectQueryOptions(projectId)
        .select?.(data)
        .versions.sort((a, b) => b.createTs.getTime() - a.createTs.getTime()),
  });
};

export const projectRegionsQueryOptions = (projectId: string) => {
  return queryOptions({
    ...projectQueryOptions(projectId),
    select: (data) =>
      // biome-ignore lint/style/noNonNullAssertion: when we get here, we know the regions exist
      projectQueryOptions(projectId).select?.(data).availableRegions!,
  });
};

export const projectRegionQueryOptions = ({
  projectId,
  regionId,
}: {
  projectId: string;
  regionId: string;
}) => {
  return queryOptions({
    ...projectRegionsQueryOptions(projectId),
    select: (data) =>
      projectRegionsQueryOptions(projectId)
        .select?.(data)
        .find((region) => region.regionId === regionId),
  });
};

export const projectVersionQueryOptions = ({
  projectId,
  versionId,
}: {
  projectId: string;
  versionId: string;
}) =>
  queryOptions({
    ...projectQueryOptions(projectId),
    select: (data) =>
      // biome-ignore lint/style/noNonNullAssertion: when we get here, we know the version exists
      projectQueryOptions(projectId)
        .select?.(data)
        .versions.find((version) => version.versionId === versionId)!,
  });

export const projectTokenCloudQueryOptions = ({
  projectId,
}: { projectId: string }) => {
  return queryOptions({
    staleTime: 0,
    gcTime: 0,
    queryKey: ["project", projectId, "token", "cloud"],
    queryFn: ({
      queryKey: [
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _,
        projectId,
      ],
    }) => rivetClient.cloud.games.tokens.createCloudToken(projectId),
    select: (data) => data.token,
  });
};

export const projectEnvTokenServiceQueryOptions = ({
  projectId,
  environmentId,
}: { projectId: string; environmentId: string }) => {
  return queryOptions({
    staleTime: 0,
    gcTime: 0,
    queryKey: [
      "project",
      projectId,
      "environment",
      environmentId,
      "token",
      "service",
    ],
    queryFn: ({
      queryKey: [
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _,
        projectId,
        __,
        environmentId,
      ],
    }) =>
      rivetClient.games.environments.tokens.createServiceToken(
        projectId,
        environmentId,
      ),
    select: (data) => data.token,
  });
};

export const projectMetadataQueryOptions = ({
  projectId,
}: { projectId: string }) => {
  return queryOptions({
    queryKey: ["project", projectId, "metadata"],
    queryFn: async ({ queryKey: [_, projectId] }) => {
      const data = await rivetClient.cloud.games.getGameById(projectId);

      return {
        legacyLobbiesEnabled: data.game.versions.length > 1,
      };
    },
  });
};

export const modulesCategoriesQueryOptions = () => {
  return queryOptions({
    queryKey: ["modules", "categories"],
    queryFn: () => loadModuleCategories(),
  });
};

const FEATURED_MODULES = ["lobbies", "friends", "analytics"];

export const featuredModulesQueryOptions = () => {
  return queryOptions({
    ...modulesCategoriesQueryOptions(),
    queryKey: ["modules", "featured"],
    select: (data) => {
      return data
        .flatMap((category) => category.modules)
        .filter((module) => FEATURED_MODULES.includes(module.id));
    },
  });
};
