import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { UpdateGameNamespaceVersionInput, UpdateGameNamespaceVersionOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface UpdateGameNamespaceVersionCommandInput extends UpdateGameNamespaceVersionInput {
}
export interface UpdateGameNamespaceVersionCommandOutput extends UpdateGameNamespaceVersionOutput, __MetadataBearer {
}
/**
 * Updates the version of a game namespace.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, UpdateGameNamespaceVersionCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, UpdateGameNamespaceVersionCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new UpdateGameNamespaceVersionCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link UpdateGameNamespaceVersionCommandInput} for command's `input` shape.
 * @see {@link UpdateGameNamespaceVersionCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class UpdateGameNamespaceVersionCommand extends $Command<UpdateGameNamespaceVersionCommandInput, UpdateGameNamespaceVersionCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: UpdateGameNamespaceVersionCommandInput;
    constructor(input: UpdateGameNamespaceVersionCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<UpdateGameNamespaceVersionCommandInput, UpdateGameNamespaceVersionCommandOutput>;
    private serialize;
    private deserialize;
}
