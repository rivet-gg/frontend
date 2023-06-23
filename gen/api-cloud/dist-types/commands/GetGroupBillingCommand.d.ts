import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { GetGroupBillingInput, GetGroupBillingOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface GetGroupBillingCommandInput extends GetGroupBillingInput {
}
export interface GetGroupBillingCommandOutput extends GetGroupBillingOutput, __MetadataBearer {
}
/**
 * Returns billing information for the given group over the given query time span.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, GetGroupBillingCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, GetGroupBillingCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new GetGroupBillingCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetGroupBillingCommandInput} for command's `input` shape.
 * @see {@link GetGroupBillingCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class GetGroupBillingCommand extends $Command<GetGroupBillingCommandInput, GetGroupBillingCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: GetGroupBillingCommandInput;
    constructor(input: GetGroupBillingCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetGroupBillingCommandInput, GetGroupBillingCommandOutput>;
    private serialize;
    private deserialize;
}
