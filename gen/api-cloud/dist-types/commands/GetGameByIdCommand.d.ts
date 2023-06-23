import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { GetGameByIdInput, GetGameByIdOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface GetGameByIdCommandInput extends GetGameByIdInput {
}
export interface GetGameByIdCommandOutput extends GetGameByIdOutput, __MetadataBearer {
}
/**
 * Returns a game by its game id.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, GetGameByIdCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, GetGameByIdCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new GetGameByIdCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetGameByIdCommandInput} for command's `input` shape.
 * @see {@link GetGameByIdCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class GetGameByIdCommand extends $Command<GetGameByIdCommandInput, GetGameByIdCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: GetGameByIdCommandInput;
    constructor(input: GetGameByIdCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetGameByIdCommandInput, GetGameByIdCommandOutput>;
    private serialize;
    private deserialize;
}
