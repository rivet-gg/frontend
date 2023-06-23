import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { SetGameBillingPlanInput, SetGameBillingPlanOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface SetGameBillingPlanCommandInput extends SetGameBillingPlanInput {
}
export interface SetGameBillingPlanCommandOutput extends SetGameBillingPlanOutput, __MetadataBearer {
}
/**
 * Sets the current billing plan of the given developer game.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, SetGameBillingPlanCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, SetGameBillingPlanCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new SetGameBillingPlanCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link SetGameBillingPlanCommandInput} for command's `input` shape.
 * @see {@link SetGameBillingPlanCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class SetGameBillingPlanCommand extends $Command<SetGameBillingPlanCommandInput, SetGameBillingPlanCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: SetGameBillingPlanCommandInput;
    constructor(input: SetGameBillingPlanCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<SetGameBillingPlanCommandInput, SetGameBillingPlanCommandOutput>;
    private serialize;
    private deserialize;
}
