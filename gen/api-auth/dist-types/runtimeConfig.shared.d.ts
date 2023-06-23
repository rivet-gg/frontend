import { Logger as __Logger } from "@aws-sdk/types";
import { AuthServiceClientConfig } from "./AuthServiceClient";
/**
 * @internal
 */
export declare const getRuntimeConfig: (config: AuthServiceClientConfig) => {
    apiVersion: string;
    disableHostPrefix: boolean;
    logger: __Logger;
    urlParser: import("@aws-sdk/types").UrlParser;
};
