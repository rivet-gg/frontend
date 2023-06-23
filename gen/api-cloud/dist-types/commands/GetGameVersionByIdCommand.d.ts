import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { GetGameVersionByIdInput, GetGameVersionByIdOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface GetGameVersionByIdCommandInput extends GetGameVersionByIdInput {
}
export interface GetGameVersionByIdCommandOutput extends GetGameVersionByIdOutput, __MetadataBearer {
}
/**
 * Returns a game version by its version ID.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, GetGameVersionByIdCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, GetGameVersionByIdCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new GetGameVersionByIdCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetGameVersionByIdCommandInput} for command's `input` shape.
 * @see {@link GetGameVersionByIdCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class GetGameVersionByIdCommand extends $Command<GetGameVersionByIdCommandInput, GetGameVersionByIdCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: GetGameVersionByIdCommandInput;
    constructor(input: GetGameVersionByIdCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetGameVersionByIdCommandInput, GetGameVersionByIdCommandOutput>;
    private serialize;
    private deserialize;
}
