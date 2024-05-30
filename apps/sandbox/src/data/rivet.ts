import { type Rivet, RivetClient } from "@rivet-gg/api";
import { getConfig } from "@rivet-gg/components";
import {
  type MutationKey,
  type MutationState,
  queryOptions,
  useMutation,
} from "@tanstack/react-query";

export const RivetApi = new RivetClient({
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  token: getConfig().identityToken!,
  environment: getConfig().apiUrl,
});

export const regionQueryOptions = () =>
  queryOptions({
    queryKey: ["regions"],
    queryFn: () => RivetApi.matchmaker.regions.list(),
  });

export const regionSelectionQueryOptions = () =>
  queryOptions({
    ...regionQueryOptions(),
    select: (data) =>
      data.regions.map((region) => ({
        value: region.regionId,
        label: `${region.regionDisplayName} (${region.regionId})`,
      })),
  });

const CREATE_LOBBY_MUTATION_KEY = ["create-lobby"];
export const useCreateLobbyMutation = () =>
  useMutation({
    mutationKey: CREATE_LOBBY_MUTATION_KEY,
    mutationFn: (values: Rivet.matchmaker.CreateLobbyRequest) =>
      RivetApi.matchmaker.lobbies.create(values),
  });

useCreateLobbyMutation.MUTATION_KEY = CREATE_LOBBY_MUTATION_KEY as MutationKey;

const FIND_LOBBY_MUTATION_KEY = ["find-lobby"];
export const useFindLobbyMutation = () =>
  useMutation({
    mutationKey: FIND_LOBBY_MUTATION_KEY,
    mutationFn: (values: Rivet.matchmaker.FindLobbyRequest) =>
      RivetApi.matchmaker.lobbies.find(values),
  });
useFindLobbyMutation.MUTATION_KEY = FIND_LOBBY_MUTATION_KEY;

export type LobbyMutationState = MutationState<
  Rivet.matchmaker.FindLobbyResponse | Rivet.matchmaker.CreateLobbyResponse
>;
