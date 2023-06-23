import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { GetGameNamespaceByIdInput, GetGameNamespaceByIdOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface GetGameNamespaceByIdCommandInput extends GetGameNamespaceByIdInput {
}
export interface GetGameNamespaceByIdCommandOutput extends GetGameNamespaceByIdOutput, __MetadataBearer {
}
/**
 * Gets a game namespace by namespace ID.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, GetGameNamespaceByIdCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, GetGameNamespaceByIdCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new GetGameNamespaceByIdCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetGameNamespaceByIdCommandInput} for command's `input` shape.
 * @see {@link GetGameNamespaceByIdCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class GetGameNamespaceByIdCommand extends $Command<GetGameNamespaceByIdCommandInput, GetGameNamespaceByIdCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: GetGameNamespaceByIdCommandInput;
    constructor(input: GetGameNamespaceByIdCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetGameNamespaceByIdCommandInput, GetGameNamespaceByIdCommandOutput>;
    private serialize;
    private deserialize;
}
