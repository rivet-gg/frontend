// smithy-typescript generated code
import { Logger as __Logger } from "@aws-sdk/types";
import { parseUrl } from "@aws-sdk/url-parser";
import { KvServiceClientConfig } from "./KvServiceClient";

/**
 * @internal
 */
export const getRuntimeConfig = (config: KvServiceClientConfig) => ({
  apiVersion: "2022-02-03",
  disableHostPrefix: config?.disableHostPrefix ?? false,
  logger: config?.logger ?? {} as __Logger,
  urlParser: config?.urlParser ?? parseUrl,
});
