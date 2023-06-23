// smithy-typescript generated code
import { Logger as __Logger } from "@aws-sdk/types";
import { parseUrl } from "@aws-sdk/url-parser";
import { PortalServiceClientConfig } from "./PortalServiceClient";

/**
 * @internal
 */
export const getRuntimeConfig = (config: PortalServiceClientConfig) => ({
  apiVersion: "2022-6-1",
  disableHostPrefix: config?.disableHostPrefix ?? false,
  logger: config?.logger ?? {} as __Logger,
  urlParser: config?.urlParser ?? parseUrl,
});
