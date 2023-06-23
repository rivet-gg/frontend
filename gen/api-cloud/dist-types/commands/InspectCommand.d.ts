import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { InspectInput, InspectOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface InspectCommandInput extends InspectInput {
}
export interface InspectCommandOutput extends InspectOutput, __MetadataBearer {
}
/**
 * Returns information about the current authenticated agent.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, InspectCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, InspectCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new InspectCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link InspectCommandInput} for command's `input` shape.
 * @see {@link InspectCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class InspectCommand extends $Command<InspectCommandInput, InspectCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: InspectCommandInput;
    constructor(input: InspectCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<InspectCommandInput, InspectCommandOutput>;
    private serialize;
    private deserialize;
}
