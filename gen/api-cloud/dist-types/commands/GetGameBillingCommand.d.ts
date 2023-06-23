import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { GetGameBillingInput, GetGameBillingOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface GetGameBillingCommandInput extends GetGameBillingInput {
}
export interface GetGameBillingCommandOutput extends GetGameBillingOutput, __MetadataBearer {
}
/**
 * Returns billing information for the given game over the given query time span.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, GetGameBillingCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, GetGameBillingCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new GetGameBillingCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetGameBillingCommandInput} for command's `input` shape.
 * @see {@link GetGameBillingCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class GetGameBillingCommand extends $Command<GetGameBillingCommandInput, GetGameBillingCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: GetGameBillingCommandInput;
    constructor(input: GetGameBillingCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetGameBillingCommandInput, GetGameBillingCommandOutput>;
    private serialize;
    private deserialize;
}
