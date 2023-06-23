import { KvServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../KvServiceClient";
import { GetBatchOutput, GetBatchRequest } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface GetBatchCommandInput extends GetBatchRequest {
}
export interface GetBatchCommandOutput extends GetBatchOutput, __MetadataBearer {
}
/**
 * Gets multiple key-value entries by key(s).
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { KvServiceClient, GetBatchCommand } from "@rivet-gg/kv"; // ES Modules import
 * // const { KvServiceClient, GetBatchCommand } = require("@rivet-gg/kv"); // CommonJS import
 * const client = new KvServiceClient(config);
 * const command = new GetBatchCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetBatchCommandInput} for command's `input` shape.
 * @see {@link GetBatchCommandOutput} for command's `response` shape.
 * @see {@link KvServiceClientResolvedConfig | config} for KvServiceClient's `config` shape.
 *
 */
export declare class GetBatchCommand extends $Command<GetBatchCommandInput, GetBatchCommandOutput, KvServiceClientResolvedConfig> {
    readonly input: GetBatchCommandInput;
    constructor(input: GetBatchCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: KvServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetBatchCommandInput, GetBatchCommandOutput>;
    private serialize;
    private deserialize;
}
