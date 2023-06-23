import { ChatServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ChatServiceClient";
import { GetDirectThreadInput, GetDirectThreadOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface GetDirectThreadCommandInput extends GetDirectThreadInput {
}
export interface GetDirectThreadCommandOutput extends GetDirectThreadOutput, __MetadataBearer {
}
/**
 * Returns a thread ID with a given identity.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { ChatServiceClient, GetDirectThreadCommand } from "@rivet-gg/chat"; // ES Modules import
 * // const { ChatServiceClient, GetDirectThreadCommand } = require("@rivet-gg/chat"); // CommonJS import
 * const client = new ChatServiceClient(config);
 * const command = new GetDirectThreadCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetDirectThreadCommandInput} for command's `input` shape.
 * @see {@link GetDirectThreadCommandOutput} for command's `response` shape.
 * @see {@link ChatServiceClientResolvedConfig | config} for ChatServiceClient's `config` shape.
 *
 */
export declare class GetDirectThreadCommand extends $Command<GetDirectThreadCommandInput, GetDirectThreadCommandOutput, ChatServiceClientResolvedConfig> {
    readonly input: GetDirectThreadCommandInput;
    constructor(input: GetDirectThreadCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ChatServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetDirectThreadCommandInput, GetDirectThreadCommandOutput>;
    private serialize;
    private deserialize;
}
