import { KvServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../KvServiceClient";
import { DeleteInput, DeleteOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface DeleteCommandInput extends DeleteInput {
}
export interface DeleteCommandOutput extends DeleteOutput, __MetadataBearer {
}
/**
 * Deletes a key-value entry by key.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { KvServiceClient, DeleteCommand } from "@rivet-gg/kv"; // ES Modules import
 * // const { KvServiceClient, DeleteCommand } = require("@rivet-gg/kv"); // CommonJS import
 * const client = new KvServiceClient(config);
 * const command = new DeleteCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link DeleteCommandInput} for command's `input` shape.
 * @see {@link DeleteCommandOutput} for command's `response` shape.
 * @see {@link KvServiceClientResolvedConfig | config} for KvServiceClient's `config` shape.
 *
 */
export declare class DeleteCommand extends $Command<DeleteCommandInput, DeleteCommandOutput, KvServiceClientResolvedConfig> {
    readonly input: DeleteCommandInput;
    constructor(input: DeleteCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: KvServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DeleteCommandInput, DeleteCommandOutput>;
    private serialize;
    private deserialize;
}
