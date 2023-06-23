import { KvServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../KvServiceClient";
import { PutBatchOutput, PutBatchRequest } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface PutBatchCommandInput extends PutBatchRequest {
}
export interface PutBatchCommandOutput extends PutBatchOutput, __MetadataBearer {
}
/**
 * Puts (sets or overwrites) multiple key-value entries by key(s).
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { KvServiceClient, PutBatchCommand } from "@rivet-gg/kv"; // ES Modules import
 * // const { KvServiceClient, PutBatchCommand } = require("@rivet-gg/kv"); // CommonJS import
 * const client = new KvServiceClient(config);
 * const command = new PutBatchCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link PutBatchCommandInput} for command's `input` shape.
 * @see {@link PutBatchCommandOutput} for command's `response` shape.
 * @see {@link KvServiceClientResolvedConfig | config} for KvServiceClient's `config` shape.
 *
 */
export declare class PutBatchCommand extends $Command<PutBatchCommandInput, PutBatchCommandOutput, KvServiceClientResolvedConfig> {
    readonly input: PutBatchCommandInput;
    constructor(input: PutBatchCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: KvServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<PutBatchCommandInput, PutBatchCommandOutput>;
    private serialize;
    private deserialize;
}
