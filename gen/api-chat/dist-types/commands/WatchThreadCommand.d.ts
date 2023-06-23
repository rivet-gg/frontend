import { ChatServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ChatServiceClient";
import { WatchThreadInput, WatchThreadOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface WatchThreadCommandInput extends WatchThreadInput {
}
export interface WatchThreadCommandOutput extends WatchThreadOutput, __MetadataBearer {
}
/**
 * Fetches all relevant changes from a thread that have happened since the
 * given watch index.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { ChatServiceClient, WatchThreadCommand } from "@rivet-gg/chat"; // ES Modules import
 * // const { ChatServiceClient, WatchThreadCommand } = require("@rivet-gg/chat"); // CommonJS import
 * const client = new ChatServiceClient(config);
 * const command = new WatchThreadCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link WatchThreadCommandInput} for command's `input` shape.
 * @see {@link WatchThreadCommandOutput} for command's `response` shape.
 * @see {@link ChatServiceClientResolvedConfig | config} for ChatServiceClient's `config` shape.
 *
 */
export declare class WatchThreadCommand extends $Command<WatchThreadCommandInput, WatchThreadCommandOutput, ChatServiceClientResolvedConfig> {
    readonly input: WatchThreadCommandInput;
    constructor(input: WatchThreadCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ChatServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<WatchThreadCommandInput, WatchThreadCommandOutput>;
    private serialize;
    private deserialize;
}
