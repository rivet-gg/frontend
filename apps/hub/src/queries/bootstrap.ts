import { queryOptions } from "@tanstack/react-query";
import { rivetClient } from "./global";

export const bootstrapQueryOptions = () => {
  return queryOptions({
    queryKey: ["bootstrap"],
    queryFn: () => rivetClient.cloud.bootstrap(),
  });
};

export const bootstrapCaptchaQueryOptions = () => {
  return queryOptions({
    ...bootstrapQueryOptions(),
    select: (data) => data.captcha,
  });
};
