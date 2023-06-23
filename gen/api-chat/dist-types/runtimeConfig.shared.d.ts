import { Logger as __Logger } from "@aws-sdk/types";
import { ChatServiceClientConfig } from "./ChatServiceClient";
/**
 * @internal
 */
export declare const getRuntimeConfig: (config: ChatServiceClientConfig) => {
    apiVersion: string;
    disableHostPrefix: boolean;
    logger: __Logger;
    urlParser: import("@aws-sdk/types").UrlParser;
};
