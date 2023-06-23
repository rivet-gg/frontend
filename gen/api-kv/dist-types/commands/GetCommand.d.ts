import { KvServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../KvServiceClient";
import { GetInput, GetOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface GetCommandInput extends GetInput {
}
export interface GetCommandOutput extends GetOutput, __MetadataBearer {
}
/**
 * Returns a specific key-value entry by key.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { KvServiceClient, GetCommand } from "@rivet-gg/kv"; // ES Modules import
 * // const { KvServiceClient, GetCommand } = require("@rivet-gg/kv"); // CommonJS import
 * const client = new KvServiceClient(config);
 * const command = new GetCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetCommandInput} for command's `input` shape.
 * @see {@link GetCommandOutput} for command's `response` shape.
 * @see {@link KvServiceClientResolvedConfig | config} for KvServiceClient's `config` shape.
 *
 */
export declare class GetCommand extends $Command<GetCommandInput, GetCommandOutput, KvServiceClientResolvedConfig> {
    readonly input: GetCommandInput;
    constructor(input: GetCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: KvServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetCommandInput, GetCommandOutput>;
    private serialize;
    private deserialize;
}
