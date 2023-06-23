import { Logger as __Logger } from "@aws-sdk/types";
import { GroupServiceClientConfig } from "./GroupServiceClient";
/**
 * @internal
 */
export declare const getRuntimeConfig: (config: GroupServiceClientConfig) => {
    apiVersion: string;
    disableHostPrefix: boolean;
    logger: __Logger;
    urlParser: import("@aws-sdk/types").UrlParser;
};
