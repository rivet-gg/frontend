import { ChatServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ChatServiceClient";
import { GetThreadTopicInput, GetThreadTopicOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface GetThreadTopicCommandInput extends GetThreadTopicInput {
}
export interface GetThreadTopicCommandOutput extends GetThreadTopicOutput, __MetadataBearer {
}
/**
 * Fetches the topic of a thread.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { ChatServiceClient, GetThreadTopicCommand } from "@rivet-gg/chat"; // ES Modules import
 * // const { ChatServiceClient, GetThreadTopicCommand } = require("@rivet-gg/chat"); // CommonJS import
 * const client = new ChatServiceClient(config);
 * const command = new GetThreadTopicCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetThreadTopicCommandInput} for command's `input` shape.
 * @see {@link GetThreadTopicCommandOutput} for command's `response` shape.
 * @see {@link ChatServiceClientResolvedConfig | config} for ChatServiceClient's `config` shape.
 *
 */
export declare class GetThreadTopicCommand extends $Command<GetThreadTopicCommandInput, GetThreadTopicCommandOutput, ChatServiceClientResolvedConfig> {
    readonly input: GetThreadTopicCommandInput;
    constructor(input: GetThreadTopicCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ChatServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetThreadTopicCommandInput, GetThreadTopicCommandOutput>;
    private serialize;
    private deserialize;
}
