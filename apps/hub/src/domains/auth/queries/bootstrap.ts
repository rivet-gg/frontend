import { queryOptions } from "@tanstack/react-query";
import { rivetClient } from "../../../queries/global";

export const bootstrapQueryOptions = () => {
  return queryOptions({
    queryKey: ["bootstrap"],
    queryFn: () => rivetClient.cloud.bootstrap(),
    refetchOnWindowFocus: false,
  });
};

export const bootstrapOpenGbQueryOptions = () => {
  return queryOptions({
    ...bootstrapQueryOptions(),
    select: (data) =>
      data.domains?.opengb || data.domains?.main || window.location.host,
  });
};

export const bootstrapCaptchaQueryOptions = () => {
  return queryOptions({
    ...bootstrapQueryOptions(),
    select: (data) => data.captcha,
  });
};
