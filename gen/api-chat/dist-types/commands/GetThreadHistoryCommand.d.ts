import { ChatServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ChatServiceClient";
import { GetThreadHistoryInput, GetThreadHistoryOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface GetThreadHistoryCommandInput extends GetThreadHistoryInput {
}
export interface GetThreadHistoryCommandOutput extends GetThreadHistoryOutput, __MetadataBearer {
}
/**
 * Returns message history for a given thread in a certain direction.
 *
 * Defaults to querying messages before ts.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { ChatServiceClient, GetThreadHistoryCommand } from "@rivet-gg/chat"; // ES Modules import
 * // const { ChatServiceClient, GetThreadHistoryCommand } = require("@rivet-gg/chat"); // CommonJS import
 * const client = new ChatServiceClient(config);
 * const command = new GetThreadHistoryCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetThreadHistoryCommandInput} for command's `input` shape.
 * @see {@link GetThreadHistoryCommandOutput} for command's `response` shape.
 * @see {@link ChatServiceClientResolvedConfig | config} for ChatServiceClient's `config` shape.
 *
 */
export declare class GetThreadHistoryCommand extends $Command<GetThreadHistoryCommandInput, GetThreadHistoryCommandOutput, ChatServiceClientResolvedConfig> {
    readonly input: GetThreadHistoryCommandInput;
    constructor(input: GetThreadHistoryCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ChatServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetThreadHistoryCommandInput, GetThreadHistoryCommandOutput>;
    private serialize;
    private deserialize;
}
