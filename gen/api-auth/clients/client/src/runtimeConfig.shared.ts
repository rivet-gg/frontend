// smithy-typescript generated code
import { Logger as __Logger } from "@aws-sdk/types";
import { parseUrl } from "@aws-sdk/url-parser";
import { AuthServiceClientConfig } from "./AuthServiceClient";

/**
 * @internal
 */
export const getRuntimeConfig = (config: AuthServiceClientConfig) => ({
  apiVersion: "2022-5-26",
  disableHostPrefix: config?.disableHostPrefix ?? false,
  logger: config?.logger ?? {} as __Logger,
  urlParser: config?.urlParser ?? parseUrl,
});
