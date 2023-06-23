import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { GroupBillingCheckoutInput, GroupBillingCheckoutOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface GroupBillingCheckoutCommandInput extends GroupBillingCheckoutInput {
}
export interface GroupBillingCheckoutCommandOutput extends GroupBillingCheckoutOutput, __MetadataBearer {
}
/**
 * Creates a checkout session for the given group.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, GroupBillingCheckoutCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, GroupBillingCheckoutCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new GroupBillingCheckoutCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GroupBillingCheckoutCommandInput} for command's `input` shape.
 * @see {@link GroupBillingCheckoutCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class GroupBillingCheckoutCommand extends $Command<GroupBillingCheckoutCommandInput, GroupBillingCheckoutCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: GroupBillingCheckoutCommandInput;
    constructor(input: GroupBillingCheckoutCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GroupBillingCheckoutCommandInput, GroupBillingCheckoutCommandOutput>;
    private serialize;
    private deserialize;
}
