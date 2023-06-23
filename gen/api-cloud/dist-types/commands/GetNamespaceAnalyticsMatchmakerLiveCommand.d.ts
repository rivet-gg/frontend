import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { GetNamespaceAnalyticsMatchmakerLiveInput, GetNamespaceAnalyticsMatchmakerLiveOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface GetNamespaceAnalyticsMatchmakerLiveCommandInput extends GetNamespaceAnalyticsMatchmakerLiveInput {
}
export interface GetNamespaceAnalyticsMatchmakerLiveCommandOutput extends GetNamespaceAnalyticsMatchmakerLiveOutput, __MetadataBearer {
}
/**
 * Returns live information about all active lobies for a given namespace.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, GetNamespaceAnalyticsMatchmakerLiveCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, GetNamespaceAnalyticsMatchmakerLiveCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new GetNamespaceAnalyticsMatchmakerLiveCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetNamespaceAnalyticsMatchmakerLiveCommandInput} for command's `input` shape.
 * @see {@link GetNamespaceAnalyticsMatchmakerLiveCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class GetNamespaceAnalyticsMatchmakerLiveCommand extends $Command<GetNamespaceAnalyticsMatchmakerLiveCommandInput, GetNamespaceAnalyticsMatchmakerLiveCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: GetNamespaceAnalyticsMatchmakerLiveCommandInput;
    constructor(input: GetNamespaceAnalyticsMatchmakerLiveCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetNamespaceAnalyticsMatchmakerLiveCommandInput, GetNamespaceAnalyticsMatchmakerLiveCommandOutput>;
    private serialize;
    private deserialize;
}
