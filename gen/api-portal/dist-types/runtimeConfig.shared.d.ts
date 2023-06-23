import { Logger as __Logger } from "@aws-sdk/types";
import { PortalServiceClientConfig } from "./PortalServiceClient";
/**
 * @internal
 */
export declare const getRuntimeConfig: (config: PortalServiceClientConfig) => {
    apiVersion: string;
    disableHostPrefix: boolean;
    logger: __Logger;
    urlParser: import("@aws-sdk/types").UrlParser;
};
