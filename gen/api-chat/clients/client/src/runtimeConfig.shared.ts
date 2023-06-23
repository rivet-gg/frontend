// smithy-typescript generated code
import { Logger as __Logger } from "@aws-sdk/types";
import { parseUrl } from "@aws-sdk/url-parser";
import { ChatServiceClientConfig } from "./ChatServiceClient";

/**
 * @internal
 */
export const getRuntimeConfig = (config: ChatServiceClientConfig) => ({
  apiVersion: "2022-5-28",
  disableHostPrefix: config?.disableHostPrefix ?? false,
  logger: config?.logger ?? {} as __Logger,
  urlParser: config?.urlParser ?? parseUrl,
});
