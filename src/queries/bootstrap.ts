import { queryOptions } from "@tanstack/react-query";
import { rivetClient } from "./global";

export const bootstrapQueryOptions = () => {
  return queryOptions({
    queryKey: ["bootstrap"],
    queryFn: () => rivetClient.cloud.bootstrap(),
  });
};
