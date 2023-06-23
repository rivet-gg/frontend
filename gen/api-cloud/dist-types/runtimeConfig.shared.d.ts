import { Logger as __Logger } from "@aws-sdk/types";
import { CloudServiceClientConfig } from "./CloudServiceClient";
/**
 * @internal
 */
export declare const getRuntimeConfig: (config: CloudServiceClientConfig) => {
    apiVersion: string;
    disableHostPrefix: boolean;
    logger: __Logger;
    urlParser: import("@aws-sdk/types").UrlParser;
};
