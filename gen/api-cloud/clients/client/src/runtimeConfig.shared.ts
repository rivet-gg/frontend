// smithy-typescript generated code
import { Logger as __Logger } from "@aws-sdk/types";
import { parseUrl } from "@aws-sdk/url-parser";
import { CloudServiceClientConfig } from "./CloudServiceClient";

/**
 * @internal
 */
export const getRuntimeConfig = (config: CloudServiceClientConfig) => ({
  apiVersion: "2022-6-3",
  disableHostPrefix: config?.disableHostPrefix ?? false,
  logger: config?.logger ?? {} as __Logger,
  urlParser: config?.urlParser ?? parseUrl,
});
