import { type Rivet, RivetClient } from "@rivet-gg/api";
import { getConfig } from "@rivet-gg/components";
import { queryOptions, useMutation } from "@tanstack/react-query";

export const RivetApi = new RivetClient({
  token:
    "pub_prod.eyJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSJ9.COX20ObxMhDlnoyp_DEaEgoQ1CfV-VPdSO-xLavvBNPEsiIWGhQKEgoQNOOQw_A0RBOe42rOFH9dOQ.oGRVLDWtDf8NhrIetzMKJIS7ATa3N8o-96I9-BYRLwqo7q_J0_ZgA0CeaG9Znf9OmtzBjTkRqrZWig9SJdqrAg",
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

export const useCreateLobbyMutation = () =>
  useMutation({
    mutationFn: (values: Rivet.matchmaker.CreateLobbyRequest) =>
      RivetApi.matchmaker.lobbies.create(values),
  });

export const useFindLobbyMutation = () =>
  useMutation({
    mutationFn: (values: Rivet.matchmaker.FindLobbyRequest) =>
      RivetApi.matchmaker.lobbies.find(values),
  });
