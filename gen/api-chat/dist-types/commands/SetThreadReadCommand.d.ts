import { ChatServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ChatServiceClient";
import { SetThreadReadInput, SetThreadReadOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface SetThreadReadCommandInput extends SetThreadReadInput {
}
export interface SetThreadReadCommandOutput extends SetThreadReadOutput, __MetadataBearer {
}
/**
 * Updates the current identity's last read timestamp in the given thread.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { ChatServiceClient, SetThreadReadCommand } from "@rivet-gg/chat"; // ES Modules import
 * // const { ChatServiceClient, SetThreadReadCommand } = require("@rivet-gg/chat"); // CommonJS import
 * const client = new ChatServiceClient(config);
 * const command = new SetThreadReadCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link SetThreadReadCommandInput} for command's `input` shape.
 * @see {@link SetThreadReadCommandOutput} for command's `response` shape.
 * @see {@link ChatServiceClientResolvedConfig | config} for ChatServiceClient's `config` shape.
 *
 */
export declare class SetThreadReadCommand extends $Command<SetThreadReadCommandInput, SetThreadReadCommandOutput, ChatServiceClientResolvedConfig> {
    readonly input: SetThreadReadCommandInput;
    constructor(input: SetThreadReadCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ChatServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<SetThreadReadCommandInput, SetThreadReadCommandOutput>;
    private serialize;
    private deserialize;
}
