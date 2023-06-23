import { KvServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../KvServiceClient";
import { PutInput, PutOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface PutCommandInput extends PutInput {
}
export interface PutCommandOutput extends PutOutput, __MetadataBearer {
}
/**
 * Puts (sets or overwrites) a key-value entry by key.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { KvServiceClient, PutCommand } from "@rivet-gg/kv"; // ES Modules import
 * // const { KvServiceClient, PutCommand } = require("@rivet-gg/kv"); // CommonJS import
 * const client = new KvServiceClient(config);
 * const command = new PutCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link PutCommandInput} for command's `input` shape.
 * @see {@link PutCommandOutput} for command's `response` shape.
 * @see {@link KvServiceClientResolvedConfig | config} for KvServiceClient's `config` shape.
 *
 */
export declare class PutCommand extends $Command<PutCommandInput, PutCommandOutput, KvServiceClientResolvedConfig> {
    readonly input: PutCommandInput;
    constructor(input: PutCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: KvServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<PutCommandInput, PutCommandOutput>;
    private serialize;
    private deserialize;
}
