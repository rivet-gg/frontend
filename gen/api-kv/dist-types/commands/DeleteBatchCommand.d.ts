import { KvServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../KvServiceClient";
import { DeleteBatchOutput, DeleteBatchRequest } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface DeleteBatchCommandInput extends DeleteBatchRequest {
}
export interface DeleteBatchCommandOutput extends DeleteBatchOutput, __MetadataBearer {
}
/**
 * Deletes multiple key-value entries by key(s).
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { KvServiceClient, DeleteBatchCommand } from "@rivet-gg/kv"; // ES Modules import
 * // const { KvServiceClient, DeleteBatchCommand } = require("@rivet-gg/kv"); // CommonJS import
 * const client = new KvServiceClient(config);
 * const command = new DeleteBatchCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link DeleteBatchCommandInput} for command's `input` shape.
 * @see {@link DeleteBatchCommandOutput} for command's `response` shape.
 * @see {@link KvServiceClientResolvedConfig | config} for KvServiceClient's `config` shape.
 *
 */
export declare class DeleteBatchCommand extends $Command<DeleteBatchCommandInput, DeleteBatchCommandOutput, KvServiceClientResolvedConfig> {
    readonly input: DeleteBatchCommandInput;
    constructor(input: DeleteBatchCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: KvServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DeleteBatchCommandInput, DeleteBatchCommandOutput>;
    private serialize;
    private deserialize;
}
