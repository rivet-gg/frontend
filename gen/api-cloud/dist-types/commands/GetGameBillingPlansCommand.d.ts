import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { GetGameBillingPlansInput, GetGameBillingPlansOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface GetGameBillingPlansCommandInput extends GetGameBillingPlansInput {
}
export interface GetGameBillingPlansCommandOutput extends GetGameBillingPlansOutput, __MetadataBearer {
}
/**
 * Returns all available billing plans for the given game.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, GetGameBillingPlansCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, GetGameBillingPlansCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new GetGameBillingPlansCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetGameBillingPlansCommandInput} for command's `input` shape.
 * @see {@link GetGameBillingPlansCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class GetGameBillingPlansCommand extends $Command<GetGameBillingPlansCommandInput, GetGameBillingPlansCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: GetGameBillingPlansCommandInput;
    constructor(input: GetGameBillingPlansCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetGameBillingPlansCommandInput, GetGameBillingPlansCommandOutput>;
    private serialize;
    private deserialize;
}
