import { Logger as __Logger } from "@aws-sdk/types";
import { KvServiceClientConfig } from "./KvServiceClient";
/**
 * @internal
 */
export declare const getRuntimeConfig: (config: KvServiceClientConfig) => {
    apiVersion: string;
    disableHostPrefix: boolean;
    logger: __Logger;
    urlParser: import("@aws-sdk/types").UrlParser;
};
