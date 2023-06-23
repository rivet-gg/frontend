import { ChatServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ChatServiceClient";
import { SendChatMessageInput, SendChatMessageOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface SendChatMessageCommandInput extends SendChatMessageInput {
}
export interface SendChatMessageCommandOutput extends SendChatMessageOutput, __MetadataBearer {
}
/**
 * Sends a chat message to a given topic.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { ChatServiceClient, SendChatMessageCommand } from "@rivet-gg/chat"; // ES Modules import
 * // const { ChatServiceClient, SendChatMessageCommand } = require("@rivet-gg/chat"); // CommonJS import
 * const client = new ChatServiceClient(config);
 * const command = new SendChatMessageCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link SendChatMessageCommandInput} for command's `input` shape.
 * @see {@link SendChatMessageCommandOutput} for command's `response` shape.
 * @see {@link ChatServiceClientResolvedConfig | config} for ChatServiceClient's `config` shape.
 *
 */
export declare class SendChatMessageCommand extends $Command<SendChatMessageCommandInput, SendChatMessageCommandOutput, ChatServiceClientResolvedConfig> {
    readonly input: SendChatMessageCommandInput;
    constructor(input: SendChatMessageCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ChatServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<SendChatMessageCommandInput, SendChatMessageCommandOutput>;
    private serialize;
    private deserialize;
}
