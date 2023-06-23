import { ChatServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ChatServiceClient";
import { SetTypingStatusInput, SetTypingStatusOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface SetTypingStatusCommandInput extends SetTypingStatusInput {
}
export interface SetTypingStatusCommandOutput extends SetTypingStatusOutput, __MetadataBearer {
}
/**
 * Updates the current identity's typing status in the given thread.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { ChatServiceClient, SetTypingStatusCommand } from "@rivet-gg/chat"; // ES Modules import
 * // const { ChatServiceClient, SetTypingStatusCommand } = require("@rivet-gg/chat"); // CommonJS import
 * const client = new ChatServiceClient(config);
 * const command = new SetTypingStatusCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link SetTypingStatusCommandInput} for command's `input` shape.
 * @see {@link SetTypingStatusCommandOutput} for command's `response` shape.
 * @see {@link ChatServiceClientResolvedConfig | config} for ChatServiceClient's `config` shape.
 *
 */
export declare class SetTypingStatusCommand extends $Command<SetTypingStatusCommandInput, SetTypingStatusCommandOutput, ChatServiceClientResolvedConfig> {
    readonly input: SetTypingStatusCommandInput;
    constructor(input: SetTypingStatusCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ChatServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<SetTypingStatusCommandInput, SetTypingStatusCommandOutput>;
    private serialize;
    private deserialize;
}
