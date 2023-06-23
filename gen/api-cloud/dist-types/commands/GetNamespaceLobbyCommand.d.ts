import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { GetNamespaceLobbyInput, GetNamespaceLobbyOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface GetNamespaceLobbyCommandInput extends GetNamespaceLobbyInput {
}
export interface GetNamespaceLobbyCommandOutput extends GetNamespaceLobbyOutput, __MetadataBearer {
}
/**
 * Returns a lobby from the given game namespace.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, GetNamespaceLobbyCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, GetNamespaceLobbyCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new GetNamespaceLobbyCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetNamespaceLobbyCommandInput} for command's `input` shape.
 * @see {@link GetNamespaceLobbyCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class GetNamespaceLobbyCommand extends $Command<GetNamespaceLobbyCommandInput, GetNamespaceLobbyCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: GetNamespaceLobbyCommandInput;
    constructor(input: GetNamespaceLobbyCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetNamespaceLobbyCommandInput, GetNamespaceLobbyCommandOutput>;
    private serialize;
    private deserialize;
}
